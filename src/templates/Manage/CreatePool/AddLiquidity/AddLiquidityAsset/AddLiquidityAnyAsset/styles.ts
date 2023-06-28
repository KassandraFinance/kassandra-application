import styled, { css } from 'styled-components'

export const AddLiquidityAnyAsset = styled.div`
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

export const PriceImpactContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: #c4c4c4;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      line-height: ${theme.font.sizes.font12};
      text-transform: capitalize;
    }
  `}
`

export const Tippy = styled.div`
  ${() => css`
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
    }
  `}
`
