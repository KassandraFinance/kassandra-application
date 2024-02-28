import styled, { css } from 'styled-components'
import { Modal } from '../Modal/styles'
import { Overlay } from '../../Overlay/styles'
import theme from '../../../styles/theme'

export const ModalAlert = styled.div`
  ${() => css`
    ${Modal},
    ${Overlay} {
      z-index: 1051;
    }
  `}
`

export const ModalBody = styled.div`
  width: 30.7rem;

  text-align: center;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const ErrorHeading = styled.h4`
  height: 18px;
  margin-top: 1.6rem;
  margin-bottom: 0.6rem;

  color: #e8372c;
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font14};
  line-height: 1.8rem;
`

export const ButtonWrapper = styled.div`
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;

  .discordLink {
    display: flex;
    flex-direction: row-reverse;
  }
`

export const transactionData = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    gap: 1rem;

    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};

    button {
      border: 0;

      background-color: transparent;

      cursor: pointer;
    }
  `}
`

export const SolutionHeading = styled.h4`
  height: 18px;
  margin-top: 1.6rem;
  margin-bottom: 0.6rem;

  color: #2ce878;
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font14};
  line-height: 1.8rem;
`

export const Text = styled.p`
  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font14};
  line-height: 1.8rem;

  &:last-of-type {
    margin-bottom: 2.4rem;
  }
`
