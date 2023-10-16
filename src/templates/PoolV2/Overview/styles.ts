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
  `}
`

export const ChangeAndStakeContainer = styled.div`
  ${() => css`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 3.2rem;
    width: 100%;
  `}
`