import styled, { css } from 'styled-components'

export const TextareaWithValueCounter = styled.div`
  ${() => css``}
`

export const Label = styled.label`
  ${({ theme }) => css`
    display: block;

    margin-bottom: 0.8rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-transform: uppercase;
  `}
`

export const TextareaContainer = styled.div`
  ${() => css`
    position: relative;
  `}
`

interface ITextareaProps {
  valueLength: number
}

export const Textarea = styled.textarea<ITextareaProps>`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem;
    border: 1px solid rgb(255 255 255 / 0.15);
    border-radius: 8px;
    resize: none;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-style: normal;
    font-size: ${theme.font.sizes.font16};
    font-family: Rubik;
    line-height: 150%;
    letter-spacing: normal;

    background: #1b1d22;
    outline: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    &:read-only {
      background-color: transparent;
    }

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      margin: 0;
      appearance: none;
    }
  `}

  ${({ theme, valueLength }) =>
    valueLength > 0 &&
    css`
      &:valid {
        border: 1px solid ${theme.colors.success};
      }
    `}
`

interface IPlaceholderWrapperProps {
  value: number
}

export const PlaceholderWrapper = styled.span<IPlaceholderWrapperProps>`
  ${() => css`
    position: absolute;
    top: 0;
    left: 0;

    display: inline-block;

    border: 1px solid rgb(255 255 255 / 0);

    opacity: 1;
    pointer-events: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity;

    ${Textarea}:focus ~ & {
      opacity: 0;
    }
  `}

  ${({ value }) =>
    value > 0 &&
    css`
      opacity: 0;
    `}
`

export const Placeholder = styled.span`
  ${({ theme }) => css`
    display: inline-block;

    padding: 1.6rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 150%;
    letter-spacing: normal;
  `}
`

export const CounterContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 0.8rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    text-transform: uppercase;
  `}
`
