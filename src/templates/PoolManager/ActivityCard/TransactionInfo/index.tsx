import { actionsType } from '..'

import UserInfo from '../UserInfo'
import TokenInfo from '../TokenInfo'

import * as S from './styles'

type ITransactionDetailsProps = {
  amount: string
  sharesPrice?: string
  sharesValue?: string
}

interface ITransactionInfoProps {
  poolSymbol: string
  typeAction: actionsType
  walletAddress: string
  transactionDetails?: ITransactionDetailsProps
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
            <TokenInfo
              value="1.2"
              amount="3.0001"
              logo="https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
            />
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.text>received value</S.text>
            <S.text2>
              {transactionDetails?.sharesValue ?? '0'} {poolSymbol}
            </S.text2>
          </S.TransactionInfoContent>
        </>
      ) : (
        <>
          <S.TransactionInfoContent>
            <S.text>sended value</S.text>
            <S.text2>
              {transactionDetails?.sharesValue ?? '0'} {poolSymbol}
            </S.text2>
          </S.TransactionInfoContent>
          <S.TransactionInfoContent>
            <S.text>AMOUNT</S.text>
            <TokenInfo
              value="1.2"
              amount="3.0001"
              logo="https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
            />
          </S.TransactionInfoContent>
        </>
      )}

      <S.TransactionInfoContent>
        <S.text>sHARES Price</S.text>
        <S.text2>${transactionDetails?.sharesPrice ?? '0'}</S.text2>
      </S.TransactionInfoContent>
    </S.TransactionInfo>
  )
}

export default TransactionInfo
