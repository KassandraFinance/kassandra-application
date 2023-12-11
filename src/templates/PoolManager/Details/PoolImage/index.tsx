import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { keccak256, toUtf8Bytes } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import useSignMessage from '@/hooks/useSignMessage'

import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { useSavePool } from '@/hooks/query/useSavePool'
import { usePoolStrategy } from '@/hooks/query/usePoolStrategy'

import Button from '@/components/Button'

import defaultImage from '@assets/images/image-default.svg'

import * as S from './styles'

const PoolImage = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [poolImage, setPoolImage] = React.useState<{
    icon: {
      image_preview: string
      image_file: unknown
    }
  }>({
    icon: {
      image_preview: '',
      image_file: ''
    }
  })

  const [{ wallet }] = useConnectWallet()
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { mutate, isSuccess } = useSavePool({
    id: poolId,
    user: wallet?.accounts[0].address
  })

  const { signMessage } = useSignMessage()

  const { data } = usePoolStrategy({ id: poolId })

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const img = poolImage.icon?.image_preview ? poolImage.icon.image_preview : ''
  const hasPoolImage =
    img.length > 0
      ? img
      : poolInfo && poolInfo[0]?.logo
      ? poolInfo[0].logo
      : defaultImage

  async function sendPoolData(
    controller: string,
    logo: string,
    summary: string,
    shortSummary: string,
    chainId: number
  ) {
    if (!wallet) return

    try {
      const logoToSign = logo ? keccak256(toUtf8Bytes(logo)) : ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nshortSummary: ${shortSummary}\nsummary: ${summary}`
      const signature = await signMessage(message)

      mutate({ chainId, controller, signature: signature || '', summary, logo })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleImagePreview(event: FileList) {
    if (!event[0]) {
      return
    }

    if (event[0] && event[0].size > 63000) {
      setErrorMessage('Image is too big (MAX: 60KB)')
      return
    }

    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']

    if (allowedFileTypes.indexOf(event[0].type) === -1) {
      setErrorMessage('Extension not supported (only JPEG/PNG/GIF)')
      return
    }
    setErrorMessage('')

    const buffer = await event[0].arrayBuffer()
    const image_as_base64 = `data:${event[0].type};base64,${Buffer.from(
      buffer
    ).toString('base64')}`
    const image_as_files = event[0]

    setPoolImage({
      icon: {
        image_preview: image_as_base64,
        image_file: image_as_files
      }
    })
  }

  React.useEffect(() => {
    if (isSuccess) {
      setPoolImage({
        icon: {
          image_preview: '',
          image_file: ''
        }
      })
    }
  }, [isSuccess])

  return (
    <S.PoolImage>
      <S.PoolSettingTitle>Pool image</S.PoolSettingTitle>
      <S.PoolSettingParagraph>
        Select an image as icon for your pool.
      </S.PoolSettingParagraph>

      <S.UploadImage>
        <Image src={hasPoolImage} alt="" width={56} height={56} />

        <input
          form="poolCreationForm"
          id="InputFile"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={event => {
            if (event.target.files !== null) {
              handleImagePreview(event.target.files)
            }
          }}
        />
        {poolInfo && (
          <S.PoolSettingsName>
            <p>{poolInfo[0]?.name}</p>
            <strong>{poolInfo[0]?.symbol}</strong>
          </S.PoolSettingsName>
        )}
      </S.UploadImage>
      <S.ErrorParagraph>{errorMessage}</S.ErrorParagraph>

      {poolImage.icon.image_preview.length > 0 ? (
        <>
          {poolInfo && poolInfo[0]?.controller && data && (
            <Button
              text="Upload image"
              background="secondary"
              onClick={() =>
                sendPoolData(
                  poolInfo[0]?.controller,
                  poolImage.icon.image_preview,
                  data?.summary || '',
                  data.short_summary ?? '',
                  poolInfo[0]?.chain_id
                )
              }
            />
          )}

          <Button
            text="Cancel"
            background="black"
            onClick={() =>
              setPoolImage({
                icon: {
                  image_preview: '',
                  image_file: ''
                }
              })
            }
          />
        </>
      ) : (
        <S.Label htmlFor="InputFile">Change image</S.Label>
      )}
    </S.PoolImage>
  )
}

export default PoolImage
