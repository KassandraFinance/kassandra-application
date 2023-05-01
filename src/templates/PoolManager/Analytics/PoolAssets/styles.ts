import styled, { css } from 'styled-components'

export const PoolAssets = styled.div`
  ${() => css``}
`

export const CoinCardContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
    gap: 2.4rem;

    max-width: 48rem;
    margin-inline: auto;

    @media (min-width: 768px) {
      max-width: 100%;
    }
  `}
`
