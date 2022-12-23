import styled, { css } from 'styled-components'

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
    grid-template-columns: 0rem 100%;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: grid;

    @media (min-width: 768px) {
      grid-template-columns: 7.4rem calc(100% - 7.4rem);
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    grid-template-columns: 26.4rem 100%;

    @media (min-width: 768px) {
      grid-template-columns: 26.4rem calc(100% - 7.4rem);
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
`

export const Content = styled.section`
  /* margin-bottom: 20rem;
  transform: translate(0rem);
  transition-duration: 550ms;
  transition-timing-function: ease-in-out;
  transition-property: transform;

  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -8.8rem;

    width: 100%;
    height: 8.8rem;

    background-color: rgba(255, 255, 255, 0.05);
    /* backdrop-filter: blur(30px); */
  } */

  /* ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateY(8.8rem);

      @media (min-width: 992px) {
        transform: translateY(0rem);
      }
    `}; */
`

export const OpenButton = styled.button`
  ${() => css`
    position: absolute;
    bottom: 2.8rem;
    left: 2.1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.2rem;
    height: 3.2rem;

    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;

    z-index: 1031;

    cursor: pointer;

    @media (min-width: 992px) {
      display: none;
    }
  `}
`
