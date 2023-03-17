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
    grid-template-columns: 1fr 1fr 1fr 4.8rem 1fr 1fr;
    gap: 1rem;
    padding: 2.4rem;

    th:not(:first-child, :last-child) {
      justify-content: center;
    }
    th:last-child,
    th:nth-child(2) {
      justify-content: flex-end;
    }

    @media (max-width: 620px) {
      gap: 0.4rem;
      padding-inline: 1.6rem;
    }

    @media (max-width: 745px) {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1.6rem;

      th:not(:first-child, :nth-child(5)) {
        display: none;
      }
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
    position: relative;

    max-width: 74.6rem;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;

    #inputBalanceValue {
      position: absolute;
      bottom: 10%;
      right: 28%;
      opacity: 0;
    }
  `}
`

export const TrBody = styled.tr`
  ${() => css`
    display: grid;
    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: 1fr 1fr 1fr 4.8rem 1fr 1fr;
    padding: 2.6rem 0;
    margin-inline: 2.4rem;
    gap: 1rem;

    :not(:first-child) {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 620px) {
      gap: 0.4rem;
      margin-inline: 1.6rem;
    }

    @media (max-width: 745px) {
      margin-inline: 1.6rem;
      padding: 1.4rem 0;
      grid-template-columns: none;
      gap: 0;
      grid-template-areas:
        'tokenInfo porcentage arrow newAllocation'
        '. moreInfo moreInfo .'
        'currentAmount currentAmount newAmount newAmount';
    }
  `}
`
