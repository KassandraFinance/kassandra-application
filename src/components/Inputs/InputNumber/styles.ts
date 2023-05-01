import styled, { css } from 'styled-components'

interface IValidateInputValueProps {
  value: number;
  max: number;
  min: number;
}

// eslint-disable-next-line prettier/prettier
export const WrapperInputNumber = styled.div<IValidateInputValueProps>`
  ${({ theme }) => css`
    color: #ffffff;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};

    border: 1px solid transparent;
    border-radius: 0.8rem;
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
  value: string;
}

// eslint-disable-next-line prettier/prettier
export const Label = styled.label<ILabelProps>`
  ${({ theme, value }) => css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 7.8rem;
    padding-block: 0.8rem;

    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;

    ::after {
      content: '%';
      position: absolute;
      right: ${value.length === 1
        ? '1.6rem'
        : value.length === 2
        ? '1.2rem'
        : '0.6rem'};

      color: #ffffff;
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
    }
  `}
`

export const InputNumber = styled.input`
  ${({ theme }) => css`
    margin-right: 1rem;
    width: 100%;

    color: #ffffff;
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 100%;
    text-align: center;

    outline: none;
    background-color: transparent;
    border: none;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `}
`
