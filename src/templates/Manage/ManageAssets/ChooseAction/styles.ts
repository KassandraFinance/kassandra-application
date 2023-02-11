import styled, { css } from 'styled-components'
import { CardContainer } from '../../../../components/FundCard/styles'
import { imageContent } from './CardChooseAction/styles'

export const ChooseAction = styled.div`
  ${() => css`
    height: 100vh;
    margin-bottom: 22rem;

    @media (max-width: 576px) {
      margin-bottom: 0;
    }
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 4.8rem;

    p {
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;
      text-transform: uppercase;

      @media (max-width: 960px) {
        line-height: 2rem;
      }
    }

    @media (max-width: 960px) {
      align-items: flex-start;
    }
  `}
`

export const HeaderImageContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: ${theme.font.sizes.font32};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
  `}
`

export const ChooseActionBody = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;

    ${CardContainer} {
      &:hover {
        transform: none;
      }
    }

    @media (max-width: 960px) {
      flex-direction: column;
    }
  `}
`

export const FundCardContainer = styled.div`
  ${() => css`
    min-width: 32.8rem;

    @media (max-width: 576px) {
      display: none;
    }
  `}
`

export const CardChooseActionContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    ${imageContent} {
      min-width: 5.6rem;
    }

    @media (max-width: 976px) {
      ${imageContent} {
        min-width: 3.6rem;
        height: 3.2rem;
      }
    }
  `}
`
