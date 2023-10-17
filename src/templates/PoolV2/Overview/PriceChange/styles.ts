import theme from '@/styles/theme'
import styled from 'styled-components'

export const Change = styled.div`
  table {
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;

    overflow: hidden;
    text-indent: initial;

    border-spacing: 0;
    -webkit-border-horizontal-spacing: 0;
    -webkit-border-vertical-spacing: 0;

    width: 100%;
    font-size: ${theme.font.sizes.font14};

    thead {
      background-color: rgba(0, 0, 0, 0.25);
      width: 100%;

      tr {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
        padding: 1.6rem 0.8rem;
      }

      th {
        color: ${theme.colors.grayDisabled};
        font-weight: ${theme.font.weight.light};

        color: ${theme.colors.grayDisabled};
        font-size: ${theme.font.sizes.font16};
        font-weight: ${theme.font.weight.light};
        line-height: 1.8rem;
      }
    }

    tbody {
      background-color: rgba(255, 255, 255, 0.04);
      text-align: center;
      font-weight: ${theme.font.weight.light};

      tr {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        padding: 1.6rem 0.8rem;
      }
    }
  }
`

interface ITdProps {
  value: number
}

export const Td = styled.td<ITdProps>`
  color: ${props => (props.value > 0 ? theme.colors.green : theme.colors.red)};
  color: ${props =>
    (props.value === 0 || isNaN(props.value)) && theme.colors.snow};

  font-size: ${theme.font.sizes.font14};
  font-weight: ${theme.font.weight.medium};
  line-height: 1.4rem;
`
