import * as S from './styles'

interface ITokenInfoProps {
  tokenData?: {
    logo?: string
    amount?: string
    value?: string
  }
}

const TokenInfo = ({ tokenData }: ITokenInfoProps) => {
  return (
    <S.TokenInfo>
      {tokenData?.logo && (
        <img src={tokenData?.logo} alt="" width={24} height={24} />
      )}

      <S.token>
        {tokenData?.amount && <p>{tokenData?.amount}</p>}
        {tokenData?.value && <p>${tokenData?.value}</p>}
      </S.token>
    </S.TokenInfo>
  )
}

export default TokenInfo
