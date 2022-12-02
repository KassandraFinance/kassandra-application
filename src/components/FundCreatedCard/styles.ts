import styled, { css } from 'styled-components'

export const FundCreatedCardContainer = styled.div`
  ${() => css`
    display: flex;
  `}
`

export const fundCreateCard = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 61.8rem;

    padding: 5.5rem;
    margin: 0 auto;
    margin-top: 9rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 0.8rem;

    .viewTransaction {
      margin-top: 2.4rem;
      padding: 1.6rem 3.2rem;
      text-align: center;
    }
    .checkYourFund {
      margin-top: 4.8rem;
      height: 5.4rem;
      text-align: center;
    }

    @media (max-width: 360px) {
      padding: 2.4rem;
    }

    @media (max-width: 360px) {
      img {
        width: 6.4rem;
        height: 6.4rem;
      }
    }
  `}
`

export const FundCreatedTitle = styled.h1`
  ${({ theme }) => css`
    margin-top: 4rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font32};
    font-weight: ${theme.font.weight.bold};
    line-height: 104%;
    text-align: center;

    @media (max-width: 360px) {
      margin-top: 2.4rem;
      padding-inline: 1.6rem;

      font-size: ${theme.font.sizes.font24};
    }
  `}
`

export const FundCreatedParagraph = styled.p`
  ${({ theme }) => css`
    margin-top: 2.4rem;

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
