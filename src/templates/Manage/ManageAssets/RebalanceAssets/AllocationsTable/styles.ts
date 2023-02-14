import styled, { css } from 'styled-components'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const AllocationsTable = styled.table`
  ${() => css`
    border-collapse: collapse;
    /* max-width: 74.6rem; */
    width: 100%;
    height: 100%;

    overflow: hidden;
    -webkit-border-radius: 0.8rem;
    -moz-border-radius: 0.8rem;
    border-radius: 0.8rem;
  `}
`

export const TableHead = styled.thead`
  ${() => css`
    background: rgba(0, 0, 0, 0.25);
    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 0.8rem;
    /* background: rgba(0, 0, 0, 0.25); */
  `}
`

export const TableHeadRow = styled.tr`
  ${() => css`
    display: grid;
    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: 1fr 1fr 1fr 4.8rem 1fr 1fr;
    /* padding: 2.4rem; */

    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    gap: 1rem;

    padding-inline: 2.4rem;
    padding-block: 2.4rem;

    th:last-child {
      justify-content: flex-end;
    }
    th:not(:first-child, :last-child) {
      justify-content: center;
    }
    th:nth-child(2) {
      justify-content: flex-end;
    }
  `}
`

export const ThHead = styled.th`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 100%;
    letter-spacing: 0.05em;

    img {
      margin-left: 0.8rem;
    }
  `}
`

export const TBodyAllocations = styled.tbody`
  ${() => css`
    max-width: 74.6rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
  `}
`

export const TrBody = styled.tr`
  ${() => css`
    /* display: flex;
    justify-content: space-between; */
    display: grid;
    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: 1fr 1fr 1fr 4.8rem 1fr 1fr;
    padding: 2.6rem 0;
    margin-inline: 2.4rem;
    gap: 1rem;

    :not(:first-child) {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }
  `}
`

export const TokenInfo = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `}
`

export const TokenNameContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;

    > p {
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const TokenName = styled.span`
  ${({ theme }) => css`
    > a {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      color: #fcfcfc;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;

      text-decoration: none;
    }
  `}
`

export const CurrentAmount = styled.td`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 0.4rem;

    > span {
      color: #ffffff;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
    > p {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`
export const Allocation = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    color: #ffffff;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 100%;
  `}
`

export const Arrow = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `}
`

export const NewAllocation = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    /* input {
      max-width: 6.1rem;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      padding: 8px 8px 8px 12px;
    } */
  `}
`

export const ImageContent = styled.span`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3.2rem;
    min-width: 3.2rem;
    border-radius: 50%;
    background: #ffffff10;
  `}
`

export const NewAmount = styled.td`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    > span {
      color: #ffffff;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
    > p {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`
