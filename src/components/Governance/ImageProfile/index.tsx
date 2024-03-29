import Link from 'next/link'
import { useRouter } from 'next/router'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import substr from '@/utils/substr'

import NftImage from '../../NftImage'

import * as S from './styles'

interface IImageProfileProps {
  address: string
  diameter: number
  hasAddress: boolean
  isLink: boolean
  isNFT: boolean
  nickname?: string | null
  image?: string | null
  fontSize?: number
  tab?: string
}

const ImageProfile = ({
  address,
  diameter,
  hasAddress,
  isLink,
  nickname,
  isNFT,
  image,
  fontSize,
  tab
}: IImageProfileProps) => {
  const router = useRouter()

  return (
    <S.Image
      fontSize={fontSize}
      onClick={() => isLink && router.push(`/profile/${address}${tab}`)}
    >
      {nickname ? (
        isNFT ? (
          image && <NftImage NftUrl={image} imageSize="small" />
        ) : (
          image && <img className="user-image" src={image} alt="" />
        )
      ) : (
        <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} />
      )}
      {hasAddress ? (
        nickname ? (
          isLink ? (
            <Link href={`/profile/${address}${tab}`}>{nickname}</Link>
          ) : (
            <span>{nickname}</span>
          )
        ) : isLink ? (
          <Link href={`/profile/${address}${tab}`}>{substr(address)}</Link>
        ) : (
          <span>{substr(address)}</span>
        )
      ) : null}
    </S.Image>
  )
}

export default ImageProfile
