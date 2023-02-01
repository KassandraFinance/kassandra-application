import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../../store/hooks'

import Nav from './Nav'
import ModalAlert from '../Modals/ModalAlert'
import ModalLogOut from '../Modals/ModalLogOut'
import ModalWalletConnect from '../Modals/ModalWalletConnect'
import ModalInstitucionalLinksMobile from '../Modals/ModalInstitucionalLinksMobile'
import ModalChooseNetwork from '../Modals/ModalChooseNetwork'
import HeaderButtons from './HeaderButtons'

import kacy96 from '../../../public/assets/logos/kacy-96.svg'
import logoKassandra from '../../../public/assets/logos/kassandra-header.svg'

import * as S from './styles'

export type MenuProps = {
  username?: string
}

const Header = () => {
  const [isModalLogout, setIsModalLogout] = React.useState<boolean>(false)
  const [isModalSocialMedia, setIsModalSocialMedia] =
    React.useState<boolean>(false)
  const [isShowMenu, setIsShowMenu] = React.useState(false)
  const [showOverlay, setShowOverlay] = React.useState(false)
  const [isChooseNetwork, setIsChooseNetwork] = React.useState(false)

  const modalWalletActive = useAppSelector(state => state.userWalletAddress)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const isError = useAppSelector(state => state.modalAlertText.errorText)

  const dispatch = useAppDispatch()
  const router = useRouter()

  return (
    <>
      <S.Wrapper id="top" dashBoard={router.pathname === '/manage'}>
        <S.LogoWrapper dashBoard={router.pathname === '/manage'}>
          <Link href="/" passHref>
            <a className="logo-desktop">
              <Image src={logoKassandra} alt="Kassandra" />
            </a>
          </Link>

          <Link href="/" passHref>
            <a className="logo-ipad">
              <Image src={kacy96} width={27} height={24} alt="Kassandra" />
            </a>
          </Link>
        </S.LogoWrapper>

        <S.MenuWrapper dashBoard={router.pathname === '/manage'}>
          <S.HamburgerButton
            onClick={() => {
              setIsShowMenu(!isShowMenu)
              setShowOverlay(true)
            }}
          >
            <S.HamburgerMenu isShowMenu={isShowMenu}>
              <div></div>
              <div></div>
              <div></div>
            </S.HamburgerMenu>
          </S.HamburgerButton>

          <Nav
            isShowMenu={isShowMenu}
            showOverlay={showOverlay}
            setIsShowMenu={setIsShowMenu}
            setShowOverlay={setShowOverlay}
          />

          <HeaderButtons
            setIsChooseNetwork={setIsChooseNetwork}
          />
        </S.MenuWrapper>
      </S.Wrapper>

      {isModalSocialMedia && (
        <ModalInstitucionalLinksMobile setModalOpen={setIsModalSocialMedia} />
      )}

      {modalWalletActive && <ModalWalletConnect />}

      <ModalLogOut
        modalOpen={isModalLogout}
        setModalOpen={setIsModalLogout}
        userWalletAddress={userWalletAddress}
      />

      {isError && <ModalAlert />}

      {isChooseNetwork && (
        <ModalChooseNetwork
          setIsChooseNetwork={setIsChooseNetwork}
          isOpen={isChooseNetwork}
        />
      )}
    </>
  )
}

export default Header
