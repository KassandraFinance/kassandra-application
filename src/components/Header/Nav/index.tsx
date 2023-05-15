import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'

// import ModalWaitingList from '../../../components/Modals/ModalWaitingList'

import DropdownMenu from '../DropdownMenu'
import Overlay from '../../Overlay'
import MenuFooter from '../MenuFooter'

import kacyIcon from '../../../../public/assets/logos/kacy-96.svg'

import * as S from './styles'

interface INavProps {
  isShowMenu: boolean
  showOverlay: boolean
  setIsShowMenu: () => void
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({
  isShowMenu,
  showOverlay,
  setIsShowMenu,
  setShowOverlay
}: INavProps) => {
  // const [isModalWaitingList, setIsModalWaitingList] =
  //   React.useState<boolean>(false)

  const { trackEventFunction } = useMatomoEcommerce()

  const router = useRouter()
  const path = router.asPath.split('/')
  const pathClearQuestionMark = path[1].split('?')
  const pathClearHashtag = pathClearQuestionMark[0].split('#')

  function handleClose() {
    setIsShowMenu()
  }

  function animationClose() {
    setShowOverlay(false)
  }

  return (
    <>
      {showOverlay && (
        <Overlay
          isOpen={isShowMenu}
          onClick={handleClose}
          onAnimationEnd={animationClose}
        />
      )}

      <S.Nav isShowMenu={isShowMenu}>
        <Link href="/" passHref>
          <S.MenuLink
            active={false}
            onClick={() => {
              trackEventFunction('click-on-link', 'home-page', 'header')
              handleClose()
            }}
          >
            <Image src={kacyIcon} width={27} height={24} />
          </S.MenuLink>
        </Link>
        <Link href="/" passHref>
          <S.MenuLink
            active={router.asPath === '/' || router.asPath === '/'}
            onClick={() => {
              trackEventFunction('click-on-link', 'invest', 'header')
              handleClose()
            }}
          >
            Invest
          </S.MenuLink>
        </Link>
        <Link href="/farm?tab=stake" passHref>
          <S.MenuLink
            active={router.pathname === '/farm'}
            onClick={() => {
              trackEventFunction('click-on-link', 'farm', 'header')
              handleClose()
            }}
          >
            Stake
          </S.MenuLink>
        </Link>
        <Link href="/manage" passHref>
          <S.MenuLink
            onClick={() => {
              trackEventFunction('click-on-link', 'manage', 'header')
            }}
            active={pathClearHashtag[0] === 'manage'}
          >
            Manage
          </S.MenuLink>
        </Link>
        <DropdownMenu
          nameOnHeader="DAO"
          isActive={
            router.asPath.substring(0, 4) === '/gov' ||
            router.asPath.substring(0, 8) === '/profile'
          }
          adaptToResponsiveSize={true}
          linkPage={[
            {
              name: 'Overview',
              href: '/gov'
            },
            {
              name: 'Proposals',
              href: '/gov/proposals'
            },
            {
              name: 'Leaderboard ',
              href: '/gov/leaderboard?page=1'
            },
            {
              name: 'Forum',
              href: 'https://gov.kassandra.finance/',
              newTab: true
            }
          ]}
          onClick={handleClose}
        />
        <DropdownMenu
          nameOnHeader="Learn"
          linkPage={[
            {
              name: 'Home',
              href: 'https://kassandra.finance/'
            },
            {
              name: 'Investors',
              href: 'https://kassandra.finance/investors'
            },
            {
              name: 'Managers',
              href: 'https://kassandra.finance/managers'
            },
            {
              name: 'DAO',
              href: 'https://kassandra.finance/dao'
            },
            {
              name: 'Foundation',
              href: 'https://kassandra.finance/foundation'
            },
            {
              name: 'Blog',
              href: `https://kassandrafoundation.medium.com/`,
              newTab: true
            }
          ]}
          adaptToResponsiveSize
          onClick={handleClose}
        />

        <MenuFooter />
      </S.Nav>
      {/* {isModalWaitingList && (
        <ModalWaitingList setIsModalWaitingList={setIsModalWaitingList} />
      )} */}
    </>
  )
}

export default Nav
