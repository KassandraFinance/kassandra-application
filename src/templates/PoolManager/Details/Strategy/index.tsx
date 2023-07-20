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

import TitleSection from '@/components/TitleSection'
import Button from '@/components/Button'

import investmentIcon from '@assets/iconGradient/featured.svg'
import editIcon from '@assets/utilities/edit-icon.svg'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

import * as S from './styles'

const Strategy = () => {
  const [value, setValue] = React.useState('')
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
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nsummary: ${summary}`
      const signature = await signMessage(message)

      mutate({ chainId, controller, signature: signature || '', summary })
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
  }, [data])

  React.useEffect(() => {
    if (isSuccess) {
      setIsEdit(false)
    }
  }, [isSuccess])

  return (
    <S.Strategy>
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
                backgroundSecondary
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
              backgroundBlack
              fullWidth
              onClick={handleCancelClick}
            />
          </S.ButtonContainer>
        </S.MarkdownEditor>
      )}
    </S.Strategy>
  )
}

export default Strategy
