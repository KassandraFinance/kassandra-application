import styled, { css } from 'styled-components'

export const BrokersOverview = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    gap: 2.4rem;

    max-width: 100%;
    margin-inline: auto;
  `}
`
