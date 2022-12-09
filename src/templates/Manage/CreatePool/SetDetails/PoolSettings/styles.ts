import styled, { css } from 'styled-components'

export const PoolSettings = styled.div`
  ${() => css`
    width: 100%;

    @media (min-width: 576px) and (max-width: 992px) {
      display: flex;
      align-items: flex-start;
      gap: 2.4rem;
    }
  `}
`
