import styled, { css } from 'styled-components'

export const TokenInfo = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    min-width: 14rem;
  `}
`

export const token = styled.div`
  ${({ theme }) => css`
    p {
      margin-bottom: 0.4rem;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
    }

    p + p {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
    }
  `}
`
