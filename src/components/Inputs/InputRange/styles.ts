import styled, { css } from 'styled-components'

export const WrapperToggle = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1.2rem;
  `}
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

export const InputRange = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 0.3rem;

    background: #8b8b8b;
    border-radius: 0.6rem;

    -webkit-appearance: none;

    ::-webkit-slider-thumb {
      height: 1.6rem;
      width: 1.6rem;

      border-radius: 50%;
      background: ${theme.colors.white};
      box-shadow: 0 0 0.2rem 0 #555;

      cursor: pointer;
      -webkit-appearance: none;
    }

    ::-webkit-slider-runnable-track {
      background: transparent;
      box-shadow: none;
      border: none;

      -webkit-appearance: none;
    }

    ::-webkit-slider-thumb:hover {
      box-shadow: #8b8b8b50 0 0 0 0.8rem;
      border-radius: 50%;
    }

    ::-webkit-slider-thumb:active {
      box-shadow: #8b8b8b50 0 0 0 1.1rem;
      transition:
        box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms,
        bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    ::-webkit-slider-thumb {
      transition: background-color 0.3s ease-in-out;
    }
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
    font-weight: ${theme.font.weight.light};
    line-height: 100%;
    text-align: center;

    background: #1b1d22;
    border-radius: 0.8rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.15);

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:invalid {
      border: 1px solid red;
    }
  `}
`
