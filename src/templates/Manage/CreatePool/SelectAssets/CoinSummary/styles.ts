import styled, { css } from 'styled-components'

export const CoinSummary = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    min-width: 2.4rem;
    min-height: 2.4rem;
  `}
`

export const TextWrapper = styled.div`
  ${() =>
    css`
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    `}
`

export const Name = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    height: fit-content;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

interface ISymbolProps {
  table: boolean;
}

// prettier-ignore
export const Symbol = styled.span<ISymbolProps>`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 104%;
    text-transform: uppercase;
  `}
  ${({ table }) => table && css`
    span {
      @media (min-width: 992px) {
        display: none;
      }
    }
  `}
`

export const ALink = styled.a`
  ${() => css``}
`

export const BalanceWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.2rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 104%;

    @media (min-width: 576px) {
      display: none;
    }
  `}
`
