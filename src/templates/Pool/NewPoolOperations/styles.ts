import styled, { css } from 'styled-components'

export const NewPoolOperations = styled.div``

export const PoolOperationsContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0.8rem;

  min-width: 44.8rem;

  border-radius: 1.2rem;

  z-index: 10;

  @media (max-width: 1200px) {
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 960px) {
    display: none;
  }
`
