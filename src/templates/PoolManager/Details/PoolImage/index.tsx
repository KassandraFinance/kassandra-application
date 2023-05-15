import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useRouter } from 'next/router'
import { keccak256 } from 'web3-utils'
import crypto from 'crypto'

import web3 from '@/utils/web3'

import usePoolInfo from '@/hooks/usePoolInfo'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_STRATEGY, SAVE_POOL } from './graphql'

import Button from '@/components/Button'

import defaultImage from '@assets/images/image-default.svg'

import * as S from './styles'

type GetStrategyType = {
  pool: {
    summary: string
  }
}

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

  const dispatch = useAppDispatch()
  const router = useRouter()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  const img = poolImage.icon?.image_preview ? poolImage.icon.image_preview : ''
  const hasPoolImage =
    img.length > 0 ? img : poolInfo?.logo ? poolInfo.logo : defaultImage

  async function sendPoolData(
    controller: string,
    logo: string,
    summary: string,
    chainId: number
  ) {
    try {
      const nonce = crypto.randomBytes(12).toString('base64')
      const logoToSign = logo ? keccak256(logo) : ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nsummary: ${summary}`
      const signature = await web3.eth.personal.sign(
        message,
        userWalletAddress,
        nonce
      )

      const body = {
        controller,
        logo,
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
          setPoolImage({
            icon: {
              image_preview: '',
              image_file: ''
            }
          })
          return
        }
      } else {
        dispatch(
          setModalAlertText({
            errorText: 'Could not save pool image',
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
        errorText: 'Could not save pool image',
        solutionText: 'Please try adding it later'
      })
    )
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

  const { data } = useSWR<GetStrategyType>(
    [GET_STRATEGY, poolId],
    (query, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: poolId
      })
  )

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
        <S.PoolSettingsName>
          <p>{poolInfo?.name}</p>
          <strong>{poolInfo?.symbol}</strong>
        </S.PoolSettingsName>
      </S.UploadImage>
      <S.ErrorParagraph>{errorMessage}</S.ErrorParagraph>

      {poolImage.icon.image_preview.length > 0 ? (
        <>
          {poolInfo?.controller && data?.pool && (
            <Button
              text="Upload image"
              backgroundSecondary
              onClick={() =>
                sendPoolData(
                  poolInfo?.controller,
                  poolImage.icon.image_preview,
                  data?.pool.summary,
                  poolInfo?.chain_id
                )
              }
            />
          )}

          <Button
            text="Cancel"
            backgroundBlack
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
