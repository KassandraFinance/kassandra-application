import styled, { css } from 'styled-components'

export const Pool = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const Hero = styled.div`
  ${() => css`
    background: rgba(252, 252, 252, 0.05);
    padding-block: 4rem;
  `}
`

export const SelectTabsContainer = styled.div`
  ${() => css`
    min-height: 100vh;

    max-width: 114rem;

    margin-inline: auto;

    list-style-type: none;
  `}
`
