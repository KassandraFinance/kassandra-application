/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

// prettier-ignore
export const ModalAvailableAssets = styled.div``
export const ModalAvailableAssetsContent = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 59.6rem;
  height: 20rem;
  overflow: auto;

  @media (max-width: 768px) {
    width: 50rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

export const tokenContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;

    text-decoration: none;

    p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.8rem;
    }
  `}
`

