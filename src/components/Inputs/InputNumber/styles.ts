import styled, { css } from 'styled-components'

interface IValidateInputValueProps {
  value: number
  max: number
  min: number
}

export const WrapperInputNumber = styled.div<IValidateInputValueProps>`
  ${({ theme }) => css`
    border: 1px solid transparent;
    border-radius: 8px;

    color: #fff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
  `}

  ${({ value, max, min }) =>
    (value > max || value < min) &&
    css`
      border: 1px solid #e8372c;
    `}
  ${({ value, max, min }) =>
    value >= min &&
    value <= max &&
    value !== 0 &&
    css`
      border: 1px solid #2ce878;
    `}
`

interface ILabelProps {
  value: string
}

export const Label = styled.label<ILabelProps>`
  ${({ theme, value }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 7.8rem;
    padding-block: 0.8rem;
    border: 1px solid rgb(255 255 255 / 0.05);
    border-radius: 4px;

    background: rgb(255 255 255 / 0.15);

    ::after {
      content: '%';
      position: absolute;
      right: ${value.length === 1
        ? '1.6rem'
        : value.length === 2
        ? '1.2rem'
        : '0.6rem'};

      color: #fff;
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      font-family: ${theme.font.family};
    }
  `}
`

export const InputNumber = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin-right: 1rem;
    border: none;

    color: #fff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    font-family: ${theme.font.family};
    line-height: 100%;
    text-align: center;

    background-color: transparent;
    outline: none;

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
  `}
`
