import React from 'react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../../../../../../store/hooks'
import { setPoolData } from '../../../../../../store/reducers/poolCreationSlice'
import defaultImage from '../../../../../../../public/assets/images/image-default.svg'

import * as S from './styles'

const PoolImage = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const dispatch = useAppDispatch()
  const details = useAppSelector(state => state.poolCreation.createPoolData)

  const img = details.icon?.image_preview ? details.icon.image_preview : ''
  const hasPoolImage = img.length > 0 ? img : defaultImage

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

    dispatch(
      setPoolData({
        icon: {
          image_preview: image_as_base64,
          image_file: image_as_files
        }
      })
    )
  }

  return (
    <S.PoolImage>
      <S.PoolSettingTitle>Portfolio image</S.PoolSettingTitle>
      <S.PoolSettingParagraph>
        Select an image as icon for your portfolio.
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
          <p>{details.poolName}</p>
          <strong>{details.poolSymbol}</strong>
        </S.PoolSettingsName>
      </S.UploadImage>
      <S.ErrorParagraph>{errorMessage}</S.ErrorParagraph>
      <S.Label htmlFor="InputFile">Upload image</S.Label>
    </S.PoolImage>
  )
}

export default PoolImage
