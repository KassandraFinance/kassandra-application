import styled, { css } from 'styled-components'

export const Card = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 3.2rem;
    margin-top: 5.6rem;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      padding: 2.4rem;
    }
  `}
`

export const PoolStakingCardContainer = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const QuestionsAndAnswersWrapper = styled.div`
  ${() => css`
    width: 100%;
  `}
`
