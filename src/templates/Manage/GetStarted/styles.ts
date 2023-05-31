import styled, { css } from 'styled-components'
import { Wrapper } from '../../../components/Button/styles'

export const GetStarted = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    width: 100%;
    padding-inline: 1.6rem;

    @media (min-width: 768px) {
      padding-inline: 2.4rem;
    }

    @media (min-width: 992px) {
      flex-direction: row-reverse;
      justify-content: center;

      margin-top: 9.6rem;

      > ${Wrapper} {
        width: calc(50% - 0.8rem);
        height: 4.8rem !important;
      }
    }
  `}
`

export const ImageWrapper = styled.div`
  ${() => css``}
`

export const Content = styled.div`
  ${() => css`
    margin-bottom: 2rem;

    @media (min-width: 992px) {
      max-width: 63.2rem;
    }
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 1.6rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font20};
    line-height: ${theme.font.sizes.font20};

    @media (min-width: 768px) {
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font32};
      line-height: 3.5rem;
    }
  `}
`

export const Text = styled.p`
  ${({ theme }) => css`
    margin-bottom: 3.5rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      margin-bottom: 3.2rem;

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
      letter-spacing: normal;
    }
  `}
`

export const ButtonWrapper = styled.div`
  ${() => css`
    @media (min-width: 992px) {
      width: calc(50% - 0.8rem);
    }
  `}
`
