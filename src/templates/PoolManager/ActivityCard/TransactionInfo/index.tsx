import { actionsType } from '..'

import UserInfo from '../UserInfo'
import TokenInfo from '../TokenInfo'

import * as S from './styles'

type TransactionDetails = {
  sharesPrice: string
  tokenIn: {
    logo?: string
    amount?: string
    value?: string
  }
  tokenOut: {
    logo?: string
    amount?: string
    value?: string
  }
}

interface ITransactionInfoProps {
  poolSymbol: string
  typeAction: actionsType
  walletAddress: string
  transactionDetails?: TransactionDetails
}

const TransactionInfo = ({
  poolSymbol,
  typeAction,
  walletAddress,
  transactionDetails
}: ITransactionInfoProps) => {
  return (
    <S.TransactionInfo>
      <S.TransactionInfoContent>
        <S.text>investor</S.text>
        <S.text2>
          <UserInfo walletAddress={walletAddress} />
        </S.text2>
      </S.TransactionInfoContent>

      {typeAction === actionsType.DEPOSIT ? (
        <>
          <S.TransactionInfoContent>
            <S.text>AMOUNT</S.text>
            <TokenInfo tokenData={transactionDetails?.tokenIn} />
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.text>received value</S.text>
            <S.text2>
              {transactionDetails?.tokenOut.amount} {poolSymbol}
            </S.text2>
          </S.TransactionInfoContent>
        </>
      ) : (
        <>
          <S.TransactionInfoContent>
            <S.text>sended value</S.text>
            <S.text2>
              {transactionDetails?.tokenIn.amount} {poolSymbol}
            </S.text2>
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.text>AMOUNT</S.text>
            <TokenInfo tokenData={transactionDetails?.tokenOut} />
          </S.TransactionInfoContent>
        </>
      )}

      <S.TransactionInfoContent>
        <S.text>SHARES Price</S.text>
        <S.text2>${transactionDetails?.sharesPrice ?? 0}</S.text2>
      </S.TransactionInfoContent>
    </S.TransactionInfo>
  )
}

export default TransactionInfo
