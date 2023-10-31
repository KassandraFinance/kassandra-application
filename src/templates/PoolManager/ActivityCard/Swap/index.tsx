import TokenInfo from '../TokenInfo'
import UserInfo from '../UserInfo'
import * as S from './styles'

type ISwapInfoProps = {
  in: {
    logo: string
    amount: string
    value: string
  }
  out: {
    logo: string
    amount: string
    value: string
  }
}

interface ISwapProps {
  walletAddress: string
  swapInfo: ISwapInfoProps
}

const Swap = ({ walletAddress, swapInfo }: ISwapProps) => {
  return (
    <S.Swap>
      <S.SwapContent>
        <p>investor</p>
        <UserInfo walletAddress={walletAddress} />
      </S.SwapContent>

      <S.SwapContent>
        <p>in</p>
        <TokenInfo
          logo={swapInfo.in.logo}
          value={swapInfo.in.value}
          amount={swapInfo.in.amount}
        />
      </S.SwapContent>

      <S.SwapContent>
        <p>out</p>
        <TokenInfo
          logo={swapInfo.in.logo}
          value={swapInfo.in.value}
          amount={swapInfo.in.amount}
        />
      </S.SwapContent>
    </S.Swap>
  )
}

export default Swap
