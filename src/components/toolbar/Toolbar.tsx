type ToolbarProps = {
  onNew: () => void
}

function Toolbar({ onNew }: ToolbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-slate-900">Markdown Editor</h1>
      <button
        type="button"
        onClick={onNew}
        className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        New
      </button>
    </header>
  )
}

export default Toolbar
