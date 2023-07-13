import styled, { css } from 'styled-components'

export const AddLiquidity = styled.div`
  ${() => css`
    margin-bottom: 16.5rem;
  `}
`

export const PoolContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.4rem;

    @media (min-width: 992px) {
      grid-template-columns: auto 36.2rem;
    }
  `}
`

export const AddLiquidityContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
  `}
`
