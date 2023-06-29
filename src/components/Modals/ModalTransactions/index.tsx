import React from 'react'
import Image from 'next/image'
import { useSetChain } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import Loading from '@/components/Loading'
import Button from '@/components/Button'

import executedIcon from '@assets/notificationStatus/executed.svg'
import failedIcon from '@assets/notificationStatus/failed.svg'
import spinerIcon from '@assets/iconGradient/spinner.png'

import * as S from './styles'

export enum TransactionStatus {
  START,
  WAITING,
  CONTINUE,
  COMPLETED
}

export type StatusType = 'WAITING' | 'APPROVED' | 'APPROVING' | 'NEXT' | 'ERROR'

export type TransactionsListType = {
  key: string
  transaction: string
  status: StatusType
}

export type ButtonTextProps = Record<TransactionStatus, string>

interface IModalTransactionsProps {
  title: string
  transactions: TransactionsListType[]
  isCompleted: boolean
  transactionButtonStatus: TransactionStatus
  buttonText: ButtonTextProps
  onStart: () => Promise<void>
  onCancel: () => void
  onComfirm: () => void
  networkId?: number | null
}

const ModalTransactions = ({
  title,
  transactions,
  isCompleted,
  transactionButtonStatus,
  buttonText,
  onStart,
  onCancel,
  onComfirm,
  networkId = null
}: IModalTransactionsProps) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  function handleChangeChain(networkId: number) {
    const id = `0x${networkId.toString(16)}`
    const chain = chains.filter(chain => chain.id === id)
    setChain({ chainId: chain[0].id, chainNamespace: chain[0].namespace })
  }

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)

    return () => clearTimeout(timer)
  }, [])

  return transactions.length > 0 && !isLoading ? (
    <S.ModalTransactions>
      <S.Title>{title}</S.Title>

      <S.TransactionContainer>
        {transactions?.map(transaction => {
          return (
            <S.Transaction key={transaction.key}>
              <S.TransactionText status={transaction.status}>
                {transaction.transaction}
              </S.TransactionText>

              <S.TransactionStatus>
                {transaction.status === 'APPROVED' && (
                  <Image src={executedIcon} width={20} height={20} />
                )}

                {(transaction.status === 'WAITING' ||
                  transaction.status === 'NEXT') && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM18.1508 10C18.1508 14.5015 14.5015 18.1508 10 18.1508C5.49846 18.1508 1.84925 14.5015 1.84925 10C1.84925 5.49846 5.49846 1.84925 10 1.84925C14.5015 1.84925 18.1508 5.49846 18.1508 10Z"
                      fill={
                        transaction.status === 'WAITING' ? '#343434' : '#fcfcfc'
                      }
                    />
                  </svg>
                )}

                {transaction.status === 'APPROVING' && (
                  <S.Spinner>
                    <Image src={spinerIcon} />
                  </S.Spinner>
                )}
                {transaction.status === 'ERROR' && <Image src={failedIcon} />}
              </S.TransactionStatus>
            </S.Transaction>
          )
        })}
      </S.TransactionContainer>

      <S.ButtonsWrapper>
        {networkId && networkId !== parseInt(connectedChain?.id || '', 16) ? (
          <Button
            text={`Connect to ${networks[networkId].chainName}`}
            backgroundPrimary
            fullWidth
            disabledNoEvent={settingChain}
            type="button"
            onClick={() => handleChangeChain(networkId)}
          />
        ) : (
          <>
            {!isCompleted && (
              <Button
                text={buttonText[transactionButtonStatus]}
                backgroundPrimary
                fullWidth
                type="button"
                disabledNoEvent={
                  transactionButtonStatus === TransactionStatus.WAITING
                }
                onClick={onStart}
              />
            )}
          </>
        )}

        {isCompleted && (
          <Button
            text="Confirm"
            backgroundPrimary
            fullWidth
            type="button"
            onClick={onComfirm}
          />
        )}

        {!isCompleted && (
          <Button
            text="Cancel"
            type="button"
            backgroundBlack
            fullWidth
            onClick={onCancel}
          />
        )}
      </S.ButtonsWrapper>
    </S.ModalTransactions>
  ) : (
    <Loading marginTop={0} />
  )
}

export default ModalTransactions
