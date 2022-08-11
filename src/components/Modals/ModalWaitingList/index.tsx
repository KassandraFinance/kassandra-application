import Image from 'next/image'
import React from 'react'

import Button from '../../Button'

import closeIcon from '../../../../public/assets/utilities/close-icon.svg'

import * as S from './styles'

interface IModalWaitingListProps {
  setIsModalWaitingList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWaitingList = ({
  setIsModalWaitingList
}: IModalWaitingListProps) => {
  return (
    <>
      <S.Backdrop onClick={() => setIsModalWaitingList(false)}></S.Backdrop>
      <S.Container>
        <S.ModalHeader>
          <S.TitleWrapper>This feature isn’t avalable yet</S.TitleWrapper>

          <S.CloseBtn
            type="button"
            onClick={() => setIsModalWaitingList(false)}
          >
            <Image src={closeIcon} alt="Close" width={12} height={12} />
          </S.CloseBtn>
        </S.ModalHeader>

        <S.ModalBody>
          <S.Text>
            Unfortunately, this feature is not <b>yet</b> available.
          </S.Text>
          <S.Text>
            Click on the button bellow to register and have the chance to become
            one of the first managers of decentralized investment funds in the
            Kassandra Protocol.
          </S.Text>

          <Button
            as="a"
            text="Join the waiting list"
            backgroundPrimary
            fullWidth
            target="_blank"
            rel="noopener noreferrer"
            href="https://3j2bd7x9okh.typeform.com/to/bBnYwVOD"
            onClick={() => setIsModalWaitingList(false)}
          />
        </S.ModalBody>
      </S.Container>
    </>
  )
}

export default ModalWaitingList
