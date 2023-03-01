import Image from 'next/image'

import Button from '../../Button'

import executedIcon from '../../../../public/assets/notificationStatus/executed.svg'
import spinerIcon from '../../../../public/assets/iconGradient/spinner.png'

import * as S from './styles'

export type TransactionsListType = {
  key: string,
  transaction: string,
  status: 'WAITING' | 'APROVED' | 'APPROVING' | 'NEXT'
}

interface IModalTransactionsProps {
  transactions: TransactionsListType[];
  isCompleted: boolean;
  isApproving: boolean;
  onStart: () => Promise<void>;
  onCancel: () => void;
  onComfirm: () => void;
}

const ModalTransactions = ({
  transactions,
  isCompleted,
  isApproving,
  onStart,
  onCancel,
  onComfirm
}: IModalTransactionsProps) => {
  return (
    <S.ModalTransactions>
      <S.Title>
        To finish the creation of your pool you need to approve the following:
      </S.Title>

      <S.TransactionContainer>
        {transactions?.map(transaction => {
          return (
            <S.Transaction key={transaction.key}>
              <S.TransactionText status={transaction.status}>
                {transaction.transaction}
              </S.TransactionText>

              <S.TransactionStatus>
                {transaction.status === 'APROVED' && (
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
              </S.TransactionStatus>
            </S.Transaction>
          )
        })}
      </S.TransactionContainer>

      <S.ButtonsWrapper>
        {!isCompleted && (
          <Button
            text={
              !isApproving ? 'Start approval process' : 'Waiting for approval'
            }
            backgroundPrimary
            fullWidth
            type="button"
            onClick={
              !isApproving
                ? onStart
                : () => {
                    return
                  }
            }
          />
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
  )
}

export default ModalTransactions
