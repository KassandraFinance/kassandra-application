import React, { ReactNode } from 'react'
import Image from 'next/image'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'

interface IModalFullWindowProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

const ModalFullWindow = ({
  children,
  handleCloseModal
}: IModalFullWindowProps) => {
  React.useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <S.ModalFullWindow>
      <S.Container>
        <S.CloseButton onClick={handleCloseModal}>
          <Image src={closeIcon} />
        </S.CloseButton>
        {children}
      </S.Container>
    </S.ModalFullWindow>
  )
}

export default ModalFullWindow
