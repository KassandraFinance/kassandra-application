import styled, { css } from 'styled-components'

export const InputNumberRight = styled.div`
  ${() => css``}
`

export const Label = styled.label`
  ${() => css`
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    clip: rect(0 0 0 0);
    overflow: hidden;
  `}
`

export const InputContainer = styled.div`
  ${() => css`
    position: relative;
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 3.2rem;
    padding: 0.8rem;

    color: ${theme.colors.white};
    font-family: 'Rubik';
    font-style: normal;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 100%;
    text-align: right;

    background: rgba(255, 255, 255, 0.08);
    border: 0.1rem solid rgba(255, 255, 255, 0);
    border-radius: 0.4rem;

    outline: none;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:valid {
      border: 0.1rem solid ${theme.colors.success};
    }
    &:invalid:not([value='']) {
      border: 0.1rem solid ${theme.colors.error};
    }

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border;
  `}
`

export const PlaceholderWrapper = styled.span`
  ${() => css`
    position: absolute;
    top: 0;
    right: 0;

    display: inline-block;

    height: 3.2rem;

    border: 0.1rem solid rgba(255, 255, 255, 0);
    opacity: 1;

    pointer-events: none;

    ${Input}:not([value='']) ~ &,
    ${Input}:focus ~ & {
      opacity: 0;
    }

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: opacity;
  `}
`

export const Placeholder = styled.span`
  ${({ theme }) => css`
    display: inline-block;

    height: 3.2rem;
    padding: 0.8rem;

    color: ${theme.colors.white};
    font-family: 'Rubik';
    font-style: normal;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 100%;
    text-align: right;
  `}
`
