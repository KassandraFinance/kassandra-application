import styled, { css } from 'styled-components'

export const ComissionRates = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;

    max-width: 45.6rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);
  `}
`

export const ValueContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  `}
`

export const TotalValue = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
    letter-spacing: 0.025em;
    text-transform: uppercase;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.3em;
    text-transform: uppercase;
  `}
`
