import styled, { css } from 'styled-components'

export const Overview = styled.div`
  ${() => css`
    min-height: 100vh;
    margin-top: 2.4rem;
    padding-inline: 1.6rem;

    @media (min-width: 768px) {
      margin-top: 6.3rem;
      padding-inline: 2.4rem;
    }
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;

    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);

    @media (min-width: 768px) {
      padding-bottom: 1.7rem;
      margin-bottom: 2.5rem;
    }
  `}
`

export const ManagerOverviewContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;

    width: 100%;

    @media (min-width: 768px) {
      gap: 1.9rem;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr 264px;
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
