import styled from 'styled-components'
import theme from '../../../styles/theme'

export const ActivityTable = styled.div`
  margin: ${theme.spacings.space48} 0;
`

export const Line = styled.div`
  background-color: rgba(255, 255, 255, 0.1);

  width: 100%;
  height: 0.1rem;
  margin: ${theme.spacings.space24} 0;
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-left: ${theme.spacings.space16};

    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.bold};
  }
`

export const Table = styled.table`
  width: 100%;

  border-radius: 2rem;
  border-spacing: 0;
  border-collapse: collapse;

  font-size: ${theme.font.sizes.font14};

  overflow: hidden;
  text-indent: initial;

  -webkit-border-radius: 2rem;
  -moz-border-radius: 2rem;
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;

  ::-webkit-scrollbar {
    height: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
  }

  thead {
    background-color: rgba(0, 0, 0, 0.25);
  }

  tbody {
    background-color: rgba(255, 255, 255, 0.04);
    /* max-height: 100%; */
  }

  @media (max-width: 1100px) {
    display: block;
    overflow: auto;
  }

  @media (max-width: 960px) {
    display: grid;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    display: block;
    overflow: auto;
  }
`

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 3.8rem;
  margin: 1.6rem 1.5rem;

  @media (max-width: 1200px) {
    min-width: 50rem;
  }

  @media (max-width: 960px) {
    min-width: 69rem;

    height: 2.8rem;
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    min-width: 69rem;
  }

  @media (max-width: 576px) {
    min-width: 50rem;
  }
`

export const Th = styled.th`
  font-weight: ${theme.font.weight.normal};
  letter-spacing: 0.5px;

  @media (max-width: 660px) {
    font-size: 1.5rem;
  }
`

export const TitleTransaction = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;

  span {
    display: flex;

    color: #fcfcfc;
    font-weight: ${theme.font.weight.medium};
  }

  a {
    margin-left: 0.8rem;
  }

  p {
    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
  }
`

export const TransactionOutAndIn = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;

  span {
    display: flex;
    gap: 0.4rem;

    font-weight: ${theme.font.weight.medium};
  }

  p {
    color: #c4c4c4;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
  }
`

export const TransactionInfo = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;

  p {
    color: #ffffff;
    font-weight: ${theme.font.weight.medium};
  }

  span {
    display: flex;

    color: #fcfcfc;
    font-weight: ${theme.font.weight.light};
  }
`

export const TokensSymbols = styled.div`
  z-index: 10;

  display: flex;
  align-items: center;

  z-index: 10;

  span {
    min-width: 1.8rem;
    min-height: 1.8rem;
    margin-left: 0.6rem;

    font-size: 1.1rem;
    font-weight: ${theme.font.weight.light};

    @media (max-width: 960px) {
      margin-left: 0;
    }
  }
`
