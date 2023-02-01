import styled, { css } from 'styled-components'

interface IMenuProps {
  isShowMenu: boolean;
}

// prettier-ignore
export const Nav = styled.nav<IMenuProps>`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    gap: 2.4rem;

    @media (max-width: 992px) {
      gap: 1.6rem;
    }

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: -100%;
      bottom: 0;

      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0;

      width: 29.7rem;
      height: 100vh;
      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

      isolation: isolate;
      z-index: 1050;

      overflow-y: auto;
    }

    transition-duration: 750ms;
    transition-timing-function: ease-in-out;
    transition-property: left;
  `}

  ${({ isShowMenu }) => isShowMenu && css`
    @media (max-width: 768px) {
      left: 0;
    }
  `}
`

interface IMenuLinkProps {
  active: boolean;
}

// prettier-ignore
export const MenuLink = styled.a<IMenuLinkProps>`
  ${({ theme, active }) => css`
    position: relative;

    color: ${theme.colors.snow};
    font-weight: ${active ? theme.font.weight.semibold : theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    text-align: center;
    text-decoration: none;

    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      left: ${active ? '0' : '50%'};
      bottom: -1rem;

      width: ${active ? '100%' : '0'};
      height: 0.2rem;

      background-color: ${theme.colors.cyan};
      border-radius: 0.1rem;
      box-shadow: 0 0 0.6rem ${theme.colors.cyan};

      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
      transition-property: width left opacity;
    }

    &:hover::after {
      left: 0%;
      width: 100%;
    }

    &:first-of-type {
      display: none;
    }

    @media (max-width: 768px) {

      width: 100%;
      padding: 2rem 2.4rem;

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      text-align: left;
      letter-spacing: 0.05em;

      border-bottom: 0.1rem solid rgba(255, 255, 255, 0.15);

      &:first-of-type {
        display: block;
      }

      &:after {
        left: 1rem;
        bottom: 50%;

        transform: translateY(50%);

        width: 0.6rem;
        height: 0.6rem;

        opacity: ${active? '1' : '0'};

        border-radius: 50%;
      }

      &:hover::after {
        left: 1rem;

        width: 0.6rem;
        height: 0.6rem;

        opacity: 1;
      }
    }
  `}
`
