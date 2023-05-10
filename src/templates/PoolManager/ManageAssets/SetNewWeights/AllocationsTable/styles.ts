import styled, { css } from 'styled-components'

export const AllocationsTable = styled.table`
  ${() => css`
    overflow: hidden;

    /* max-width: 74.6rem; */
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border-radius: 0.8rem;
    border-radius: 0.8rem;
    border-radius: 0.8rem;
  `}
`

export const TableHead = styled.thead`
  ${() => css`
    border-radius: 2rem;
    border-radius: 2rem;
    border-radius: 0.8rem;

    background: rgb(0 0 0 / 0.25);

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
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
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
    border-radius: 8px;

    background: rgb(255 255 255 / 0.04);

    #inputBalanceValue {
      position: absolute;
      right: 28%;
      bottom: 10%;

      opacity: 0;
    }
  `}
`

export const TrBody = styled.tr`
  ${() => css`
    display: grid;

    /* grid-template-columns: repeat(6, 1fr); */
    grid-template-columns: 1fr 1fr 1fr 4.8rem 1fr 1fr;
    gap: 1rem;

    margin-inline: 2.4rem;
    padding: 2.6rem 0;

    :not(:first-child) {
      border-top: 1px solid rgb(255 255 255 / 0.3);
    }

    @media (max-width: 620px) {
      gap: 0.4rem;

      margin-inline: 1.6rem;
    }

    @media (max-width: 745px) {
      grid-template-areas:
        'tokenInfo porcentage arrow newAllocation'
        '. moreInfo moreInfo .'
        'currentAmount currentAmount newAmount newAmount';
      grid-template-columns: repeat(4, 1fr);
      gap: 0;

      margin-inline: 1.6rem;
      padding: 1.4rem 0;
    }
  `}
`
