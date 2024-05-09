import theme from '@/styles/theme'
import styled, { css } from 'styled-components'

export const FundStatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FundStatus = styled.div`
  h4 {
    margin-top: 0.4rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
  }
`

export const ValueContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`

interface ValueProps {
  value: number
}

export const Value = styled.span<ValueProps>`
  ${() => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font18};
    line-height: 2rem;
    letter-spacing: 0.05em;
  `}

  ${({ value }) =>
    value > 0 &&
    css`
      color: ${theme.colors.green};
    `}
    ${({ value }) =>
    value < 0 &&
    css`
      color: ${theme.colors.red};
    `}
`
