import React, { ReactNode } from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'
import Overlay from '../../Overlay'
import substr from '@/utils/substr'

import * as S from './styles'

interface IModalViewCoinProps {
  title: {
    logo: string
    name: string
    address?: string
  }
  isOpen: boolean
  isBlockies?: boolean
  isJazzicon?: boolean
  onClick: () => void
  children: ReactNode
}

const ModalViewCoin = ({
  title,
  isOpen,
  isBlockies = false,
  isJazzicon = false,
  onClick,
  children
}: IModalViewCoinProps) => {
  return (
    <S.ModalViewCoin>
      {isOpen && <Overlay isOpen={isOpen} onClick={onClick} />}

      <S.ModalCoin isOpen={isOpen}>
        <S.ModalHeader>
          <S.ImageWrapper>
            {title?.logo?.length > 0 && (
              <Image src={title.logo} width={24} height={24} />
            )}

            {title?.logo.length <= 0 && isBlockies && (
              <Blockies seed={title.name} size={8} scale={3} />
            )}

            {title?.logo.length <= 0 && isJazzicon && (
              <Jazzicon
                diameter={24}
                seed={jsNumberForAddress(title?.address || '')}
              />
            )}
          </S.ImageWrapper>
          <S.Title>
            {title?.address ? substr(title.address) : title.name}
          </S.Title>

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
