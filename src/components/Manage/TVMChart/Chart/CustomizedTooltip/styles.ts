import styled, { css } from 'styled-components'

export const CustomizedTooltip = styled.div`
  ${() => css``}
`

export const Title = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1.2rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font16};
      line-height: ${theme.font.sizes.font16};
      letter-spacing: 0.05em;
    }
  `}
`
export const ValueContainer = styled.div`
  ${() => css``}
`

export const Value = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font24};
    line-height: ${theme.font.sizes.font32};
  `}
`
