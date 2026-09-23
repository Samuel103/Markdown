export type FormattingAction =
  | 'heading'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'link'
  | 'image'
  | 'blockquote'
  | 'inlineCode'
  | 'codeBlock'
  | 'bulletList'
  | 'numberedList'
  | 'taskList'
  | 'horizontalRule'
  | 'table'

const formattingActions: { action: FormattingAction; label: string; text: string }[] = [
  { action: 'heading', label: 'Insert heading', text: 'Heading' },
  { action: 'bold', label: 'Bold selected text', text: 'Bold' },
  { action: 'italic', label: 'Italicize selected text', text: 'Italic' },
  { action: 'strikethrough', label: 'Strikethrough selected text', text: 'Strike' },
  { action: 'link', label: 'Insert link', text: 'Link' },
  { action: 'image', label: 'Insert image', text: 'Image' },
  { action: 'blockquote', label: 'Insert blockquote', text: 'Quote' },
  { action: 'inlineCode', label: 'Format as inline code', text: 'Inline code' },
  { action: 'codeBlock', label: 'Insert code block', text: 'Code block' },
  { action: 'bulletList', label: 'Insert bulleted list', text: 'Bullets' },
  { action: 'numberedList', label: 'Insert numbered list', text: 'Numbered' },
  { action: 'taskList', label: 'Insert task list', text: 'Tasks' },
  { action: 'horizontalRule', label: 'Insert horizontal rule', text: 'Rule' },
  { action: 'table', label: 'Insert table', text: 'Table' },
]

type ToolbarProps = {
  fileName: string
  isDirty: boolean
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
  onToggleTheme: () => void
  onFormat: (action: FormattingAction) => void
  theme: 'light' | 'dark'
}

function Toolbar({ fileName, isDirty, onNew, onOpen, onSave, onSaveAs, onToggleTheme, onFormat, theme }: ToolbarProps) {
  return (
    <header className="grid gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-6 md:py-4">
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
      <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-3 dark:border-slate-800 md:col-span-2" role="group" aria-label="Markdown formatting">
        {formattingActions.map(({ action, label, text }) => (
          <button
            key={action}
            type="button"
            onClick={() => onFormat(action)}
            aria-label={label}
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900"
          >
            {text}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Toolbar
