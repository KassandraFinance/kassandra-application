import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import substr from '../../utils/substr'
import { useAppSelector } from '../../store/hooks'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import Button from '../Button'
import DropdownInvest from '../Dropdown'

import ModalKacy from '../Modals/ModalKacy'
import ModalAlert from '../Modals/ModalAlert'
import ModalLogOut from '../Modals/ModalLogOut'
import ModalWaitingList from '../Modals/ModalWaitingList'
import ModalWalletConnect from '../Modals/ModalWalletConnect'
import ModalInstitucionalLinksMobile from '../Modals/ModalInstitucionalLinksMobile'

import options from '../../../public/assets/utilities/options.svg'
import kacy64 from '../../../public/assets/logos/kacy-64.svg'
import logoKassandra from '../../../public/assets/logos/kassandra-header.svg'

import * as S from './styles'

export type MenuProps = {
  username?: string
}

const Header = () => {
  const [isModalWallet, setIsModalWallet] = React.useState<boolean>(false)
  const [isModalLogout, setIsModalLogout] = React.useState<boolean>(false)
  const [isModalWaitingList, setIsModalWaitingList] =
    React.useState<boolean>(false)
  // const [isModalLanguages, setIsModalLanguages] = React.useState<boolean>(false)
  const [isModalSocialMedia, setIsModalSocialMedia] =
    React.useState<boolean>(false)

  const { trackEventFunction } = useMatomoEcommerce()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const isError = useAppSelector(state => state.modalAlertText.errorText)

  const router = useRouter()

  return (
    <>
      <S.Wrapper id="top">
        <S.LogoWrapper>
          <Link href="/" passHref>
            <a className="logo-desktop">
              <Image src={logoKassandra} alt="Kassandra" />
            </a>
          </Link>
          <Link href="/" passHref>
            <a className="logo-ipad">
              <Image src={kacy64} width={64} height={64} alt="Kassandra" />
            </a>
          </Link>
        </S.LogoWrapper>
        <S.Menu>
          <Link href="/" passHref>
            <a className="logo-mobile">
              <Image src={kacy64} width={64} height={64} alt="Kassandra" />
            </a>
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
            nameOnHeader="Governance"
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
          <S.MenuContainer>
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
            />
          </S.MenuContainer>

          <S.MenuBottom>
            <S.ButtonsWrapper>
              <ModalKacy />
              {userWalletAddress ? (
                <Button
                  className="button-mobile"
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.0898 12.0977C22.0898 14.0755 21.5033 16.0089 20.4045 17.6534C19.3057 19.2979 17.7439 20.5796 15.9167 21.3364C14.0894 22.0933 12.0787 22.2914 10.1389 21.9055C8.19913 21.5197 6.4173 20.5672 5.01878 19.1687C3.62025 17.7702 2.66785 15.9884 2.282 14.0486C1.89614 12.1088 2.09418 10.0981 2.85105 8.27084C3.60793 6.44358 4.88965 4.8818 6.53414 3.78298C8.17863 2.68417 10.112 2.09768 12.0898 2.09768C13.4039 2.09461 14.7057 2.35117 15.9203 2.85263C17.1349 3.35409 18.2385 4.09056 19.1677 5.01976C20.0969 5.94896 20.8334 7.05257 21.3349 8.26721C21.8363 9.48185 22.0929 10.7836 22.0898 12.0977Z"
                        fill="url(#paint0_linear_1022_26832)"
                        stroke="url(#paint1_linear_1022_26832)"
                      />
                      <path
                        d="M13.7784 15.8451H10.3784C9.25493 15.8325 8.15137 16.142 7.19825 16.7369C6.24512 17.3317 5.4823 18.1871 5 19.2019C6.90342 21.0203 9.44138 22.0241 12.0737 21.9996C14.706 21.975 17.2248 20.9241 19.094 19.0705C18.5977 18.09 17.8367 17.2681 16.8972 16.6981C15.9577 16.128 14.8772 15.8325 13.7784 15.8451ZM12.0784 7C10.0176 7 8.35291 8.58823 8.35291 10.5294C8.35291 12.4706 10.0196 14.0588 12.0784 14.0588C14.1372 14.0588 15.8038 12.4706 15.8038 10.5294C15.8038 8.58823 14.1372 7 12.0784 7Z"
                        fill="#1E1322"
                      />
                      <path
                        d="M22.0898 12.0977C22.0898 14.0755 21.5033 16.0089 20.4045 17.6534C19.3057 19.2979 17.7439 20.5796 15.9167 21.3364C14.0894 22.0933 12.0787 22.2914 10.1389 21.9055C8.19913 21.5197 6.4173 20.5672 5.01878 19.1687C3.62025 17.7702 2.66785 15.9884 2.282 14.0486C1.89614 12.1088 2.09418 10.0981 2.85105 8.27084C3.60793 6.44358 4.88965 4.8818 6.53414 3.78298C8.17863 2.68417 10.112 2.09768 12.0898 2.09768C13.4039 2.09461 14.7057 2.35117 15.9203 2.85263C17.1349 3.35409 18.2385 4.09056 19.1677 5.01976C20.0969 5.94896 20.8334 7.05257 21.3349 8.26721C21.8363 9.48185 22.0929 10.7836 22.0898 12.0977V12.0977Z"
                        stroke="url(#paint2_linear_1022_26832)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1022_26832"
                          x1="12.0874"
                          y1="22.1017"
                          x2="12.0874"
                          y2="2.09969"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFBF00" />
                          <stop offset="1" stopColor="#E843C4" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_1022_26832"
                          x1="12.0874"
                          y1="22.1017"
                          x2="12.0874"
                          y2="2.09969"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFBF00" />
                          <stop offset="1" stopColor="#E843C4" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_1022_26832"
                          x1="12.0874"
                          y1="22.1017"
                          x2="12.0874"
                          y2="2.09969"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFBF00" />
                          <stop offset="1" stopColor="#E843C4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  as="a"
                  size="medium"
                  onClick={() => {
                    trackEventFunction('open-modal', 'your-wallet', 'header')
                  }}
                  href={`/profile/${userWalletAddress}`}
                  text={substr(userWalletAddress)}
                />
              ) : (
                <Button
                  className="button-mobile"
                  icon={
                    <svg
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.98356 0C9.88044 0 11 1.10255 11 2.98989H8.67289V3.00915C7.59287 3.00915 6.71733 3.87138 6.71733 4.935C6.71733 5.99862 7.59287 6.86086 8.67289 6.86086H11V7.03418C11 8.89745 9.88044 10 7.98356 10H3.01644C1.11956 10 0 8.89745 0 7.03418V2.96582C0 1.10255 1.11956 0 3.01644 0H7.98356ZM10.5893 3.81801C10.8161 3.81801 11 3.99908 11 4.22244V5.62831C10.9974 5.85058 10.815 6.03014 10.5893 6.03274H8.71689C8.17013 6.03998 7.69202 5.67132 7.568 5.14685C7.50589 4.82127 7.59308 4.48531 7.80619 4.22901C8.0193 3.9727 8.33654 3.82226 8.67289 3.81801H10.5893ZM8.93689 4.46798H8.756C8.64494 4.4667 8.53798 4.50924 8.45899 4.58613C8.38 4.66302 8.33556 4.76785 8.33556 4.87723C8.33554 5.1067 8.52301 5.29346 8.756 5.2961H8.93689C9.16909 5.2961 9.35733 5.11072 9.35733 4.88204C9.35733 4.65336 9.16909 4.46798 8.93689 4.46798ZM5.71022 2.16177H2.60578C2.37547 2.16176 2.18801 2.34422 2.18533 2.57102C2.18533 2.80049 2.37278 2.98725 2.60578 2.98989H5.71022C5.94243 2.98989 6.13067 2.80451 6.13067 2.57583C6.13067 2.34715 5.94243 2.16177 5.71022 2.16177Z"
                        fill="white"
                      />
                    </svg>
                  }
                  as="button"
                  backgroundBlack
                  size="medium"
                  onClick={() => {
                    trackEventFunction(
                      'open-metamask',
                      'connect-wallet',
                      'header'
                    )
                    setIsModalWallet(true)
                  }}
                  text="Connect Wallet"
                />
              )}
            </S.ButtonsWrapper>

            <S.OptionsContainer>
              <S.ButtonOptions onClick={() => setIsModalSocialMedia(true)}>
                <Image src={options} alt="options" />
              </S.ButtonOptions>
            </S.OptionsContainer>
          </S.MenuBottom>
        </S.Menu>
      </S.Wrapper>
      {isModalSocialMedia && (
        <ModalInstitucionalLinksMobile setModalOpen={setIsModalSocialMedia} />
      )}

      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModalWallet} />}

      <ModalLogOut
        modalOpen={isModalLogout}
        setModalOpen={setIsModalLogout}
        userWalletAddress={userWalletAddress}
      />

      {isModalWaitingList && (
        <ModalWaitingList setIsModalWaitingList={setIsModalWaitingList} />
      )}

      {isError && <ModalAlert />}
    </>
  )
}

export default Header
