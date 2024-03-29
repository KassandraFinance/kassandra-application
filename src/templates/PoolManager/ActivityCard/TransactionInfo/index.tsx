import { actionsType } from '..'

import UserInfo from '../UserInfo'
import TokenInfo from '../TokenInfo'

import * as S from './styles'

type TransactionDetails = {
  sharesPrice: string
  tokenIn: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
  tokenOut: {
    logo?: string
    symbol?: string
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
        <S.Text>investor</S.Text>
        <S.Value>
          <UserInfo walletAddress={walletAddress} />
        </S.Value>
      </S.TransactionInfoContent>

      {typeAction === actionsType.DEPOSIT ? (
        <>
          <S.TransactionInfoContent>
            <S.Text>sent</S.Text>
            <TokenInfo tokenData={transactionDetails?.tokenIn} />
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.Text>received</S.Text>
            <S.Value>
              {transactionDetails?.tokenOut.amount} {poolSymbol}
            </S.Value>
          </S.TransactionInfoContent>
        </>
      ) : (
        <>
          <S.TransactionInfoContent>
            <S.Text>sent</S.Text>
            <S.Value>
              {transactionDetails?.tokenIn.amount} {poolSymbol}
            </S.Value>
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.Text>received</S.Text>
            <TokenInfo tokenData={transactionDetails?.tokenOut} />
          </S.TransactionInfoContent>
        </>
      )}

      <S.TransactionInfoContent>
        <S.Text>
          {typeAction === actionsType.DEPOSIT ? 'BUY' : 'SELL'} Price
        </S.Text>
        <S.Value>${transactionDetails?.sharesPrice ?? 0}</S.Value>
      </S.TransactionInfoContent>
    </S.TransactionInfo>
  )
}

export default TransactionInfo
