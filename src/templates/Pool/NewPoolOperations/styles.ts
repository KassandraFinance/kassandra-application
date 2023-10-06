import styled, { css } from 'styled-components'

export const NewPoolOperations = styled.div``

export const PoolOperationsContainer = styled.div`
  ${() => css`
    border-radius: 1.2rem;
    box-shadow: 0px 4px 69px -17px rgba(0, 0, 0, 0.51);

    z-index: 1041;
  `}
`

interface ISelectOperationProps {
  isOpen: boolean
}

export const TokenSelectionContainer = styled.div<ISelectOperationProps>`
  ${() => css`
    width: 44.8rem;

    @media (max-width: 550px) {
      width: 32.4rem;
    }
  `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
      border: 0.2rem solid rgba(255, 255, 255, 0.25);
      border-radius: 1.2rem;
      z-index: 1041;
    `}
`

export const SelectOperationContianer = styled.div<ISelectOperationProps>`
  ${() => css`
    display: none;

    max-width: 44.8rem;
  `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      display: block;

      background-color: rgb(31, 41, 55);
      border: 0.2rem solid rgba(255, 255, 255, 0.25);
      border-radius: 1.2rem;
      z-index: 1041;
    `}
`
