import styled, { css } from 'styled-components'

export const TokenListContainer = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    flex-direction: column;
    height: 32rem;

    > div {
      border-radius: 1rem;
      background: rgba(31, 31, 31, 0.72);
    }
  `}
`

export const Token = styled.li`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.6rem;

    cursor: pointer;

    :hover {
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`

export const TokenNameContent = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `}
`

export const TokenName = styled.div`
  ${({ theme }) => css`
    > span {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      letter-spacing: 0.05em;
    }

    > p {
      margin-top: 0.4rem;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      text-transform: uppercase;
    }
  `}
`

export const TokenValueInWalletContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `}
`

export const TokenValueInWallet = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    > span {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      letter-spacing: 0.05em;
      text-align: right;
    }
    > p {
      margin-top: 0.4rem;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      text-align: right;
    }
  `}
`

export const PinContainer = styled.span`
  ${() => css`
    svg {
      path {
        opacity: 0.3;
        transition: opacity 0.3s;
      }
    }

    :hover {
      svg {
        path {
          opacity: 1;
        }
      }
    }
  `}
`

export const NotFoundTokenContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    > p {
      margin-top: 2.6rem;

      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
    }
  `}
`
interface IShowShadowProps {
  isShowShadow: boolean;
}

// eslint-disable-next-line prettier/prettier
export const shadow = styled.span<IShowShadowProps>`
  ${({ isShowShadow }) => css`
    position: absolute;
    bottom: 0;

    display: ${isShowShadow ? 'flex' : 'none'};

    height: 5.5rem;
    width: 100%;

    background: linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1f1f1f 100%);
    border-radius: 0 0 0.8rem 0.8rem;

    z-index: 50;
  `}
`
