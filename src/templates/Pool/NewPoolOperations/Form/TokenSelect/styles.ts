import styled, { css } from 'styled-components'

export const TokenSelect = styled.div`
  ${() => css``}
`
export const Backdrop = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0);

    z-index: 9;
  `}
`

interface ISelectedProps {
  openOptions: boolean;
}

// prettier-ignore
export const SelectToken = styled.div<ISelectedProps>`
  ${({ theme, openOptions }) => css`
    max-width: 13.8rem;
    margin: 0.8rem 0;

    font-size: ${theme.font.sizes.font20};

    background-color: #4A4348;
    border-radius: ${openOptions ? '0.4rem 0.4rem 0 0px' : '0.4rem'};

    @media (max-width: 400px) {
      width: 11rem;
    }
  `}
`

// prettier-ignore
export const Selected = styled.div<ISelectedProps>`
  ${({ theme, openOptions }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;

    width: 13.8rem;
    height: 3.4rem;
    padding: 0.6rem 0.8rem 0.4rem;

    font-size: ${theme.font.sizes.font20};
    line-height: ${theme.font.sizes.font20};

    border-radius: ${openOptions ? '0.4rem 0px' : '0.4rem'};

    cursor: pointer;

    @media (max-width: 400px) {
      font-size: ${theme.font.sizes.font16};
      width: 11rem;
    }
  `}
`

export const TokenLogo = styled.span`
  ${() => css`
    min-width: 2.2rem;

    img {
      border-radius: 50%;
    }
  `}
`

interface IopenOptionsProps {
  openOptions: boolean;
}

// eslint-disable-next-line prettier/prettier
export const ArrowDown = styled.span<IopenOptionsProps>`
  ${({ openOptions }) => css`
    min-width: 1.4rem;

    img {
      transition: transform 0.4s ease;
      transform: ${openOptions ? 'rotate(180deg)' : 'rotate(0)'};
    }
  `}
`

export const OptionsContent = styled.div`
  ${() => css`
    position: absolute;

    width: 13.8rem;
    max-height: 16.2rem;
    overflow: auto;

    background-color: #4a4348;
    border-radius: 0 0 0.4rem 0.4rem;

    z-index: 101;

    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 0.1rem;
    }

    @media (max-width: 400px) {
      width: 11rem;
    }
  `}
`

export const Option = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;
    padding: 0.4rem 0.8rem 0.4rem;

    font-size: ${theme.font.sizes.font20};
    line-height: ${theme.font.sizes.font20};

    cursor: pointer;

    &:hover {
      background-color: #000;
    }

    @media (max-width: 400px) {
      font-size: ${theme.font.sizes.font16};
    }
  `}
`

export const ImageContainer = styled.span`
  ${() => css`
    margin-right: 0.8rem;

    img {
      border-radius: 50%;
    }
  `}
`
