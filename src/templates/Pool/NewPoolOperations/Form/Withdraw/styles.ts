import styled, { css } from 'styled-components'

export const Withdraw = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    max-height: 100%;
    padding-top: 2rem;
    padding-right: 3.2rem;
    padding-bottom: 3.2rem;
    padding-left: 3.2rem;

    @media (max-width: 500px) {
      padding: 2rem;
    }

    > img {
      /* margin-block: 1.2rem; */
    }
  `}
`
