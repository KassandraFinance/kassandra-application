import styled, { css } from 'styled-components'

export const ContainerButton = styled.div`
  ${() => css`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;

    height: 7.6rem;
    padding: 1.6rem;

    background-color: #1f2226;

    z-index: 1030;

    @media (min-width: 768px) {
      height: 9.6rem;
      padding: 2.4rem;
    }

    @media (min-width: 992px) {
      height: 8rem;
      padding: 1.6rem 3.2rem;
    }
  `}
`

export const ButtonsWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 1.6rem;

    margin-inline: auto;

    @media (min-width: 768px) {
      gap: 2.4rem;
    }

    @media (min-width: 992px) {
      gap: 2.4rem;

      width: 55.3rem;
    }
  `}
`
