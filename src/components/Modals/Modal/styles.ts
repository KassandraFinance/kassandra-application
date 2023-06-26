import styled, { css, keyframes } from 'styled-components'

export const Modal = styled.div`
  ${() => css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 1.2rem;

    z-index: 1050;

    animation: ${fadeInAnimation} 750ms forwards;

    @media (max-width: 576px) {
      width: calc(100% - 3.2rem);
    }
  `}
`

export const ModalHeader = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 7.2rem;

    padding: 2.4rem;
    background-color: #1f2226;
    border-radius: 1.2rem 1.2rem 0 0;
    border-bottom: 0.1rem solid #575f69;
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

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
    border-radius: 0 0 1.2rem 1.2rem;
  `}
`

const fadeInAnimation = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`
