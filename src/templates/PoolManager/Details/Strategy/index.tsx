import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { useConnectWallet } from '@web3-onboard/react'
import useSignMessage from '@/hooks/useSignMessage'

import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { usePoolStrategy } from '@/hooks/query/usePoolStrategy'
import { useSavePool } from '@/hooks/query/useSavePool'

import Button from '@/components/Button'
import TitleSection from '@/components/TitleSection'
import TextareaWithValueCounter from '@/components/TextareaWithValueCounter'

import investmentIcon from '@assets/iconGradient/featured.svg'
import detailsIcon from '@assets/iconGradient/details.svg'
import editIcon from '@assets/utilities/edit-icon.svg'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

import * as S from './styles'

const Strategy = () => {
  const [value, setValue] = React.useState('')
  const [shortSummary, setShortSummary] = React.useState('')
  const [isEdit, setIsEdit] = React.useState(true)

  const { signMessage } = useSignMessage()
  const [{ wallet }] = useConnectWallet()
  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  function handleEditorChange({ text }: { text: string }) {
    setValue(text)
  }

  function handleSummaryOnChange(text: string) {
    setShortSummary(text)
  }

  function handleEditClick() {
    setValue(data?.summary || '')
    setIsEdit(true)
  }

  function handleCancelClick() {
    setIsEdit(false)
    setValue('')
  }

  const { data } = usePoolStrategy({ id: poolId })

  const { mutate, isSuccess } = useSavePool({ id: poolId })

  async function sendPoolData(
    controller: string,
    logo: string,
    summary: string,
    chainId: number
  ) {
    if (!wallet) return

    try {
      const logoToSign = ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nshortSummary: ${shortSummary}\nsummary: ${summary}`
      const signature = await signMessage(message)

      mutate({
        chainId,
        controller,
        signature: signature || '',
        shortSummary,
        summary
      })
    } catch (error) {
      console.error(error)
    }
  }

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  React.useEffect(() => {
    if (!data?.summary) return
    setValue(data.summary)
    setShortSummary(data?.short_summary ?? '')
  }, [data])

  React.useEffect(() => {
    if (isSuccess) {
      setIsEdit(false)
    }
  }, [isSuccess])

  return (
    <S.Strategy>
      <S.ShortDescription>
        <S.TitleWrapper>
          <TitleSection title="Short Description" image={detailsIcon} />

          <S.ButtonEdit onClick={handleEditClick}>
            <Image src={editIcon} />
          </S.ButtonEdit>
        </S.TitleWrapper>
        {!isEdit ? (
          <S.ShortDescriptionParagraph>
            {data?.short_summary || ''}
          </S.ShortDescriptionParagraph>
        ) : (
          <S.InputCountWrapper>
            <TextareaWithValueCounter
              name="shortSummary"
              type="text"
              placeholder="Enter a Brief Description"
              required
              value={shortSummary}
              minLength={0}
              maxLength={150}
              label=""
              onChange={e => handleSummaryOnChange(e.target.value)}
            />
          </S.InputCountWrapper>
        )}
      </S.ShortDescription>

      <S.InvestmentStrategy>
        <S.TitleWrapper>
          <TitleSection title="Investment Strategy" image={investmentIcon} />

          <S.ButtonEdit onClick={handleEditClick}>
            <Image src={editIcon} />
          </S.ButtonEdit>
        </S.TitleWrapper>

        {!isEdit ? (
          <S.Text>
            <ReactMarkdown skipHtml={true} linkTarget={'_blank'}>
              {data?.summary || ''}
            </ReactMarkdown>
          </S.Text>
        ) : (
          <S.MarkdownEditor>
            <MdEditor
              value={value}
              renderHTML={text => (
                <S.Text>
                  <ReactMarkdown skipHtml={true} linkTarget={'_blank'}>
                    {text}
                  </ReactMarkdown>
                </S.Text>
              )}
              onChange={handleEditorChange}
            />

            <S.ButtonContainer>
              {poolInfo && poolInfo[0]?.controller && (
                <Button
                  text="Update"
                  background="secondary"
                  fullWidth
                  onClick={() =>
                    sendPoolData(
                      poolInfo[0]?.controller,
                      poolInfo[0]?.logo || '',
                      value,
                      poolInfo[0].chain_id
                    )
                  }
                />
              )}

              <Button
                text="Cancel"
                background="black"
                fullWidth
                onClick={handleCancelClick}
              />
            </S.ButtonContainer>
          </S.MarkdownEditor>
        )}
      </S.InvestmentStrategy>
    </S.Strategy>
  )
}

export default Strategy
