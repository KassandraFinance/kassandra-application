import styled, { css } from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0);

  z-index: 9;
`

export const SelectToken = styled.div`
  ${({ theme }) => css`
    margin: 0.8rem 0;
    max-width: 14.5rem;
    min-width: 12.8rem;

    font-size: ${theme.font.sizes.font20};

    background-color: #4a4348;
    border-radius: 0.4rem;

    @media (max-width: 400px) {
      width: 11rem;
    }
  `}
`

export const Selected = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;

    width: 100%;
    /* min-width: 12.8rem; */
    height: 3.4rem;
    padding: 0.6rem 0.8rem 0.4rem;

    font-size: ${theme.font.sizes.font20};
    line-height: ${theme.font.sizes.font20};

    border-radius: 0.4rem;

    cursor: pointer;

    img {
      border-radius: 50%;
    }

    #arrow-down {
      /* margin: 0 0 0.6rem auto;
      padding: 0; */
    }

    @media (max-width: 400px) {
      width: 11rem;
    }
  `}
`

export const tokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  p {
    white-space: nowrap;
  }
`
