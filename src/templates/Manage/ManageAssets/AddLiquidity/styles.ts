import styled, { css } from 'styled-components'

export const AddLiquidity = styled.div`
  ${() => css`
    margin-bottom: 16rem;
  `}
`

export const Container = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.4rem;

    @media (min-width: 992px) {
      grid-template-columns: minmax(400px, 457px) 1fr;
    }
  `}
`
