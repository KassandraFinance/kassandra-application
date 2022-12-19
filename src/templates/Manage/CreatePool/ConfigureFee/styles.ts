import styled, { css } from 'styled-components'

export const ConfigureFee = styled.div`
  ${() => css``}
`
export const ConfigureFeeContainer = styled.form`
  ${() => css`
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr 36rem;
    gap: 2.4rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  `}
`
