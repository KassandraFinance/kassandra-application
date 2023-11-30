import styled, { css } from 'styled-components'

export const IntroReview = styled.div`
  ${() => css`
    display: flex;
    gap: 3.2rem;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    @media (max-width: 1400px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 576px) {
      align-items: center;
    }
  `}
`

export const GridChart = styled.div``

export const TokenInfoContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 5rem;
    width: 100%;
    align-items: center;

    @media (max-width: 1400px) {
      justify-content: space-between;
      max-width: 32rem;
    }

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 1.6rem;
    }
  `}
`

export const TokenInfoContent = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const ImgAndSymbolWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    gap: 0.7rem;
    margin-top: 1.2rem;

    > p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.7rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const HoldingAndPriceContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-top: 1.2rem;

    @media (max-width: 576px) {
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
    }
  `}
`

export const HoldingWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p:last-child {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
    }
  `}
`

export const TitleHoldingAndPrice = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  `}
`

export const ValueHoldingAndPrice = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font32};
    line-height: 3.2rem;
    letter-spacing: 0.05em;

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font24};
    }
  `}
`

export const PriceDayWrapper = styled.div`
  ${() => css``}
`

export const PriceDayValue = styled.div`
  ${() => css`
    display: flex;
    gap: 0.4rem;
    align-items: flex-end;

    img {
      margin-bottom: 0.2rem;
    }

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`

interface IPriceChangeProps {
  changePrice: number
}

// eslint-disable-next-line prettier/prettier
export const ChangeDayValue = styled.span<IPriceChangeProps>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
    letter-spacing: 0.05em;
  `}

  ${({ theme, changePrice }) =>
    changePrice > 0 &&
    css`
      color: ${theme.colors.success};
    `}
  ${({ theme, changePrice }) =>
    changePrice < 0 &&
    css`
      color: ${theme.colors.error};
    `}
`

export const RebalancingFundCard = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 18rem;
    padding: 2.4rem;
    gap: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;

    max-width: 65rem;

    @media (max-width: 576px) {
      height: auto;
      flex-direction: column;
    }
  `}
`

export const FundInfoBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `}
`

export const TitleWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 110%;
      letter-spacing: 0.02em;
    }
  `}
`

export const RebalancingInfoList = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    margin-top: 2.4rem;
  `}
`

export const RebalancingInfo = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    #remaning {
      text-transform: lowercase;
    }
  `}
`

export const HoursAgoWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    > p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.22em;
    }
  `}
`

export const GraphAllocationWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`

export const NotRebalancingProgress = styled.p`
  ${({ theme }) => css`
    max-width: 40rem;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: center;

    @media (max-width: 576px) {
      margin-top: 1rem;
      font-size: ${theme.font.sizes.font12};
    }
  `}
`

export const RebalancingProgressContent = styled.div`
  ${() => css`
    display: flex;
  `}
`
