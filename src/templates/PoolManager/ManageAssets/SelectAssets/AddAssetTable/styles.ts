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

export const AddAssetTable = styled.div`
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

    .select {
      min-width: 1.6rem;
    }

    .asset {
      justify-content: flex-start;

      width: 100%;
    }

    .price {
      min-width: 6.5rem;

      text-align: right;
    }

    .marketCap {
      min-width: 11rem;

      text-align: right;

      @media (min-width: 992px) {
        min-width: 15rem;
      }

      @media (min-width: 1200px) {
        min-width: 20rem;
      }
    }

    .balance {
      min-width: 10rem;

      text-align: right;

      @media (min-width: 992px) {
        min-width: 12rem;
      }

      @media (min-width: 1200px) {
        min-width: 15rem;
      }
    }

    .button {
      min-width: 5.6rem;

      @media (min-width: 768px) {
        display: none;
      }
    }
  `}
`

export const InputWrapper = styled.div`
  ${() => css`
    display: flex;

    height: 100%;
    margin-bottom: 1.45rem;
  `}
`

export const InputSearchWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
  `}
`

export const Table = styled(T)`
  ${() => css``}
`

export const THead = styled(THD)`
  ${() => css`
    height: 6.4rem;
  `}
`

export const Tr = styled(TR)`
  ${() => css`
    gap: 1.2rem;

    height: 6.4rem;

    @media (min-width: 768px) {
      gap: 5rem;

      margin-inline: 2.4rem;
    }

    @media (min-width: 992px) {
      gap: 8rem;
    }

    @media (min-width: 1200px) {
      gap: 11rem;
    }
  `}
`

interface IThProps {
  isView?: boolean;
}

// prettier-ignore
export const Th = styled(TH) <IThProps>`
  ${() => css`
    #arrowRight {
      transform: rotate(180deg);
    }

    @media (max-width: 767.98px) {
      animation: ${tableAnim} 0.4s ease;

      &:nth-of-type(2) {
        visibility: hidden;
      }
    }
  `}
  ${({ isView = true }) =>
    !isView &&
    css`
      @media (max-width: 767.98px) {
        display: none;

        animation: ${tableAnim} 0.4s ease;
      }
    `}
`

export const TBody = styled(TB)`
  ${() => css`
    overflow-x: hidden;
  `}
`

interface ITdProps {
  isView?: boolean;
}

// prettier-ignore
export const Td = styled(TD) <ITdProps>`
  ${() => css`
      animation: ${tableAnim} 0.4s ease;
  `}
  ${({ isView = true }) =>
    !isView &&
    css`
      @media (max-width: 767.98px) {
        display: none;
      }
    `}
`

export const SecondaryText = styled.span`
  ${() => css`
    color: #bfbfbf;
  `}
`

export const TableViewButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.4rem;
    min-height: 2.4rem;
    border: none;
    border-radius: 50%;

    background: rgb(255 255 255 / 0.05);

    cursor: pointer;
  `}
`

export const ViewButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`

interface IShadowProps {
  inView: boolean;
}

// prettier-ignore
export const Shadow = styled.div<IShadowProps>`
  ${() => css`
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 10.9rem;
    border-radius: 0 0 8px 8px;

    background: linear-gradient(180deg, rgb(31 31 31 / 0) 0%, #1f1f1f 100%);

    opacity: 1;
    visibility: visible;
    pointer-events: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: opacity visibility;
  `}
  ${({ inView }) => inView && css`
    opacity: 0;
    visibility: hidden;
  `}
`

const tableAnim = keyframes`
  from {
    transform: translateX(-1rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`
