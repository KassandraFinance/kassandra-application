import styled, { css } from 'styled-components'

export const Operation = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;
    justify-content: flex-start;
    align-items: center;

    margin-top: 3.2rem;
  `}
`

export const ButtonWarap = styled.div`
  ${({ theme }) => css`
    width: 12rem;
    height: 4.8rem;

    .sell {
      border: 1px solid ${theme.colors.snow};

      background-color: #fff0;
      outline-color: ${theme.colors.snow};

      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
      transition-property: color background-color border-color;

      &:hover,
      &:focus {
        background-color: ${theme.colors.snow};
      }
    }
  `}
`
