import styled, { css } from 'styled-components'

export const Checkbox = styled.div`
  ${() => css`
    display: block;
    position: relative;

    width: 1.6rem;
    height: 1.6rem;
  `}
`

export const Input = styled.input`
  ${() => css`
    position: absolute;

    width: 1.6rem;
    height: 1.6rem;

    opacity: 0;

    cursor: pointer;
  `}
`

export const Checkmark = styled.span`
  ${({ theme }) => css`
    position: absolute;

    width: 1.6rem;
    height: 1.6rem;

    background-color: transparent;
    border: 0.1rem solid ${theme.colors.snow};
    border-radius: 0.2rem;

    pointer-events: none;

    outline: ${theme.colors.snow};

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 1rem;
      height: 1rem;

      background-color: transparent;
      border-radius: 0.1rem;

      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
      transition-property: background-color;
    }

    ${Input}:hover ~ & {
      &:after {
        background-color: ${theme.colors.gray};
      }
    }

    ${Input}:checked ~ & {
      &:after {
        background-color: ${theme.colors.snow};
      }
    }
  `}
`
