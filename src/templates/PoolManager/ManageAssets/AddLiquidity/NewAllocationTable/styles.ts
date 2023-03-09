import styled, { css, keyframes } from 'styled-components'

import {
  Table as T,
  THead as THD,
  Tr as TR,
  Th as TH,
  TBody as TB,
  Td as TD
} from '@/templates/Manage/CreatePool/AssetsTable/styles'

import {
  CoinSummary,
  Name,
  Symbol
} from '@/templates/Manage/CreatePool/SelectAssets/CoinSummary/styles'

export const NewAllocationTable = styled.div`
  ${({ theme }) => css`
    ${CoinSummary} {
      @media (max-width: 575.98px) {
        gap: 0.8rem;
      }
    }

    ${Symbol} {
      > span {
        display: none;
      }

      @media (max-width: 575.98px) {
        color: ${theme.colors.snow};
        font-weight: ${theme.font.weight.medium};
        font-size: ${theme.font.sizes.font12};
        line-height: 104%;
      }
    }

    ${Name} {
      display: grid;
      grid-template-columns: 1fr 1.4rem;

      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      @media (max-width: 575.98px) {
        display: none;
      }
    }

    .asset {
      min-width: 8.7rem;

      @media (min-width: 576px) {
        min-width: 21rem;
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

    animation: ${animateOpacity} 600ms ease;
  `}
`

export const Th = styled(TH)`
  ${() => css``}
`

interface ITBodyProps {
  height: number;
}
// eslint-disable-next-line prettier/prettier
export const TBody = styled(TB)<ITBodyProps>`
  ${({ height }) => css`
    height: ${height}rem;
    max-height: 41.4rem;

    transition-duration: 600ms;
    transition-timing-function: ease;
    transition-property: height max-height opacity;
  `}
`

export const Td = styled(TD)`
  ${() => css``}
`
// eslint-disable-next-line prettier/prettier
export const textContainer = styled.span`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 30.5rem;

    animation: ${animateOpacity} 600ms ease;
  `}
`

export const text = styled.p`
  ${({ theme }) => css`
    max-width: 30rem;

    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    text-align: center;
  `}
`

const animateOpacity = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`
