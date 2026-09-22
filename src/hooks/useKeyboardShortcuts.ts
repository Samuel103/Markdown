import { useEffect } from 'react'

type KeyboardShortcutActions = {
  onNew: () => void
  onOpen: () => void
  onSave: () => void
  onSaveAs: () => void
}

function useKeyboardShortcuts({ onNew, onOpen, onSave, onSaveAs }: KeyboardShortcutActions, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey) {
        return
      }

      switch (event.key.toLowerCase()) {
        case 'n':
          event.preventDefault()
          onNew()
          break
        case 'o':
          event.preventDefault()
          onOpen()
          break
        case 's':
          event.preventDefault()

          if (event.shiftKey) {
            onSaveAs()
          } else {
            onSave()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enabled, onNew, onOpen, onSave, onSaveAs])
}

export default useKeyboardShortcuts
