import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  ${() => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(1rem);

    z-index: 30;
  `}
`
