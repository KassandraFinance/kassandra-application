import styled, { css } from 'styled-components'

export const Steps = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.4rem;

    margin-bottom: 2.4rem;

    @media (min-width: 768px) {
      gap: 1.6rem;
    }
  `}
`
