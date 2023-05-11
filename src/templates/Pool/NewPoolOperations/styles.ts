import styled, { css, keyframes } from 'styled-components'

export const NewPoolOperations = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0.8rem;

  @media (max-width: 960px) {
    position: auto;
    z-index: 1041;
  }
`

// eslint-disable-next-line prettier/prettier
export const PoolOperationsContainer = styled.div`
  ${() => css`
    border-radius: 1.2rem;
    box-shadow: 0px 4px 69px -17px rgba(0, 0, 0, 0.51);

    @media (max-width: 960px) {
      z-index: 1041;
    }
  `}
`

interface ISelectOperationProps {
  isOpen: boolean;
}

// eslint-disable-next-line prettier/prettier
export const TokenSelectionContainer = styled.div<ISelectOperationProps>`
  ${({ isOpen }) => css`
    /* animation: ${fadeInAnimation} 750ms forwards; */

    ${isOpen
      ? `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
      border: 0.2rem solid rgba(255, 255, 255, 0.25);
      border-radius: 1.2rem;
      z-index: 1041;
    `
      : `
      @media (max-width: 960px) {
        display: none;
      }
    `}
  `}
`

// eslint-disable-next-line prettier/prettier
export const SelectOperationContianer = styled.div<ISelectOperationProps>`
  ${({ isOpen }) => css`
    max-width: 44.8rem;

    ${isOpen
      ? `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: rgb(31, 41, 55);
        border: 0.2rem solid rgba(255, 255, 255, 0.25);
        border-radius: 1.2rem;
        z-index: 1041;
        `
      : `
        @media (max-width: 960px) {
          display: none;
        }
      `}
  `}
`

const fadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`
