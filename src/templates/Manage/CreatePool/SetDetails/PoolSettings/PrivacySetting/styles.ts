import styled, { css, keyframes } from 'styled-components'

interface IPrivacySetting {
  isOpen: boolean;
  height: number;
}

// prettier-ignore
export const PrivacySetting = styled.div<IPrivacySetting>`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;

    width: 100%;
    height: 27.8rem;
    margin-top: 2.4rem;
    margin-bottom: 12rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    transition: height 0.8s ease;

    @media (min-width: 576px) and (max-width: 992px) {
      margin-top: 0;
    }
  `}
  ${({ isOpen, height }) =>
    isOpen &&
    css`
      height: ${36.022 + height}rem;
    `}
`

export const PoolSettingTitle = styled.h4`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const PoolSettingParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
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
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }
  `}
`

interface IPrivateAddressContainerProps {
  isShow: boolean;
}

// prettier-ignore
export const PrivateAddressContainer = styled.div<IPrivateAddressContainerProps>`
  ${({ theme }) => css`
    opacity: 0;
    visibility: hidden;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity visibility;

    p:first-child {
      margin-top: 0.6rem;
      margin-bottom: 0.8rem;

      color: #c4c4c4;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.4rem;
      text-transform: uppercase;
    }
  `}
  ${({ isShow }) => isShow && css`
      opacity: 1;
      visibility: visible;
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

    border: 1px solid rgb(255 255 255 / 0.15);
    border-radius: 8px;

    background: #1b1d22;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border;

    input {
      width: 100%;
      padding: 1.6rem;
      border: none;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};

      background-color: transparent;
      outline: none;
    }
  `}
  ${({ theme, hasValue, isValid }) =>
    hasValue && css`
      border: 1px solid
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
    bottom: -5rem;
    left: 0;
    z-index: 20;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    button,
    strong,
    p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      text-align: center;
    }

    p {
      width: 100%;
      padding: 1.6rem 1.2rem;
      border-radius: 8px;

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
      border-radius: 8px;

      background-color: #26282d;

      cursor: pointer;

      transition: outline 0.2s ease;

      &:focus {
        outline: 0.2rem solid #ffffff30;
      }
    }
  `}
`

export const PrivateAddress = styled.li`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;

    background: rgb(255 255 255 / 0.05);

    animation: ${PrivateAddressAni} 0.6s ease;

    > p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: 100%;
    }

    span {
      display: flex;

      width: 1rem;
      border-radius: 8px;

      transition: background-color 0.2s ease;

      :hover {
        background-color: rgb(255 255 255 / 0.15);

        cursor: pointer;
      }
    }

    @media (max-width: 360px) {
      gap: 4rem;
      justify-content: center;
    }
  `}
`

export const ClosePrivateAddress = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin-top: 1.6rem;
      border: none;

      color: #c4c4c4;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};

      background-color: transparent;

      cursor: pointer;

      :hover {
        color: #fff;
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

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
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
