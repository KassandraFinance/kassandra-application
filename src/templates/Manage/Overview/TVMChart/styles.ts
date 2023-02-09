import styled, { css } from 'styled-components'

export const TVMChart = styled.div`
  ${() => css`
    position: relative;

    width: 100%;
    height: 100%;
    padding: 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 0.4rem;
  `}
`

export const ChangeContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
  `}
`
