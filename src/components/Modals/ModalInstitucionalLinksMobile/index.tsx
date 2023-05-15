import React from 'react'
import Link from 'next/link'

import Overlay from '../../Overlay'

import * as S from './styles'

interface IModalInstitucionalLinksMobileProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line prettier/prettier
const ModalInstitucionalLinksMobile = ({
  setModalOpen
}: IModalInstitucionalLinksMobileProps) => {
  return (
    <>
      <Overlay onClick={() => setModalOpen(false)} />

      <S.ModalContainer>
        <Link href="https://kassandra.finance/" passHref>
          <S.SocialIcon
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>Home</span>
          </S.SocialIcon>
        </Link>
        <Link href="https://kassandra.finance/investors" passHref>
          <S.SocialIcon
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>Investors</span>
          </S.SocialIcon>
        </Link>

        <Link href="https://kassandra.finance/managers" passHref>
          <S.SocialIcon
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>Managers</span>
          </S.SocialIcon>
        </Link>
        <Link href="https://kassandra.finance/dao" passHref>
          <S.SocialIcon
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>DAO</span>
          </S.SocialIcon>
        </Link>
        <Link href="https://kassandra.finance/foundation" passHref>
          <S.SocialIcon
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>Foundation</span>
          </S.SocialIcon>
        </Link>
        <Link href="https://kassandrafoundation.medium.com/" passHref>
          <S.SocialIcon
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setModalOpen(false)}
          >
            <span>Blog</span>
          </S.SocialIcon>
        </Link>
      </S.ModalContainer>
    </>
  )
}

export default ModalInstitucionalLinksMobile
