import styled, { css } from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  background-color: transparent;
`

interface ISelectTokenProps {
  isOpen: boolean;
  itemHeight: number;
}

// eslint-disable-next-line prettier/prettier
export const SelectToken = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;
    /* height: 6.8rem; */
    width: 100%;
    border-radius: 8px;

    background: #1b1d22;
    /* border: 1px solid rgba(255, 255, 255, 0.15); */
    /* padding-block: 0.8rem; */

    cursor: pointer;
  `}
`

// eslint-disable-next-line prettier/prettier
export const SelectTokenContainer = styled.ul<ISelectTokenProps>`
  ${({ itemHeight }) => css`
    position: absolute;
    top: 6.1rem;

    display: flex;
    flex-direction: column;
    width: 100%;
    /* width: 36.1rem; */
    height: 0;
    max-height: 0;
    background: #1b1d22;
    /* margin-left: -0.5rem 0; */

    overflow-y: ${itemHeight > 317 ? 'auto' : 'hidden'};

    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;

    /* border: 1px solid transparent; */
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom: 1px solid transparent;
    /* border-top: none; */

    transition-duration: 500ms;
    transition-timing-function: ease;
    transition-property: height max-height border;

    z-index: 22;
  `}

  ${({ isOpen, itemHeight }) =>
    isOpen &&
    css`
      height: ${itemHeight}px;
      max-height: 31.5rem;

      border: 1px solid rgba(255, 255, 255, 0.15);
      border-top: none;

      overflow-y: ${itemHeight > 317 ? 'auto' : 'hidden'};
    `}
`

interface IArrowContentProps {
  isOpen: boolean;
}

// eslint-disable-next-line prettier/prettier
export const ArrowContent = styled.span<IArrowContentProps>`
  ${() => css`
    display: flex;
    align-items: center;

    transform: rotate(0);
    transition-duration: 500ms;
    transition-timing-function: ease;
    transition-property: height transform;
  `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`

export const SelectedTokenContent = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.15);
    height: 6.8rem;
    border-radius: 8px;

    padding: 1.6rem;
    z-index: 21;
  `}
`

export const SelectTokenContent = styled.li`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.6rem;
    margin-inline: 1.6rem;
    padding-inline: 0;

    cursor: pointer;

    margin-top: -0.1rem;

    border-top: 1px solid transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    transition-duration: 500ms;
    transition-timing-function: ease;
    transition-property: background border;

    :last-child {
      border-bottom: none;
    }

    :hover {
      background: #ffffff10;

      border-top: 1px solid rgba(255, 255, 255, 0.15);
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding-inline: 1.6rem;
      margin-inline: 0;

      :last-child {
        border-bottom: none;
      }
    }
  `}
`

export const TokenInfoContent = styled.div`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.6rem;
    }

    input {
      position: absolute;
      opacity: 0;
    }
  `}
`

export const BalanaceInfoContent = styled.div`
  ${({ theme }) => css`
    text-align: end;

    p {
      color: #fcfcfc;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      letter-spacing: 0.05em;
      line-height: 1.6rem;
    }

    span {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.4rem;
    }
  `}
`
