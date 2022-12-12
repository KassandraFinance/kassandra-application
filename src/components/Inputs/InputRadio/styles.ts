import styled, { css } from 'styled-components'

export const InputRadioContainer = styled.span`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `}
`

export const InputRadio = styled.input`
  ${() => css`
    display: none;
    appearance: none;
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    position: relative;

    padding-left: 2rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;

    cursor: pointer;
    transition: transform 0.6s ease-in-out;

    ::after {
      content: '';

      position: absolute;
      left: 0;
      top: 0;

      height: 1.6rem;
      width: 1.6rem;

      border-radius: 50%;
      border: 0.1rem solid white;
    }

    ::before {
      content: '';

      position: absolute;
      left: 0.3rem;
      top: 3px;

      height: 1rem;
      width: 1rem;

      background-color: #ffffff;
      border-radius: 50%;

      opacity: 0;
      transform: scale(0, 0);
      transition: all 0.3s cubic-bezier(0.64, 0.57, 0.67, 1.53);
    }

    ${InputRadio}:checked + &::before {
      opacity: 1;
      transform: scale(1, 1);
    }
  `}
`
