'use client'

import { MutableRefObject, useEffect } from 'react'
import { createReactEditorJS } from 'react-editor-js'

import { EDITOR_CONFIG } from '@/shared/lib/editor/editor.config'
import { EditorContainer } from '@/shared/lib/editor/styled'
import { useEditorJs } from '@/shared/lib/editor/useEditorJs'

export default function Editor({
  id,
  content,
  submitHandler,
}: {
  id: string
  content?: string | null
  submitHandler?: MutableRefObject<
    { preSubmit: () => Promise<string | undefined> } | null
  >
}) {
  const ReactEditorJS = createReactEditorJS()
  const { defaultValue, onInitialize, handleSave } = useEditorJs({ content })

  useEffect(() => {
    if (submitHandler) {
      submitHandler.current = {
        preSubmit: handleSave,
      }
    }
  }, [handleSave, submitHandler])

  return (
    <EditorContainer id={`${id}-editor-container`}>
      <ReactEditorJS
        holder={id}
        defaultValue={defaultValue}
        onInitialize={onInitialize}
        tools={EDITOR_CONFIG}
        minHeight={0}
      />
    </EditorContainer>
  )
}