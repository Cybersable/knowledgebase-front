import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import { OutputData } from '@editorjs/editorjs'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'

export const EDITOR_CONFIG = {
  paragraph: Paragraph,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  list: List,
  embed: Embed,
  table: Table,
  warning: Warning,
  code: Code,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  linkTool: LinkTool,
}

export const INITIAL_BLOCK: OutputData = {
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: '',
      },
    },
  ],
}