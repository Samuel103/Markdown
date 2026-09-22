type StatusBarProps = {
  content: string
}

function StatusBar({ content }: StatusBarProps) {
  const trimmedContent = content.trim()
  const wordCount = trimmedContent ? trimmedContent.split(/\s+/).length : 0
  const characterCount = content.length

  return (
    <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
      <span>{characterCount} {characterCount === 1 ? 'character' : 'characters'}</span>
      <span>Markdown</span>
    </footer>
  )
}

export default StatusBar
