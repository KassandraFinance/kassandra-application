import Image from 'next/image'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'
import Overlay from '../../Overlay'

import * as S from './styles'

interface IModalProps {
  title: string;
  children: JSX.Element;
  onCloseModal: () => void;
}

const Modal = ({ title, children, onCloseModal }: IModalProps) => {
  return (
    <S.Modal>
      <S.ModalHeader>
        <S.Title>{title}</S.Title>

        <S.CloseButton onClick={onCloseModal}>
          <Image src={closeIcon} alt="Close" width={12} height={12} />
        </S.CloseButton>
      </S.ModalHeader>
      <S.Body>{children}</S.Body>
    </S.Modal>
  )
}

export default Modal
