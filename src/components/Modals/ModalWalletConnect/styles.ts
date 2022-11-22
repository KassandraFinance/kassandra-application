import styled from 'styled-components'
import theme from '../../../styles/theme'

export const ModalWalletConnect = styled.div``

export const WrapperIconsBackGround = styled.button`
  display: flex;
  align-items: center;
  padding: 0.1rem;

  background: #1f1f1fb8;
  border-radius: 1rem;
  border: none;

  &.disabled {
    filter: grayscale(1);
  }

  &:hover,
  &:focus {
    background: linear-gradient(0deg, #ffbf00 -0.02%, #e843c4 99.99%);
  }

  &:focus {
    outline: none;
  }
`

export const WrapperIcons = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  width: 100%;
  height: 7rem;
  padding: 1.8rem 2.4rem;

  background: #1f1f1f;
  border-radius: 1rem;
  border: none;

  cursor: pointer;
  z-index: 2;

  img {
    display: flex;
    width: 4rem;
    height: 3.56rem;
    margin-right: 2.4rem;
    padding: 0.2rem;
  }

  span {
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font16};
    letter-spacing: 0.08rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 40rem;

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

export const Tooltip = styled.span`
  display: flex;

  a {
    display: flex;
    align-items: center;

    color: white;
    text-decoration: none;
  }
`
