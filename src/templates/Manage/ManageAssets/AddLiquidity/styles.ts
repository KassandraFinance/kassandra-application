import styled, { css } from 'styled-components'

export const AddLiquidity = styled.div`
  ${() => css`
    margin-bottom: 10rem;
  `}
`

export const Container = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.4rem;

    @media (min-width: 992px) {
      grid-template-columns: 457px 1fr;
    }
  `}
`
