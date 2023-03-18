import styled, { css } from 'styled-components'
import { Line } from '../../../../components/Steps/Step/styles'
import { Steps } from '../../../../components/Steps/styles'

export const SetNewWeights = styled.div`
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

export const SetNewWeightsBody = styled.div`
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

export const AllocationsAndExecutionPeriod = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10rem;

    gap: 2.4rem;

    @media (max-width: 1160px) {
      flex-direction: column;
    }
    @media (max-width: 576px) {
      align-items: center;
      margin-bottom: 0;
    }
  `}
`
