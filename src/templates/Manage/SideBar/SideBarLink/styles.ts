import styled, { css } from 'styled-components'

interface ISideBarLinkProps {
  isActive: boolean
}

// prettier-ignore
export const SideBarLink = styled.a<ISideBarLinkProps>`
  ${() => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 5.6rem;
    padding: 1.6rem 2.4rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 4px;

    text-decoration: none;

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border background-color;

    &:hover:not([aria-disabled='true']) {
      border: 1px solid rgb(255 255 255 / 0.15);

      background-color: rgb(255 255 255 / 0.05);
    }

    &:is([aria-disabled='true']) {
      cursor: not-allowed;
    }
  `}
  ${({ isActive }) => isActive && css`
    background-color: rgb(255 255 255 / 0.05);
  `}
`

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    width: 100%;
  `}
`

interface IIconProps {
  isActive: boolean
}

// prettier-ignore
export const Icon = styled.div<IIconProps>`
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

    &:is([aria-disabled='true']) {
      svg {
        path {
          fill: ${theme.colors.white};
          fill-opacity: 0.08;
        }
      }
    }


    ${SideBarLink}:hover:not([aria-disabled='true']) & {
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

interface ITitleProps {
  isOpen: boolean
  isActive: boolean
}

// prettier-ignore
export const Title = styled.p<ITitleProps>`
  ${({ theme }) => css`
    color: rgba(252, 252, 252, 0.5);
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
    white-space: nowrap;

    opacity: 1;

    transition-timing-function: ease;
    transition-duration: 550ms;
    transition-property: opacity color;

    &:is([aria-disabled='true']) {
      color: rgb(255 255 255 / 0.08);
    }

    ${SideBarLink}:hover:not([aria-disabled='true']) & {
      color: ${theme.colors.white};
    }
  `}
  ${({ isOpen }) => !isOpen && css`
    opacity: 0;

    @media (min-width: 992px) {
      opacity: 1;
    }
  `}
  ${({ theme, isActive }) => isActive && css`
    color: ${theme.colors.white};
  `}
`

export const Tag = styled.span`
  ${({ theme }) => css`
    width: 5.6rem;
    height: 2rem;
    margin-left: auto;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;

    color: rgb(252 252 252 / 0.5);
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    background: rgb(255 255 255 / 0.08);
  `}
`
