import styled, { css } from 'styled-components'

export const RebalanceSuccess = styled.div`
  ${() => css`
    display: flex;
  `}
`

export const RebalanceSuccessCard = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 43.2rem;

    padding: 3.2rem;
    margin: 0 auto;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.8rem;

    .doneButton {
      margin-top: 3.2rem;
    }
  `}
`

export const RebalanceSuccessdTitle = styled.h1`
  ${({ theme }) => css`
    margin-top: 3rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font24};
    font-weight: ${theme.font.weight.bold};
    line-height: 110%;
    text-align: center;

    @media (max-width: 360px) {
      margin-top: 2.4rem;
      padding-inline: 1.6rem;

      font-size: ${theme.font.sizes.font24};
    }
  `}
`

export const RebalanceSuccessdParagraph = styled.p`
  ${({ theme }) => css`
    margin-top: 3.2rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
    text-align: center;

    @media (max-width: 360px) {
      margin-top: 1.6rem;
    }
  `}
`

export const TimeParagraph = styled.p`
  ${({ theme }) => css`
    margin-top: 0.8rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.medium};
    line-height: 135%;
    text-align: center;

    @media (max-width: 360px) {
      margin-top: 1.6rem;
    }
  `}
`
