import styled, { css } from 'styled-components'

export const CustomizedTooltip = styled.div`
  ${() => css``}
`
export const ValueContainer = styled.div`
  ${() => css`
    margin-top: 4rem;
  `}
`

export const Value = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font36};
    line-height: ${theme.font.sizes.font32};
  `}
`

export const TimestampSpan = styled.span`
  ${({ theme }) => css`
    margin-inline: 1rem;

    color: rgb(189 189 189);
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
  `}
`
