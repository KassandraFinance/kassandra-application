import styled, { css } from 'styled-components'

export const Allocations = styled.div`
  ${() => css`
    @media (max-width: 1145px) {
      padding-inline: 2.4rem;
    }

    @media (max-width: 992px) {
      padding-inline: 2.4rem;
    }

    @media (max-width: 576px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const IntroReview = styled.div`
  ${() => css`
    margin-top: 5.6rem;
  `}
`

export const AllocationTable = styled.div`
  ${() => css`
    margin-top: 4rem;
  `}
`

export const AllocationHistory = styled.div`
  ${() => css`
    margin-top: 6.5rem;
  `}
`
