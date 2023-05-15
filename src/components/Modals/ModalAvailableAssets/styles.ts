import styled, { css } from 'styled-components'
import { TabsContainer } from '@/components/SelectTabs/styles'

export const ModalAvailableAssets = styled.div`
  ${() => css`
    ${TabsContainer} {
      margin-top: 0;
      margin-bottom: 2.4rem;
    }
  `}
`

interface IAvailableAssetsProps {
  hasToken: boolean
}

// eslint-disable-next-line prettier/prettier
export const ModalAvailableAssetsContent = styled.div<IAvailableAssetsProps>`
  ${({ hasToken }) => css`
    display: ${hasToken ? 'grid' : 'flex'};
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-content: center;
    align-items: center;
    overflow: auto;

    width: 59.6rem;
    height: 20rem;

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
    gap: 1rem;
    align-items: center;

    text-decoration: none;

    p {
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.8rem;

      transition: color 0.15s ease-in-out;

      &:hover {
        color: ${theme.colors.cyan};
      }
    }
  `}
`
