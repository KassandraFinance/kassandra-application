import styled, { css } from 'styled-components'

export const FeeRewards = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    justify-content: center;

    margin-top: 2.4rem;
    margin-bottom: 5rem;

    @media (min-width: 992px) {
      gap: 6.1rem;
    }
  `}
`
export const FeesContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @media (min-width: 992px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `}
`

export const FeesChartContainer = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
    padding-bottom: 1.6rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.1);
  `}
`
