import styled, { css } from 'styled-components'

export const CardPoolSection = styled.div`
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

export const PoolsListWrapper = styled.div`
  ${() => css`
    max-width: 40rem;
    margin-inline: auto;

    @media (min-width: 768px) {
      max-width: 100%;
    }
  `}
`

export const PoolsListContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.4rem;

    width: 100%;
  `}
`
