import styled, { css } from 'styled-components'

export const Form = styled.div`
  /* ${({ theme }) => css`
    background-color: ${theme.colors.darkGray};
  `} */
  /*
  display: flex;
  flex-direction: column;
  align-items: center; */

  position: -webkit-sticky;
  position: sticky;
  top: 0.8rem;
  z-index: 10;

  max-width: 44.8rem;

  background-color: rgba(255, 255, 255, 0.04);
  /* border-radius: 1.2rem; */
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;

  @media (max-width: 1200px) {
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 960px) {
    display: none;
  }
`
