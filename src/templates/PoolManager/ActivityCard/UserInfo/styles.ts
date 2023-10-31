import styled, { css } from 'styled-components'

export const UserInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.4rem;

    > img {
      border-radius: 50%;
    }
  `}
`
