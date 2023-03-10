import React, { ReactNode } from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'
import Overlay from '../../Overlay'

import * as S from './styles'

interface IModalViewCoinProps {
  title: {
    logo: string,
    name: string
  };
  isOpen: boolean;
  isBlockies?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const ModalViewCoin = ({
  title,
  isOpen,
  isBlockies = false,
  onClick,
  children
}: IModalViewCoinProps) => {
  return (
    <S.ModalViewCoin>
      {isOpen && <Overlay isOpen={isOpen} onClick={onClick} />}

      <S.ModalCoin isOpen={isOpen}>
        <S.ModalHeader>
          <S.ImageWrapper>
            {title?.logo?.length > 0 ? (
              <Image src={title.logo} width={24} height={24} />
            ) : isBlockies ? (
              <Blockies seed={title.name} size={8} scale={3} />
            ) : null}
          </S.ImageWrapper>
          <S.Title>{title?.name}</S.Title>

          <S.CloseButton type="button" onClick={onClick}>
            <Image src={closeIcon} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>{children}</S.ModalBody>
      </S.ModalCoin>
    </S.ModalViewCoin>
  )
}

export default ModalViewCoin
