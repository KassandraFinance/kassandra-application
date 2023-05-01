import styled, { css } from 'styled-components'

export const CustomLegend = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    margin-top: 2.4rem;
    margin-bottom: 3.2rem;
    margin-left: 2.4rem;

    h2 {
      margin-right: 2.4rem;
    }

    p {
      margin-right: 1.6rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
    }
  `}
`

export const Legend = styled.div`
  ${() => css`
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.4rem;
  `}
`
