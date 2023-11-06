import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useUserProfile } from '@/hooks/query/useUserProfile'

import substr from '@/utils/substr'

import { ToastInfo } from '@/components/Toastify/toast'

import * as S from './styles'

interface IUserInfoProps {
  walletAddress: string
}

const UserInfo = ({ walletAddress }: IUserInfoProps) => {
  const { data } = useUserProfile({ address: walletAddress })

  const userImage = data?.image || ''

  return (
    <S.UserInfo>
      {userImage ? (
        <img src={userImage} alt="" width={24} height={24} />
      ) : (
        <Jazzicon
          seed={jsNumberForAddress(String(walletAddress))}
          diameter={22}
        />
      )}
      {substr(walletAddress)}

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
