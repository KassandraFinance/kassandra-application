/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import { useManagerPools } from '@/hooks/query/useManagerPools'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setToFirstStep,
  setBackStepNumber,
  setClear
} from '@/store/reducers/poolCreationSlice'
import { useUserProfile } from '@/hooks/query/useUserProfile'

import substr from '@/utils/substr'

import HeaderButtons from '@/components/Header/HeaderButtons'
import ModalChooseNetwork from '@/components/Modals/ModalChooseNetwork'
import Button from '@/components/Button'
import SideBarMenu from './SideBarMenu'
import CreatePool from '../CreatePool'
import SideBarLink from './SideBarLink'

import userIcon from '@assets/icons/user.svg'
import arrow from '@assets/utilities/arrow-right-bold.svg'
import plusIcon from '@assets/utilities/plus.svg'
import {
  overview,
  profile,
  rewards,
  analytics,
  activities,
  poolIcon
} from './icons'

import * as S from './styles'
import { VERSION_POOL_CREATE } from '@/constants/tokenAddresses'

interface ISideBarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const links = [
  {
    name: 'My Profile',
    icon: profile
  },
  {
    name: 'Analytics',
    icon: analytics
  },
  {
    name: 'Activities',
    icon: activities
  },
  {
    name: 'Rewards',
    icon: rewards
  }
]

const SideBar = ({ isOpen, setIsOpen }: ISideBarProps) => {
  const [isModalWallet, setIsModalWallet] = React.useState<boolean>(false)
  const [isChooseNetwork, setIsChooseNetwork] = React.useState(false)
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const [{ wallet }] = useConnectWallet()

  const { data } = useUserProfile({
    address: wallet?.accounts[0].address
  })
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const { networkId: poolCreattionChainId, version } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

  const router = useRouter()
  const path = router.asPath

  const dispatch = useAppDispatch()

  const { data: managerPools } = useManagerPools({
    manager: wallet?.accounts[0].address
  })

  function handleCreatePool() {
    if (version !== VERSION_POOL_CREATE) {
      dispatch(setToFirstStep())
      dispatch(setClear())
    }
    if (poolCreattionChainId === 0 && stepNumber > 0) {
      dispatch(setToFirstStep())
    }
    if (stepNumber >= 6) {
      dispatch(setBackStepNumber())
    }
    setIsCreatePool(true)
  }

  return (
    <S.SideBar isOpen={isOpen}>
      <S.OpenButton onClick={() => setIsOpen(!isOpen)}>
        <S.ImageCloseButtonWrapper isOpen={isOpen}>
          <Image src={arrow} width={16} height={16} />
        </S.ImageCloseButtonWrapper>
      </S.OpenButton>

      <S.SideBarHeader>
        <Link href="/" passHref>
          <S.ImageWrapper isOpen={isOpen}>
            <svg
              width="216"
              height="34"
              viewBox="0 0 216 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 604 522"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M301.651 31.4728C338.118 31.4728 373.507 38.5345 406.845 52.4649C439.137 65.9611 468.132 85.2884 493.042 109.916C518.007 134.6 537.6 163.37 551.273 195.421C565.461 228.679 572.651 264.116 572.651 300.76C572.651 337.613 565.589 373.292 551.659 406.815C539.047 437.153 521.361 464.483 499.025 488.129L412.017 406.815H446.014C475.838 406.815 500.103 382.549 500.103 352.726C500.103 322.902 475.838 298.637 446.014 298.637H157.118C127.295 298.637 103.029 322.902 103.029 352.726C103.029 382.549 127.295 406.815 157.118 406.815H197.261L104.34 488.21C81.9808 464.539 64.2621 437.185 51.6346 406.815C37.7042 373.3 30.6344 337.613 30.6344 300.768C30.6344 263.923 37.8248 228.679 52.0126 195.429C65.6857 163.378 85.2784 134.608 110.244 109.924C135.153 85.2964 164.156 65.9691 196.44 52.473C229.779 38.5425 265.168 31.4808 301.635 31.4808M301.651 0.909424C136.054 0.909424 0.0791016 133.699 0.0791016 300.768C0.0791016 384.238 33.2242 460.099 87.3615 514.607C92.0104 519.288 98.0909 521.596 104.147 521.596C110.887 521.596 117.603 518.741 122.308 513.111L266.985 386.385C269.969 382.123 266.921 376.267 261.725 376.259H157.126C144.137 376.259 133.601 365.723 133.601 352.734C133.601 339.744 144.137 329.208 157.126 329.208H446.014C459.004 329.208 469.54 339.744 469.54 352.734C469.54 365.723 459.004 376.259 446.014 376.259H350.649C345.445 376.259 342.405 382.123 345.388 386.385L480.985 513.111C485.69 518.741 492.406 521.596 499.146 521.596C505.203 521.596 511.283 519.288 515.932 514.607C570.077 460.107 603.214 384.238 603.214 300.768C603.214 133.699 467.248 0.909424 301.659 0.909424L301.651 0.909424Z"
                  fill="url(#paint0_linear_339_161)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_339_161"
                    x1="301.643"
                    y1="0.909424"
                    x2="301.643"
                    y2="521.596"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.01" stopColor="#FFBF00" />
                    <stop offset="1" stopColor="#E843C4" />
                  </linearGradient>
                </defs>
              </svg>
              <g className="letters">
                <path
                  d="M60.7061 12.4667H57.4034L49.0778 19.7444V9H46.9219V25.0707H49.0778V22.6371L53.9401 18.3899L59.7428 25.0707H62.5868L55.5685 16.9435L60.7061 12.4667Z"
                  fill="url(#paint2_linear_4442_53300)"
                />
                <path
                  d="M75.2149 12.4667H63.7472V14.6247H75.2149C76.5222 14.6247 77.5772 15.7038 77.5772 17.0124V17.6782H67.4168C65.3756 17.6782 63.7472 19.3311 63.7472 21.3744C63.7472 23.4177 65.3756 25.0707 67.4168 25.0707H79.7561V17.0124C79.7561 14.5099 77.7378 12.4667 75.2149 12.4667ZM77.5772 22.8897H67.4168C66.5682 22.8897 65.9031 22.2239 65.9031 21.3744C65.9031 20.5479 66.5682 19.8592 67.4168 19.8592H77.5772V22.8897Z"
                  fill="url(#paint3_linear_4442_53300)"
                />
                <path
                  d="M95.5323 17.6782H86.8627C86.037 17.6782 85.3719 16.9894 85.3719 16.14C85.3719 15.3135 86.037 14.6247 86.8627 14.6247H99.202V12.4667H86.8627C84.8444 12.4667 83.193 14.0967 83.193 16.14C83.193 18.2062 84.8444 19.8592 86.8627 19.8592H95.5323C96.3809 19.8592 97.046 20.5479 97.046 21.3744C97.046 22.2239 96.3809 22.8897 95.5323 22.8897H83.193V25.0707H95.5323C97.5735 25.0707 99.202 23.4177 99.202 21.3744C99.202 19.3311 97.5735 17.6782 95.5323 17.6782Z"
                  fill="url(#paint4_linear_4442_53300)"
                />
                <path
                  d="M114.978 17.6782H106.309C105.483 17.6782 104.818 16.9894 104.818 16.14C104.818 15.3135 105.483 14.6247 106.309 14.6247H118.648V12.4667H106.309C104.29 12.4667 102.639 14.0967 102.639 16.14C102.639 18.2062 104.29 19.8592 106.309 19.8592H114.978C115.827 19.8592 116.492 20.5479 116.492 21.3744C116.492 22.2239 115.827 22.8897 114.978 22.8897H102.639V25.0707H114.978C117.019 25.0707 118.648 23.4177 118.648 21.3744C118.648 19.3311 117.019 17.6782 114.978 17.6782Z"
                  fill="url(#paint5_linear_4442_53300)"
                />
                <path
                  d="M133.552 12.4667H122.085V14.6247H133.552C134.86 14.6247 135.915 15.7038 135.915 17.0124V17.6782H125.754C123.713 17.6782 122.085 19.3311 122.085 21.3744C122.085 23.4177 123.713 25.0707 125.754 25.0707H138.094V17.0124C138.094 14.5099 136.075 12.4667 133.552 12.4667ZM135.915 22.8897H125.754C124.906 22.8897 124.241 22.2239 124.241 21.3744C124.241 20.5479 124.906 19.8592 125.754 19.8592H135.915V22.8897Z"
                  fill="url(#paint6_linear_4442_53300)"
                />
                <path
                  d="M153.021 12.4667H141.531V25.0707H143.687V14.6247H153.021C154.306 14.6247 155.384 15.7038 155.384 17.0124V25.0707H157.54V17.0124C157.54 14.5099 155.498 12.4667 153.021 12.4667Z"
                  fill="url(#paint7_linear_4442_53300)"
                />
                <path
                  d="M174.829 12.4667H165.518C163.018 12.4667 160.976 14.5099 160.976 17.0124V20.502C160.976 23.0274 163.018 25.0707 165.518 25.0707H177.008V9H174.829V12.4667ZM174.829 22.8897H165.518C164.21 22.8897 163.132 21.8106 163.132 20.502V17.0124C163.132 15.7038 164.21 14.6247 165.518 14.6247H174.829V22.8897Z"
                  fill="url(#paint8_linear_4442_53300)"
                />
                <path
                  d="M180.445 17.0124V25.0707H182.601V17.0124C182.601 15.7038 183.656 14.6247 184.986 14.6247H196.477V12.4667H184.986C182.463 12.4667 180.445 14.5099 180.445 17.0124Z"
                  fill="url(#paint9_linear_4442_53300)"
                />
                <path
                  d="M211.381 12.4667H199.913V14.6247H211.381C212.688 14.6247 213.743 15.7038 213.743 17.0124V17.6782H203.583C201.541 17.6782 199.913 19.3311 199.913 21.3744C199.913 23.4177 201.541 25.0707 203.583 25.0707H215.922V17.0124C215.922 14.5099 213.904 12.4667 211.381 12.4667ZM213.743 22.8897H203.583C202.734 22.8897 202.069 22.2239 202.069 21.3744C202.069 20.5479 202.734 19.8592 203.583 19.8592H213.743V22.8897Z"
                  fill="url(#paint10_linear_4442_53300)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_4442_53300"
                  x="0.333659"
                  y="0.207682"
                  width="37.3327"
                  height="33.6823"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="2.66667"
                    result="effect1_foregroundBlur_4442_53300"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_4442_53300"
                  x1="19.0203"
                  y1="-4.44302"
                  x2="19.0203"
                  y2="35.9177"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFBF00" />
                  <stop offset="1" stopColor="#E843C4" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_4442_53300"
                  x1="19"
                  y1="5.87402"
                  x2="19"
                  y2="28.1206"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFBF00" />
                  <stop offset="1" stopColor="#E843C4" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear_4442_53300"
                  x1="136.752"
                  y1="7.85209"
                  x2="136.752"
                  y2="30.8102"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E843C4" />
                  <stop offset="1" stopColor="#FFBF00" />
                </linearGradient>
              </defs>
            </svg>
          </S.ImageWrapper>
        </Link>
        <S.UserInfoContainer isOpen={isOpen}>
          {wallet?.provider ? (
            <Link href={`/profile/${wallet.accounts[0].address}`}>
              <S.UserHeader>
                <S.UserImage>
                  <img
                    src={data?.image ? data.image : userIcon.src}
                    width={40}
                    height={40}
                  />
                </S.UserImage>

                <S.UserNameWrapper>
                  <S.UserName isOpen={isOpen}>
                    {data?.nickname
                      ? data.nickname
                      : substr(wallet.accounts[0].address)}
                  </S.UserName>

                  <S.UserHeaderTitle isOpen={isOpen}>
                    Dashboard
                  </S.UserHeaderTitle>
                </S.UserNameWrapper>
              </S.UserHeader>
            </Link>
          ) : (
            <S.UserHeader onClick={() => setIsModalWallet(!isModalWallet)}>
              <S.UserImage>
                <img
                  src={data?.image ? data.image : userIcon.src}
                  width={40}
                  height={40}
                />
              </S.UserImage>

              <S.UserNameWrapper>
                <S.UserName isOpen={isOpen}>
                  {data?.nickname
                    ? data.nickname
                    : substr(wallet?.accounts[0].address || '')}
                </S.UserName>

                <S.UserHeaderTitle isOpen={isOpen}>Dashboard</S.UserHeaderTitle>
              </S.UserNameWrapper>
            </S.UserHeader>
          )}

          <HeaderButtons setIsChooseNetwork={setIsChooseNetwork} />
        </S.UserInfoContainer>
      </S.SideBarHeader>

      <S.Line isOpen={isOpen} />

      <S.SideBarBody>
        {wallet?.provider && managerPools && managerPools.length > 0 ? (
          <>
            <SideBarLink
              name="Overview"
              icon={overview}
              isOpen={isOpen}
              isActive={path === '/manage'}
              link="/manage"
            />

            <SideBarMenu
              title="My managed pool"
              icon={poolIcon}
              isSideBarOpen={isOpen}
              isActive={path.length === 75}
            />

            <S.LinksContainer>
              {links.map(link => (
                <SideBarLink
                  key={link.name}
                  name={link.name}
                  icon={link.icon}
                  isOpen={isOpen}
                  disabled={true}
                  isActive={false}
                  link="#"
                />
              ))}
            </S.LinksContainer>
          </>
        ) : (
          <S.TextWrapper>
            <S.Text isOpen={isOpen}>
              Start your journey as an asset pool manager in kassandra's
              ecosystem.
              <br />
              <br />
              Bring your strategy or develop one as you begin a streamlined
              process for creating managed pools that utilize digital assets
              that you can choose from.
            </S.Text>
          </S.TextWrapper>
        )}
        <S.SideBarContainer>
          <S.ButtonWrapper isOpen={isOpen}>
            {wallet?.provider && managerPools && managerPools.length > 0 && (
              <Button
                text="Create New Pool"
                background="secondary"
                fullWidth
                type="button"
                icon={
                  <S.PlusIconWrapper>
                    <Image src={plusIcon} width={12} height={12} />
                  </S.PlusIconWrapper>
                }
                onClick={handleCreatePool}
              />
            )}
          </S.ButtonWrapper>
        </S.SideBarContainer>
      </S.SideBarBody>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}

      {isChooseNetwork && (
        <ModalChooseNetwork
          setIsChooseNetwork={setIsChooseNetwork}
          isOpen={isChooseNetwork}
        />
      )}
    </S.SideBar>
  )
}

export default SideBar
