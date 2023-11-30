import styled, { css } from 'styled-components'

export const Pool = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const Hero = styled.div`
  ${() => css`
    padding-block: 4rem;

    background: rgb(252 252 252 / 0.05);
  `}
`

export const SelectTabsContainer = styled.div`
  ${() => css`
    max-width: 114rem;
    min-height: 100vh;
    margin-inline: auto;

    list-style-type: none;

    @media (max-width: 1200px) {
      padding-inline: 2.4rem;
    }
    @media (max-width: 576px) {
      padding-inline: 1.6rem;
    }
  `}
`
