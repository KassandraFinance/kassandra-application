import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useAppSelector } from '../../store/hooks'

import Nav from './Nav'
import ModalAlert from '../Modals/ModalAlert'
import ModalLogOut from '../Modals/ModalLogOut'
import ModalWaitingList from '../Modals/ModalWaitingList'
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
  const [isModalWallet, setIsModalWallet] = React.useState<boolean>(false)
  const [isModalLogout, setIsModalLogout] = React.useState<boolean>(false)
  const [isModalWaitingList, setIsModalWaitingList] =
    React.useState<boolean>(false)
  // const [isModalLanguages, setIsModalLanguages] = React.useState<boolean>(false)
  const [isModalSocialMedia, setIsModalSocialMedia] =
    React.useState<boolean>(false)

  const [isShowMenu, setIsShowMenu] = React.useState(false)
  const [showOverlay, setShowOverlay] = React.useState(false)

  const [isChooseNetwork, setIsChooseNetwork] = React.useState(false)

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
              <Image src={kacy96} width={27} height={24} alt="Kassandra" />
            </a>
          </Link>
        </S.LogoWrapper>

        <S.MenuWrapper>
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
            setIsModalWaitingList={setIsModalWaitingList}
            setIsShowMenu={setIsShowMenu}
            setShowOverlay={setShowOverlay}
          />

          <HeaderButtons
            setIsModalWallet={setIsModalWallet}
            setIsChooseNetwork={setIsChooseNetwork}
          />
        </S.MenuWrapper>
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
