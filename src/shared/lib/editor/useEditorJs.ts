import { EditorCore } from '@react-editor-js/core/src/editor-core'
import { enqueueSnackbar } from 'notistack'
import { useCallback, useMemo, useRef } from 'react'

import { INITIAL_BLOCK } from '@/shared/lib/editor/editor.config'

export const useEditorJs = ({
  content,
}: {
  content?: string | null
}) => {
  const editorCore = useRef<EditorCore>(null)

  const onInitialize = useCallback(
    (instance: EditorCore) => {
      editorCore.current = instance
    },
    [editorCore]
  )

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current?.save()

    if (!savedData) return

    return JSON.stringify(savedData)
  }, [editorCore])

  const defaultValue = useMemo(() => {
    try {
      return content ? JSON.parse(content) : INITIAL_BLOCK
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = error.message || 'Error while parsing content'

        enqueueSnackbar(errorMessage, { variant: 'error' })

        return INITIAL_BLOCK
      }
    }
  }, [content])

  return {
    defaultValue,
    onInitialize,
    editorCore: editorCore.current,
    handleSave,
  }
}