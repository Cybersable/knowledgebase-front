import { EditorContent as Content } from '@mobtakr/editorjs-parser'

import EditorErrorEnqueue from '@/shared/lib/editor/EditorErrorEnqueue'

export default function EditorContent ({
  content,
}: {
  content?: string | null
}) {
  if (!content) return null

  try {
    const data = JSON.parse(content)

    return (<Content blocks={data.blocks} />)
  } catch (error: unknown) {
    console.error(error)

    return <EditorErrorEnqueue message={'Cannot display article content.'} />
  }
}