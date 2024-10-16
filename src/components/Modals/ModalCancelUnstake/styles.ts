import styled from 'styled-components'
import theme from '../../../styles/theme'

import * as ButtonStyles from '../../Button/styles'

export const ModalCancelUnstake = styled.div`
  position: absolute;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 45.2rem;

  @media (max-width: 576px) {
    width: 100%;
  }

  p {
    max-width: 35rem;
    margin: 0 0 1.6rem;

    text-align: center;
    font-size: ${theme.font.sizes.font16};
    line-height: 150%;
    font-weight: ${theme.font.weight.light};
    letter-spacing: 0.08rem;

    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.font14};
      line-height: 130%;
    }
  }

  span {
    margin-bottom: 1.2rem;

    font-size: ${theme.font.sizes.font20};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;

  width: 100%;
  margin-top: 1.6rem;

  ${ButtonStyles.Wrapper} {
    width: 100%;
    height: 4.4rem;

    font-size: ${theme.font.sizes.font18};
  }
`
