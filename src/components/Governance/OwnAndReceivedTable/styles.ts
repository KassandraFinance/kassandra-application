import styled from 'styled-components'
import theme from '../../../styles/theme'

export const OwnAndReceivedTable = styled.section`
  margin-top: 4rem;
`

export const Table = styled.table`
  overflow: hidden;

  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;

  font-size: ${theme.font.sizes.font14};
  text-indent: initial;

  ::-webkit-scrollbar {
    height: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color: rgb(255 255 255 / 0.2);
  }

  thead {
    width: 100%;

    background-color: rgb(0 0 0 / 0.25);
  }

  tbody {
    width: 100%;
    max-height: 100%;

    background-color: rgb(255 255 255 / 0.04);
  }

  @media (max-width: 960px) {
    display: block;
    overflow: auto;
  }
`

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr;

  max-height: 8.1rem;
  margin-right: 3.2rem;
  margin-left: 3.2rem;
  padding: 2.4rem 0;
  border-top: 1px solid ${theme.colors.grayDisabled};

  :first-child {
    border: none;
  }

  .headTable {
    margin: 0;
  }

  .pool,
  .delegating-to,
  .staked,
  .voting-power-allocated,
  .proposals-voted {
    flex-direction: column;
  }

  .pool {
    flex-direction: row;
    justify-content: flex-start;

    p {
      margin-left: 1.4rem;

      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
    }

    span {
      margin-left: 1.4rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
    }
  }

  .delegating-to {
    flex-direction: row;

    span {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
    }
  }

  .staked {
    align-items: flex-end;

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
    }

    span {
      color: #d3d3d3;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
    }
  }

  .voting-power-allocated {
    align-items: flex-end;

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
    }

    span {
      color: #d3d3d3;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
    }
  }

  @media (max-width: 960px) {
    min-width: 960px;
  }
`

export const Th = styled.th`
  display: flex;
  justify-content: center;

  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};

  :first-child {
    justify-content: flex-start;
  }

  &:last-of-type {
    justify-content: flex-end;
  }

  &:nth-last-of-type(2) {
    justify-content: flex-end;
  }

  @media (max-width: 960px) {
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
  }
`

export const Td = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`
