import styled, { css } from 'styled-components'
import { HeaderButtons } from '../../../components/Header/HeaderButtons/styles'
import { Wrapper } from '../../../components/Button/styles'

interface ISideBarProps {
  isOpen: boolean
}

export const SideBar = styled.div<ISideBarProps>`
  ${() => css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1020;

    overflow-x: hidden;

    width: 0;
    border-radius: 0 8px 8px 0;

    background-color: rgb(255 255 255 / 0.05);

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: width;

    isolation: isolate;

    @media (min-width: 768px) {
      width: 7.4rem;
    }

    @media (min-width: 992px) {
      width: 26.4rem;
    }
  `}
  ${({ isOpen }) =>
    isOpen &&
    css`
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

    padding-inline: 1.6rem;
    padding-top: 2.4rem;
    padding-bottom: 1.6rem;

    @media (min-width: 768px) {
      padding-top: 3.2rem;
    }

    @media (min-width: 992px) {
      padding-inline: 2.4rem;
    }
  `}
`

interface IImageWrapperProps {
  isOpen: boolean
}

export const ImageWrapper = styled.a<IImageWrapperProps>`
  ${() => css`
    margin-top: -0.4rem;
    margin-left: -0.5rem;

    svg {
      .letters {
        opacity: 0;

        transition-timing-function: ease;
        transition-duration: 500ms;
        transition-property: transform opacity;
      }
    }

    @media (min-width: 768px) {
      width: 2.6rem;
      height: 2.6rem;
      margin-left: 0.3rem;
    }

    @media (min-width: 992px) {
      width: 20.992rem;
      margin-top: -0.4rem;
      margin-left: -0.5rem;

      svg {
        .letters {
          opacity: 1;
        }
      }
    }
  `}
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: -0.5rem;

      svg {
        .letters {
          opacity: 1;
        }
      }
    `}
`
interface IUserInfoContainerProps {
  isOpen: boolean
}

export const UserInfoContainer = styled.div<IUserInfoContainerProps>`
  ${({ theme, isOpen }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    > ${HeaderButtons} {
      position: static;

      flex-direction: ${isOpen ? 'row' : 'column'};
      justify-content: space-between;

      height: 9.8rem;
      padding: 0;

      background-color: transparent;

      .button-network,
      .kacyAmount {
        gap: ${isOpen ? '0.8rem' : '0'};

        width: ${isOpen ? '50%' : '100%'};
        padding: ${isOpen ? '1.6rem 1.2rem' : '1.2rem'};

        font-size: ${isOpen ? theme.font.sizes.font12 : 0};
      }

      .kacyAmount {
        width: 100%;
      }

      .button-wallet {
        display: none;
      }
    }

    @media (min-width: 992px) {
      > ${HeaderButtons} {
        display: none;
      }
    }
  `}
`

export const UserHeader = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;

    cursor: pointer;
  `}
`

export const UserImage = styled.div`
  ${() => css`
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 50%;

    img {
      object-fit: cover;

      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
  `}
`

export const UserNameWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  `}
`

interface IUserNameProps {
  isOpen: boolean
}

export const UserName = styled.div<IUserNameProps>`
  ${({ theme, isOpen }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    text-transform: capitalize;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity visibility;

    @media (min-width: 768px) {
      opacity: ${isOpen ? '1' : '0'};
      visibility: ${isOpen ? 'visible' : 'hidden'};
    }

    @media (min-width: 992px) {
      opacity: 1;
      visibility: visible;
    }
  `}
`

interface IUserHeaderTitleProps {
  isOpen: boolean
}

export const UserHeaderTitle = styled.div<IUserHeaderTitleProps>`
  ${({ theme, isOpen }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity visibility;

    @media (min-width: 768px) {
      opacity: ${isOpen ? '1' : '0'};
      visibility: ${isOpen ? 'visible' : 'hidden'};
    }

    @media (min-width: 992px) {
      opacity: 1;
      visibility: visible;
    }
  `}
`

export const SideBarBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    overflow-x: hidden;
    overflow-y: auto;

    height: fit-content;
    margin-top: 1.6rem;
    padding-bottom: 2.8rem;
  `}
`

export const SideBarContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding-inline: 2.4rem;

    @media (max-width: 992px) {
      padding-inline: 1.6rem;
    }
  `}
`

export const LinksContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;

    text-decoration: none;
  `}
`

interface ILineProps {
  isOpen: boolean
}

export const Line = styled.span<ILineProps>`
  ${() => css`
    display: inline-block;

    width: 4rem;
    height: 0.1rem;
    margin-inline: 1.6rem;

    background-color: rgb(255 255 255 / 0.3);

    transition-timing-function: ease;
    transition-duration: 600ms;
    transition-property: width margin;

    @media (min-width: 992px) {
      margin-inline: 2.6rem;
    }
  `}
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-inline: 1.6rem;
    `}
`

export const TextWrapper = styled.div`
  ${() => css`
    padding-inline: 2.4rem;
  `}
`

interface ITextProps {
  isOpen: boolean
}

export const Text = styled.p<ITextProps>`
  ${({ theme }) => css`
    width: 22rem;
    margin-top: 2.4rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font24};

    opacity: 0;
    pointer-events: none;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: opacity;

    @media (min-width: 992px) {
      margin-left: 0;

      opacity: 1;
      pointer-events: visible;
    }
  `}
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      pointer-events: visible;
    `}
`

export const OpenButton = styled.button`
  ${() => css`
    display: none;

    @media (min-width: 768px) {
      position: absolute;
      bottom: 2.8rem;
      left: 2.1rem;
      z-index: 1020;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 3.2rem;
      height: 3.2rem;
      border: none;
      border-radius: 50%;

      background-color: rgb(255 255 255 / 0.1);

      cursor: pointer;
    }

    @media (min-width: 992px) {
      display: none;
    }
  `}
`

interface IImageWrapperProps {
  isOpen: boolean
}

export const ImageCloseButtonWrapper = styled.div<IImageWrapperProps>`
  ${({ isOpen }) => css`
    width: 1.6rem;
    height: 1.6rem;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: transform;
    transform: ${isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)'};
    transform-origin: center;
  `}
`

interface IButtonWrapper {
  isOpen: boolean
}

export const ButtonWrapper = styled.div<IButtonWrapper>`
  ${() => css`
    width: 100%;
  `}
  ${({ isOpen }) =>
    !isOpen &&
    css`
      ${Wrapper} {
        justify-content: space-between;

        padding: 1.2rem 1.6rem;

        font-size: 0;

        @media (min-width: 992px) {
          justify-content: center;

          font-size: 1.6rem;
        }
      }
      ${PlusIconWrapper} {
        display: flex;
        justify-content: center;
        align-items: center;

        @media (min-width: 992px) {
          display: none;
        }
      }
    `}
`

export const PlusIconWrapper = styled.div`
  ${() => css`
    display: none;

    min-width: 1.2rem;
    min-height: 1.2rem;
  `}
`
