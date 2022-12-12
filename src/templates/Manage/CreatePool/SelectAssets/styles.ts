import styled, { css } from 'styled-components'

export const SelectAssets = styled.div`
  ${() => css``}
`

export const PoolContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: 992px) {
      grid-template-columns: auto 36.2rem;
      gap: 2.4rem;
    }
  `}
`
