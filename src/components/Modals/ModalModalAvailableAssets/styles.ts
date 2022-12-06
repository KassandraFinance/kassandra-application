/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

// prettier-ignore
export const ModalAvailableAssets = styled.div``
export const ModalAvailableAssetsContent = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  width: 64.4rem;
  height: 20rem;
  overflow: auto;
`

export const tokenContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    width: 100%;

    p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.8rem;
    }
  `}
`

