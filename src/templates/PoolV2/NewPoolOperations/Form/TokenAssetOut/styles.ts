import styled, { css } from 'styled-components'

export const TokenAssetOut = styled.div`
  ${() => css`
    display: flex;

    width: 100%;
    padding: 1rem 1.6rem;
    border-radius: 1rem;

    background: rgb(31 31 31 / 0.72);

    @media (max-width: 960px) {
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
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

export const InputContent = styled.span`
  ${() => css`
    margin: 0.8rem 0;
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    border: none;

    color: #fff;
    font-size: ${theme.font.sizes.font20};
    text-align: right;

    background-color: transparent;
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
    appearance: none;
  }

  &[type='number'] {
    appearance: textfield;
  }
`

export const PriceDolar = styled.span`
  ${({ theme }) => css`
    margin-top: 0.2rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font18};
  `}
`

interface ITokenProps {
  bestValue?: boolean
}

// prettier-ignore
export const Token = styled.div<ITokenProps>`
  ${({ theme, bestValue }) => css`
    display: flex;
    align-items: center;

    margin: 0.8rem 0;

    .img {
      overflow: hidden;

      width: 2.2rem;
      height: 2.2rem;
      margin-top: 0.2rem;
      border-radius: 50%;
    }

    .poolIcon {
      border-radius: 50%;
    }
  `}
`

export const Symbol = styled.span`
  ${({ theme }) => css`
    margin-left: 0.8rem;

    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font20};
    line-height: ${theme.font.sizes.font20};

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
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font18};
    letter-spacing: 0.03rem;
  `}
`
