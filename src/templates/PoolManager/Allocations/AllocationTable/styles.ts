import styled, { css, keyframes } from 'styled-components'

interface IIsViewProps {
  isView?: number;
}

// eslint-disable-next-line prettier/prettier
export const AllocationTable = styled.table<IIsViewProps>`
  ${({ isView }) => css`
    width: 100%;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;

    border-collapse: collapse;
    overflow: hidden;

    @media (max-width: 576px) {
      .weight {
        display: ${isView === 1 ? 'flex' : 'none'};
        animation: ${tableAnim} 0.4s ease;
      }
      .holding {
        display: ${isView === 2 ? 'flex' : 'none'};
        animation: ${tableAnim} 0.4s ease;
      }
      .price {
        display: ${isView === 3 ? 'flex' : 'none'};
        animation: ${tableAnim} 0.4s ease;
      }
      .yield {
        display: ${isView === 4 ? 'flex' : 'none'};
        animation: ${tableAnim} 0.4s ease;
      }
    }
  `}
`

export const TheadWrapper = styled.thead`
  ${() => css`
    display: flex;
    width: 100%;
    padding: 2.4rem;

    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px 8px 0px 0px;
  `}
`

export const TrHead = styled.tr`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 4rem repeat(3, 1fr);
    width: 100%;

    th:first-child {
      justify-content: flex-start;
    }
    th {
      justify-content: flex-end;
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr) 5.6rem;
    }
  `}
`

export const ThHead = styled.th`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 1.8rem;

    @media (max-width: 576px) {
      margin-right: 2rem;
    }
  `}
`

export const TbodyWrapper = styled.tbody`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-inline: 2.4rem;

    tr:last-child {
      border: none;
    }

    td {
      @media (max-width: 576px) {
        margin-right: 2rem;
      }
    }
  `}
`

export const TrWrapper = styled.tr`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 4rem 1fr 1fr 1fr;
    width: 100%;

    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 2.4rem;
    margin-top: 2.4rem;

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr) 5.6rem;
    }
  `}
`

export const TokenInfo = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;

    > p {
      color: #fcfcfc;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 110%;
      letter-spacing: 0.05em;
    }
  `}
`

export const Allocation = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;

    > p {
      color: #fcfcfc;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 110%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      min-height: 3.5rem;
    }
  `}
`

export const Holding = styled.td`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    > span {
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      letter-spacing: 0.05em;
    }
  `}
`

export const PriceContent = styled.td`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.05em;
    }
  `}
`

interface IPriceChangeProps {
  changePrice: number;
}

// eslint-disable-next-line prettier/prettier
export const PriceChange = styled.span<IPriceChangeProps>`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
    letter-spacing: 0.05em;
  `}

  ${({ theme, changePrice }) =>
    changePrice > 0 &&
    css`
      color: ${theme.colors.success};
    `}
  ${({ theme, changePrice }) =>
    changePrice < 0 &&
    css`
      color: ${theme.colors.error};
    `}
`

export const YieldContent = styled.td`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    > p {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    strong {
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      min-height: 3.5rem;
    }
  `}
`

export const MobileEyeContainer = styled.td`
  ${({ theme }) => css`
    display: none;
    width: 100%;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;
    text-align: center;

    @media (max-width: 576px) {
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      animation: ${tableAnim} 0.4s ease;
    }
  `}
`

export const YieldLink = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: #bdbdbd;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;
    letter-spacing: 0.05em;
    text-decoration: none;
  `}
`

export const ArrowsWrapper = styled.th`
  ${() => css`
    display: none;

    span {
      display: flex;
      align-items: center;

      padding: 0.6rem 0.85rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;

      border: 0.1rem solid transparent;

      cursor: pointer;

      transition: border 0.3s ease;

      &:hover {
        border: 0.1rem solid rgba(255, 255, 255, 0.3);
      }
    }

    #arrow-right {
      transform: rotate(180deg);
    }

    @media (max-width: 576px) {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
  `}
`

const tableAnim = keyframes`
  from {
    transform: translateX(-1rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`
