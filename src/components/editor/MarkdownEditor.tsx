import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'

type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <section
      aria-labelledby="editor-heading"
      className="flex min-h-0 min-w-0 flex-col border-r border-slate-200 bg-white p-6"
    >
      <h2 id="editor-heading" className="text-sm font-semibold text-slate-700">
        Editor
      </h2>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[markdown()]}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          autocompletion: false,
          searchKeymap: false,
        }}
        onChange={onChange}
        className="markdown-editor mt-4 min-h-0 flex-1"
      />
    </section>
  )
}

export default MarkdownEditor
