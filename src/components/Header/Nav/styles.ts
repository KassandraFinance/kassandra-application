import styled, { css } from 'styled-components'

interface IMenuProps {
  isShowMenu: boolean;
}

// prettier-ignore
export const Nav = styled.nav<IMenuProps>`
  ${() => css`
    display: flex;
    gap: 2.4rem;
    justify-content: flex-end;
    align-items: center;

    transition-timing-function: ease-in-out;
    transition-duration: 750ms;
    transition-property: left;

    @media (max-width: 992px) {
      gap: 1.6rem;
    }

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: -100%;
      z-index: 1050;

      flex-direction: column;
      gap: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-y: auto;

      width: 29.7rem;
      height: 100vh;

      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

      isolation: isolate;
    }
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
      bottom: -1rem;
      left: ${active ? '0' : '50%'};

      width: ${active ? '100%' : '0'};
      height: 0.2rem;
      border-radius: 1px;

      background-color: ${theme.colors.cyan};
      box-shadow: 0 0 0.6rem ${theme.colors.cyan};

      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
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
      border-bottom: 0.1rem solid rgb(255 255 255 / 0.15);

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      letter-spacing: 0.05em;
      text-align: left;

      &:first-of-type {
        display: block;
      }

      &::after {
        bottom: 50%;
        left: 1rem;

        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;

        opacity: ${active? '1' : '0'};

        transform: translateY(50%);
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
