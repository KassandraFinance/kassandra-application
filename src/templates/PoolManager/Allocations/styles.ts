import styled, { css } from 'styled-components'

export const Allocations = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `}
`

export const IntroReview = styled.div`
  ${() => css`
    padding: 3.2rem;

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
  `}
`

export const AllocationTable = styled.div``

export const AllocationHistory = styled.div`
  ${() => css`
    margin-top: 5rem;

    @media (max-width: 576px) {
      margin-top: 0;
    }
  `}
`
