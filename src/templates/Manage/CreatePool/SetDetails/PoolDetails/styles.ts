import styled, { css } from 'styled-components'

export const PoolDetails = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const Details = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    margin-bottom: 3.2rem;
  `}
`

export const Strategy = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @media (min-width: 992px) {
      margin-bottom: 10rem;
    }
  `}
`
