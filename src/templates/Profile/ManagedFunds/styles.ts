import styled, { css } from 'styled-components'
import { BackgroundCard } from '@/components/AnyCard/styles'

export const ManagedFunds = styled.div`
  ${() => css`
    margin-top: 3.2rem;

    ${BackgroundCard} {
      gap: 2.4rem;
    }
  `}
`

export const ManagedPoolsContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.4rem;

    max-width: 40rem;
    margin-inline: auto;
    margin-top: 2.4rem;

    @media (min-width: 768px) {
      max-width: 100%;
    }
  `}
`
