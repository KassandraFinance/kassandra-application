import styled, { css } from 'styled-components'

export const TitleWithCounter = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `}
`

export const TitleWrapper = styled.span`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    letter-spacing: 0.8px;
  `}
`

export const Optional = styled.strong`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    letter-spacing: 0.8px;
  `}
`

export const Values = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    text-transform: lowercase;
    letter-spacing: 0.8px;
  `}
`
