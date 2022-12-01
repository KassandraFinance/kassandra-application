import styled, { css } from 'styled-components'

export const ModalFullWindow = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: #190e1d;

    background-image: url('/assets/images/background-768.png');
    background-repeat: repeat-y;
    background-size: cover;
    background-position-x: center;

    z-index: 1050;

    @media (min-width: 768px) {
      background-image: url('/assets/images/background-992.png');
    }

    @media (min-width: 992px) {
      background-image: url('/assets/images/background-1440.png');
    }
  `}
`

export const Container = styled.div`
  ${() => css`
    position: relative;

    width: 100%;

    margin-top: 8rem;
    margin-bottom: 17.2rem;
    padding-inline: 1.6rem;

    @media (min-width: 768px) {
      margin-bottom: 19.3rem;
      padding-inline: 2.4rem;
    }

    @media (min-width: 992px) {
      max-width: 134.2rem;

      margin-inline: auto;
      margin-top: 9.8rem;
      margin-bottom: 17.9rem;
      padding-inline: 3.2rem;
    }
  `}
`

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: -6.4rem;
    right: 1.6rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.2rem;
    height: 3.2rem;

    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    border-radius: 50%;

    border: 1px solid rgba(255, 255, 255, 0);

    transition: border ${theme.transition.default};

    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    cursor: pointer;

    @media (min-width: 768px) {
      top: -5.6rem;
      right: 2.4rem;
    }

    @media (min-width: 992px) {
      top: -50;
      right: 3.2rem;
    }
  `}
`
