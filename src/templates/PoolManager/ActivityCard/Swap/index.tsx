import TokenInfo from '../TokenInfo'
import UserInfo from '../UserInfo'

import * as S from './styles'

type SwapInfo = {
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

interface SwapProps {
  walletAddress: string
  transactionData?: SwapInfo
}

const Swap = ({ walletAddress, transactionData }: SwapProps) => {
  return (
    <S.Swap>
      <S.SwapContent>
        <p>investor</p>
        <UserInfo walletAddress={walletAddress} />
      </S.SwapContent>

      <S.SwapContent>
        <p>in</p>
        <TokenInfo tokenData={transactionData?.tokenIn} />
      </S.SwapContent>

      <S.SwapContent>
        <p>out</p>
        <TokenInfo tokenData={transactionData?.tokenOut} />
      </S.SwapContent>
    </S.Swap>
  )
}

export default Swap
