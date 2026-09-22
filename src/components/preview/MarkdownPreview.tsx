import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownPreviewProps = {
  markdown: string
  theme: 'light' | 'dark'
}

function MarkdownPreview({ markdown, theme }: MarkdownPreviewProps) {
  return (
    <section
      aria-labelledby="preview-heading"
      className="flex min-h-0 min-w-0 flex-col bg-slate-50 p-6 dark:bg-slate-950"
    >
      <h2 id="preview-heading" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Preview
      </h2>
      <div className="markdown-preview-content mt-4 min-h-0 overflow-y-auto pr-2" data-theme={theme}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => {
              void node
              return <h1 className="mb-6 border-b border-slate-200 pb-3 text-3xl font-bold tracking-tight text-slate-900 dark:border-slate-700 dark:text-slate-100" {...props} />
            },
            h2: ({ node, ...props }) => {
              void node
              return <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-slate-900 first:mt-0 dark:text-slate-100" {...props} />
            },
            h3: ({ node, ...props }) => {
              void node
              return <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-800 dark:text-slate-200" {...props} />
            },
            p: ({ node, ...props }) => {
              void node
              return <p className="my-4 leading-7 text-slate-700 dark:text-slate-300" {...props} />
            },
            ul: ({ node, ...props }) => {
              void node
              return <ul className="my-4 list-disc space-y-1 pl-6 text-slate-700 dark:text-slate-300" {...props} />
            },
            ol: ({ node, ...props }) => {
              void node
              return <ol className="my-4 list-decimal space-y-1 pl-6 text-slate-700 dark:text-slate-300" {...props} />
            },
            blockquote: ({ node, ...props }) => {
              void node
              return <blockquote className="my-5 border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-600 dark:text-slate-400" {...props} />
            },
            code: ({ node, ...props }) => {
              void node
              return <code className="font-mono text-[0.875em]" {...props} />
            },
            pre: ({ node, ...props }) => {
              void node
              return <pre className="my-5 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-6 text-slate-100" {...props} />
            },
            table: ({ node, ...props }) => {
              void node
              return <table className="my-5 w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300" {...props} />
            },
            thead: ({ node, ...props }) => {
              void node
              return <thead className="border-b-2 border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" {...props} />
            },
            th: ({ node, ...props }) => {
              void node
              return <th className="px-3 py-2 font-semibold" {...props} />
            },
            td: ({ node, ...props }) => {
              void node
              return <td className="border-b border-slate-200 px-3 py-2 align-top dark:border-slate-800" {...props} />
            },
            a: ({ node, ...props }) => {
              void node
              return <a className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-900 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300" {...props} />
            },
            hr: ({ node, ...props }) => {
              void node
              return <hr className="my-8 border-slate-300 dark:border-slate-600" {...props} />
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </section>
  )
}

export default MarkdownPreview
