import styled, { css } from 'styled-components'
import { Overlay } from '../../components/Overlay/styles'

export const PoolManager = styled.div`
  ${() => css`
    width: 100%;
  `}
`

interface IDashBoardProps {
  isOpen: boolean;
}

// prettier-ignore
export const DashBoard = styled.div<IDashBoardProps>`
  ${() => css`
    display: grid;
    grid-template-columns: 0rem 100%;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: grid;

    overflow-x: hidden;

    > ${Overlay} {
      z-index: 1020;
    }

    @media (min-width: 768px) {
      grid-template-columns: 7.4rem calc(100% - 7.4rem);

      > ${Overlay} {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0rem);
      }
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    grid-template-columns: 100%;

    @media (min-width: 768px) {
      grid-template-columns: 26.4rem calc(100% - 7.4rem);
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
`

export const Content = styled.div`
  ${() => css`
    min-height: 100vh;
    padding-inline: 1.6rem;
    @media (min-width: 768px) {
      padding-inline: 2.4rem;
    }
  `}
`

export const Intro = styled.div``
