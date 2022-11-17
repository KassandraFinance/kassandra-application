import styled, { css } from 'styled-components'

export const HeaderButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;

    @media (max-width: 840px) {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;

      align-items: center;

      height: 6.8rem;
      padding: 1.6rem;

      background-color: ${theme.colors.darkPurple};

      z-index: ${theme.layers.menu};
    }

    .button-wallet {
      gap: 0.5rem;
      width: fit-content;
      padding: 1.2rem 2rem;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      border: 0.1rem solid ${theme.colors.snow};
      transition: 300ms;

      img {
        width: 1.8rem;
      }

      &:hover,
      &:focus {
        border-color: ${theme.colors.snow};
        background-color: ${theme.colors.snow};
        color: ${theme.colors.darkPurple};
        outline-color: ${theme.colors.snow};
      }
    }
  `}
`
