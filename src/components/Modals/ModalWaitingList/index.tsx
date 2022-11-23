import React from 'react'

import Button from '../../Button'
import Overlay from '../../Overlay'
import Modal from '../Modal'

import * as S from './styles'

interface IModalWaitingListProps {
  setIsModalWaitingList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWaitingList = ({
  setIsModalWaitingList
}: IModalWaitingListProps) => {
  return (
    <S.ModalWaitingList>
      <Overlay onClick={() => setIsModalWaitingList(false)} />

      <Modal
        title="This feature isn't avalable yet"
        onCloseModal={() => setIsModalWaitingList(false)}
      >
        <S.ModalContent>
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
        </S.ModalContent>
      </Modal>
    </S.ModalWaitingList>
  )
}

export default ModalWaitingList
