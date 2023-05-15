import styled from 'styled-components'
import theme from '../../../styles/theme'

export const ModalWaitingList = styled.div``

export const ModalContent = styled.div`
  width: 39.2rem;

  text-align: center;

  background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
  backdrop-filter: blur(0.4rem);

  p:first-child {
    margin-bottom: 0.8rem;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const Text = styled.p`
  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 2.1rem;
  letter-spacing: 0.05em;
  text-align: left;

  b {
    font-weight: ${theme.font.weight.medium};
  }

  &:last-of-type {
    margin-bottom: 2.4rem;
  }
`
