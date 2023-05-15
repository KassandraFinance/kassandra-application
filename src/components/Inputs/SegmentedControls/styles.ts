import styled, { css } from 'styled-components'

export const SegmentedControls = styled.ul`
  ${() => css`
    display: flex;

    height: 3rem;

    border: 0.1rem solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;

    overflow: hidden;
  `}
`

export const Control = styled.li`
  ${() => css``}
`

interface IControlProps {
  selected: boolean
}

// prettier-ignore
export const ControlButton = styled.button<IControlProps>`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.6rem;
    height: 100%;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
    text-transform: uppercase;

    background-color: rgba(255, 255, 255, 0.04);
    border: none;

    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      bottom: 0.5rem;

      width: 0;
      height: 0.2rem;

      background-color: ${theme.colors.magenta};
      border-radius: 0.1rem;
      box-shadow: 0 0 0.6rem ${theme.colors.magenta};

      transition-duration: 300ms;
      transition-timing-function: ease;
      transition-property: width;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.19);

      &:before {
        width: 1.2rem;
      }
    }

    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-property: background-color;
  `}
  ${({ selected }) => selected && css`
    background-color: rgba(0, 0, 0, 0.19);

    &:before {
      width: 1.2rem;
    }
  `}
`
