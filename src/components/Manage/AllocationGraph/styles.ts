import styled, { css } from 'styled-components'

interface IAllocationGraphProps {
  isOpen: boolean;
  height: number;
}

// prettier-ignore
export const AllocationGraph = styled.div<IAllocationGraphProps>`
  ${() => css`
    overflow-y: hidden;

    width: 100%;
    height: 0;
    margin-top: 0;
    padding: 0;
    border-radius: 4px;

    background: rgb(31 31 31 / 0.72);

    opacity: 0;

    transition-timing-function: ease;
    transition-duration: 600ms;
    transition-property: height margin-top opacity;

    .recharts-default-legend {
      display: none;
    }
  `}

  ${({ isOpen, height }) => isOpen && css`
      height: ${height}rem;
      margin-top: 2.4rem;
      padding: 2.4rem;

      opacity: 1;

      @media (max-width: 576px) {
        padding: 1.6rem;
      }
    `}
`

export const AllocationTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    > h4 {
      margin-bottom: 2.4rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      line-height: 1.6rem;
      letter-spacing: 0.05em;

      @media (max-width: 576px) {
        font-size: ${theme.font.sizes.font14};
      }
    }
  `}
`

export const AllocationList = styled.ul`
  ${() => css`
    display: flex;
    gap: 2.4rem;

    li:first-child {
      span {
        background-color: #ffbf00;
      }
    }

    li:last-child {
      span {
        background-color: #26dbdb;
      }
    }
  `}
`
export const AllocationItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    color: #bdbdbd;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.6rem;

    span {
      min-width: 1.6rem;
      min-height: 1.6rem;
    }
  `}
`

export const CustomTooltipContainer = styled.div`
  ${() => css`
    padding: 1.6rem;
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 8px;

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
  `}
`

export const CustomTooltipName = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;

    span {
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }
  `}
`

export const CustomTooltipContent = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    margin-top: 1.4rem;
  `}
`

interface CustomTooltipItensProps {
  textColor: string;
}

// prettier-ignore
export const CustomTooltipItens = styled.li<CustomTooltipItensProps>`
  ${({ theme, textColor }) => css`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;

    p {
      color: ${textColor};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 100%;
    }

    strong {
      color: ${textColor};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 100%;
    }
  `}
`
