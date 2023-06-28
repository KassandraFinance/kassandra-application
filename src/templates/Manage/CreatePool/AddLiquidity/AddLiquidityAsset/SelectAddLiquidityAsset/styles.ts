import styled, { css } from 'styled-components'

export const SelectAddLiquidityAsset = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    justify-content: center;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.36rem;
    text-transform: uppercase;
  `}
`
