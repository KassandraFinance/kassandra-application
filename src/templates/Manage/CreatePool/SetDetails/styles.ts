import styled, { css } from 'styled-components'

export const SetDetails = styled.div`
  ${() => css`
    overflow-y: auto;

    margin-bottom: 12rem;
  `}
`

export const PoolContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 36rem;
    gap: 2.4rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  `}
`
