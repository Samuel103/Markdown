import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import MarkdownEditor from '../components/editor/MarkdownEditor'
import MarkdownPreview from '../components/preview/MarkdownPreview'
import Toolbar from '../components/toolbar/Toolbar'
import type { MarkdownDocument } from '../types/document'

type Theme = 'light' | 'dark'

const themeStorageKey = 'markdown-editor-theme'

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
    setCurrentDocument({
      fileName: 'untitled.md',
      content: '',
      isDirty: false,
    })
    requestAnimationFrame(() => editorRef.current?.view?.focus())
  }

  function openDocument() {
    fileInputRef.current?.click()
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

  function handleSaveDocument(fileName = currentDocument.fileName) {
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

  function handleSaveAs() {
    const requestedFileName = window.prompt('Enter a file name', currentDocument.fileName)?.trim()

    if (!requestedFileName) {
      return
    }

    const fileName = requestedFileName.toLowerCase().endsWith('.md') ? requestedFileName : `${requestedFileName}.md`

    handleSaveDocument(fileName)
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(themeStorageKey, nextTheme)
      return nextTheme
    })
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files ?? []
    event.target.value = ''

    if (!file) {
      return
    }

    const content = await file.text()

    setCurrentDocument({
      fileName: file.name,
      content,
      isDirty: false,
    })
  }

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
        theme={theme}
      />
      <input ref={fileInputRef} type="file" accept=".md,.markdown" onChange={handleFileChange} className="hidden" />
      <main className="grid min-h-0 flex-1 grid-cols-2">
        <MarkdownEditor ref={editorRef} value={currentDocument.content} onChange={handleContentChange} theme={theme} />
        <MarkdownPreview markdown={currentDocument.content} theme={theme} />
      </main>
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
