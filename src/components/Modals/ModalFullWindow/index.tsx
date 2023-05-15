import React, { ReactNode } from 'react'
import Image from 'next/image'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'

interface IModalFullWindowProps {
  children: ReactNode
  handleCloseModal: () => void
}

const ModalFullWindow = ({
  children,
  handleCloseModal
}: IModalFullWindowProps) => {
  React.useEffect(() => {
    document.body.style.overflowY = 'hidden'

    const style = document.getElementById('top')?.style
    if (style) {
      style.zIndex = '0'
    }

    const userDashBoardButton = document.getElementById(
      'userDashBoardButton'
    )?.style
    if (userDashBoardButton) {
      userDashBoardButton.zIndex = '0'
    }

    return () => {
      document.body.style.overflowY = 'auto'
      if (style) {
        style.zIndex = '1020'
      }
      if (userDashBoardButton) {
        userDashBoardButton.zIndex = '1021'
      }
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
