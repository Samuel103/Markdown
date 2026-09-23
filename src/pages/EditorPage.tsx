import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { isTauri } from '@tauri-apps/api/core'
import { basename } from '@tauri-apps/api/path'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { open, save } from '@tauri-apps/plugin-dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'
import MarkdownEditor from '../components/editor/MarkdownEditor'
import MarkdownPreview from '../components/preview/MarkdownPreview'
import StatusBar from '../components/status-bar/StatusBar'
import Toolbar, { type FormattingAction } from '../components/toolbar/Toolbar'
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts'
import type { MarkdownDocument } from '../types/document'

type Theme = 'light' | 'dark'
type ActivePane = 'editor' | 'preview'

const themeStorageKey = 'markdown-editor-theme'
const markdownFileFilter = [{ name: 'Markdown', extensions: ['md', 'markdown'] }]
const applicationTitle = 'Markdown Editor'

type FormattingReplacement = {
  content: string
  selectionStart: number
  selectionEnd: number
}

function withSelectedText(prefix: string, suffix: string, selectedText: string, placeholder: string): FormattingReplacement {
  const text = selectedText || placeholder

  return {
    content: `${prefix}${text}${suffix}`,
    selectionStart: prefix.length,
    selectionEnd: prefix.length + text.length,
  }
}

function withPrefixedLines(prefix: string, selectedText: string, placeholder: string): FormattingReplacement {
  const content = (selectedText || placeholder)
    .split('\n')
    .map((line, index) => `${prefix === '1. ' ? `${index + 1}. ` : prefix}${line}`)
    .join('\n')

  return { content, selectionStart: 0, selectionEnd: content.length }
}

function asBlock(replacement: FormattingReplacement): FormattingReplacement {
  return {
    content: `\n${replacement.content}\n`,
    selectionStart: replacement.selectionStart + 1,
    selectionEnd: replacement.selectionEnd + 1,
  }
}

function createFormattingReplacement(action: FormattingAction, selectedText: string): FormattingReplacement {
  switch (action) {
    case 'heading':
      return asBlock(withSelectedText('# ', '', selectedText, 'Heading'))
    case 'bold':
      return withSelectedText('**', '**', selectedText, 'bold text')
    case 'italic':
      return withSelectedText('*', '*', selectedText, 'italic text')
    case 'strikethrough':
      return withSelectedText('~~', '~~', selectedText, 'strikethrough text')
    case 'link': {
      const text = selectedText || 'link text'
      const url = 'https://example.com'

      return {
        content: `[${text}](${url})`,
        selectionStart: text.length + 3,
        selectionEnd: text.length + 3 + url.length,
      }
    }
    case 'image': {
      const altText = selectedText || 'image description'
      const url = 'https://example.com/image.png'

      return {
        content: `![${altText}](${url})`,
        selectionStart: altText.length + 4,
        selectionEnd: altText.length + 4 + url.length,
      }
    }
    case 'blockquote':
      return asBlock(withPrefixedLines('> ', selectedText, 'Quote'))
    case 'inlineCode':
      return withSelectedText('`', '`', selectedText, 'code')
    case 'codeBlock':
      return asBlock(withSelectedText('```\n', '\n```', selectedText, 'code'))
    case 'bulletList':
      return asBlock(withPrefixedLines('- ', selectedText, 'List item'))
    case 'numberedList':
      return asBlock(withPrefixedLines('1. ', selectedText, 'List item'))
    case 'taskList':
      return asBlock(withPrefixedLines('- [ ] ', selectedText, 'Task'))
    case 'horizontalRule':
      return asBlock({ content: '---', selectionStart: 3, selectionEnd: 3 })
    case 'table': {
      const cell = selectedText || 'Cell 1'
      const content = `| Column 1 | Column 2 |\n| --- | --- |\n| ${cell} | Cell 2 |`
      const selectionStart = content.indexOf(cell)

      return asBlock({ content, selectionStart, selectionEnd: selectionStart + cell.length })
    }
  }
}

function getStoredTheme(): Theme | null {
  const storedTheme = window.localStorage.getItem(themeStorageKey)

  return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function EditorPage() {
  const [currentDocument, setCurrentDocument] = useState<MarkdownDocument>({
    fileName: 'untitled.md',
    content: '# Bonjour',
    isDirty: false,
  })
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const discardButtonRef = useRef<HTMLButtonElement>(null)
  const [pendingAction, setPendingAction] = useState<'new' | 'open' | null>(null)
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme())
  const [activePane, setActivePane] = useState<ActivePane>('editor')
  const [fileError, setFileError] = useState<string | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function handleSystemThemeChange(event: MediaQueryListEvent) {
      if (!getStoredTheme()) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  useEffect(() => {
    if (!currentDocument.isDirty) {
      return
    }

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [currentDocument.isDirty])

  useEffect(() => {
    const title = `${currentDocument.fileName}${currentDocument.isDirty ? ' *' : ''} — ${applicationTitle}`

    document.title = title

    if (isTauri()) {
      void getCurrentWindow().setTitle(title).catch(() => undefined)
    }
  }, [currentDocument.fileName, currentDocument.isDirty])

  useEffect(() => {
    if (!pendingAction) {
      return
    }

    cancelButtonRef.current?.focus()

    function handleDialogKeyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPendingAction(null)
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const firstButton = cancelButtonRef.current
      const lastButton = discardButtonRef.current

      if (!firstButton || !lastButton) {
        return
      }

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault()
        lastButton.focus()
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault()
        firstButton.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeyboard)

    return () => document.removeEventListener('keydown', handleDialogKeyboard)
  }, [pendingAction])

  function handleContentChange(content: string) {
    setCurrentDocument((document) => ({
      ...document,
      content,
      isDirty: true,
    }))
  }

  function createNewDocument() {
    setFileError(null)
    setCurrentDocument({
      fileName: 'untitled.md',
      content: '',
      isDirty: false,
    })
    requestAnimationFrame(() => editorRef.current?.view?.focus())
  }

  function openDocument() {
    setFileError(null)

    if (isTauri()) {
      void openNativeDocument()
      return
    }

    fileInputRef.current?.click()
  }

  async function openNativeDocument() {
    try {
      const filePath = await open({
        title: 'Open a Markdown file',
        multiple: false,
        filters: markdownFileFilter,
      })

      if (!filePath) {
        return
      }

      const [content, fileName] = await Promise.all([readTextFile(filePath), basename(filePath)])

      setCurrentDocument({
        fileName,
        filePath,
        content,
        isDirty: false,
      })
    } catch {
      setFileError('Unable to open this file. Check that it still exists and that you have permission to read it.')
    }
  }

  function handleNewDocument() {
    if (currentDocument.isDirty) {
      setPendingAction('new')
      return
    }

    createNewDocument()
  }

  function handleOpenDocument() {
    if (currentDocument.isDirty) {
      setPendingAction('open')
      return
    }

    openDocument()
  }

  function handleDiscardChanges() {
    if (pendingAction === 'new') {
      createNewDocument()
    } else if (pendingAction === 'open') {
      openDocument()
    }

    setPendingAction(null)
  }

  async function handleSaveDocument() {
    setFileError(null)

    if (isTauri()) {
      await saveNativeDocument(currentDocument.filePath)
      return
    }

    downloadDocument(currentDocument.fileName)
  }

  function downloadDocument(fileName: string) {
    const blob = new Blob([currentDocument.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = fileName
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    setCurrentDocument((document) => ({
      ...document,
      fileName,
      isDirty: false,
    }))
  }

  async function saveNativeDocument(existingFilePath?: string) {
    try {
      let filePath = existingFilePath

      if (!filePath) {
        const selectedPath = await save({
          title: 'Save Markdown file',
          defaultPath: currentDocument.fileName,
          filters: markdownFileFilter,
        })

        if (!selectedPath) {
          return
        }

        filePath = selectedPath.toLowerCase().endsWith('.md') || selectedPath.toLowerCase().endsWith('.markdown')
          ? selectedPath
          : `${selectedPath}.md`
      }

      const fileName = await basename(filePath)

      await writeTextFile(filePath, currentDocument.content)

      setCurrentDocument((document) => ({
        ...document,
        fileName,
        filePath,
        isDirty: false,
      }))
    } catch {
      setFileError('Unable to save this file. Check that it has not been deleted and that you have permission to write to it.')
    }
  }

  function handleSaveAs() {
    setFileError(null)

    if (isTauri()) {
      void saveNativeDocument()
      return
    }

    const requestedFileName = window.prompt('Enter a file name', currentDocument.fileName)?.trim()

    if (!requestedFileName) {
      return
    }

    const fileName = requestedFileName.toLowerCase().endsWith('.md') ? requestedFileName : `${requestedFileName}.md`

    downloadDocument(fileName)
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(themeStorageKey, nextTheme)
      return nextTheme
    })
  }

  function handleFormat(action: FormattingAction) {
    const view = editorRef.current?.view

    if (!view) {
      return
    }

    const selection = view.state.selection.main
    const selectedText = view.state.sliceDoc(selection.from, selection.to)
    const replacement = createFormattingReplacement(action, selectedText)
    const selectionStart = selection.from + replacement.selectionStart

    view.dispatch({
      changes: { from: selection.from, to: selection.to, insert: replacement.content },
      selection: {
        anchor: selectionStart,
        head: selection.from + replacement.selectionEnd,
      },
    })
    view.focus()
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files ?? []
    event.target.value = ''

    if (!file) {
      return
    }

    try {
      const content = await file.text()

      setCurrentDocument({
        fileName: file.name,
        content,
        isDirty: false,
      })
    } catch {
      setFileError('Unable to open this file.')
    }
  }

  useKeyboardShortcuts(
    {
      onNew: handleNewDocument,
      onOpen: handleOpenDocument,
      onSave: handleSaveDocument,
      onSaveAs: handleSaveAs,
    },
    !pendingAction,
  )

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100" data-theme={theme}>
      <Toolbar
        fileName={currentDocument.fileName}
        isDirty={currentDocument.isDirty}
        onNew={handleNewDocument}
        onOpen={handleOpenDocument}
        onSave={handleSaveDocument}
        onSaveAs={handleSaveAs}
        onToggleTheme={handleToggleTheme}
        onFormat={handleFormat}
        theme={theme}
      />
      <input ref={fileInputRef} type="file" accept=".md,.markdown" onChange={handleFileChange} className="hidden" />
      {fileError && (
        <p role="alert" className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {fileError}
        </p>
      )}
      <div className="border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900 md:hidden" role="group" aria-label="Visible pane">
        <div className="grid grid-cols-2 rounded-md bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            aria-pressed={activePane === 'editor'}
            onClick={() => setActivePane('editor')}
            className={`rounded px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
              activePane === 'editor'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            aria-pressed={activePane === 'preview'}
            onClick={() => setActivePane('preview')}
            className={`rounded px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
              activePane === 'preview'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Preview
          </button>
        </div>
      </div>
      <main className="grid min-h-0 flex-1 overflow-hidden md:grid-cols-2">
        <MarkdownEditor
          ref={editorRef}
          value={currentDocument.content}
          onChange={handleContentChange}
          theme={theme}
          isActive={activePane === 'editor'}
        />
        <MarkdownPreview markdown={currentDocument.content} theme={theme} isActive={activePane === 'preview'} />
      </main>
      <StatusBar content={currentDocument.content} />
      {pendingAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950/40 p-4" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="unsaved-changes-title"
            aria-describedby="unsaved-changes-description"
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <h2 id="unsaved-changes-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Unsaved changes
            </h2>
            <p id="unsaved-changes-description" className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {pendingAction === 'new'
                ? 'Creating a new document will discard your unsaved changes.'
                : 'Opening another document will discard your unsaved changes.'}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                ref={cancelButtonRef}
                onClick={() => setPendingAction(null)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                ref={discardButtonRef}
                onClick={handleDiscardChanges}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                Discard changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditorPage
