import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Blockies from 'react-blockies'
import { useConnectWallet } from '@web3-onboard/react'

import { useManagerPools } from '@/hooks/query/useManagerPools'

import arrowIcon from '@assets/utilities/arrow-select-down.svg'

import * as S from './styles'

interface ISideBarMenuProps {
  title: string
  icon: any
  isSideBarOpen: boolean
  isActive: boolean
}

const SideBarMenu = ({
  title,
  icon,
  isSideBarOpen,
  isActive
}: ISideBarMenuProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true)

  const [{ wallet }] = useConnectWallet()

  const router = useRouter()
  const poolQuery = router.query.pool

  const { data: managerPools } = useManagerPools({
    manager: wallet?.accounts[0].address
  })

  function handleOpenMenu() {
    setIsOpen(prev => !prev)
  }

  return (
    <S.SideBarMenu isActive={isActive}>
      <S.Title onClick={handleOpenMenu}>
        <S.TitleIcon isActive={isActive}>{icon}</S.TitleIcon>

        <S.TitleText isSideBarOpen={isSideBarOpen} isActive={isActive}>
          {title}
        </S.TitleText>

        <S.OpenButton isOpen={isOpen}>
          <Image src={arrowIcon} />
        </S.OpenButton>
      </S.Title>

      <S.PoolContainer
        isOpen={isOpen}
        isSideBarOpen={isSideBarOpen}
        height={managerPools ? managerPools?.length : 0}
      >
        {managerPools?.map(pool => {
          const isPoolPage = pool.id === poolQuery
          return (
            <S.PoolWrapper key={pool.id}>
              <Link href={`/manage/${pool.id}`} passHref>
                <S.Pool>
                  <S.PoolIcon>
                    {pool.logo ? (
                      <Image src={pool?.logo} width={16} height={16} />
                    ) : (
                      <Blockies seed={pool.name} size={8} scale={2} />
                    )}
                  </S.PoolIcon>

                  <S.PoolName active={isPoolPage}>{pool.name}</S.PoolName>

                  <S.PoolStatus active={isPoolPage} />
                </S.Pool>
              </Link>
            </S.PoolWrapper>
          )
        })}
      </S.PoolContainer>
    </S.SideBarMenu>
  )
}

export default SideBarMenu
