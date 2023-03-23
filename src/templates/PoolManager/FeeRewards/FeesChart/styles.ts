import styled, { css } from 'styled-components'

export const FeesGraph = styled.div`
  ${({ theme }) => css`
    overflow-x: auto;
    overflow-y: hidden;

    width: 100%;
    height: 100%;
    border-radius: 4px;

    background: rgb(255 255 255 / 0.05);

    .recharts-cartesian-axis-tick {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      font-family: ${theme.font.family};
      line-height: ${theme.font.sizes.font16};
      text-transform: capitalize;

      text {
        fill: ${theme.colors.grayDisabled};
      }
    }

    .xAxis {
      .recharts-cartesian-axis-tick {
        font-weight: ${theme.font.weight.normal};
        font-size: ${theme.font.sizes.font12};
        line-height: ${theme.font.sizes.font14};

        text {
          fill: ${theme.colors.snow};
        }
      }
    }

    .xAxis:first-of-type {
      .recharts-cartesian-axis-tick {
        color: #c4c4c4;
        font-weight: ${theme.font.weight.normal};
        font-size: ${theme.font.sizes.font14};
        line-height: ${theme.font.sizes.font16};
        letter-spacing: 0.22em;
        text-transform: uppercase;

        text {
          fill: #c4c4c4;
        }
      }
    }
  `}
`
