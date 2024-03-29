import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

export const BorderGradient = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1050;

  width: 30rem;
  max-height: 100%;

  border-radius: ${theme.border.radius};
  border: 1px solid rgba(255, 255, 255, 0.25);

  transform: translate(-50%, -50%);
`

export const BackgroundBlack = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${theme.border.radius};

  background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
`

export const InterBackground = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.8rem;
  padding: 0 2rem;
  border-bottom: 0.1rem solid rgb(255 255 255 / 0.4);
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;

  background-color: rgb(31 31 31 / 0.72);

  span {
    font-size: ${theme.font.sizes.font18};
    line-height: 1.8rem;
  }

  button {
    padding: 0.2rem;
    border: none;

    background-color: transparent;

    cursor: pointer;
  }
`

export const Main = styled.div`
  padding: 2rem;
`

export const Amount = styled.div`
  position: relative;

  padding: 1.6rem;
  border-radius: 1rem;

  text-align: right;

  background-color: rgb(31 31 31 / 0.72);
  border: 2px solid #ffffff15;

  span {
    display: block;

    margin: 0 0 -0.4rem;

    color: ${theme.colors.amber};
    font-size: 1.4rem;
  }

  h5 {
    color: #bdbdbd;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.2rem;
  }

  input {
    max-width: 100%;
    border: none;

    color: #fff;
    font-weight: 500;
    font-size: ${theme.font.sizes.font20};
    text-align: right;

    background-color: transparent;
    outline: none;

    &::placeholder {
      color: #fff;
    }

    &[type='number']::-webkit-inner-spin-button {
      appearance: none;
    }

    &[type='number'] {
      appearance: textfield;
    }

    @media (max-width: 380px) {
      font-size: 2.2rem;
    }

    @media (max-width: 350px) {
      font-size: ${theme.font.sizes.font20};
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 2rem 0 2.4rem;
`

interface IPorcentageButtonProps {
  isActive: boolean
}

export const PorcentageButton = styled.button<IPorcentageButtonProps>`
  ${({ isActive, theme }) => css`
    width: 5.6rem;
    padding: 0.3rem;
    border: 0.1rem solid ${theme.colors.snow};
    border-radius: 0.3rem;

    color: ${isActive ? '#000' : theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.2rem;
    text-transform: uppercase;

    background: ${isActive ? theme.colors.white : 'transparent'};

    cursor: pointer;

    transition: 100ms;

    &:hover {
      color: #000;

      background: ${theme.colors.snow};
    }
  `}
`

export const WrapperButton = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 4.6rem;
  `}
`

export const WrapperGetButton = styled.div`
  ${() => css`
    margin-top: 1.6rem;
  `}
`

export const GetKacy = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4rem;
  border: 0.1rem solid ${theme.colors.cyan};
  border-radius: ${theme.border.radius};

  color: #fff;
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font16};
  line-height: 1.4rem;
  text-decoration: none;

  background: transparent;

  cursor: pointer;

  transition: 200ms;

  &:hover {
    color: #000;

    background: ${theme.colors.cyan};
  }
`
