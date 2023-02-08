import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import arrowIcon from '../../../../../public/assets/utilities/arrow-select-down.svg'

import * as S from './styles'

import { PoolType } from '../index'

interface ISideBarMenuProps {
  title: string;
  icon: any;
  itemsList: PoolType[];
  isSideBarOpen: boolean;
}

const SideBarMenu = ({
  title,
  icon,
  itemsList,
  isSideBarOpen
}: ISideBarMenuProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  function handleOpenMenu() {
    setIsOpen(prev => !prev)
  }

  return (
    <S.SideBarMenu>
      <S.Title onClick={handleOpenMenu}>
        <S.TitleIcon>
          <Image src={icon} />
        </S.TitleIcon>

        <S.TitleText isSideBarOpen={isSideBarOpen}>{title}</S.TitleText>

        <S.OpenButton isOpen={isOpen}>
          <Image src={arrowIcon} />
        </S.OpenButton>
      </S.Title>

      <S.PoolContainer
        isOpen={isOpen}
        isSideBarOpen={isSideBarOpen}
        height={itemsList.length}
      >
        {itemsList.map(item => {
          return (
            <S.PoolWrapper key={item.poolSymbol}>
              <Link href={`/manage`} passHref>
                <S.Pool key={item.poolSymbol}>
                  <S.PoolIcon>
                    <Image src={item.poolLogo} width={16} height={16} />
                  </S.PoolIcon>

                  <S.PoolName
                    active={item.poolSymbol.toLowerCase() === 'ahype'}
                  >
                    {item.poolName}
                  </S.PoolName>

                  <S.PoolStatus
                    active={item.poolSymbol.toLowerCase() === 'ahype'}
                  />
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
