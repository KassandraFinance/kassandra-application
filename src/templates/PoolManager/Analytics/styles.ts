import styled, { css } from 'styled-components'

export const Analytics = styled.div`
  ${() => css`
    margin-top: 2.4rem;
    margin-bottom: 7.6rem;
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
    padding-bottom: 1.6rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.1);
  `}
`

export const ManagerOverviewContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 100%;
    gap: 1.6rem;

    width: 100%;
    margin-bottom: 4.8rem;

    @media (min-width: 768px) {
      gap: 1.9rem;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr 26.4rem;
      gap: 2.4rem;
    }
  `}
`

export const ChartWrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 34.5rem;

    @media (min-width: 768px) {
      height: 39.2rem;
    }
  `}
`

export const StatsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 2.4rem;
    }

    @media (min-width: 992px) {
      flex-direction: column;
    }
  `}
`
