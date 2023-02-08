import styled, { css } from 'styled-components'

export const SideBarMenu = styled.div`
  ${() => css`
    padding: 1.6rem 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.4rem;
  `}
`

export const Title = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

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

    transition-duration: 550ms;
    transition-timing-function: ease;
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
    transform: rotate(180deg);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.6rem;
    height: 1.6rem;
    margin-left: auto;

    background-color: transparent;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: transform;
  `}
  ${({ isOpen }) => isOpen && css`
    transform: rotate(0deg);
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
    max-height: 0rem;

    opacity: 0;
    overflow: hidden;

    transition-duration: 700ms;
    transition-timing-function: ease;
    transition-property: max-height opacity;
  `}
  ${({ isOpen, isSideBarOpen, height }) => isOpen && isSideBarOpen && css`
    max-height: ${4 * height + 0.8}rem;

    opacity: 1;
    overflow: visible;
  `}
  ${({ isOpen, height }) => isOpen && css`
    @media (min-width: 992px) {
      max-height: ${4 * height + 0.8}rem;

      opacity: 1;

      overflow: visible;
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
    align-items: center;
    gap: 0.8rem;

    text-decoration: none;
    cursor: pointer;
  `}
`

export const PoolIcon = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 1.6rem;
    min-height: 1.6rem;

    border-radius: 50%;

    overflow: hidden;
  `}
`

interface IPoolNameProps {
  active: boolean;
}

// prettier-ignore
export const PoolName = styled.div<IPoolNameProps>`
  ${({ theme }) => css`
    width: 14.2rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

    border: 0.05rem solid ${theme.colors.grayDisabled};
    border-radius: 50%;
  `}
  ${({ theme, active }) => active && css`
      background-color: ${theme.colors.snow};
      border: 0.05rem solid ${theme.colors.snow};

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 0.6rem;
        height: 0.6rem;

        background-color: ${theme.colors.snow};
        border: 0.05rem solid ${theme.colors.snow};
        border-radius: 50%;
        filter: blur(0.5rem);

        z-index: -1;
      }
  `}
`
