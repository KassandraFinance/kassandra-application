import styled, { css } from 'styled-components'

// prettier-ignore
export const ModalAvailableAssets = styled.div``

interface IAvailableAssetsProps {
  hasToken: boolean;
}

// eslint-disable-next-line prettier/prettier
export const ModalAvailableAssetsContent = styled.div<IAvailableAssetsProps>`
  ${({ hasToken }) => css`
    display: ${hasToken ? 'grid' : 'flex'};
    justify-content: center;
    align-items: center;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    width: 59.6rem;
    height: 20rem;

    overflow: auto;

    @media (max-width: 768px) {
      width: 100%;
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      height: auto;
      max-height: 50vh;
    }
  `}
`

export const tokenContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    text-decoration: none;

    p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.8rem;

      transition: color 0.15s ease-in-out;

      &:hover {
        color: ${theme.colors.cyan};
      }
    }
  `}
`
