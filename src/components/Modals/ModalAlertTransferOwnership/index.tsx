import React from 'react'

import substr from '@/utils/substr'

import Button from '../../Button'
import Overlay from '../../Overlay'
import Modal from '../Modal'

import * as S from './styles'

interface IModalAlertTransferOwnershipProps {
  address: string
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onConfirm: () => void
  onCancel: () => void
}

const ModalAlertTransferOwnership = ({
  address,
  setModalOpen,
  onCancel,
  onConfirm
}: IModalAlertTransferOwnershipProps) => {
  return (
    <S.ModalAlertTransferOwnership>
      <Overlay onClick={() => setModalOpen(false)} />

      <Modal
        title="Attention!"
        titleIcon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.37732 9C1.37732 4.79414 4.76888 1.38462 8.95258 1.38462C13.1363 1.38462 16.5278 4.79414 16.5278 9C16.5278 13.2059 13.1363 16.6154 8.95258 16.6154C4.76888 16.6154 1.37732 13.2059 1.37732 9ZM8.95258 0C4.00821 0 0 4.02944 0 9C0 13.9706 4.00821 18 8.95258 18C13.897 18 17.9052 13.9706 17.9052 9C17.9052 4.02944 13.897 0 8.95258 0ZM8.95258 4.15378C8.57224 4.15378 8.26392 4.46374 8.26392 4.84609C8.26392 5.22844 8.57224 5.5384 8.95258 5.5384H8.96084C9.34118 5.5384 9.6495 5.22844 9.6495 4.84609C9.6495 4.46374 9.34118 4.15378 8.96084 4.15378H8.95258ZM6.61084 8.16926C6.61084 7.78691 6.91916 7.47695 7.2995 7.47695H8.95228C9.33262 7.47695 9.64094 7.78691 9.64094 8.16926V11.6308H10.6051C10.9854 11.6308 11.2937 11.9407 11.2937 12.3231C11.2937 12.7054 10.9854 13.0154 10.6051 13.0154H8.95882C8.95664 13.0154 8.95446 13.0154 8.95228 13.0154C8.9501 13.0154 8.94793 13.0154 8.94575 13.0154H7.2995C6.91916 13.0154 6.61084 12.7054 6.61084 12.3231C6.61084 11.9407 6.91916 11.6308 7.2995 11.6308H8.26362V8.86157H7.2995C6.91916 8.86157 6.61084 8.55161 6.61084 8.16926Z"
              fill="#FFBF00"
            />
          </svg>
        }
        onCloseModal={() => setModalOpen(false)}
      >
        <S.ModalContent>
          <p>
            You are transferring ownership of the pool to the address:
            {substr(address, 6)}. If you have any doubts, remember you can still
            cancel the ownership transfer, but only before the candidate claims
            it. Are you absolutely certain about this?
          </p>

          <S.ButtonContainer>
            <Button
              as="button"
              text="Cancel"
              background="transparent"
              onClick={onCancel}
            />
            <Button
              as="button"
              text="Confirm"
              background="secondary"
              onClick={onConfirm}
            />
          </S.ButtonContainer>
        </S.ModalContent>
      </Modal>
    </S.ModalAlertTransferOwnership>
  )
}

export default ModalAlertTransferOwnership
