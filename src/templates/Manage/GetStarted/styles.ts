import styled, { css } from 'styled-components'
import { Wrapper } from '../../../components/Button/styles'

export const GetStarted = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

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

export const Help = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem;
    margin-bottom: 1.6rem;

    background: rgba(255, 255, 255, 0.04);
    border: 0.1rem solid rgba(255, 191, 0, 0.5);
    border-radius: 0.8rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font24};
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      margin-bottom: 3.2rem;
      padding: 1.6rem 2.4rem;

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
      text-align: center;
    }
  `}
`

export const VotingPowerContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;

    margin-bottom: 4.7rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      justify-items: center;

      margin-bottom: 3.2rem;
    }
  `}
`

export const VotingPowerWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem;

    width: 100%;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 1.2rem;

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font16};
      line-height: ${theme.font.sizes.font24};
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
