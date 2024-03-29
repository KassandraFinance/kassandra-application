import styled, { css } from 'styled-components'
import { Overlay } from '../../Overlay/styles'

export const InputList = styled.div`
  ${() => css`
    width: 4.8rem;
    margin-left: auto;

    ${Overlay} {
      background-color: transparent;
      backdrop-filter: blur(0);
    }
  `}
`

interface IDataListProps {
  height: number
  isOpen: boolean
}

// prettier-ignore
export const Datalist = styled.ul<IDataListProps>`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 4.8rem;
    max-height: 2.2rem;

    background: rgba(255, 255, 255, 0.04);
    border: 0.1rem solid rgba(255, 255, 255, 0.15);
    border-radius: 0.2rem;
    backdrop-filter: blur(70px);

    overflow: hidden;

    transition-duration: 500ms;
    transition-timing-function: ease;
    transition-property: max-height;
  `}

  ${({ height, isOpen }) => isOpen && css`
    position: relative;

    max-height: ${2.8 * height + 2}rem;

    z-index: 1050;
  `}
`

export const Option = styled.li`
  ${({ theme }) => css`
    display: flex;
    gap: 0.4rem;

    padding: 0.8rem 1rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    background-color: rgba(255, 255, 255, 0);

    cursor: pointer;

    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-property: background-color;

    &:first-of-type {
      padding: 0.4rem 1rem;
      padding-inline: 1rem 0.5rem;
    }

    &:last-of-type {
      padding-bottom: 0.4rem;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  `}
`

interface IIconWrapperProps {
  isOpen: boolean
}

// prettier-ignore
export const IconWrapper = styled.div<IIconWrapperProps>`
  ${() => css`
    margin-left: auto;

    transition-duration: 700ms;
    transition-timing-function: ease;
    transition-property: transform;
  `}
  ${({ isOpen }) => isOpen && css`
    transform: rotate(180deg);
  `}
`
