import styled, { css } from 'styled-components'
import { HeaderButtons } from './HeaderButtons/styles'
import theme from '../../styles/theme'

interface IWrapperProps {
  dashBoard: boolean;
}

// prettier-ignore
export const Wrapper = styled.div<IWrapperProps>`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 114rem;
  margin-inline: auto;
  margin-block: 3.2rem;

  z-index: ${theme.layers.menu};

  @media (max-width: 1200px) {
    padding-inline: 3rem;
  }

  @media (max-width: 992px) {
    margin-block: 2.4rem;
  }

  @media (max-width: 576px) {
    padding-inline: 1.6rem;
  }

  ${({ dashBoard }) => dashBoard && css`
    justify-content: flex-end;

    margin-inline: auto 2.4rem;

    @media (max-width: 1200px) {
      padding-inline: 0rem;
    }
  `}
`

interface ILogoWrapper {
  dashBoard: boolean;
}

// prettier-ignore
export const LogoWrapper = styled.div<ILogoWrapper>`
  .logo-desktop {
    @media (max-width: 992px) {
      display: none;
    }
  }

  .logo-ipad {
    @media (min-width: 991.98px) {
      display: none;
    }
  }

  cursor: pointer;

  ${({ dashBoard }) => dashBoard && css`
      display: none;
    `}
`

interface IMenuWrapperProps {
  dashBoard: boolean;
}

// prettier-ignore
export const MenuWrapper = styled.div<IMenuWrapperProps>`
  ${() => css`
    display: flex;
    gap: 2rem;
  `}
  ${({ dashBoard }) => dashBoard && css`
    @media (max-width: 991.98px) {
      ${HeaderButtons} {
        display: none;
      }
    }
  `}
`

export const MenuLinkDisable = styled.a`
  position: relative;

  margin-right: 4.2rem;
  padding-top: 1.2rem;
  padding-bottom: 1.3rem;

  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font16};
  font-weight: ${theme.font.weight.light};
  text-decoration: none;
  text-align: center;

  cursor: not-allowed;
  &:hover {
    &::after {
      content: '';
      position: absolute;

      display: block;
      height: 0.3rem;
      margin-top: 1.2rem;

      background-color: ${theme.colors.grayDisabled};
      border-radius: 0.3rem;

      animation: hoverAnimation 0.3s forwards;
    }
    @keyframes hoverAnimation {
      from {
        width: 0;
        left: 50%;
      }
      to {
        width: 100%;
        left: 0;
      }
    }
  }

  @media (max-width: 768px) {
    margin-right: 3.2rem;
  }

  @media (max-width: 541px) {
    margin-right: 2rem;
    font-size: ${theme.font.sizes.font14};
  }

  @media (max-width: 360px) {
    margin-right: 1.4rem;
    font-size: ${theme.font.sizes.font12};
  }

  img {
    position: absolute;
    right: -2rem;
    top: 1.8rem;

    @media (max-width: 540px) {
      right: -1.6rem;
      top: 1.7rem;
    }
    @media (max-width: 360px) {
      top: 1.6rem;
    }
  }
`

export const MenuContainer = styled.div`
  @media (max-width: 840px) {
    display: none;
  }
`

export const HamburgerButton = styled.button`
  ${() => css`
    position: relative;
    display: none;

    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 4rem;
      height: 4rem;

      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;

      cursor: pointer;
      z-index: 1050;
    }
  `}
`

interface IHambuergerMenuProps {
  isShowMenu: boolean;
}

// prettier-ignore
export const HamburgerMenu = styled.div<IHambuergerMenuProps>`
  ${() => css`
    @media (max-width: 768px) {
      position: absolute;

      width: 1.2rem;
      height: 1.2rem;

      div {
        position: relative;
        top: 0;
        height: 0.1rem;
        background-color: ${theme.colors.snow};
        margin-bottom: 0.4rem;
        border-radius: 0.2rem;

        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
        transition-property: transform top width right;
      }

      div:first-child {
        transform-origin: 0;
      }

      div:last-child {
        margin-bottom: 0;
        transform-origin: 1.2rem;
      }

      div:nth-child(2) {
        right: 0;
        width: 1.2rem;
      }

    }
  `}

  ${({ isShowMenu }) => isShowMenu && css`
       div:first-child {
        top: -0.1rem;
        transform: rotateZ(45deg);
      }

      div:last-child {
        top: 0.1rem;
        transform: rotateZ(45deg);
      }

      div:nth-child(2) {
        width: 1.697rem;
        top: 0;
        right: 0.3rem;
        transform: rotateZ(-45deg);
      }
  `}
`
