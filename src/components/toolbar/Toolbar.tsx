type ToolbarProps = {
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
}

function Toolbar({ onNew, onOpen, onSave, onSaveAs }: ToolbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-slate-900">Markdown Editor</h1>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onNew}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          New
        </button>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Open
        </button>
        <button
          type="button"
          onClick={onSave}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onSaveAs}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Save As
        </button>
      </div>
    </header>
  )
}

export default Toolbar
