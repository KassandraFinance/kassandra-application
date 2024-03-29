import styled, { css } from 'styled-components'

export const InputNumberRight = styled.div`
  ${() => css``}
`

export const Label = styled.label`
  ${() => css`
    position: absolute;

    overflow: hidden;
    clip: rect(0 0 0 0);

    width: 0.1rem;
    height: 0.1rem;
    margin: -0.1rem;
    padding: 0;
    border: 0;
  `}
`

export const InputContainer = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;
  `}
`

interface IInputProps {
  button: boolean
}

export const Input = styled.input<IInputProps>`
  ${({ theme }) => css`
    width: 100%;
    height: 3.2rem;
    padding: 0.8rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 4px;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-style: normal;
    font-size: ${theme.font.sizes.font16};
    font-family: Rubik, sans-serif;
    line-height: 100%;
    text-align: right;

    background: rgb(255 255 255 / 0.08);
    outline: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      appearance: none;
    }

    /* Firefox */
    &[type='number'] {
      appearance: textfield;
    }

    &:valid:not([value='']) {
      border: 1px solid ${theme.colors.success};
    }

    &:invalid:not([value='']) {
      border: 1px solid ${theme.colors.error};
    }
  `}
  ${({ button }) =>
    button &&
    css`
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &:valid:not([value='']) {
        border-right: none;
      }

      &:invalid:not([value='']) {
        border-right: none;
      }
    `}
`

export const PlaceholderWrapper = styled.span`
  ${() => css`
    position: absolute;
    top: 0;
    right: 0;

    display: inline-block;

    height: 3.2rem;
    border: 1px solid rgb(255 255 255 / 0);

    opacity: 1;
    pointer-events: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity;

    ${Input}:not([value='']) ~ &,
    ${Input}:focus ~ & {
      opacity: 0;
    }
  `}
`

export const Placeholder = styled.span`
  ${({ theme }) => css`
    display: inline-block;

    height: 3.2rem;
    padding: 0.8rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-style: normal;
    font-size: ${theme.font.sizes.font16};
    font-family: Rubik, sans-serif;
    line-height: 100%;
    text-align: right;
  `}
`

export const Line = styled.span`
  ${() => css`
    position: absolute;
    left: 0;

    width: 0.1rem;
    height: 1.4rem;

    background-color: rgb(255 255 255 / 0.15);
  `}
`

export const InputButton = styled.button`
  ${({ theme }) => css`
    position: relative;

    height: 3.2rem;
    padding-inline: 0.8rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    background: rgb(255 255 255 / 0.08);

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    ${Input}:valid:not([value='']) ~ & {
      border: 1px solid ${theme.colors.success};
      border-left: none;
    }
    ${Input}:invalid:not([value='']) ~ & {
      border: 1px solid ${theme.colors.error};
      border-left: none;
    }
  `}
`
