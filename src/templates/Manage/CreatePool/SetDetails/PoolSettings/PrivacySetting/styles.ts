import styled, { css, keyframes } from 'styled-components'

export const PrivacySetting = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    padding: 2.4rem;
    margin-top: 2.4rem;
    margin-bottom: 12rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    @media (min-width: 576px) and (max-width: 992px) {
      margin-top: 0;
    }
  `}
`

export const PoolSettingTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const PoolSettingParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;

    @media (max-width: 360px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

export const InputsRadioContainer = styled.div`
  ${() => css`
    border-top: 0.1rem solid #8b8b8b;
  `}
`

export const InputsRadioContent = styled.span`
  ${({ theme }) => css`
    display: block;
    margin-top: 1.6rem;

    p {
      margin-top: 0.8rem;
      margin-left: 2rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`

export const PrivateAddressContainer = styled.div`
  ${({ theme }) => css`
    animation: ${privateAni} 0.8s ease;

    > p {
      margin-bottom: 0.8rem;
      margin-top: 0.6rem;

      color: #c4c4c4;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.4rem;
      text-transform: uppercase;
    }
  `}
`

interface IInputAddressContainerProps {
  hasValue: boolean;
  isValid: boolean;
}

// prettier-ignore
export const InputAddressContainer = styled.div<IInputAddressContainerProps>`
  ${({ theme }) => css`
    position: relative;

    background: #1b1d22;
    border: 0.1rem solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border;

    input {
      width: 100%;
      padding: 1.6rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};

      background-color: transparent;
      border: none;
      outline: none;
    }
  `}
  ${({ theme, hasValue, isValid }) =>
    hasValue && css`
      border: 0.1rem solid
        ${isValid ? theme.colors.success : theme.colors.error};
  `}
`

export const PrivateAddressList = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    width: 100%;
    margin-top: 0.8rem;

    @media (max-width: 360px) {
      grid-template-columns: 1fr;
    }
  `}
`

export const HasAddress = styled.div`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    bottom: -5rem;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;

    button,
    strong,
    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      text-align: center;
    }

    p {
      width: 100%;
      padding: 1.6rem 1.2rem;
      border-radius: 0.8rem;

      background-color: #26282d;
      transition: outline 0.2s ease;

      &:focus {
        outline: 0.2rem solid #ffffff30;
      }
    }

    button {
      display: flex;
      gap: 0.4rem;
      padding: 1.6rem 1.2rem;
      border: none;
      border-radius: 0.8rem;

      background-color: #26282d;
      transition: outline 0.2s ease;
      cursor: pointer;

      &:focus {
        outline: 0.2rem solid #ffffff30;
      }
    }
  `}
`

export const PrivateAddress = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.8rem 1.6rem;
    width: 100%;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.4rem;

    animation: ${PrivateAddressAni} 0.6s ease;

    @media (max-width: 360px) {
      justify-content: center;
      gap: 4rem;
    }

    > p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
    }

    span {
      display: flex;
      width: 1rem;

      border-radius: 0.8rem;
      transition: background-color 0.2s ease;

      :hover {
        background-color: rgba(255, 255, 255, 0.15);
        cursor: pointer;
      }
    }
  `}
`

export const ClosePrivateAddress = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background-color: transparent;
      border: none;
      margin-top: 1.6rem;
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      cursor: pointer;

      :hover {
        color: #ffffff;
      }
    }
  `}
`

interface IErrorProps {
  isValid: boolean;
}

// prettier-ignore
export const Error = styled.p<IErrorProps>`
  ${({ theme, isValid }) => css`
    display: ${isValid ? 'none' : 'block'};

    margin-top: 0.8rem;

    color: ${theme.colors.error}! important;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: opacity;
  `}
`

const PrivateAddressAni = keyframes`
  from {
    transform: translateX(-1rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`
const privateAni = keyframes`
  from {
    transform: translateY(-2.5rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
