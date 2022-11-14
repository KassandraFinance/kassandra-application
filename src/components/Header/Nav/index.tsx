import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import DropdownInvest from '../../Dropdown'
import Overlay from '../Overlay'

import kacyIcon from '../../../../public/assets/logos/kacy-96.svg'

import * as S from './styles'
import MenuFooter from '../MenuFooter'

interface INavProps {
  isShowMenu: boolean;
  setIsModalWaitingList: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({
  isShowMenu,
  setIsModalWaitingList,
  setIsShowMenu
}: INavProps) => {
  const router = useRouter()

  function handleClickOverlay() {
    setIsShowMenu(false)
  }

  return (
    <>
      {isShowMenu && <Overlay onClick={handleClickOverlay} />}

      <S.Nav isShowMenu={isShowMenu}>
        <Link href="/" passHref>
          <S.MenuLink active={false}>
            <Image src={kacyIcon} width={27} height={24} />
          </S.MenuLink>
        </Link>
        <Link href="/explore" passHref>
          <S.MenuLink
            active={router.asPath === '/explore' || router.asPath === '/'}
          >
            Invest
          </S.MenuLink>
        </Link>
        <Link href="/farm?tab=stake" passHref>
          <S.MenuLink active={router.pathname === '/farm'}>Stake</S.MenuLink>
        </Link>
        <S.MenuLink
          active={router.asPath === '/create'}
          onClick={() => {
            setIsModalWaitingList(true)
          }}
        >
          Create
        </S.MenuLink>
        <S.MenuLink
          onClick={() => setIsModalWaitingList(true)}
          active={router.asPath === '/manage'}
        >
          Manage
        </S.MenuLink>
        <DropdownInvest
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
        />
        <DropdownInvest
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
        />

        <MenuFooter />
      </S.Nav>
    </>
  )
}

export default Nav
