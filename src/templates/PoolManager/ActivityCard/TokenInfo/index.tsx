import * as S from './styles'

interface ITokenInfoProps {
  logo: string
  amount: string
  value: string
}

const TokenInfo = ({ logo, amount, value }: ITokenInfoProps) => {
  return (
    <S.TokenInfo>
      <img src={logo} alt="" width={24} height={24} />

      <S.token>
        <p>{amount}</p>
        <span>${value}</span>
      </S.token>
    </S.TokenInfo>
  )
}

export default TokenInfo
