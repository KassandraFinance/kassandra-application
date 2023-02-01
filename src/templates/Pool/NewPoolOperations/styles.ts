import styled, { css } from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 102;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);
`

export const NewPoolOperations = styled.div``

export const PoolOperationsContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0.8rem;

  /* min-width: 44.8rem; */

  border-radius: 1.2rem;

  z-index: 103;
`

interface ISelectOperationProps {
  isOpen: boolean;
}

// eslint-disable-next-line prettier/prettier
export const TokenSelectionContainer = styled.div<ISelectOperationProps>`
  ${({ isOpen }) => css`
    z-index: 103;
    ${isOpen
      ? `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      background-color: rgb(31, 41, 55);
      border: 0.2rem solid rgba(255, 255, 255, 0.25);
      border-radius: 1.2rem;
    `
      : `
      position: auto;
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
    z-index: 103;
    ${isOpen
      ? `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: rgb(31, 41, 55);
        border: 0.2rem solid rgba(255, 255, 255, 0.25);
        border-radius: 1.2rem;
      `
      : `
        position: auto;
        @media (max-width: 960px) {
          display: none;
        }
      `}
  `}

  @media (max-width: 960px) {
    /* display: none; */
  }
`
