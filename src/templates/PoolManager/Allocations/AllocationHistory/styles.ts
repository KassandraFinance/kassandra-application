import styled, { css } from 'styled-components'

export const AllocationHistory = styled.div`
  ${({ theme }) => css`
    // color: ${theme.colors.blue};
  `}
`

export const ActivityCardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `}
`
