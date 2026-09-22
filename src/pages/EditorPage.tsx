import { type ChangeEvent, useRef, useState } from 'react'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import MarkdownEditor from '../components/editor/MarkdownEditor'
import MarkdownPreview from '../components/preview/MarkdownPreview'
import Toolbar from '../components/toolbar/Toolbar'
import type { MarkdownDocument } from '../types/document'

function EditorPage() {
  const [currentDocument, setCurrentDocument] = useState<MarkdownDocument>({
    fileName: 'untitled.md',
    content: '# Bonjour',
    isDirty: false,
  })
  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleContentChange(content: string) {
    setCurrentDocument((document) => ({
      ...document,
      content,
      isDirty: true,
    }))
  }

  function handleNewDocument() {
    setCurrentDocument({
      fileName: 'untitled.md',
      content: '',
      isDirty: false,
    })
    requestAnimationFrame(() => editorRef.current?.view?.focus())
  }

  function handleOpenDocument() {
    fileInputRef.current?.click()
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
    <div className="flex h-screen flex-col bg-slate-100">
      <Toolbar onNew={handleNewDocument} onOpen={handleOpenDocument} />
      <input ref={fileInputRef} type="file" accept=".md,.markdown" onChange={handleFileChange} className="hidden" />
      <main className="grid min-h-0 flex-1 grid-cols-2">
        <MarkdownEditor ref={editorRef} value={currentDocument.content} onChange={handleContentChange} />
        <MarkdownPreview markdown={currentDocument.content} />
      </main>
    </div>
  )
}

export default EditorPage
