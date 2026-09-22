type ToolbarProps = {
  fileName: string
  isDirty: boolean
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
  onToggleTheme: () => void
  theme: 'light' | 'dark'
}

function Toolbar({ fileName, isDirty, onNew, onOpen, onSave, onSaveAs, onToggleTheme, theme }: ToolbarProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
      <h1 className="min-w-0 truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
        Markdown Editor <span aria-label={isDirty ? `${fileName}, unsaved changes` : fileName}>{fileName}{isDirty && <span aria-hidden="true">*</span>}</span>
      </h1>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onNew}
          aria-label="Create a new document"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
        >
          New
        </button>
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open a Markdown file"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
        >
          Open
        </button>
        <button
          type="button"
          onClick={onSave}
          aria-label="Save the current document"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onSaveAs}
          aria-label="Save the document with a new name"
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
        >
          Save As
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus:ring-offset-slate-900"
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </header>
  )
}

export default Toolbar
