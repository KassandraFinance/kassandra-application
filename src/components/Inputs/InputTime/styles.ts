import styled, { css } from 'styled-components'

export const WrapperInputTime = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.8rem;
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
  `}
`

export const InputNumber = styled.input`
  ${({ theme }) => css`
    position: relative;

    width: 7.5rem;
    height: 4.8rem;
    padding: 1.6rem;
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 100%;
    text-align: center;

    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;

    ::placeholder {
      color: #fcfcfc;
    }
    :focus::-webkit-input-placeholder {
      color: transparent;
    }
    :focus:-moz-placeholder {
      color: transparent;
    }
    :focus::-moz-placeholder {
      color: transparent;
    }
    :focus:-ms-input-placeholder {
      color: transparent;
    }

    outline: none;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    :required:invalid {
      border: 1px solid #e8372c;
      color: #e8372c;
    }
    :required:valid {
      border: 1px solid #2ce878;
    }
  `}
`
