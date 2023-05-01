import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

interface IModalBuyKacyProps {
  modalOpen: boolean;
}

// prettier-ignore
export const TermsAndConditions = styled.div<IModalBuyKacyProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: ${props => (props.modalOpen ? 'block' : 'none')};
  padding-inline: 2.4rem;
  padding-top: 2.4rem;
  width: 70rem;

  background: #1F2937;
  border-radius: 1.2rem;

  z-index: 1050;

  animation: OpenModalTermsAndConditions 500ms ease;
  @keyframes OpenModalTermsAndConditions {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 998px) {
    width: 55rem;
  }
  @media (max-width: 576px) {
    width: 35rem;
    padding-inline: 1.6rem;
  }
`

export const ModalHeader = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    h1 {
      width: 100%;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 3.2rem;
      text-align: center;
    }
  `}
`

export const CloseButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.2rem;
    height: 3.2rem;

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    border: none;

    cursor: pointer;
  `}
`

export const TermsAndConditionsBody = styled.div`
  ${() => css`
    position: relative;

    max-height: 70rem;
    margin-top: 1.6rem;
    margin-inline: 1.2rem;
    padding-inline: 1rem;
    padding-bottom: 2.4rem;

    overflow: auto;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
      line-height: 2.4rem;
    }

    h2 {
      margin-top: 1.6rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.8rem;
    }

    hr {
      margin-block: 0.8rem;
      border-top: 0.1rem solid rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 576px) {
      margin-inline: 0;
      max-height: 50rem;
    }

    @media (max-height: 720px) {
      height: 50rem;
    }
  `}
`

interface IShadowProps {
  inView: boolean;
}

// eslint-disable-next-line prettier/prettier
export const shadow = styled.div<IShadowProps>`
  ${({ inView }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: ${inView ? 'none' : 'block'};
    height: 15rem;

    background: linear-gradient(180deg, #1f1f1f20 0%, #1f1f1f 100%);
    border-radius: 0 0 8px 8px;

    background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`
