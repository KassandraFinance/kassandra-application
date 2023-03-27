import styled, { css } from 'styled-components'

export const CustomizedTooltip = styled.div`
  ${() => css``}
`
export const ValueContainer = styled.div`
  ${() => css`
    margin-top: 2.7rem;
  `}
`

export const Value = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font24};
    line-height: ${theme.font.sizes.font32};
  `}
`
