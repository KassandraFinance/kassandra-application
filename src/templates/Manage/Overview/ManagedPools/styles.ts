import styled, { css } from 'styled-components'

export const ManagedPools = styled.div`
  ${() => css`
    margin-bottom: 6.4rem;
  `}
`

export const FilterContainer = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
  `}
`

export const FilterWrapper = styled.div`
  ${() => css`
    @media (min-width: 768px) {
      width: 22.6rem;
    }
  `}
`

export const ManagedPoolsWrapper = styled.div`
  ${() => css`
    width: 40rem;
    margin-inline: auto;

    @media (min-width: 768px) {
      width: 100%;
    }
  `}
`

export const ManagedPoolsContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, auto));
    gap: 1.6rem;

    width: 100%;
  `}
`
