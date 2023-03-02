import styled, { css } from 'styled-components'
import { Line } from '../../../../../components/Steps/Step/styles'
import { Steps } from '../../../../../components/Steps/styles'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const RebalanceReview = styled.div`
  ${() => css`
    width: 100%;

    ${Steps} {
      justify-content: flex-start;
    }
    ${Line} {
      width: 4.8rem;
    }
  `}
`

export const RebalanceReviewBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    transition: height 0.3s ease;

    > h2 {
      height: 100%;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;

      @media (max-width: 768px) {
        display: none;
      }
    }

    > p {
      height: 100%;
      margin-top: 0.8rem;
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;

      @media (max-width: 768px) {
        display: none;
      }
    }
  `}
`

export const ReviewTableAndExecutionPeriod = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10rem;

    gap: 2.4rem;

    @media (max-width: 992px) {
      flex-direction: column;
    }
    @media (max-width: 576px) {
      align-items: center;
    }
  `}
`

export const ExecutionPeriodCard = styled.div`
  ${({ theme }) => css`
    min-width: 36.1rem;
    max-width: 36.1rem;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    @media (max-width: 992px) {
      min-width: 100%;
    }

    h3 {
      margin-bottom: 0.8rem;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    span {
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 2.5rem;
    }

    p {
      margin-top: 1.6rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`
