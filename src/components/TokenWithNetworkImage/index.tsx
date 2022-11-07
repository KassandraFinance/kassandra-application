import React from 'react'

import avax from '../../../public/assets/logos/avax.png'

import * as S from './styles'

interface ITokenWithNetworkImage {
  tokenImage: {
    url: string,
    width?: number,
    height?: number,
    withoutBorder?: boolean
  };
  networkImage?: {
    url?: string,
    width?: number,
    height?: number,
    withoutBorder?: boolean
  };
}

const TokenWithNetworkImage = ({
  tokenImage,
  networkImage = {
    url: avax.src,
    height: 20,
    width: 20
  }
}: ITokenWithNetworkImage) => {
  return (
    <S.TokenWithNetworkImage withoutBorder={tokenImage.withoutBorder}>
      <img
        src={tokenImage.url}
        alt="token image"
        width={tokenImage.width}
        height={tokenImage.height}
      />
      <S.networkImageContainer withoutBorder={networkImage.withoutBorder}>
        <img
          src={networkImage?.url}
          alt="network image"
          width={networkImage?.width}
          height={networkImage?.height}
        />
      </S.networkImageContainer>
    </S.TokenWithNetworkImage>
  )
}

export default TokenWithNetworkImage
