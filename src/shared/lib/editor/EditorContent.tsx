import { EditorContent as Content } from '@mobtakr/editorjs-parser'

export default function EditorContent ({
  content,
}: {
  content?: string | null
}) {
  if (!content) return null

  const data = JSON.parse(content)

  return (<Content blocks={data.blocks} />)
}