import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: transparent;

  z-index: 20;
`

export const ModalContainer = styled.div`
  position: fixed;
  bottom: 7.6rem;
  right: 1.6rem;

  background-color: #372b3b;
  border: 0.1rem solid rgba(255, 255, 255, 0.08);
  border-radius: 0.4rem;

  z-index: 20;

  animation: OpenModalSocialMedia 500ms ease;
  @keyframes OpenModalSocialMedia {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;

  text-decoration: none;

  :hover {
    transition: background-color 0.4s;
    background-color: rgba(255, 255, 255, 0.1);
  }

  cursor: pointer;

  span {
    width: 100%;
    text-align: right;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
  }
`
