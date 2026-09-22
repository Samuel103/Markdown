type ToolbarProps = {
  fileName: string
  isDirty: boolean
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
  onToggleTheme: () => void
}

function Toolbar({ fileName, isDirty, onNew, onOpen, onSave, onSaveAs, onToggleTheme }: ToolbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-slate-900">
        Markdown Editor <span aria-label={isDirty ? `${fileName}, unsaved changes` : fileName}>{fileName}{isDirty && <span aria-hidden="true">*</span>}</span>
      </h1>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onNew}
          aria-label="Create a new document"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          New
        </button>
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open a Markdown file"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Open
        </button>
        <button
          type="button"
          onClick={onSave}
          aria-label="Save the current document"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onSaveAs}
          aria-label="Save the document with a new name"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Save As
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Toggle Theme
        </button>
      </div>
    </header>
  )
}

export default Toolbar
