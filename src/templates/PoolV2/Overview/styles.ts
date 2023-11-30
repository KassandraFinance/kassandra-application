import styled, { css } from 'styled-components'

export const Overview = styled.div`
  ${() => css`
    margin-top: 5.6rem;
  `}
`

export const StatsContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    width: 100%;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  `}
`

export const ChangeAndStakeContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 3.2rem;
    width: 100%;

    margin-block: 5.6rem;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  `}
`
