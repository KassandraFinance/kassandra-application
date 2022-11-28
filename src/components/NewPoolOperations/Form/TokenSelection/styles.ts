import styled, { css } from 'styled-components'

export const TokenSelection = styled.div`
  ${({ theme }) => css`
    font-size ${theme.font.sizes.font16};
    width: 100%;
  `}
`

export const TokenSelectionHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 6.5rem;
    padding-inline: 3.2rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 1.2rem 1.2rem 0rem 0rem;
    border-bottom: 0.2rem solid #26dbdb;

    > p {
      width: 100%;

      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font18};
      font-weight: ${theme.font.weight.medium};
      text-align: center;
    }

    > span {
      cursor: pointer;
    }
  `}
`

export const BodyToken = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    padding: 2.3rem 3.2rem;
    gap: 2rem;

    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 4px 69px -17px rgba(0, 0, 0, 0.51);
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
  `}
`
export const InputContent = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;

    > img {
      position: absolute;
      left: 1rem;
    }
  `}
`

interface IDeleteSearchProps {
  isShowIcon: boolean;
}

// eslint-disable-next-line prettier/prettier
export const deleteSearch = styled.span<IDeleteSearchProps>`
  ${({ isShowIcon }) => css`
    position: absolute;
    right: 1rem;

    cursor: pointer;

    img {
      display: ${isShowIcon ? 'flex' : 'none'};
      transition: 0.3s;
    }
  `}
`

export const SearchListInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 1.6rem 4rem;

    background: #1b1d22;
    border: 0.2rem solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
  `}
`

export const tokenPinContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  `}
`

export const tokenPin = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.9rem 1.1rem;

    background: rgba(255, 255, 255, 0.08);
    border-radius: 0.4rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};

    border: 0.1rem solid transparent;

    cursor: pointer;

    :hover {
      border: 0.1rem solid rgba(255, 255, 255, 0.3);
    }
  `}
`

export const TokenListContainer = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    flex-direction: column;
    /* padding: 0.8rem 0; */
    max-height: 32rem;
    /* overflow-y: scroll; */

    background: rgba(31, 31, 31, 0.72);
    border-radius: 1rem;

    > div {
      width: 100%;
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

    :first-child {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
    :last-child {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }

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

export const NotFoundTokenContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4.4rem;

    > p {
      margin-top: 2.6rem;

      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
    }
  `}
`

export const shadow = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1f1f1f 100%);
  border-radius: 0 0 0.8rem 0.8rem;
  height: 5.5rem;
`
