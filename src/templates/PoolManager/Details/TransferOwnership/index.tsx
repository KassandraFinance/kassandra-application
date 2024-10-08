import React from 'react'
import { ZeroAddress, isAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { URL_APP_KASSANDRA } from '@/constants/tokenAddresses'

import Button from '@/components/Button'
import { ToastInfo } from '@/components/Toastify/toast'
import ModalAlertTransferOwnership from '@/components/Modals/ModalAlertTransferOwnership'

import * as S from './styles'

interface ITransferOwnershipProps {
  poolId: string
  currentCandidate: string
  onTransferOwnership: (address: string) => Promise<void>
}

const TransferOwnership = ({
  poolId,
  currentCandidate,
  onTransferOwnership
}: ITransferOwnershipProps) => {
  const [newAddress, setNewAddress] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState(false)

  const [{ wallet }] = useConnectWallet()

  const hasManagerCandidate =
    currentCandidate !== wallet?.accounts[0].address &&
    currentCandidate !== ZeroAddress

  async function handleClickConfirmButton(address: string) {
    onTransferOwnership(address)
    setModalOpen(false)
    setNewAddress('')
  }

  return (
    <S.PoolStrategy>
      <S.PoolStrategyContainer>
        <S.PoolStrategyTitle>Transfer Ownership</S.PoolStrategyTitle>
        {hasManagerCandidate ? (
          <S.PoolSettingParagraph>
            Below is the link for the portfolio candidate to make the claim and
            become the new owner, and if you&apos;ve changed your mind, you can
            cancel, this applies until the candidate claims it.
          </S.PoolSettingParagraph>
        ) : (
          <S.PoolSettingParagraph>
            Please provide the address of the individual who will receive
            ownership of this portfolio. After the transfer, he will be sent a
            link provided by us. This link will allow the person to claim and
            become the new owner of the portfolio.
          </S.PoolSettingParagraph>
        )}

        {hasManagerCandidate && (
          <S.CopyLink>
            <span>{`${URL_APP_KASSANDRA}/ownership-claim?id=${poolId}`}</span>
            <CopyToClipboard
              text={`${URL_APP_KASSANDRA}/ownership-claim?id=${poolId}`}
            >
              <button type="button" onClick={() => ToastInfo('Link copied!')}>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                    fill="#bdbdbd"
                  />
                </svg>
              </button>
            </CopyToClipboard>
          </S.CopyLink>
        )}
      </S.PoolStrategyContainer>

      <S.StrategyAddressContainer>
        <S.labelInputAddress>
          {hasManagerCandidate ? 'Candidate address' : 'inform the addresses'}
        </S.labelInputAddress>

        <S.InputAddressContainer
          isValid={isAddress(newAddress)}
          hasValue={newAddress.length > 0}
        >
          <input
            id="inputAddress"
            name="inputAddress"
            placeholder="Enter address..."
            value={hasManagerCandidate ? currentCandidate : newAddress}
            onChange={event => setNewAddress(event.target.value)}
            readOnly={hasManagerCandidate}
            disabled={hasManagerCandidate}
          />
        </S.InputAddressContainer>
        <S.Error isValid={newAddress.length > 0 ? isAddress(newAddress) : true}>
          Invalid wallet address
        </S.Error>
      </S.StrategyAddressContainer>

      {hasManagerCandidate ? (
        <Button
          text="Cancel"
          background="transparent"
          fullWidth
          className="updateButton"
          onClick={() =>
            handleClickConfirmButton(wallet?.accounts[0].address ?? ZeroAddress)
          }
        />
      ) : (
        <Button
          text="Transfer"
          background="secondary"
          fullWidth
          className="updateButton"
          onClick={() => setModalOpen(true)}
          disabledNoEvent={!isAddress(newAddress)}
        />
      )}

      {modalOpen && (
        <ModalAlertTransferOwnership
          address={newAddress}
          setModalOpen={setModalOpen}
          onCancel={() => setModalOpen(false)}
          onConfirm={() => handleClickConfirmButton(newAddress)}
        />
      )}
    </S.PoolStrategy>
  )
}

export default TransferOwnership
