type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  void value
  void onChange

  return (
    <section
      aria-labelledby="editor-heading"
      className="min-w-0 border-r border-slate-200 bg-white p-6"
    >
      <h2 id="editor-heading" className="text-sm font-semibold text-slate-700">
        Editor
      </h2>
      <p className="mt-4 text-sm text-slate-500">Markdown editor placeholder</p>
    </section>
  )
}

export default MarkdownEditor
