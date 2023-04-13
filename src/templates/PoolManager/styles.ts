import styled, { css } from 'styled-components'
import { Overlay } from '../../components/Overlay/styles'

export const PoolManager = styled.div`
  ${() => css`
    width: 100%;
  `}
`

interface IDashBoardProps {
  isOpen: boolean;
}

// prettier-ignore
export const DashBoard = styled.div<IDashBoardProps>`
  ${() => css`
    display: grid;
    grid-template-columns: 0 100%;
    overflow-x: hidden;

    transition-timing-function: ease;
    transition-duration: 550ms;
    transition-property: grid;

    > ${Overlay} {
      z-index: 1020;
    }

    @media (min-width: 768px) {
      grid-template-columns: 7.4rem calc(100% - 7.4rem);

      > ${Overlay} {
        background-color: rgb(0 0 0 / 0);
        backdrop-filter: blur(0);
      }
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    grid-template-columns: 100%;

    @media (min-width: 768px) {
      grid-template-columns: 26.4rem calc(100% - 7.4rem);
    }

    @media (min-width: 992px) {
      grid-template-columns: 26.4rem 1fr;
    }
  `}
`

export const Content = styled.div`
  ${() => css`
    min-height: 100vh;
    padding-inline: 1.6rem;

    @media (min-width: 768px) {
      padding-inline: 2.4rem;
    }
  `}
`

export const Intro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 3.2rem 0;

  @media (max-width: 768px) {
    margin-top: 0;
  }

  @media (max-width: 510px) {
    display: grid;
    grid-template-columns: 1fr;

    margin: 0;

    .btn-manage-assets {
      max-width: 36rem;
      margin-top: 3.2rem;
      margin-bottom: 4rem;
    }
  }
`

export const GridIntro = styled.div`
  display: grid;
  grid-template-columns: 7.5rem auto;
  gap: 2rem;
  align-items: center;

  max-width: 45rem;

  h1 {
    font-size: 1.8rem;
  }

  img {
    min-width: 100%;
  }

  @media (max-width: 960px) {
    display: grid;
    grid-template-columns: 7.2rem auto;

    max-width: 100%;
  }
`

export const NameIndex = styled.div`
  ${({ theme }) => css`
    p {
      color: ${theme.colors.gray};
      font-size: ${theme.font.sizes.font12};
      text-transform: uppercase;
    }
  `}
`

export const SymbolAndLink = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    margin-top: 0.8rem;

    h3 {
      padding: 0.8rem 1.2rem;
      border-radius: 10px;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};

      background-color: rgb(0 0 0 / 0.19);

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .circle {
      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      border-radius: 50%;

      background: rgb(255 255 255 / 0);

      cursor: pointer;
    }
  `}
`

export const NameAndSymbol = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1.6rem;
    align-items: center;

    h1 {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font24};

      @media (max-width: 768px) {
        font-size: ${theme.font.sizes.font18};
      }
    }
  `}
`

export const LoadingWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;

    height: calc(100vh - 10.8rem);
  `}
`

export const RebalancingProgressText = styled.div`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.4rem;
    text-transform: uppercase;
  `}
`

export const RebalancingProgressTime = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.4rem;
    letter-spacing: 0.22em;
    text-align: center;
  `}
`
