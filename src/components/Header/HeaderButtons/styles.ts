import styled, { css } from 'styled-components'

interface IHeaderButtonsProps {
  networkColor: string;
  fillColor: string;
}

// prettier-ignore
export const HeaderButtons = styled.div<IHeaderButtonsProps>`
  ${({ theme, networkColor, fillColor }) => css`
    display: flex;
    gap: 1rem;

    .button-wallet {
      gap: 0.5rem;

      width: fit-content;
      padding: 1.2rem 2rem;
      border: 1px solid ${theme.colors.snow};

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};

      transition: 300ms;

      img {
        width: 1.8rem;
      }

      &:hover,
      &:focus {
        border-color: ${theme.colors.snow};

        color: ${theme.colors.darkPurple};

        background-color: ${theme.colors.snow};
        outline-color: ${theme.colors.snow};
      }

      @media (max-width: 576px) {
        padding: 1.2rem;

        font-weight: ${theme.font.weight.light};
        font-size: ${theme.font.sizes.font12};
        line-height: ${theme.font.sizes.font12};
      }
    }

    .button-network {
      gap: 0;

      padding: 1.2rem 1.6rem;
      border: 0.7px solid ${networkColor};
      border-radius: 4px;

      font-size: 0;

      outline: ${networkColor};

      svg {
        pointer-events: none;
      }

      &:hover, &:focus {
        background-color: ${networkColor};

        svg {
          path {
            fill: ${fillColor};
          }
        }
      }

      &:focus {
        outline: 0.2rem solid ${networkColor};
        outline-offset: 0.2rem;
      }


      @media (max-width: 840px) {
        gap: 0.8rem;

        font-size: ${theme.font.sizes.font14};
      }

      @media (max-width: 576px) {
        padding: 1.2rem;

        font-weight: ${theme.font.weight.light};
        font-size: ${theme.font.sizes.font12};
        line-height: ${theme.font.sizes.font12};
      }
    }

    @media (max-width: 840px) {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${theme.layers.menu};

      align-items: center;

      height: 6.8rem;
      padding: 1.6rem;

      background-color: ${theme.colors.darkPurple};
    }

    @media (max-width: 576px) {
      gap: 0.8rem;

      padding: 1.6rem 1rem;
    }
  `}
`
