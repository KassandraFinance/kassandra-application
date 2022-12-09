import styled, { css } from 'styled-components'

export const FundSummary = styled.div`
  ${() => css`
    border-radius: 0.8rem;
  `}
`

export const Header = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 6.2rem;
    padding: 2.4rem 1.6rem;

    background: rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem 0.8rem 0rem 0rem;

    @media (min-width: 768px) {
      padding: 2.4rem;
    }
  `}
`

export const HeaderTitle = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
  `}
`

export const Body = styled.div`
  ${() => css`
    padding: 2.4rem 1.6rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 0rem 0rem 0.8rem 0.8rem;

    @media (min-width: 768px) {
      padding: 2.4rem;
    }
  `}
`

export const CoinContainer = styled.div`
  ${() => css``}
`

export const Coin = styled.div`
  ${() => css``}
`

export const CoinData = styled.div`
  ${() => css``}
`

export const ProgressBar = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 0.4rem;

    background-color: #8b8b8b;
    border-radius: 0.4rem;
    border: none;
  `}
`

export const ProgressValue = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 32%;
    height: 0.4rem;

    border-radius: 0.2rem;

    background-color: ${theme.colors.amber};
    background-image: linear-gradient(90deg, #ffbf00 -10.71%, #e843c4 110.71%);

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;

      border-radius: 0.2rem;

      background-color: inherit;
      background-image: inherit;
      filter: blur(5px);
      z-index: -1;
    }
  `}
`
