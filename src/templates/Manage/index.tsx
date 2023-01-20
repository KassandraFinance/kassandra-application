import React from 'react'
import Image from 'next/image'

import { useAppSelector } from '../../store/hooks'
import { chains } from '../../constants/tokenAddresses'

import Header from '../../components/Header'
import GetStarted from './GetStarted'
import SideBar from './SideBar'

import userIcon from '../../../public/assets/icons/user.svg'
import avalancheIcon from '../../../public/assets/logos/avax.png'
import polygonIcon from '../../../public/assets/logos/polygon.svg'
import walletIcon from '../../../public/assets/utilities/wallet.svg'
import closeIcon from '../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'
import Overlay from '../../components/Overlay'

const Manage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [networkIcon, setNetworkIcon] = React.useState(avalancheIcon)

  const { image } = useAppSelector(state => state.user)
  const chainId = useAppSelector(state => state.chainId)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  React.useEffect(() => {
    if (chains.avalanche.chainId === chainId && userWalletAddress.length > 0) {
      setNetworkIcon(avalancheIcon)
    } else if (
      chains.polygon.chainId === chainId &&
      userWalletAddress.length > 0
    ) {
      setNetworkIcon(polygonIcon)
    }
  }, [chainId, userWalletAddress])

  return (
    <S.Manage>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={() => setIsOpen(!isOpen)} />}

        <S.UserDashBoardButton onClick={() => setIsOpen(!isOpen)}>
          <S.UserImageWrapper isOpen={isOpen}>
            {userWalletAddress.length > 0 ? (
              <>
                <Image
                  src={image.profilePic ? image.profilePic : userIcon}
                  width={20}
                  height={20}
                />

                <S.NetworkImageWrapper>
                  <Image src={networkIcon} />
                </S.NetworkImageWrapper>
              </>
            ) : (
              <Image src={walletIcon} />
            )}
          </S.UserImageWrapper>

          <S.CloseIconWrapper isOpen={isOpen}>
            <Image src={closeIcon} />
          </S.CloseIconWrapper>
        </S.UserDashBoardButton>

        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <S.Content>
          <Header />

          <GetStarted />
        </S.Content>
      </S.DashBoard>
    </S.Manage>
  )
}

export default Manage
