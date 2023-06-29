import Link from 'next/link'
import { useRouter } from 'next/router'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { useUserProfile } from '@/hooks/query/useUserProfile'
import substr from '@/utils/substr'

import NftImage from '../../NftImage'

import * as S from './styles'

interface IImageProfileProps {
  address: string
  diameter: number
  hasAddress: boolean
  isLink: boolean
  fontSize?: number
  tab?: string
}

const ImageProfile = ({
  address,
  diameter,
  hasAddress,
  isLink,
  fontSize,
  tab
}: IImageProfileProps) => {
  const router = useRouter()

  const { data } = useUserProfile({ address })

  return (
    <S.Image
      fontSize={fontSize}
      onClick={() => isLink && router.push(`/profile/${address}${tab}`)}
    >
      {data?.nickname ? (
        data?.isNFT ? (
          data?.image && <NftImage NftUrl={data.image} imageSize="small" />
        ) : (
          data?.image && <img className="user-image" src={data.image} alt="" />
        )
      ) : (
        <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} />
      )}
      {hasAddress ? (
        data?.nickname ? (
          isLink ? (
            <Link href={`/profile/${address}${tab}`}>{data.nickname}</Link>
          ) : (
            <span>{data.nickname}</span>
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
