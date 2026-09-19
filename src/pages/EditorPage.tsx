import MarkdownEditor from '../components/editor/MarkdownEditor'
import MarkdownPreview from '../components/preview/MarkdownPreview'
import Toolbar from '../components/toolbar/Toolbar'

function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Toolbar />
      <main className="grid min-h-0 flex-1 grid-cols-2">
        <MarkdownEditor />
        <MarkdownPreview />
      </main>
    </div>
  )
}

export default EditorPage
