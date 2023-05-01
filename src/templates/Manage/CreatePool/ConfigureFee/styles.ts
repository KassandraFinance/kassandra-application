import styled, { css } from 'styled-components'

export const ConfigureFee = styled.div`
  ${() => css``}
`
export const ConfigureFeeContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 36rem;
    gap: 2.4rem;
    align-items: flex-start;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  `}
`
