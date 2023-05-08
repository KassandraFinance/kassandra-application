import { Title } from '@/components/TitleSection/styles'
import styled, { css } from 'styled-components'

export const AllocationHistory = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-top: 5rem;
    margin-bottom: 6rem;

    ${Title} {
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 576px) {
      margin-top: 0;
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

export const WasNoAllocationsChange = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 2.4rem 3.2rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.04);

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: center;

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font12};
    }
  `}
`

export const PaginationContainer = styled.div`
  ${() => css`
    margin-top: 6rem;
  `}
`
