import Image from 'next/image'
import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { removeModalAlertText } from '../../../store/reducers/modalAlertText'

import Button from '../../Button'
import Overlay from '../../Overlay'
import Modal from '../Modal'

import kacyError from '../../../../public/assets/images/kassandra-error2.svg'

import * as S from './styles'

const ModalAlert = () => {
  const dispatch = useAppDispatch()
  const errorText = useAppSelector(state => state.modalAlertText.errorText)
  const solutionText = useAppSelector(
    state => state.modalAlertText.solutionText
  )

  function handleCloseModal() {
    dispatch(removeModalAlertText())
  }

  return (
    <S.ModalAlert>
      <Overlay onClick={handleCloseModal} />

      <Modal
        title="Error"
        titleIcon={
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_5580_14304)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.97039 5.26329C7.30219 4.0934 9.04505 3.38462 10.9526 3.38462C15.1363 3.38462 18.5278 6.79414 18.5278 11C18.5278 12.9032 17.8334 14.6433 16.6853 15.9782L5.97039 5.26329ZM5.2639 5.97101C4.08957 7.31244 3.37732 9.0726 3.37732 11C3.37732 15.2059 6.76888 18.6154 10.9526 18.6154C12.8842 18.6154 14.647 17.8886 15.985 16.6922L5.2639 5.97101ZM16.9631 17.6702C15.3743 19.118 13.2659 20 10.9526 20C6.00821 20 2 15.9706 2 11C2 6.02944 6.00821 2 10.9526 2C15.897 2 19.9052 6.02944 19.9052 11C19.9052 13.2842 19.0587 15.3697 17.6638 16.9567L17.7279 17.0208L17.0208 17.7279L16.9631 17.6702Z"
                fill="#E3362B"
              />
            </g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.97039 5.26329C7.30219 4.0934 9.04505 3.38462 10.9526 3.38462C15.1363 3.38462 18.5278 6.79414 18.5278 11C18.5278 12.9032 17.8334 14.6433 16.6853 15.9782L5.97039 5.26329ZM5.2639 5.97101C4.08957 7.31244 3.37732 9.0726 3.37732 11C3.37732 15.2059 6.76888 18.6154 10.9526 18.6154C12.8842 18.6154 14.647 17.8886 15.985 16.6922L5.2639 5.97101ZM16.9631 17.6702C15.3743 19.118 13.2659 20 10.9526 20C6.00821 20 2 15.9706 2 11C2 6.02944 6.00821 2 10.9526 2C15.897 2 19.9052 6.02944 19.9052 11C19.9052 13.2842 19.0587 15.3697 17.6638 16.9567L17.7279 17.0208L17.0208 17.7279L16.9631 17.6702Z"
              fill="#E3362B"
            />
            <defs>
              <filter
                id="filter0_f_5580_14304"
                x="0"
                y="0"
                width="21.9053"
                height="22"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="1"
                  result="effect1_foregroundBlur_5580_14304"
                />
              </filter>
            </defs>
          </svg>
        }
        onCloseModal={handleCloseModal}
      >
        <S.ModalBody>
          <Image src={kacyError} />

          <S.ErrorHeading>Something has gone wrong</S.ErrorHeading>

          <S.Text>{errorText}</S.Text>

          {solutionText && (
            <>
              <S.SolutionHeading>Possible solution</S.SolutionHeading>

              <S.Text>{solutionText}</S.Text>
            </>
          )}

          <Button
            text="Okay"
            backgroundSecondary
            fullWidth
            onClick={handleCloseModal}
          />
        </S.ModalBody>
      </Modal>
    </S.ModalAlert>
  )
}

export default ModalAlert
