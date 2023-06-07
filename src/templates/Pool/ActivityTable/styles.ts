import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'
import {
  TRHead,
  TRLink,
  Value
} from '@/templates/Explore/CommunityPoolsTable/styles'

export const NewActivityTable = styled.div`
  ${() => css`
    ${TRHead}, ${TRLink} {
      @media (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `}
`

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.3rem;
  `}
`

export const Link = styled.a`
  ${() => css`
    position: relative;

    display: block;

    width: 1.6rem;
    height: 1.6rem;
  `}
`

export const ActivityTable = styled.div`
  margin: ${theme.spacings.space48} 0;
`

export const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  margin: ${theme.spacings.space24} 0;

  background-color: rgb(255 255 255 / 0.1);
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-left: ${theme.spacings.space16};

    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font18};
  }
`

export const Table = styled.table`
  overflow: hidden;

  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border-radius: 2rem;

  font-size: ${theme.font.sizes.font14};
  text-indent: initial;
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;

  ::-webkit-scrollbar {
    height: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;

    background-color: rgb(255 255 255 / 0.2);
  }

  thead {
    background-color: rgb(0 0 0 / 0.25);
  }

  tbody {
    background-color: rgb(255 255 255 / 0.04);

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
  align-items: center;
  justify-items: center;

  height: 3.8rem;
  margin: 1.6rem 1.5rem;

  @media (max-width: 1200px) {
    min-width: 50rem;
  }

  @media (max-width: 960px) {
    gap: 1.6rem;

    min-width: 69rem;
    height: 2.8rem;
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

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;
  text-align: center;

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
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
  }
`

export const TransactionOutAndIn = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;
  text-align: center;

  span {
    display: flex;
    gap: 0.4rem;

    font-weight: ${theme.font.weight.medium};
  }

  p {
    color: #c4c4c4;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
  }
`

export const TransactionInfo = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;
  text-align: center;

  p {
    color: #fff;
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

  span {
    min-width: 1.8rem;
    min-height: 1.8rem;
    margin-left: 0.6rem;

    font-weight: ${theme.font.weight.light};
    font-size: 1.1rem;

    @media (max-width: 960px) {
      margin-left: 0;
    }
  }
`
