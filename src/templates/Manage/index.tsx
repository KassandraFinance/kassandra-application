import React from 'react'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'

import CreatePool, { CREATED_POOL_LOCALSTORAGE_KEY } from './CreatePool'

import { useManagerPools } from '@/hooks/query/useManagerPools'
import { useUserProfile } from '@/hooks/query/useUserProfile'
import { useStrategyPools } from '@/hooks/query/useStrategyPools'
import useLocalStorage from '@/hooks/useLocalStorage'

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

type NewPool = {
  id: string
  hash: string
  name: string
  chainId: string
}

type NewPoolCreated = NewPool | undefined

const Manage = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [newPool, setNewPool] = React.useState<NewPoolCreated>()
  const [networkIcon, setNetworkIcon] = React.useState(avalancheIcon)
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const [{ wallet }] = useConnectWallet()

  const { data } = useUserProfile({
    address: wallet?.accounts[0].address
  })

  const { getLocalStorage, removeLocalStorage } = useLocalStorage()

  const { data: managerPools } = useManagerPools({
    manager: wallet?.accounts[0]?.address
  })
  const { data: strategyPool } = useStrategyPools({
    strategy: wallet?.accounts[0].address
  })

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
    if (wallet?.provider) {
      if ('0xa86a' === wallet?.chains[0].id) {
        setNetworkIcon(avalancheIcon)
      } else if ('0x89' === wallet?.chains[0].id) {
        setNetworkIcon(polygonIcon)
      } else {
        return
      }
    }
  }, [wallet])

  React.useEffect(() => {
    if (!managerPools) return

    const newPoolCreated = getLocalStorage(
      CREATED_POOL_LOCALSTORAGE_KEY
    ) as NewPoolCreated

    if (!newPoolCreated) return

    const checkPool = managerPools.some(
      pool => pool.id.toLowerCase() === newPoolCreated.id.toLowerCase()
    )
    if (checkPool) {
      return removeLocalStorage(CREATED_POOL_LOCALSTORAGE_KEY)
    }
    setNewPool(newPoolCreated)
  }, [managerPools, isCreatePool])

  return (
    <S.Manage>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={handleDashBoardButton} />}

        <S.UserDashBoardButton
          id="userDashBoardButton"
          onClick={handleDashBoardButton}
        >
          <S.UserImageWrapper isOpen={isOpen}>
            {wallet?.provider ? (
              <>
                <img
                  src={data?.image ? data.image : userIcon.src}
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
          {!!newPool ||
          (strategyPool && strategyPool.length > 0) ||
          (wallet?.provider && managerPools && managerPools.length > 0) ? (
            <Overview newPoolCreated={newPool} />
          ) : (
            <GetStarted setIsCreatePool={setIsCreatePool} />
          )}
        </S.Content>
      </S.DashBoard>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.Manage>
  )
}

export default Manage
