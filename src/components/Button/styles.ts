import { IBackgroudProps, IbackgroundVoteProps, ISizeProps } from './index'

import styled, { css, DefaultTheme } from 'styled-components'

const backgroundVariants = {
  default: () => css``,
  primary: (theme: DefaultTheme) => css`
    background: ${`linear-gradient(93.84deg, ${theme.colors.blue} 0%, ${theme.colors.magenta} 50.12%, ${theme.colors.blue} 100%)`};
    background-position-x: 100%;
    background-size: 200%;

    transition: background-position-x 0.5s ease-out;

    &:hover,
    &:focus {
      background-position-x: 0%;
    }

    &:focus {
      outline: 0.2rem solid ${theme.colors.magenta};
      outline-offset: 0.2rem;
    }
  `,
  secondary: (theme: DefaultTheme) => css`
    background: ${theme.colors.blue};

    transition: all 300ms;

    &:hover,
    &:focus {
      background: ${theme.colors.darkBlue};
    }

    &:focus {
      outline: 0.2rem solid ${theme.colors.darkBlue};
      outline-offset: 0.2rem;
    }
  `,
  black: (theme: DefaultTheme) => css`
    padding: 1.25rem;
    border: ${`0.1rem solid ${theme.colors.cyan}`};

    background: transparent;

    transition:
      color 300ms ease-in-out,
      background 300ms ease-in-out;

    svg {
      path {
        transition: fill ease-in-out 300ms;
      }
    }

    &:hover,
    &:focus {
      color: ${theme.colors.darkPurple};

      background: ${theme.colors.cyan};

      svg {
        path {
          fill: ${theme.colors.darkPurple};
        }
      }
    }

    &:focus {
      outline: 0.2rem solid ${theme.colors.cyan};
      outline-offset: 0.2rem;
    }
  `,
  transparent: () => css`
    width: 100%;
    padding: 0;
    border: 1px solid transparent;
    border-radius: 4px;

    background: rgb(255 255 255 / 0.05);

    transition: border 300ms ease-in-out;

    &:hover,
    &:focus {
      border: 1px solid rgb(255 255 255 / 0.3);
    }
  `
}
const backgroundVoteVariants = {
  backgroundVote: (
    theme: DefaultTheme,
    { voteState, type }: { voteState: string; type: string }
  ) => {
    switch (voteState) {
      case 'against':
        return css`
          color: #211426;
          font-weight: 400;

          background: #e8372c;
          outline: none;

          cursor: not-allowed;
        `
      case 'favor':
        return css`
          color: #211426;
          font-weight: 400;

          background: #2ce878;
          outline: none;

          cursor: not-allowed;
        `

      case 'vote-open':
        return css`
          background: ${theme.colors.blue};

          transition: all 500ms;

          &:hover,
          &:focus {
            color: #211426;

            background: ${type === 'For' ? '#2ce878' : '#e8372c'};
          }

          &:focus {
            outline: 0.2rem solid ${theme.colors.darkBlue};
            outline-offset: 0.2rem;
          }
        `

      default:
        return css`
          border: 0.1rem solid ${theme.colors.darkGray};

          color: #8b8b8b;

          background: ${theme.colors.darkGray};
          outline: none;

          filter: grayscale(150%);
          cursor: not-allowed;
        `
    }
  }
}

const buttonSizes = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;

    font-size: ${theme.font.sizes.font14};
  `,
  claim: (theme: DefaultTheme) => css`
    height: 5.4rem;
    padding: 1.9rem 2.8rem;

    font-size: ${theme.font.sizes.font16};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4.4rem;
    padding: 1.4rem ${theme.spacings.space24};

    font-size: ${theme.font.sizes.font16};
  `,
  large: (theme: DefaultTheme) => css`
    height: 4.4rem;
    padding: 1.4rem ${theme.spacings.space24};

    font-size: ${theme.font.sizes.font16};
  `,
  huge: (theme: DefaultTheme) => css`
    height: 5rem;
    padding: ${theme.spacings.space24} ${theme.spacings.space48};

    font-size: ${theme.font.sizes.font16};
  `
}

const buttonModifiers = {
  fullWidth: () => css`
    width: 100%;
  `,
  withIcon: (theme: DefaultTheme) => css`
    img {
      order: 1;

      width: 1.6rem;
      //margin-left: ${theme.spacings.space8};

      & + span {
        margin-right: ${theme.spacings.space16};
      }
    }

    svg {
      order: 0;

      width: 1.6rem;
      //margin-right: ${theme.spacings.space8};

      & + span {
        margin-left: ${theme.spacings.space16};
      }
    }
  `,
  disabledNoEvent: (theme: DefaultTheme) => css`
    border: 0.1rem solid ${theme.colors.darkGray};

    color: #8b8b8b;

    background: ${theme.colors.darkGray};
    outline: none;

    filter: grayscale(150%);
    cursor: not-allowed;
  `
}

export type IWrapperProps = {
  size: ISizeProps
  fullWidth: boolean
  hasIcon: boolean
  disabledNoEvent: boolean
  background: IBackgroudProps
  backgroundVote: IbackgroundVoteProps
}

export const Wrapper = styled.button<IWrapperProps>`
  ${({
    theme,
    size,
    fullWidth,
    hasIcon,
    disabledNoEvent,
    background,
    backgroundVote
  }) => css`
    border: none;
    border-radius: ${theme.border.radius};

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-family: ${theme.font.family};
    text-decoration: none;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    position: relative;

    padding: ${theme.spacings.space8};

    overflow: hidden;

    outline: none;

    cursor: pointer;

    z-index: 1;

    ${backgroundVariants[background](theme)};
    ${buttonSizes[size](theme)};
    ${backgroundVote?.type !== undefined &&
    backgroundVoteVariants.backgroundVote(theme, backgroundVote)};

    ${fullWidth && buttonModifiers.fullWidth()};
    ${hasIcon && buttonModifiers.withIcon(theme)};
    ${disabledNoEvent && buttonModifiers.disabledNoEvent(theme)};
  `}
`

export const ImgWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      object-fit: cover;

      border-radius: 50%;
    }
  `}
`
