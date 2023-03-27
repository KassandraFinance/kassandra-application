import styled, { css } from 'styled-components'

export const Brokers = styled.div`
  ${() => css`
    /* No empty */
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    margin-block: 2.4rem;
    padding-bottom: 1.2rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.1);
  `}
`

export const StatusCardContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    gap: 2.4rem;

    max-width: 100%;
    margin-inline: auto;
  `}
`
