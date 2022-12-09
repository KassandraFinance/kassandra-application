import styled, { css } from 'styled-components'

export const PoolSettings = styled.div`
  ${() => css`
    max-width: 36rem;

    @media (min-width: 360px) and (max-width: 768px) {
      display: flex;
      align-items: flex-start;
      gap: 2.4rem;
      max-width: 100%;
    }
  `}
`
