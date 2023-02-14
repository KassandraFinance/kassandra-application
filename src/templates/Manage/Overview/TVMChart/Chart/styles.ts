import styled, { css } from 'styled-components'

export const Chart = styled.div`
  ${({ theme }) => css`
    height: 26.6rem;

    .recharts-cartesian-axis-tick {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      line-height: ${theme.font.sizes.font16};
      text-transform: capitalize;

      text {
        fill: ${theme.colors.grayDisabled};
      }
    }

    @media (min-width: 768px) {
      height: 31.4rem;
    }
  `}
`
