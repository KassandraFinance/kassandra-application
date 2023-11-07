import styled, { css } from 'styled-components'
import { TokenInfo } from '../TokenInfo/styles'

export const TransactionInfo = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `}
`

export const TransactionInfoContent = styled.li`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${TokenInfo} {
      min-width: auto;
    }
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.4rem;
    text-transform: uppercase;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.4rem;
  `}
`
