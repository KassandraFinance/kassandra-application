import styled, { css } from 'styled-components'

export const AssetsTable = styled.div`
  ${() => css`
    min-width: 100%;

    .asset {
      width: 100%;
    }

    .price {
      display: none;

      @media (min-width: 992px) {
        display: flex;
        align-items: center;

        min-width: 4.3rem;

        text-align: right;
      }
    }

    .marketCap {
      display: none;

      @media (min-width: 576px) {
        display: flex;
        align-items: center;

        min-width: 9.9rem;

        text-align: right;
      }
    }

    .balance {
      min-width: 8rem;

      text-align: right;
    }

    .add {
      min-width: 2.8rem;
    }
  `}
`

export const Table = styled.div`
  ${() => css`
    border-collapse: collapse;

    width: 100%;

    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 0.8rem;

    overflow: hidden;
  `}
`

export const THead = styled.div`
  ${() => css`
    height: 6.2rem;

    background: rgba(0, 0, 0, 0.25);
  `}
`

export const TBody = styled.div`
  ${() =>
    css`
      max-height: 41.1rem;

      background: rgba(255, 255, 255, 0.04);

      overflow-y: auto;
    `}
`

export const Tr = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;

    margin-inline: 1.6rem;
    padding-block: 2.4rem;

    &:not(:first-of-type) {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }

    @media (min-width: 576px) {
      gap: 5rem;
    }

    @media (min-width: 768px) {
      gap: 11rem;

      margin-inline: 2.4rem;
    }

    @media (min-width: 992px) {
      gap: 3.6rem;
    }

    @media (min-width: 1200px) {
      gap: 8.5rem;
    }
  `}
`

export const Th = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.8rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;

    &:first-of-type {
      justify-content: flex-start;

      text-align: left;
    }
  `}
`

export const Td = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

export const SecondaryText = styled.span`
  ${() => css`
    color: #bfbfbf;
  `}
`

export const HeaderButton = styled.button`
  ${() => css`
    width: 1.2rem;
    height: 1.2rem;

    background-color: transparent;
    border: none;

    cursor: pointer;
  `}
`
