import styled, { css } from 'styled-components'

export const Overview = styled.div`
  ${() => css`
    margin-top: 5.6rem;
  `}
`

export const StatsContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    width: 100%;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  `}
`

export const ChangeAndStakeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
`

export const ChangeAndStakeContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 3.2rem;
    width: 100%;

    margin-block: 5.6rem;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  `}
`

export const TokenInfoContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 5rem;
    align-items: center;
    width: 100%;

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
