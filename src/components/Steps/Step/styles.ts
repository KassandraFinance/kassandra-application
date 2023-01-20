import styled, { css } from 'styled-components'

import { StateType } from './'

export const Step = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    @media (min-width: 768px) {
      gap: 1.2rem;
    }
  `}
`

interface IPositonProps {
  state: StateType;
}

// prettier-ignore
export const Position = styled.span<IPositonProps>`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.4rem;
    height: 2.4rem;

    color: #8b8b8b;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font12};

    border-radius: 50%;

    > svg {
      position: absolute;

      width: 2.4rem;
      height: 2.4rem;
    }

    @media (min-width: 768px) {
      width: 3.2rem;
      height: 3.2rem;

      font-size: ${theme.font.sizes.font14};

      > svg {
        position: absolute;

        width: 3.2rem;
        height: 3.2rem;
      }
    }
  `}

  ${({ theme, state }) => state === 'CURRENT' && css`
    color: ${theme.colors.white};

    svg {
      circle {
        stroke: ${theme.colors.snow};
      }
    }
  `}

  ${({ theme, state }) => state === 'PREVIOUS' && css`
    color: ${theme.colors.white};
  `}

  ${({ state }) => state === 'NEXT' && css`
    svg {
      circle {
        stroke: transparent;
      }
    }
  `}
`

export const TickWrapper = styled.div`
  ${() => css`
    svg {
      width: 1rem;
      height: 0.8rem;
    }

    @media (min-width: 768px) {
      svg {
        width: 1.4rem;
        height: 1.1rem;
      }
    }
  `}
`

interface ITextProps {
  state: StateType;
}

// prettier-ignore
export const Text = styled.p<ITextProps>`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    white-space: nowrap;

    @media (min-width: 768px) {
      letter-spacing: 0.025em;
    }
  `}

  ${({ state }) => state === 'NEXT' && css`
    display: none;

    @media (min-width: 992px) {
      display: block;

      color: #8B8B8B;
    }
  `}

  ${({ state }) => state === 'PREVIOUS' && css`
    display: none;

    @media (min-width: 992px) {
      display: block;
    }
  `}
`

export const Line = styled.span`
  ${() => css`
    display: block;

    height: 0.2rem;
    width: 100%;

    background-color: #8b8b8b;
    border-radius: 0.1rem;

    &:last-of-type {
      display: none;
    }
  `}
`
