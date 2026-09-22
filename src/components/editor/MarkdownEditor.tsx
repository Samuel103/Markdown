import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { forwardRef } from 'react'

type MarkdownEditorProps = {
  value: string
  onChange: (value: string) => void
  theme: 'light' | 'dark'
  isActive: boolean
}

const MarkdownEditor = forwardRef<ReactCodeMirrorRef, MarkdownEditorProps>(function MarkdownEditor(
  { value, onChange, theme, isActive },
  ref,
) {
  return (
    <section
      aria-labelledby="editor-heading"
      className={`${isActive ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-col bg-white p-4 dark:bg-slate-900 md:flex md:border-r md:border-slate-200 md:p-6 md:dark:border-slate-800`}
    >
      <h2 id="editor-heading" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Editor
      </h2>
      <CodeMirror
        ref={ref}
        value={value}
        height="100%"
        extensions={[markdown()]}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          autocompletion: false,
          searchKeymap: false,
          syntaxHighlighting: false,
        }}
        onChange={onChange}
        className="markdown-editor mt-4 min-h-0 flex-1"
        data-theme={theme}
      />
    </section>
  )
})

export default MarkdownEditor
