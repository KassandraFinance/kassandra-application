import styled, { css } from 'styled-components'

export const Operation = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.6rem;
    margin-top: 3.2rem;
  `}
`

export const ButtonWarap = styled.div`
  ${({ theme }) => css`
    width: 12rem;
    height: 4.8rem;

    .sell {
      border: 0.1rem solid ${theme.colors.snow};
      background-color: #ffffff00;

      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
      transition-property: color background-color border-color;
      outline-color: ${theme.colors.snow};

      &:hover,
      &:focus {
        background-color: ${theme.colors.snow};
      }
    }
  `}
`
