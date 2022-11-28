import styled, { css } from 'styled-components'

export const Invest = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-height: 100%;
    padding-top: 2rem;
    padding-right: 3.2rem;
    padding-bottom: 3.2rem;
    padding-left: 3.2rem;

    .btn-submit {
      margin-top: 2rem;
    }

    @media (max-width: 500px) {
      padding: 2rem;
    }
  `}
`
