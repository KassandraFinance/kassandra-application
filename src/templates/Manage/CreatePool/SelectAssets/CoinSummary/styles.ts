import styled, { css } from 'styled-components'

export const CoinSummary = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css``}
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

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

export const Symbol = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 104%;
    text-transform: uppercase;
  `}
`
