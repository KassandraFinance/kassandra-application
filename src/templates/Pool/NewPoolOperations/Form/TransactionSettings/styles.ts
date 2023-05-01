import styled from 'styled-components'
import theme from '../../../../../styles/theme'

export const TransactionSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  font-size: ${theme.font.sizes.font14};
  text-align: center;

  button {
    position: relative;
    display: flex;
    align-items: center;

    margin-left: 0.4rem;

    border: none;
    background-color: transparent;

    cursor: pointer;
    transition: transform 300ms ease;

    :hover {
      transform: rotate(-180deg);
    }
  }

  label {
    display: flex;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: 300;

    > span {
      display: flex;
      margin-left: 0.4rem;
    }

    @media (max-width: 360px) {
      font-size: 1.07rem;
    }
  }

  fieldset {
    position: absolute;
    right: 0.1rem;
    bottom: 3rem;

    padding: 2rem;

    background-color: #1f2937;
    border-radius: 1rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);

    animation: OpenModalSettings 600ms ease;
    z-index: 22;

    @keyframes OpenModalSettings {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @media (max-width: 960px) {
      padding: 1.6rem;
    }

    @media (max-width: 360px) {
      padding: 1.2rem;
      right: -2rem;
    }
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 20;
`

export const TransactionContentOptions = styled.div`
  position: relative;

  display: flex;
  align-items: center;
`

export const TransactionOptions = styled.div`
  display: flex;
  gap: 1.1rem;

  @media (max-width: 550px) {
    gap: 0.8rem;
  }
`
export const TransactionOption = styled.div`
  position: relative;
  flex: 1;

  span {
    position: absolute;
    top: 1rem;
    right: 1.8rem;

    color: ${theme.colors.snow};
    pointer-events: none;
  }

  &:last-child {
    flex: 2;

    label {
      position: absolute;

      width: 0;
      height: 0;
      padding: 0;

      border: none;
      opacity: 0;
      overflow: hidden;
    }
  }

  & > input:not(.custom) {
    display: block;
    height: 0;
    width: 0;

    opacity: 0;
  }

  .custom,
  label {
    display: block;
    width: 7.2rem;
    padding: 0.8rem 1.8rem;

    font-size: ${theme.font.sizes.font14};
    text-align: center;

    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-radius: 0.3rem;

    cursor: pointer;

    @media (max-width: 550px) {
      width: 6rem;
    }
  }

  .custom {
    width: 9.2rem;
    height: 100%;

    padding-top: 0;
    padding-right: 3.2rem;
    padding-bottom: 0;
    padding-left: 1.8rem;

    color: ${theme.colors.snow};
    text-align: right;

    background-color: rgba(255, 255, 255, 0.15);
    cursor: auto;

    &::placeholder {
      color: ${theme.colors.snow};
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    -moz-appearance: textfield;
    appearance: textfield;

    @media (max-width: 550px) {
      width: 7.5rem;
    }
  }

  input:checked + label,
  input:checked + .custom {
    font-weight: 450;
    color: ${theme.colors.darkPurple};

    background-color: ${theme.colors.snow};
    border-color: ${theme.colors.snow};

    &::placeholder {
      color: #948499;
    }
  }

  input:checked + .custom + span {
    color: ${theme.colors.darkPurple};
  }

  input:focus + label,
  input:focus + .custom:not(:focus) {
    outline: 0.1rem solid ${theme.colors.snow};
    outline-offset: 0.1rem;
  }

  .custom:focus {
    outline: none;
  }
`
