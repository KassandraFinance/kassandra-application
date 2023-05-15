import styled, { css } from 'styled-components'

interface ISideBarMenuProps {
  isActive: boolean
}

// prettier-ignore
export const SideBarMenu = styled.div<ISideBarMenuProps>`
  ${() => css`
    padding: 1.6rem 2rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 4px;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border background-color;

    &:hover {
      border: 1px solid rgb(255 255 255 / 0.15);

      background: rgb(255 255 255 / 0.05);
    }
  `}
  ${({ isActive }) => isActive && css`
    background-color: rgb(255 255 255 / 0.05);
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

interface ITitleIconProps {
  isActive: boolean
}

// prettier-ignore
export const TitleIcon = styled.div<ITitleIconProps>`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.4rem;
    min-height: 2.4rem;

    svg {
      path {
        fill: rgb(252 252 252);

        transition-timing-function: ease;
        transition-duration: 300ms;
        transition-property: fill fill-opacity;
        fill-opacity: 0.5;
      }
    }

    ${SideBarMenu}:hover & {
      svg {
        path {
          fill: ${theme.colors.white};
          fill-opacity: 1;
        }
      }
    }
  `}
  ${({ theme, isActive }) => isActive && css`
    svg {
      path {
        fill: ${theme.colors.white};
        fill-opacity: 1;
      }
    }
  `}
`

interface ITitleTextProps {
  isSideBarOpen: boolean
  isActive: boolean
}

// prettier-ignore
export const TitleText = styled.p<ITitleTextProps>`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    color: rgb(252 252 252 / 0.5);
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
    white-space: nowrap;

    opacity: 1;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity color;

    ${SideBarMenu}:hover & {
      color: ${theme.colors.white};
    }
  `}
  ${({ isSideBarOpen }) => !isSideBarOpen && css`
    opacity: 0;

    @media (min-width: 992px) {
      opacity: 1;
    }
  `}

  ${({ theme, isActive }) => isActive && css`
    color: ${theme.colors.white};
  `}
`

interface IOpenButtonProps {
  isOpen: boolean
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
    margin-right: 0.5rem;

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
  isOpen: boolean
  isSideBarOpen: boolean
  height: number
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
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    height: 4rem;
    padding-inline: 3.2rem 0.4rem;

    &:first-of-type {
      margin-top: 0.8rem;
    }

    &:hover {
      ${PoolName} {
        color: ${theme.colors.white};
      }

      ${PoolStatus} {
        background-color: ${theme.colors.snow};
      }
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
  active: boolean
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

    transition-duration: 200ms;
    transition-timing-function: ease-in-out;
    transition-property: color;
  `}

  ${({ theme, active }) => active && css`
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.medium};
  `}
`

interface IPoolStatusProps {
  active: boolean
}

// prettier-ignore
export const PoolStatus = styled.span<IPoolStatusProps>`
  ${({ theme }) => css`
    position: relative;

    display: block;

    width: 0.6rem;
    height: 0.6rem;

    background-color: transparent;
    border: 0.5px solid ${theme.colors.grayDisabled};
    border-radius: 50%;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: background-color;
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
