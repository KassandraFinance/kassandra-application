import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { URL_DISCORD_DEV_CHAT } from '@/constants/tokenAddresses'

import substr from '@/utils/substr'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { removeModalAlertText } from '../../../store/reducers/modalAlertText'

import Button from '../../Button'
import Overlay from '../../Overlay'
import Modal from '../Modal'
import { ToastInfo } from '@/components/Toastify/toast'

import kacyError from '../../../../public/assets/images/kassandra-error2.svg'

import * as S from './styles'

const ModalAlert = () => {
  const dispatch = useAppDispatch()
  const errorText = useAppSelector(state => state.modalAlertText.errorText)
  const transactionData = useAppSelector(
    state => state.modalAlertText.transactionData
  )
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

          {transactionData && (
            <>
              <S.transactionData>
                {substr(transactionData, 10)}
                <CopyToClipboard text={transactionData}>
                  <button onClick={() => ToastInfo('Copy address')}>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </button>
                </CopyToClipboard>
              </S.transactionData>

              <S.ButtonWrapper>
                <Link href={URL_DISCORD_DEV_CHAT} passHref>
                  <Button
                    text="Discord"
                    as="a"
                    className="discordLink"
                    fullWidth
                    target="_blank"
                    background="transparent"
                    icon={
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.57924 2.78973C9.57924 2.44566 9.85816 2.16675 10.2022 2.16675H13.9401C14.2841 2.16675 14.5631 2.44566 14.5631 2.78973V6.52759C14.5631 6.87165 14.2841 7.15057 13.9401 7.15057C13.596 7.15057 13.3171 6.87165 13.3171 6.52759V4.41832L6.90487 10.8306C6.66158 11.0738 6.26713 11.0738 6.02385 10.8306C5.78056 10.5873 5.78056 10.1928 6.02385 9.94954L12.5607 3.4127H10.2022C9.85816 3.4127 9.57924 3.13379 9.57924 2.78973ZM3.97245 5.65542C3.80722 5.65542 3.64877 5.72106 3.53194 5.83789C3.41511 5.95472 3.34947 6.11317 3.34947 6.2784V13.1312C3.34947 13.2964 3.41511 13.4548 3.53194 13.5717C3.64877 13.6885 3.80722 13.7541 3.97245 13.7541H10.8252C10.9904 13.7541 11.1489 13.6885 11.2657 13.5717C11.3825 13.4548 11.4482 13.2964 11.4482 13.1312V9.39329C11.4482 9.04923 11.7271 8.77031 12.0712 8.77031C12.4152 8.77031 12.6941 9.04923 12.6941 9.39329V13.1312C12.6941 13.6268 12.4972 14.1022 12.1467 14.4527C11.7962 14.8032 11.3209 15.0001 10.8252 15.0001H3.97245C3.47678 15.0001 3.00141 14.8032 2.65091 14.4527C2.30042 14.1022 2.10352 13.6268 2.10352 13.1312L2.10352 6.2784C2.10352 5.78273 2.30042 5.30736 2.65091 4.95686C3.00141 4.60637 3.47678 4.40947 3.97245 4.40947H7.71031C8.05437 4.40947 8.33329 4.68838 8.33329 5.03244C8.33329 5.37651 8.05437 5.65542 7.71031 5.65542H3.97245Z"
                          fill="white"
                        />
                      </svg>
                    }
                  />
                </Link>
              </S.ButtonWrapper>
            </>
          )}

          <Button
            text="Okay"
            background="secondary"
            fullWidth
            onClick={handleCloseModal}
          />
        </S.ModalBody>
      </Modal>
    </S.ModalAlert>
  )
}

export default ModalAlert
