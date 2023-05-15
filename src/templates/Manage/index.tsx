import React from 'react'
import Image from 'next/image'

import useManagerPools from '@/hooks/useManagerPools'
import { useAppSelector } from '@/store/hooks'

import Overlay from '@/components/Overlay'
import Header from '@/components/Header'

import GetStarted from './GetStarted'
import Overview from './Overview'
import SideBar from './SideBar'

import userIcon from '@assets/icons/user.svg'
import avalancheIcon from '@assets/logos/avax.png'
import polygonIcon from '@assets/logos/polygon.svg'
import walletIcon from '@assets/utilities/wallet.svg'
import closeIcon from '@assets/utilities/close-icon.svg'

import * as S from './styles'

const Manage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [networkIcon, setNetworkIcon] = React.useState(avalancheIcon)

  const { image } = useAppSelector(state => state.user)
  const chainId = useAppSelector(state => state.chainId)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { managerPools } = useManagerPools(userWalletAddress)

  function handleDashBoardButton() {
    setIsOpen(!isOpen)
    const top = document.getElementById('top')?.style
    if (top) {
      if (isOpen) {
        top.zIndex = '1020'
      } else {
        top.zIndex = '0'
      }
    }
  }

  React.useEffect(() => {
    if (43114 === chainId && userWalletAddress.length > 0) {
      setNetworkIcon(avalancheIcon)
    } else if (137 === chainId && userWalletAddress.length > 0) {
      setNetworkIcon(polygonIcon)
    } else {
      return
    }
  }, [chainId, userWalletAddress])

  return (
    <S.Manage>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={handleDashBoardButton} />}

        <S.UserDashBoardButton
          id="userDashBoardButton"
          onClick={handleDashBoardButton}
        >
          <S.UserImageWrapper isOpen={isOpen}>
            {userWalletAddress.length > 0 ? (
              <>
                <img
                  src={image?.profilePic ? image.profilePic : userIcon.src}
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
          {userWalletAddress.length === 42 &&
          managerPools &&
          managerPools.pools.length > 0 ? (
            <Overview />
          ) : (
            <GetStarted />
          )}
        </S.Content>
      </S.DashBoard>
    </S.Manage>
  )
}

export default Manage
