import { useState } from 'react'
import MarkdownEditor from '../components/editor/MarkdownEditor'
import MarkdownPreview from '../components/preview/MarkdownPreview'
import Toolbar from '../components/toolbar/Toolbar'

function EditorPage() {
  const [markdown, setMarkdown] = useState('# Bonjour')

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <Toolbar />
      <main className="grid min-h-0 flex-1 grid-cols-2">
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
        <MarkdownPreview markdown={markdown} />
      </main>
    </div>
  )
}

export default EditorPage
