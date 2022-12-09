import * as S from './styles'

interface IFundSummaryProps {}

const FundSummary = ({}: IFundSummaryProps) => {
  return (
    <S.FundSummary>
      <S.Header>
        <S.HeaderTitle>Fund Summary</S.HeaderTitle>

        <S.HeaderTitle>Allocation</S.HeaderTitle>
      </S.Header>

      <S.Body>
        <S.CoinContainer>
          <S.Coin>
            <S.CoinData></S.CoinData>
          </S.Coin>

          <S.ProgressBar>
            <S.ProgressValue></S.ProgressValue>
          </S.ProgressBar>
        </S.CoinContainer>
      </S.Body>
    </S.FundSummary>
  )
}

export default FundSummary
