import dynamic from 'next/dynamic'
import React from 'react'
import 'react-markdown-editor-lite/lib/index.css'
import ReactMarkdown from 'react-markdown'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

import * as S from './styles'

interface IMarkdownEditorProps {
  // eslint-disable-next-line prettier/prettier
  handleEditorChange: ({ text }: {
    text: string;
}) => void
}

const MarkdownEditor = ({handleEditorChange}: IMarkdownEditorProps) => {
  return (
    <S.MarkdownEditor>
      <MdEditor
        renderHTML={text => (
          <ReactMarkdown skipHtml={true} linkTarget={'_blank'}>
            {text}
          </ReactMarkdown>
        )}
        onChange={handleEditorChange}
      />
    </S.MarkdownEditor>
  )
}

export default MarkdownEditor
