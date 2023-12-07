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
export const IconWrapper = styled.span`
  ${() => css`
    cursor: pointer;
  `}
`

export const UserContent = styled.a`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    text-decoration: none;
  `}
`

export const UserName = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
  `}
`

export const UserWallet = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.6rem;
  `}
`
