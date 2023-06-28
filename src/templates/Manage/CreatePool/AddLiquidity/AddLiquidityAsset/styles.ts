import styled, { css } from 'styled-components'

export const AddLiquidityAsset = styled.div`
  ${() => css`
    padding: 2.4rem;
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
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
