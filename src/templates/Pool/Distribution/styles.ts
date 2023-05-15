import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Distribution = styled.div`
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
    max-height: 100%;
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

// eslint-disable-next-line prettier/prettier
export const Tr = styled.tr`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;

  height: 3.8rem;
  margin: 1.6rem 1.5rem;

  @media (max-width: 1100px) {
    min-width: 60rem;
  }

  @media (max-width: 768px) {
    min-width: 69rem;

    height: 2.8rem;
    gap: 1.6rem;
  }

  @media (max-width: 576px) {
    min-width: 58rem;
  }
`

export const Th = styled.th`
  font-weight: ${theme.font.weight.normal};
  letter-spacing: 0.5px;

  @media (max-width: 660px) {
    font-size: 1.5rem;
  }
`

// eslint-disable-next-line prettier/prettier
export const Td = styled.td`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-weight: ${theme.font.weight.light};
  letter-spacing: 0.5px;
`

export const BalanceCoin = styled.span`
  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font12};
`

export const YieldYakContent = styled.a`
  display: flex;
  gap: 0.4rem;

  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font12};

  text-decoration: none;
  cursor: pointer;
  p {
    color: ${theme.colors.grayDisabled};
  }
`

export const isThereNoYieldyak = styled.p`
  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font12};
  font-weight: 400;
`

interface ICoinProps {
  width?: number
  change24h?: boolean
  negative?: boolean
}

// eslint-disable-next-line prettier/prettier
export const Coin = styled.span<ICoinProps>`
  display: flex;
  align-items: center;
  text-align: center;
  width: ${props => props.width}px;

  ${props =>
    props.change24h && {
      color: `${props.negative ? '#EB5757' : '#6FCF97'}`
    }};

  img {
    max-width: 2.4rem;
    margin-right: 1.6rem;
    margin-left: 0.8rem;

    border-radius: 50%;
  }

  span {
    font-weight: 400;
  }

  p {
    display: flex;
    align-items: flex-start;

    color: #969696;
    font-size: 1.2rem;
    font-weight: 400;
  }
`
