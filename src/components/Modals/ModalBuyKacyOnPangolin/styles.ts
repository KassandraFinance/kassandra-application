import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);

  z-index: 20;

  animation: OpenModalBuyKacy 500ms ease;
  @keyframes OpenModalBuyKacy {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const LoadingContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  min-width: 40rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  background: #1f2937;
  border: 0.1rem solid rgba(255, 255, 255, 0.25);
  border-radius: 1.2rem;

  z-index: 20;

  animation: OpenModalBuyKacy 500ms ease;
  @keyframes OpenModalBuyKacy {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const LoadingContent = styled.div`
  > button {
    margin-top: 3.4rem;
  }
`

export const textContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > p {
    color: #fcfcfc;
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.normal};
    letter-spacing: 0.05em;
  }
`

export const Spinner = styled.div`
  width: 1.6rem;
  height: 1.6rem;

  animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

// prettier-ignore
export const ModalBuyKacyContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;

  border-radius: 1.2rem;
  background: #1F2937;

  z-index: 21;

  > div {
    border: 0.1rem solid rgba(255, 255, 255, 0.25);
    border-radius: 1.2rem;
  }

  #swap-button {
    color: #fcfcfc;
  }

  animation: OpenModalBuyKacy 500ms ease;
  @keyframes OpenModalBuyKacy {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
