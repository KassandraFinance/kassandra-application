import React from 'react'
import Blockies from 'react-blockies'

import avax from '@assets/logos/avax.png'
import anyToken from '@assets/icons/coming-soon.svg'

import * as S from './styles'

interface ITokenWithNetworkImage {
  tokenImage: {
    url: string
    width?: number
    height?: number
    withoutBorder?: boolean
  }
  networkImage?: {
    url?: string
    width?: number
    height?: number
    withoutBorder?: boolean
  }
  blockies?: {
    seedName: string
    size: number
    scale: number
  }
}

const TokenWithNetworkImage = ({
  tokenImage,
  blockies,
  networkImage = {
    url: avax.src,
    height: 20,
    width: 20
  }
}: ITokenWithNetworkImage) => {
  const [tokenImageUrl, setTokenImageUrl] = React.useState(tokenImage.url)

  function handleImageError(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    const eventType = event.target as HTMLImageElement
    eventType.src = anyToken.src
  }

  return (
    <S.TokenWithNetworkImage
      withoutBorder={tokenImage.withoutBorder}
      isRound={tokenImage.width === tokenImage.height}
    >
      {!tokenImageUrl && blockies ? (
        <Blockies
          className="poolIcon"
          seed={blockies.seedName}
          size={blockies.size}
          scale={blockies.scale}
        />
      ) : (
        <img
          src={tokenImageUrl}
          alt="token image"
          width={tokenImage.width}
          height={tokenImage.height}
          onError={() => setTokenImageUrl('')}
        />
      )}
      <S.networkImageContainer withoutBorder={networkImage.withoutBorder}>
        <img
          src={networkImage?.url}
          alt="network image"
          width={networkImage?.width}
          height={networkImage?.height}
          onError={handleImageError}
        />
      </S.networkImageContainer>
    </S.TokenWithNetworkImage>
  )
}

export default TokenWithNetworkImage
