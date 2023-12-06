import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ZeroAddress } from 'ethers'
import Link from 'next/link'

import { useUserProfile } from '@/hooks/query/useUserProfile'

import substr from '@/utils/substr'

import { ToastInfo } from '@/components/Toastify/toast'

import * as S from './styles'

interface IUserInfoProps {
  walletAddress: string
}

const UserInfo = ({ walletAddress }: IUserInfoProps) => {
  const { data } = useUserProfile({ address: walletAddress })

  return (
    <S.UserInfo>
      {data?.image ? (
        <img
          src={data.image}
          alt={`${data.nickname} Profile Picture`}
          width={24}
          height={24}
        />
      ) : (
        <Jazzicon
          seed={jsNumberForAddress(String(walletAddress))}
          diameter={22}
        />
      )}

      {data?.nickname ? (
        <Link href={`/profile/${walletAddress ?? ZeroAddress}`} passHref>
          <S.UserContent>
            <S.UserName>{data.nickname}</S.UserName>
            <S.UserWallet>{substr(walletAddress)}</S.UserWallet>
          </S.UserContent>
        </Link>
      ) : (
        <p>{substr(walletAddress)}</p>
      )}

      <CopyToClipboard text={walletAddress}>
        <S.IconWrapper
          onClick={() => {
            ToastInfo('Copy address')
          }}
        >
          <img src="/assets/icons/copy.svg" alt="" width={14} height={15} />
        </S.IconWrapper>
      </CopyToClipboard>
    </S.UserInfo>
  )
}

export default UserInfo
