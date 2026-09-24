import { type FormEvent, useEffect, useState } from 'react'
import { requestOllamaEdit } from '../../lib/ollama'

type AssistantStatus = 'ready' | 'generating' | 'proposal' | 'error'

type OllamaProposal = {
  markdown: string
  sourceMarkdown: string
}

type OllamaAssistantProps = {
  markdown: string
  onApply: (markdown: string) => void
  isActive: boolean
}

const serverUrlStorageKey = 'markdown-editor-ollama-url'
const modelStorageKey = 'markdown-editor-ollama-model'
const defaultServerUrl = 'http://127.0.0.1:11434'
const defaultModel = 'llama3.2'

function getStoredValue(key: string, fallback: string) {
  try {
    return window.localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function storeValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // The assistant remains usable when storage is unavailable.
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Ollama could not complete the request.'
}

function OllamaAssistant({ markdown, onApply, isActive }: OllamaAssistantProps) {
  const [serverUrl, setServerUrl] = useState(() => getStoredValue(serverUrlStorageKey, defaultServerUrl))
  const [model, setModel] = useState(() => getStoredValue(modelStorageKey, defaultModel))
  const [instruction, setInstruction] = useState('')
  const [status, setStatus] = useState<AssistantStatus>('ready')
  const [proposal, setProposal] = useState<OllamaProposal | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    storeValue(serverUrlStorageKey, serverUrl)
  }, [serverUrl])

  useEffect(() => {
    storeValue(modelStorageKey, model)
  }, [model])

  const isGenerating = status === 'generating'
  const isProposalStale = proposal !== null && proposal.sourceMarkdown !== markdown

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isGenerating) {
      return
    }

    const sourceMarkdown = markdown

    setStatus('generating')
    setError(null)
    setProposal(null)

    try {
      const revisedMarkdown = await requestOllamaEdit({
        serverUrl,
        model,
        instruction,
        markdown: sourceMarkdown,
      })

      setProposal({ markdown: revisedMarkdown, sourceMarkdown })
      setStatus('proposal')
    } catch (requestError) {
      setError(getErrorMessage(requestError))
      setStatus('error')
    }
  }

  function handleApply() {
    if (!proposal) {
      return
    }

    if (proposal.sourceMarkdown !== markdown) {
      setError('The document changed while Ollama was working. Discard this proposal and ask again.')
      setStatus('error')
      return
    }

    onApply(proposal.markdown)
    setInstruction('')
    setProposal(null)
    setError(null)
    setStatus('ready')
  }

  function handleDiscard() {
    setProposal(null)
    setError(null)
    setStatus('ready')
  }

  return (
    <section
      aria-labelledby="ollama-assistant-heading"
      className={`${isActive ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-col overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950 md:p-6`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="ollama-assistant-heading" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Local AI assistant
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
            {status === 'generating' && 'Generating a revised document…'}
            {status === 'proposal' && 'Proposal ready for review'}
            {status === 'error' && 'Request failed'}
            {status === 'ready' && 'Ready'}
          </p>
        </div>

        <details className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          <summary className="w-fit cursor-pointer font-medium hover:text-slate-900 dark:hover:text-slate-100">
            Connection settings
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-xs font-medium">Ollama server</span>
              <input
                type="url"
                value={serverUrl}
                onChange={(event) => setServerUrl(event.target.value)}
                disabled={isGenerating}
                placeholder={defaultServerUrl}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs font-medium">Model</span>
              <input
                type="text"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                disabled={isGenerating}
                placeholder={defaultModel}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
          </div>
        </details>

        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="grid min-w-0 flex-1 gap-1">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Instruction</span>
            <textarea
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
              disabled={isGenerating}
              rows={2}
              placeholder="For example: Add a Summary section"
              className="resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <button
            type="submit"
            disabled={isGenerating || !instruction.trim()}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-offset-slate-950"
          >
            {isGenerating ? 'Asking Ollama…' : 'Ask Ollama'}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {error}
          </p>
        )}

        {proposal && (
          <div className="mt-3 rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Complete proposed document</span>
              <textarea
                readOnly
                value={proposal.markdown}
                rows={8}
                className="max-h-64 resize-y rounded-md border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              />
            </label>
            {isProposalStale && (
              <p role="alert" className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                The document changed after this request. Discard the proposal and ask again.
              </p>
            )}
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={handleDiscard}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-900"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={isProposalStale}
                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-offset-slate-900"
              >
                Apply proposal
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default OllamaAssistant
