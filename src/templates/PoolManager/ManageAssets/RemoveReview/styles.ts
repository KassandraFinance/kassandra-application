import styled, { css } from 'styled-components'
import { TransactionSummaryCard } from './TransactionSummaryCard/styles'

export const RemoveReview = styled.div`
  ${() => css``}
`

export const RemoveReviewBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    > h2 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    > p {
      margin-top: 0.8rem;
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`

export const ReviewCardAndTable = styled.div`
  ${() => css`
    /* display: grid;
    grid-template-columns: minmax(40rem, 45.7rem) 1fr; */
    display: flex;
    align-items: flex-start;
    gap: 2.4rem;
    width: 100%;
    margin-bottom: 10rem;

    ${TransactionSummaryCard} {
      min-width: 40rem;
      max-width: 45.7rem;

      @media (max-width: 992px) {
        min-width: 100%;
      }
    }

    @media (max-width: 992px) {
      /* grid-template-columns: 1fr; */
      flex-direction: column;
      margin-bottom: 15rem;
    }
  `}
`

// export const ReviewCardAndTable = styled.span`
//   ${() => css``}
// `
