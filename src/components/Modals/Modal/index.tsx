import { ReactNode } from 'react'
import Image from 'next/image'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'

interface IModalProps {
  title: string
  titleIcon?: JSX.Element | null
  children: ReactNode
  onCloseModal: () => void
}

const Modal = ({
  title,
  titleIcon = null,
  children,
  onCloseModal
}: IModalProps) => {
  return (
    <S.Modal>
      <S.ModalHeader>
        <S.Title>
          {titleIcon}
          {title}
        </S.Title>

        <S.CloseButton onClick={onCloseModal}>
          <Image src={closeIcon} alt="Close" width={12} height={12} />
        </S.CloseButton>
      </S.ModalHeader>

      <S.ModalBody>{children}</S.ModalBody>
    </S.Modal>
  )
}

export default Modal
