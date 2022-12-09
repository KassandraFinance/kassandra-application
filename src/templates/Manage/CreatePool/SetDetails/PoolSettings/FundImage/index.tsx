import React from 'react'
import Image from 'next/image'

import { IPoolImageProps } from '..'

import defaultImage from '../../../../../../../public/assets/images/image-default.svg'

import * as S from './styles'

interface IFoundImageProps {
  uploadPoolImage: IPoolImageProps;
  setuploadPoolImage: React.Dispatch<React.SetStateAction<IPoolImageProps>>;
  poolName: string;
  poolSymbol: string;
  poolImage?: string;
}

const FundImage = ({
  uploadPoolImage,
  setuploadPoolImage,
  poolName,
  poolSymbol,
  poolImage
}: IFoundImageProps) => {
  // eslint-disable-next-line prettier/prettier
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const hasPoolImage = poolImage ? poolImage : defaultImage

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

    setuploadPoolImage({
      image_preview: image_as_base64,
      image_file: image_as_files
    })
  }

  return (
    <S.FundImage>
      <S.PoolSettingTitle>Fund image</S.PoolSettingTitle>
      <S.PoolSettingParagraph>
        Select an image as icon for your pool.
      </S.PoolSettingParagraph>

      <S.UploadImage>
        <Image
          src={
            uploadPoolImage?.image_preview
              ? uploadPoolImage?.image_preview
              : hasPoolImage
          }
          alt=""
          width={56}
          height={56}
        />

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
          <p>{poolName}</p>
          <strong>{poolSymbol}</strong>
        </S.PoolSettingsName>
      </S.UploadImage>
      <S.ErrorParagraph>{errorMessage}</S.ErrorParagraph>
      <S.Label htmlFor="InputFile">Upload image</S.Label>
    </S.FundImage>
  )
}

export default FundImage
