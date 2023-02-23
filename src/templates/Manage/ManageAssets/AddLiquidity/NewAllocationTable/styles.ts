import styled, { css } from 'styled-components'

import {
  Table as T,
  THead as THD,
  Tr as TR,
  Th as TH,
  TBody as TB,
  Td as TD
} from '../../../CreatePool/AssetsTable/styles'
import {
  CoinSummary,
  Name,
  Symbol
} from '../../../CreatePool/SelectAssets/CoinSummary/styles'

export const NewAllocationTable = styled.div`
  ${({ theme }) => css`
    ${CoinSummary} {
      @media (max-width: 767.98px) {
        gap: 0.8rem;
      }
    }

    ${Symbol} {
      > span {
        display: none;
      }

      @media (max-width: 767.98px) {
        color: ${theme.colors.snow};
        font-weight: ${theme.font.weight.medium};
        font-size: ${theme.font.sizes.font12};
        line-height: 104%;
      }
    }

    ${Name} {
      @media (max-width: 767.98px) {
        display: none;
      }
    }

    .asset {
      min-width: 8.7rem;

      @media (min-width: 576px) {
        min-width: 13.5rem;
      }
    }

    .arrow {
      min-width: 1.6rem;
    }

    .allocation {
      align-items: center;
      min-width: 7rem;
    }

    .newAllocation {
      align-items: center;
      min-width: 7rem;

      @media (min-width: 576px) {
        min-width: 11rem;
      }
    }
  `}
`

export const Table = styled(T)`
  ${() => css``}
`

export const THead = styled(THD)`
  ${() => css``}
`

export const Tr = styled(TR)`
  ${() => css`
    gap: 1.8rem;
  `}
`

export const Th = styled(TH)`
  ${() => css``}
`

export const TBody = styled(TB)`
  ${() => css``}
`

export const Td = styled(TD)`
  ${() => css``}
`
