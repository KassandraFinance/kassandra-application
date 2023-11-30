import styled, { css } from 'styled-components'
import { Overlay } from '@/components/Overlay/styles'
import {
  Filters,
  Header
} from '@/templates/PoolManager/Activity/Filters/styles'

export const Activity = styled.div`
  ${() => css`
    padding-top: 5.6rem;

    @media (max-width: 992px) {
      width: 100%;
      padding-inline: 2.4rem;
    }

    @media (max-width: 576px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const CardContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
  `}
`

export const FilterContainer = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 3.2rem;
  `}
`

export const FilterContent = styled.div`
  ${() => css`
    position: absolute;

    top: 6.9rem;
    right: 0;

    ${Overlay} {
      background-color: transparent;
      backdrop-filter: blur(0);

      z-index: 0;
    }

    ${Filters} {
      background: #343434;
    }
    ${Header} {
      background: rgba(0, 0, 0, 0.25);
    }
  `}
`

export const FilterIconContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.6rem;
    height: 5.6rem;

    border-radius: 8px;
    background-color: rgba(252, 252, 252, 0.05);
    border: 1px solid rgba(252, 252, 252, 0.15);

    cursor: pointer;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border;

    &:hover {
      border: 1px solid rgba(252, 252, 252, 0.5);
    }
  `}
`

export const LoadMoreContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`

export const LoadMore = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4rem;
    height: 4rem;
    border: none;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 50%;

    background-color: rgb(255 255 255 / 0.1);

    cursor: pointer;

    transition: border 300ms ease-in-out;

    &:hover {
      border: 1px solid rgb(255 255 255 / 0.1);
    }
  `}
`
