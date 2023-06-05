import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import crypto from 'crypto'
import { useConnectWallet } from '@web3-onboard/react'
import web3 from '@/utils/web3'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_STRATEGY, SAVE_POOL } from './graphql'
import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import usePoolInfo from '@/hooks/usePoolInfo'

import TitleSection from '@/components/TitleSection'
import Button from '@/components/Button'

import investmentIcon from '@assets/iconGradient/featured.svg'
import editIcon from '@assets/utilities/edit-icon.svg'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

type GetStrategyType = {
  pool: {
    summary: string
  }
}

import * as S from './styles'

const Strategy = () => {
  const [value, setValue] = React.useState('')
  const [isEdit, setIsEdit] = React.useState(true)

  const [{ wallet }] = useConnectWallet()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''
  // const poolId = '0x38918142779e2CD1189cBd9e932723C968363D1E'

  function handleEditorChange({ text }: { text: string }) {
    setValue(text)
  }

  function handleEditClick() {
    setValue(data?.pool?.summary || '')
    setIsEdit(true)
  }

  function handleCancelClick() {
    setIsEdit(false)
    setValue('')
  }

  async function sendPoolData(
    controller: string,
    logo: string,
    summary: string,
    chainId: number
  ) {
    if (!wallet) return

    try {
      const nonce = crypto.randomBytes(12).toString('base64')
      const logoToSign = ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nsummary: ${summary}`
      const signature = await web3.eth.personal.sign(
        message,
        wallet.accounts[0].address,
        nonce
      )

      const body = {
        controller,
        summary,
        chainId,
        signature
      }

      const response = await fetch(BACKEND_KASSANDRA, {
        body: JSON.stringify({
          query: SAVE_POOL,
          variables: body
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST'
      })

      if (response.status === 200) {
        const { data } = await response.json()
        if (data?.savePool?.ok) {
          setIsEdit(false)
          return
        }
      } else {
        dispatch(
          setModalAlertText({
            errorText: 'Could not save investment strategy',
            solutionText: 'Please try adding it later'
          })
        )
        return
      }
    } catch (error) {
      console.error(error)
    }

    dispatch(
      setModalAlertText({
        errorText: 'Could not save investment strategy',
        solutionText: 'Please try adding it later'
      })
    )
  }

  const { poolInfo } = usePoolInfo(wallet, poolId)

  const { data } = useSWR<GetStrategyType>(
    [GET_STRATEGY, poolId],
    (query, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: poolId
      })
  )

  React.useEffect(() => {
    if (!data?.pool?.summary) return
    setValue(data.pool.summary)
  }, [data])

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
            {data?.pool?.summary || ''}
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
            {poolInfo?.controller && (
              <Button
                text="Update"
                backgroundSecondary
                fullWidth
                onClick={() =>
                  sendPoolData(
                    poolInfo?.controller,
                    poolInfo.logo,
                    value,
                    poolInfo.chain_id
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
