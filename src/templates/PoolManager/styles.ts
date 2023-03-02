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
    grid-template-columns: 0rem 100%;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: grid;

    > ${Overlay} {
      z-index: 1020;
    }

    @media (min-width: 768px) {
      grid-template-columns: 7.4rem calc(100% - 7.4rem);

      > ${Overlay} {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0rem);
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
  align-items: center;
  justify-content: space-between;

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
  align-items: center;
  gap: 2rem;

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
    align-items: center;
    gap: 0.8rem;

    margin-top: 0.8rem;

    h3 {
      padding: 0.8rem 1.2rem;

      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};

      background-color: rgba(0, 0, 0, 0.19);
      border-radius: 1rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .circle {
      display: flex;
      justify-content: center;
      align-items: center;

      background: rgba(255, 255, 255, 0);
      border-radius: 50%;
      border: none;

      cursor: pointer;
    }
  `}
`

export const NameAndSymbol = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    h1 {
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.light};

      @media (max-width: 768px) {
        font-size: ${theme.font.sizes.font18};
      }
    }
  `}
`
