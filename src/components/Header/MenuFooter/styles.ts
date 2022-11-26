import styled, { css } from 'styled-components'

export const MenuFooter = styled.div`
  ${() => css`
    display: none;
    @media (max-width: 576px) {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;

      width: 100%;

      margin-top: auto;
      padding: 1.3rem 1.6rem;
    }
  `}
`

export const LogoWrapper = styled.div`
  ${() => css`
    width: 18.58rem;
    margin-top: 0.9rem;
  `}
`

export const CopyRitght = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
  `}
`
