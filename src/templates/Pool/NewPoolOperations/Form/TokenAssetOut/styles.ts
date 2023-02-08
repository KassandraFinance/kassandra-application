import styled, { css } from 'styled-components'

export const TokenAssetOut = styled.div`
  ${({ theme }) => css`
    display: flex;

    width: 100%;
    padding: 1rem 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 1.6rem;
  `}
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const TokenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`

export const Title = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
  `}

  @media (max-width: 360px) {
    padding-left: 1.2rem;
    font-size: 1.07rem;
  }
`

export const Input = styled.input`
  ${({ theme }) => css`
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: ${theme.font.sizes.font20};

    text-align: right;
    width: 100%;
    margin: 0.8rem 0;

    outline: none;

    @media (max-width: 380px) {
      font-size: 22px;
    }
    @media (max-width: 350px) {
      font-size: ${theme.font.sizes.font20};
    }
  `}

  &::placeholder {
    color: #fff;
  }

  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`

export const PriceDolar = styled.span`
  ${({ theme }) => css`
    margin-top: 0.2rem;

    color: ${theme.colors.grayDisabled};
    line-height: ${theme.font.sizes.font18};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
  `}
`

interface ITokenProps {
  bestValue?: boolean;
}

// prettier-ignore
export const Token = styled.div<ITokenProps>`
  ${({ theme, bestValue }) => css`
    display: flex;
    align-items: center;

    margin: 0.8rem 0;

    .img {
      width: 2.2rem;
      margin-top: 0.2rem;
    }

    .poolIcon {
      border-radius: 50%;
    }
  `}
`

export const Symbol = styled.span`
  ${({ theme }) => css`
    margin-left: 0.8rem;

    line-height: ${theme.font.sizes.font20};
    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.normal};

    @media (max-width: 380px) {
      font-size: ${theme.font.sizes.font16};
    }
    @media (max-width: 360px) {
      font-size: ${theme.font.sizes.font14};
    }
  `}
`

export const Balance = styled.span`
  ${({ theme }) => css`
    line-height: ${theme.font.sizes.font18};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    letter-spacing: 0.03rem;

    color: ${theme.colors.grayDisabled};
  `}
`
