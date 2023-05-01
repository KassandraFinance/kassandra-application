import styled, { css } from 'styled-components'

export const TVMChart = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    width: 100%;
    height: 100%;
    padding: 1.6rem;
    border-radius: 8px;

    background: rgb(31 31 31 / 0.72);
  `}
`

export const SelectChartTypeContainer = styled.div`
  ${() => css`
    position: absolute;
    left: 1.6rem;
    z-index: 10;

    display: flex;
    gap: 1.6rem;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      display: flex;
    }
  `}
`

interface IControlProps {
  selected: boolean;
}

// prettier-ignore
export const ChartTypeButton = styled.button<IControlProps>`
  ${({ theme, ...props }) => css`
    position: relative;

    height: 2rem;
    margin-top: 0.4rem;
    padding-bottom: 0.4rem;
    border: none;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.05em;

    background-color: transparent;

    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.1rem;
      left: ${props.selected ? '0' : '50%'};

      width: ${props.selected ? '100%' : '0'};
      height: 0.1rem;
      border-radius: 1px;

      background-color: ${theme.colors.cyan};
      box-shadow: 0 0 0.6rem ${theme.colors.cyan};

      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
      transition-property: width left opacity;
    }

    &:hover::after {
      left: 0%;

      width: 100%;
    }
`}
`

export const SegmentedControlsContainer = styled.div`
  ${() => css`
    position: absolute;
    right: 1.6rem;
    z-index: 10;

    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  `}
`

export const InputListContainer = styled.div`
  ${() => css`
    position: absolute;
    right: 1.6rem;
    z-index: 10;

    @media (min-width: 768px) {
      display: none;
    }
  `}
`

export const ChangeContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 2rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};

    @media (min-width: 768px) {
      font-size: ${theme.font.sizes.font16};
      line-height: ${theme.font.sizes.font16};
      letter-spacing: 0.05em;
    }
  `}
`
