import styled, { css, keyframes } from 'styled-components'

export const Modal = styled.div`
  ${() => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #1f2937;
    border-radius: 1.2rem;

    z-index: 1050;

    animation: ${fadeInAnimation} 750ms forwards;

    @media (max-width: 768px) {
      width: calc(100% - 3.2rem);
    }

    @media (max-width: 576px) {
      position: fixed;
      top: auto;
      right: 0;
      left: 0;
      bottom: 0;
      transform: translate(0, 0);

      width: 100%;

      border-radius: 1.2rem 1.2rem 0 0;

      animation: ${translateYAnimation} 750ms forwards;
      transition-property: translate;
    }
  `}
`

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem 1.2rem 0 0;
`

export const ModalHeader = styled.div`
  ${() => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 2.4rem;
    background-color: #1f2226;
    border-radius: 1.2rem 1.2rem 0 0;
    border-bottom: 0.1rem solid #575f69;

    @media (max-width: 576px) {
      background-color: transparent;
      border-bottom: none;
      padding: 1.6rem;
    }
  `}
`

export const Line = styled.div`
  ${() => css`
    @media (max-width: 576px) {
      display: flex;
      height: 0.1rem;
      background-color: rgba(255, 255, 255, 0.5);
      margin-inline: 1.6rem;
    }
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: ${theme.colors.snow};
    font-family: 'Rubik';
    font-style: normal;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 100%;
    letter-spacing: 0.05em;
  `}
`

export const CloseButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.4rem;
    height: 2.4rem;

    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`

export const ModalBody = styled.div`
  ${() => css`
    padding: 2.4rem;

    background-color: #1f2937;
    border-radius: 0 0 1.2rem 1.2rem;

    @media (max-width: 576px) {
      padding: 1.6rem;
      border-radius: 0;
    }
  `}
`

const fadeInAnimation = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`

const translateYAnimation = keyframes`
  0% {
    transform: translateY(100%)
  }
  100% {
    transform: translateY(0)
  }
`
