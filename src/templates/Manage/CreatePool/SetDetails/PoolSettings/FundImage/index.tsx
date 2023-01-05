import React from 'react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../../../../../../store/hooks'
import { setPoolData } from '../../../../../../store/reducers/poolCreationSlice'
import defaultImage from '../../../../../../../public/assets/images/image-default.svg'

import * as S from './styles'

const FundImage = () => {
  const dispatch = useAppDispatch()
  const details = useAppSelector(state => state.poolCreation.createPoolData)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const img = details.icon?.image_preview ? details.icon.image_preview : ''
  const hasPoolImage = img.length > 0 ? img : defaultImage

  function handleImagePreview(event: FileList) {
    if (!event[0]) {
      return
    }

    if (event[0] && event[0].size > 300000) {
      setErrorMessage('Image is too big (MAX: 300KB)')
      return
    }

    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif']

    if (allowedFileTypes.indexOf(event[0].type) === -1) {
      setErrorMessage('Extension not supported (only JPEG/PNG/GIF)')
      return
    }
    setErrorMessage('')

    const image_as_base64 = URL.createObjectURL(event[0])
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
    <S.FundImage>
      <S.PoolSettingTitle>Fund image</S.PoolSettingTitle>
      <S.PoolSettingParagraph>
        Select an image as icon for your pool.
      </S.PoolSettingParagraph>

      <S.UploadImage>
        <Image src={hasPoolImage} alt="" width={56} height={56} />

        <input
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
    </S.FundImage>
  )
}

export default FundImage
