import styled, { css } from 'styled-components'
import { Overlay } from '../../components/Overlay/styles'

export const Manage = styled.div`
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
    grid-template-columns: 0 100%;
    overflow-x: hidden;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: grid;

    > ${Overlay} {
      z-index: 1020;
    }

    @media (min-width: 768px) {
      grid-template-columns: 7.4rem calc(100% - 7.4rem);

      > ${Overlay} {
        background-color: rgb(0 0 0 / 0);
        backdrop-filter: blur(0);
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

export const Content = styled.section``

export const UserDashBoardButton = styled.button`
  ${() => css`
    position: absolute;
    top: 2.4rem;
    right: 7.2rem;

    display: none;

    @media (max-width: 768px) {
      z-index: 1020;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 50%;

      background-color: rgb(255 255 255 / 0.1);

      cursor: pointer;
    }
  `}
`

interface IUserImageWrapperProps {
  isOpen: boolean;
}

// prettier-ignore
export const UserImageWrapper = styled.div<IUserImageWrapperProps>`
  ${({ isOpen }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2rem;
    height: 2rem;

    opacity: ${isOpen ? '0' : '1'};

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity;

    img {
      object-fit: cover;

      border-radius: 50%;
    }
  `}
`

interface ICloseIconWrapperProps {
  isOpen: boolean;
}

// prettier-ignore
export const CloseIconWrapper = styled.div<ICloseIconWrapperProps>`
  ${({ isOpen }) => css`
    position: absolute;

    opacity: ${isOpen ? '1' : '0'};

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity;
  `}
`

export const NetworkImageWrapper = styled.div`
  ${() => css`
    position: absolute;
    right: -1rem;
    bottom: -0.9rem;

    width: 1.2rem;
    height: 1.2rem;
  `}
`
