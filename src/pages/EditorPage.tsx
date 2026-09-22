import { useState } from 'react'
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

  function handleContentChange(content: string) {
    setCurrentDocument((document) => ({
      ...document,
      content,
      isDirty: true,
    }))
  }

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <Toolbar />
      <main className="grid min-h-0 flex-1 grid-cols-2">
        <MarkdownEditor value={currentDocument.content} onChange={handleContentChange} />
        <MarkdownPreview markdown={currentDocument.content} />
      </main>
    </div>
  )
}

export default EditorPage
