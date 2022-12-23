import styled, { css } from 'styled-components'

interface ISideBarProps {
  isOpen: boolean;
}

// prettier-ignore
export const SideBar = styled.div<ISideBarProps>`
  ${() => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    width: 0rem;

    background-color: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(30px);
    border-radius: 0rem 0.8rem 0.8rem 0rem;

    overflow: hidden;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: width;


    z-index: 1030;

    @media (min-width: 768px) {
      width: 7.4rem;
    }

    @media (min-width: 992px) {
      width: 26.4rem;
    }
  `}
  ${({ isOpen }) => isOpen && css`
      width: 26.4rem;

      @media (min-width: 768px) {
        width: 26.4rem;
      }
  `}
`

export const SideBarHeader = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 6.6rem;

    padding-top: 4rem;
    padding-inline: 2.4rem;
    padding-bottom: 1.6rem;
  `}
`

interface IImageWrapperProps {
  isOpen: boolean;
}

// prettier-ignore
export const ImageWrapper = styled.a<IImageWrapperProps>`
  ${() => css`
    svg {
      .letters {
        opacity: 0;

        transition-duration: 550ms;
        transition-timing-function: ease;
        transition-property: transform opacity;
      }
    }

    @media (min-width: 768px) {
      width: 2.6rem;
      height: 2.6rem;
      margin-left: -0.5rem;
      margin-top: -0.4rem;
    }

    @media (min-width: 992px) {
      svg {
        .letters {
          opacity: 1;
        }
      }

      width: 20.992rem;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    svg {
      .letters {
        opacity: 1;
      }
    }
  `}
`

export const SideBarLink = styled.a`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    overflow: hidden;
  `}
`

export const IconWrapper = styled.div`
  ${() => css`
    width: 2.4rem;
    height: 2.4rem;
    z-index: 1;
  `}
`

interface ITitleProps {
  isOpen: boolean;
}

// prettier-ignore
export const Title = styled.span<ITitleProps>`
  ${({ theme }) => css`
    position: absolute;
    left: 3.2rem;
    opacity: 0;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;
    white-space: nowrap;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: opacity;

    @media (min-width: 992px) {
      left: 3.2rem;
      opacity: 1;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    left: 3.2rem;
    opacity: 1;

    overflow: hidden;
  `}
`

export const SideBarBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;

    height: 100%;
    padding-inline: 3.2rem;
    padding-bottom: 2.8rem;
  `}
`

interface ILineProps {
  isOpen: boolean;
}

// prettier-ignore
export const Line = styled.span<ILineProps>`
  ${() => css`
    display: inline-block;
    width: 5rem;
    height: 0.1rem;
    margin-inline: 1.2rem;

    background-color: rgba(255, 255, 255, 0.3);

    transition-duration: 600ms;
    transition-timing-function: ease;
    transition-property: width margin;

    @media (min-width: 992px) {
      width: 9rem;
      margin-inline: 3.2rem;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    width: 9rem;
    margin-inline: 3.2rem;
  `}
`

interface ITextProps {
  isOpen: boolean;
}

// prettier-ignore
export const Text = styled.p<ITextProps>`
  ${({ theme }) => css`
    width: 18.4rem;
    margin-top: 2.4rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};

    opacity: 0;
    pointer-events: none;

    transition-duration: 550ms;
    transition-timing-function: ease;
    transition-property: opacity;

    @media (min-width: 992px) {
      margin-left: 0;

      opacity: 1;
      pointer-events: visible;
    }
  `}
  ${({ isOpen }) => isOpen && css`
    opacity: 1;
    pointer-events: visible;
  `}
`
