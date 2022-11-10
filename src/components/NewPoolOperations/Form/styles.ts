import styled, { css } from 'styled-components'

export const Form = styled.form`
  ${({ theme }) => css`
    background-color: ${theme.colors.darkGray};
  `}
`
