import styled, { css, keyframes } from 'styled-components'

type StatusIndicator = {
  color: string
  isLoading: boolean
}

export const StatusIndicator = styled.div<StatusIndicator>`
  ${({ color }) => css`
    position: relative;

    min-height: 1.4rem;
    min-width: 1.4rem;

    border-radius: 50%;
    background-color: ${color};

    cursor: pointer;

    &:hover,
    &:focus {
      box-shadow: 0 0 1rem ${color};
    }
  `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      ::before {
        content: '';

        position: absolute;
        left: -0.8rem;
        bottom: -0.8rem;
        width: 3rem;
        height: 3rem;

        background-color: white;
        border-radius: 50%;

        z-index: -1;
        outline: 1px solid transparent;
        animation: ${pulse} 1.6s ease-in-out infinite;
      }
    `}
`

const pulse = keyframes`
  0% {
    opacity: 0.8;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`
