import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
import ModalSocialMediaMobile from '../Modals/ModalSocialMediaMobile'

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
          <Link href="/explore">
            <S.MenuLink>Invest</S.MenuLink>
          </Link>
          <Link href="/farm?tab=stake">
            <S.MenuLink>Stake</S.MenuLink>
          </Link>
          <S.MenuLink
            onClick={() => {
              setIsModalWaitingList(true)
            }}
          >
            Create
          </S.MenuLink>
          <S.MenuLink onClick={() => setIsModalWaitingList(true)}>
            Manage
          </S.MenuLink>
          <DropdownInvest
            nameOnHeader="Governance"
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
                href: '/gov/leaderboard'
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
                      width="12"
                      height="11"
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.48356 0.550049C10.3804 0.550049 11.5 1.64157 11.5 3.51004H9.17289V3.5291C8.09287 3.5291 7.21733 4.38272 7.21733 5.4357C7.21733 6.48868 8.09287 7.3423 9.17289 7.3423H11.5V7.51389C11.5 9.35852 10.3804 10.45 8.48356 10.45H3.51644C1.61956 10.45 0.5 9.35852 0.5 7.51389V3.48621C0.5 1.64157 1.61956 0.550049 3.51644 0.550049H8.48356ZM11.0893 4.32988C11.3161 4.32988 11.5 4.50913 11.5 4.73026V6.12208C11.4974 6.34213 11.315 6.51989 11.0893 6.52246H9.21689C8.67013 6.52963 8.19202 6.16465 8.068 5.64543C8.00589 5.32311 8.09308 4.99051 8.30619 4.73677C8.5193 4.48303 8.83654 4.33409 9.17289 4.32988H11.0893ZM9.43689 4.97335H9.256C9.14494 4.97208 9.03798 5.0142 8.95899 5.09032C8.88 5.16644 8.83556 5.27022 8.83556 5.3785C8.83554 5.60568 9.02301 5.79058 9.256 5.79319H9.43689C9.66909 5.79319 9.85733 5.60966 9.85733 5.38327C9.85733 5.15688 9.66909 4.97335 9.43689 4.97335ZM6.21022 2.6902H3.10578C2.87547 2.69019 2.68801 2.87083 2.68533 3.09535C2.68533 3.32253 2.87278 3.50743 3.10578 3.51004H6.21022C6.44243 3.51004 6.63067 3.32651 6.63067 3.10012C6.63067 2.87373 6.44243 2.6902 6.21022 2.6902Z"
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
        <ModalSocialMediaMobile setModalOpen={setIsModalSocialMedia} />
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
