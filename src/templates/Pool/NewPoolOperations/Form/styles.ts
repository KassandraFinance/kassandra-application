import styled, { css } from 'styled-components'

export const Form = styled.div`
  ${() => css`
    background-color: rgba(255, 255, 255, 0.04);
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;

    @media (max-width: 960px) {
      background-color: rgb(31, 41, 55);
    }
  `}
`
