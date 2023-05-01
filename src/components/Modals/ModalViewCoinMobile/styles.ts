import styled, { css, keyframes } from 'styled-components'
import theme from '../../../styles/theme'

interface IModalBuyKacyProps {
  modalOpen: boolean;
  isAnimation: boolean;
}

// prettier-ignore
export const ModalViewCoinMobile = styled.div<IModalBuyKacyProps>`
  ${({ modalOpen, isAnimation }) => css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: ${modalOpen ? 'block' : 'none'};
    padding: 1.6rem;

    background: #1F2937;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;

    z-index: 2000;

    animation: ${isAnimation ? ModalCoinTableAni : ModalCoinTableAniInvert} 500ms ease;
  `}
`

export const ModalCoinHeader = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.6rem;

    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.5);

    span {
      cursor: pointer;
    }
  `}
`

export const Coin = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    P {
      color: #fcfcfc;
      font-size: ${theme.font.sizes.font16};
      font-size: ${theme.font.weight.medium};
      line-height: 100%;
      text-transform: uppercase;
    }
  `}
`

export const ModalCoinBody = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 2.4rem;
    margin-top: 2.4rem;
  `}
`

export const CoinData = styled.div`
  ${() => css`
    p {
      margin-bottom: 0.8rem;
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-size: ${theme.font.weight.normal};
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-size: ${theme.font.weight.medium};
    }
  `}
`
// export const test = styled.div`
//   ${() => css` `}
// `

const ModalCoinTableAni = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const ModalCoinTableAniInvert = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`
