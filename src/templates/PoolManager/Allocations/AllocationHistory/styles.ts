import { Title } from '@/components/TitleSection/styles'
import styled, { css } from 'styled-components'

export const AllocationHistory = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-top: 5rem;

    ${Title} {
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  `}
`

export const ActivityCardContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `}
`

export const PaginationContainer = styled.div`
  ${() => css`
    margin-top: 6rem;
    margin-bottom: 6rem;
  `}
`
