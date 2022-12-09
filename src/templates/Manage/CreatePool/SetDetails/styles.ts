import styled, { css } from 'styled-components'

export const SetDetails = styled.div`
  ${() => css`
    overflow-y: auto;
  `}
`

export const PoolContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-rows: 1fr;
  `}
`
