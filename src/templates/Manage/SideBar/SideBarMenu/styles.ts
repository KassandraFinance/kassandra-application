import styled, { css } from 'styled-components'

export const SideBarMenu = styled.div`
  ${() => css`
    padding: 1.6rem 2.4rem;
    border-radius: 4px;

    background: rgb(255 255 255 / 5%);
  `}
`

export const Title = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    cursor: pointer;
  `}
`

export const TitleIcon = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.4rem;
    min-height: 2.4rem;
  `}
`

interface ITitleTextProps {
  isSideBarOpen: boolean;
}

// prettier-ignore
export const TitleText = styled.p<ITitleTextProps>`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
    white-space: nowrap;

    opacity: 1;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity;
  `}
  ${({ isSideBarOpen }) => !isSideBarOpen && css`
    opacity: 0;

    @media (min-width: 992px) {
      opacity: 1;
    }
  `}
`

interface IOpenButtonProps {
  isOpen: boolean;
}

// prettier-ignore
export const OpenButton = styled.div<IOpenButtonProps>`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.6rem;
    height: 1.6rem;
    margin-left: auto;

    background-color: transparent;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: transform;
    transform: rotate(0deg);
  `}
  ${({ isOpen }) => isOpen && css`
    transform: rotate(180deg);
  `}
`

interface IPoolContainerProps {
  isOpen: boolean;
  isSideBarOpen: boolean;
  height: number;
}

// prettier-ignore
export const PoolContainer = styled.div<IPoolContainerProps>`
  ${() => css`
    overflow: hidden;

    max-height: 0;

    opacity: 0;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: max-height opacity;
  `}
  ${({ isOpen, isSideBarOpen, height }) => isOpen && isSideBarOpen && css`
    max-height: ${4 * height + 0.8}rem;

    opacity: 1;
  `}
  ${({ isOpen, height }) => isOpen && css`
    @media (min-width: 992px) {
      max-height: ${4 * height + 0.8}rem;

      opacity: 1;
    }
  `}
`

export const PoolWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;

    height: 4rem;
    padding-inline: 3.2rem 0.4rem;

    &:first-of-type {
      margin-top: 0.8rem;
    }
  `}
`

export const Pool = styled.a`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    text-decoration: none;

    cursor: pointer;
  `}
`

export const PoolIcon = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    min-width: 1.6rem;
    min-height: 1.6rem;
    border-radius: 50%;
  `}
`

interface IPoolNameProps {
  active: boolean;
}

// prettier-ignore
export const PoolName = styled.div<IPoolNameProps>`
  ${({ theme }) => css`
    overflow: hidden;

    width: 14.2rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
  ${({ theme, active }) => active && css`
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.medium};
  `}
`

interface IPoolStatusProps {
  active: boolean;
}

// prettier-ignore
export const PoolStatus = styled.span<IPoolStatusProps>`
  ${({ theme }) => css`
    position: relative;

    display: block;

    width: 0.6rem;
    height: 0.6rem;
    border: 0.5px solid ${theme.colors.grayDisabled};
    border-radius: 50%;
  `}
  ${({ theme, active }) => active && css`
      border: 0.5px solid ${theme.colors.snow};

      background-color: ${theme.colors.snow};

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;

        width: 0.6rem;
        height: 0.6rem;
        border: 0.5px solid ${theme.colors.snow};
        border-radius: 50%;

        background-color: ${theme.colors.snow};

        filter: blur(0.5rem);

        transform: translate(-50%, -50%);
      }
  `}
`
