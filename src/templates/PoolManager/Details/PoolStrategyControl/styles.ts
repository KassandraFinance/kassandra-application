import styled, { css, keyframes } from 'styled-components'

export const PoolStrategy = styled.div`
  ${() => css`
    width: 100%;
    margin-top: 2.4rem;
    margin-bottom: 3rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    .updateButton {
      margin-top: 1.2rem;
    }

    @media (min-width: 576px) and (max-width: 992px) {
      margin-top: 0;
    }
  `}
`

export const PoolStrategyContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
  `}
`

export const PoolStrategyTitle = styled.h4`
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
  isShow: boolean
}

export const StrategyAddressContainer = styled.div<IPrivateAddressContainerProps>`
  ${() => css`
    display: flex;
    flex-direction: column;
    max-height: 0;
    margin-top: 1rem;

    opacity: 0;
    overflow: hidden;

    transition-timing-function: ease;
    transition-duration: 600ms;
    transition-property: max-height opacity;
  `}

  ${({ isShow }) =>
    isShow &&
    css`
      opacity: 1;
      max-height: 16rem;
    `}
`

export const labelInputAddress = styled.p`
  ${({ theme }) => css`
    margin-top: 0.6rem;
    margin-bottom: 0.8rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.4rem;
    text-transform: uppercase;
  `}
`

interface IInputAddressContainerProps {
  hasValue: boolean
  isValid: boolean
}

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
    hasValue &&
    css`
      border: 1px solid ${isValid ? theme.colors.success : theme.colors.error};
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

interface IErrorProps {
  isValid: boolean
}

export const Error = styled.p<IErrorProps>`
  ${({ theme, isValid }) => css`
    display: ${isValid ? 'none' : 'block'};

    margin-top: 0.8rem;

    color: ${theme.colors.error};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: max-height opacity;
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
