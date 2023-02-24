import styled, { css } from 'styled-components'

interface IAllocationGraphProps {
  isOpen: boolean;
  height: number;
}

// eslint-disable-next-line prettier/prettier
export const AllocationGraph = styled.div<IAllocationGraphProps>`
  ${() => css`
    width: 100%;
    height: 0;
    padding: 0;
    background: rgba(31, 31, 31, 0.72);
    border-radius: 4px;
    margin-top: 0;

    .recharts-default-legend {
      display: none;
    }

    transition: height 0.5s ease, margin-top 0.5s ease;
  `}

  ${({ isOpen, height }) =>
    isOpen &&
    css`
      height: ${height}rem;
      padding: 2.4rem;
      margin-top: 2.4rem;

      @media (max-width: 576px) {
        padding: 1.6rem;
      }
    `}
`

export const AllocationTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    > h4 {
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
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
    align-items: center;
    gap: 0.8rem;

    span {
      min-height: 1.6rem;
      min-width: 1.6rem;
    }
    color: #bdbdbd;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 1.6rem;
  `}
`

export const CustomTooltipContainer = styled.div`
  ${() => css`
    padding: 1.6rem;

    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
    border-radius: 0.8rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.1);
  `}
`

export const CustomTooltipName = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    span {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }
  `}
`

export const CustomTooltipContent = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin-top: 1.4rem;
    gap: 0.8rem;
  `}
`

interface CustomTooltipItensProps {
  textColor: string;
}

// eslint-disable-next-line prettier/prettier
export const CustomTooltipItens = styled.li<CustomTooltipItensProps>`
  ${({ theme, textColor }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    p {
      color: ${textColor};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;
    }

    strong {
      color: ${textColor};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;
    }
  `}
`
