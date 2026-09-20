import ReactMarkdown from 'react-markdown'

type MarkdownPreviewProps = {
  markdown: string
}

function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <section aria-labelledby="preview-heading" className="min-w-0 bg-slate-50 p-6">
      <h2 id="preview-heading" className="text-sm font-semibold text-slate-700">
        Preview
      </h2>
      <div className="mt-4">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </section>
  )
}

export default MarkdownPreview
