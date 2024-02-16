import React from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

import * as S from './styles'

interface IMarkdownEditorProps {
  value?: string
  placeholder?: string
  handleEditorChange: ({ text }: { text: string }) => void
}

const MarkdownEditor = ({
  value,
  placeholder,
  handleEditorChange
}: IMarkdownEditorProps) => {
  return (
    <S.MarkdownEditor>
      <MdEditor
        value={value}
        placeholder={placeholder}
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
