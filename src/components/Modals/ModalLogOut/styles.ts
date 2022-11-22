import styled from 'styled-components'
import theme from '../../../styles/theme'

import * as ButtonStyle from '../../Button/styles'

export const ModalLogOut = styled.div``

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    margin-bottom: 1.6rem;

    text-align: center;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};

    @media (max-width: 430px) {
      font-size: 1.4rem;
    }

    @media (max-width: 390px) {
      font-size: 1.2rem;
    }
  }

  span {
    margin-bottom: 1.2rem;

    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.bold};
  }

  ${ButtonStyle.Wrapper} {
    margin-top: 2.4rem;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  button,
  a {
    color: ${theme.colors.cyan};
    font-size: ${theme.font.sizes.font14};
    text-decoration: none;

    background-color: transparent;
    border: none;

    cursor: pointer;

    svg {
      margin-left: 0.8rem;
      margin-bottom: -0.2rem;
    }
  }
`
