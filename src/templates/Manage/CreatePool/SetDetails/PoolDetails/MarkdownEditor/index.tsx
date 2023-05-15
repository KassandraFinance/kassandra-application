import React from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'

import { useAppSelector } from '../../../../../../store/hooks'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

import * as S from './styles'

interface IMarkdownEditorProps {
  // eslint-disable-next-line prettier/prettier
  handleEditorChange: ({ text }: { text: string }) => void
}

const MarkdownEditor = ({ handleEditorChange }: IMarkdownEditorProps) => {
  const strategyText = useAppSelector(
    state => state.poolCreation.createPoolData.strategy
  )

  return (
    <S.MarkdownEditor>
      <MdEditor
        value={strategyText}
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
