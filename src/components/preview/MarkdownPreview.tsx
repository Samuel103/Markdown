import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

const alertTypes = ['note', 'tip', 'important', 'warning', 'caution'] as const

type AlertType = (typeof alertTypes)[number]

type MarkdownNode = {
  type?: string
  value?: string
  children?: MarkdownNode[]
  data?: {
    hProperties?: Record<string, string>
  }
}

const alertLabels: Record<AlertType, string> = {
  note: 'Note',
  tip: 'Astuce',
  important: 'Important',
  warning: 'Avertissement',
  caution: 'Attention',
}

const markdownSchema = {
  ...defaultSchema,
  tagNames: [...new Set([...(defaultSchema.tagNames ?? []), 'details', 'summary'])],
  attributes: {
    ...defaultSchema.attributes,
    details: [...(defaultSchema.attributes?.details ?? []), 'open'],
    blockquote: [...(defaultSchema.attributes?.blockquote ?? []), ['className', /^markdown-alert(?:-(?:note|tip|important|warning|caution))?$/]],
    code: [...(defaultSchema.attributes?.code ?? []), ['className', /^(?:language-|hljs$)/]],
    span: [...(defaultSchema.attributes?.span ?? []), ['className', /^(?:hljs|hljs-)/]],
  },
}

function remarkGithubAlerts() {
  return (tree: MarkdownNode) => {
    const visit = (node: MarkdownNode) => {
      if (node.type === 'blockquote') {
        const firstParagraph = node.children?.find((child) => child.type === 'paragraph')
        const firstText = firstParagraph?.children?.find((child) => child.type === 'text')
        const match = firstText?.value?.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/)

        if (match && firstText) {
          const alertType = match[1].toLowerCase() as AlertType
          firstText.value = firstText.value?.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/, '')
          node.data = {
            ...node.data,
            hProperties: {
              ...node.data?.hProperties,
              className: `markdown-alert markdown-alert-${alertType}`,
            },
          }
        }
      }

      node.children?.forEach(visit)
    }

    visit(tree)
  }
}

function getAlertType(className?: string) {
  return alertTypes.find((alertType) => className?.split(' ').includes(`markdown-alert-${alertType}`))
}

type MarkdownPreviewProps = {
  markdown: string
  theme: 'light' | 'dark'
  isActive: boolean
}

function MarkdownPreview({ markdown, theme, isActive }: MarkdownPreviewProps) {
  return (
    <section
      aria-labelledby="preview-heading"
      className={`${isActive ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-col bg-slate-50 p-4 dark:bg-slate-950 md:flex md:p-6`}
    >
      <h2 id="preview-heading" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Preview
      </h2>
      <div className="markdown-preview-content mt-4 min-h-0 min-w-0 overflow-y-auto pr-2" data-theme={theme}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkGithubAlerts]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, markdownSchema], rehypeHighlight]}
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
            blockquote: ({ node, className, children, ...props }) => {
              void node
              const alertType = getAlertType(className)

              if (alertType) {
                return (
                  <blockquote
                    className={`markdown-alert markdown-alert-${alertType} my-5 rounded-lg border-l-4 p-4 text-slate-700 dark:text-slate-200`}
                    role="note"
                    aria-label={alertLabels[alertType]}
                    {...props}
                  >
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide">{alertLabels[alertType]}</p>
                    {children}
                  </blockquote>
                )
              }

              return <blockquote className="my-5 border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-600 dark:text-slate-400" {...props} />
            },
            code: ({ node, ...props }) => {
              void node
              return <code className="font-mono text-[0.875em]" {...props} />
            },
            pre: ({ node, ...props }) => {
              void node
              return <pre className="my-5 max-w-full overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm leading-6 text-slate-100" {...props} />
            },
            table: ({ node, ...props }) => {
              void node
              return (
                <div className="my-5 max-w-full overflow-x-auto">
                  <table className="w-max min-w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300" {...props} />
                </div>
              )
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
            details: ({ node, ...props }) => {
              void node
              return <details className="my-5 rounded-lg border border-slate-200 bg-white p-4 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300" {...props} />
            },
            summary: ({ node, ...props }) => {
              void node
              return <summary className="cursor-pointer font-semibold text-slate-900 marker:text-slate-500 dark:text-slate-100" {...props} />
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
