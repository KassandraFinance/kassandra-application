import styled, { css } from 'styled-components'

export const Pool = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const Container = styled.div`
  ${() => css`
    min-height: 100vh;

    @media (min-width: 992px) {
      padding-inline: 15rem;
    }
  `}
`
