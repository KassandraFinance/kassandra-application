import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 114rem;
  margin: 0 auto;
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
`

export const LogoWrapper = styled.div`
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
`

export const MenuWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 2rem;
  `}
`

// interface IMenuProps {
//   isShowMenu: boolean;
// }

// export const Menu = styled.nav<IMenuProps>`
//   ${() => css`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;

//     gap: 2.4rem;

//     @media (max-width: 992px) {
//       gap: 1.6rem;
//     }

//     @media (max-width: 576px) {
//       position: fixed;
//       top: 0;
//       left: -100%;
//       bottom: 0;

//       flex-direction: column;
//       justify-content: flex-start;
//       align-items: flex-start;
//       gap: 0;

//       width: 29.7rem;
//       height: 100vh;
//       padding-top: 5.5rem;
//       background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

//       isolation: isolate;
//       z-index: 100;
//     }

//     transition-duration: 750ms;
//     transition-timing-function: ease-in-out;
//     transition-property: left;
//   `}

//   ${({ isShowMenu }) => isShowMenu && css`
//     @media (max-width: 576px) {
//       left: 0;
//     }
//   `}
// `

// interface IMenuLinkProps {
//   active: boolean;
// }

// export const MenuLink = styled.a<IMenuLinkProps>`
//   position: relative;

//   color: ${theme.colors.snow};
//   font-size: ${theme.font.sizes.font16};
//   font-weight: ${props =>
//     props.active ? theme.font.weight.semibold : theme.font.weight.light};
//   text-decoration: none;
//   text-align: center;

//   cursor: pointer;

//   &::after {
//     content: '';
//     position: absolute;
//     bottom: -1rem;

//     left: 50%;
//     width: 0;
//     height: 0.2rem;

//     background-color: ${theme.colors.cyan};
//     border-radius: 0.1rem;
//     box-shadow: 0 0 0.6rem ${theme.colors.cyan};

//     transition-duration: 300ms;
//     transition-timing-function: ease-in-out;
//     transition-property: width left;

//     ${({ active }: IMenuLinkProps) => css`
//       left: ${active ? '0' : '50%'};
//       width: ${active ? '100%' : '0'};
//     `}
//   }

//   &:hover::after {
//     left: 0%;
//     width: 100%;
//   }

//   @media (max-width: 576px) {

//     width: 100%;
//     padding: 2rem 1.6rem;

//     font-weight: ${theme.font.weight.normal};
//     font-size: ${theme.font.sizes.font14};
//     text-align: left;
//     letter-spacing: 0.05em;

//     border-bottom: 0.1rem solid rgba(255, 255, 255, 0.15);

//     &:first-of-type {
//       border-top: 0.1rem solid rgba(255, 255, 255, 0.15);
//     }

//     &:after {
//       width: 0;
//     }

//     &:hover::after {
//       width: 0;
//     }
//   }
// `

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

// export const MenuBottom = styled.div`
//   @media (max-width: 840px) {
//     position: fixed;
//     right: 0;
//     bottom: 0;
//     left: 0;

//     z-index: ${theme.layers.menu};

//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 6.8rem;
//     padding: 1.6rem;

//     background-color: ${theme.colors.darkPurple};
//   }

//   .button-mobile {
//     gap: 0.5rem;
//     width: fit-content;
//     padding: 1.2rem 2rem;

//     font-size: ${theme.font.sizes.font14};
//     font-weight: ${theme.font.weight.normal};
//     border: 0.1rem solid ${theme.colors.snow};
//     transition: 300ms;

//     img {
//       width: 1.8rem;
//     }

//     &:hover,
//     &:focus {
//       border-color: ${theme.colors.snow};
//       background-color: ${theme.colors.snow};
//       color: ${theme.colors.darkPurple};
//       outline-color: ${theme.colors.snow};
//     }
//   }
// `

// export const ButtonsWrapper = styled.div`
//   display: flex;
//   gap: 1rem;
// `

// export const OptionsContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 0.8rem;

//   @media (min-width: 841px) {
//     display: none;
//   }
// `

// export const ButtonOptions = styled.button`
//   width: 3.2rem;
//   height: 3.2rem;

//   background-color: rgba(255, 255, 255, 0.1);
//   border: 0.1rem solid transparent;
//   border-radius: 50%;

//   transition: border 300ms ease-in-out;
//   cursor: pointer;

//   :hover {
//     border: 0.1rem solid rgba(255, 255, 255, 0.11);
//   }
// `

export const MenuContainer = styled.div`
  @media (max-width: 840px) {
    display: none;
  }
`

export const HamburgerButton = styled.button`
  ${() => css`
    position: relative;
    display: none;

    @media (max-width: 576px) {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 3.2rem;
      height: 3.2rem;

      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;

      cursor: pointer;
      z-index: 40;
    }
  `}
`

interface IHambuergerMenuProps {
  isShowMenu: boolean;
}

// prettier-ignore
export const HamburgerMenu = styled.div<IHambuergerMenuProps>`
  ${() => css`
    @media (max-width: 576px) {
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

        transition-duration: 750ms;
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
