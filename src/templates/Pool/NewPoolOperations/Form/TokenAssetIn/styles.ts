import styled, { css } from 'styled-components'

export const TokenAssetIn = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    padding: 1rem 1.6rem;

    font-size: ${theme.font.sizes.font16};

    background: rgba(31, 31, 31, 0.72);
    border-radius: 1rem;

    min-width: 38rem;

    @media (max-width: 450px) {
      min-width: 30rem;
    }
    @media (max-width: 390px) {
      min-width: 25rem;
    }
  `}
`

export const Body = styled.div`
  ${() => css`
    display: flex;
    align-items: flex-end;

    width: 100%;
  `}
`

export const PoolInfo = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
  `}
`

export const AmountContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;

    .price-dolar {
      margin-top: 0.2rem;
      max-width: 20rem;

      color: #c4c4c4;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}
`

export const Span = styled.span`
  ${({ theme }) => css`
    height: 1.7rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    letter-spacing: 0.03rem;

    cursor: pointer;

    @media (max-width: 380px) {
      font-size: 1.3rem;
    }

    @media (max-width: 360px) {
      padding-left: 1.2rem;
      font-size: 1.07rem;
    }
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
    height: 2rem;

    @media (max-width: 360px) {
      padding-left: 1.2rem;
      font-size: 1.07rem;
    }
  `}
`

export const Token = styled.div`
  ${() => css`
    display: flex;
    align-items: center;

    margin: 0.8rem 0;

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

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin: 0.8rem 0;
    max-width: 20rem;

    background-color: transparent;
    border: none;

    color: #fff;
    font-size: ${theme.font.sizes.font20};
    text-align: right;

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

interface IButtonMax {
  isMax?: boolean;
  maxActive?: boolean;
}

// eslint-disable-next-line prettier/prettier
export const ButtonMax = styled.button<IButtonMax>`
  ${({ theme, maxActive }) => css`
    width: 4rem;
    height: 2rem;
    padding: 0.3rem 0.8rem;

    color: ${maxActive ? '#000' : '#fff'};
    font-size: ${theme.font.sizes.font12};
    line-height: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.07rem;

    background-color: ${maxActive ? '#fff' : 'transparent'};
    border: 0.1rem solid ${theme.colors.gray};
    border-radius: 0.3rem;

    cursor: pointer;
    transition: 100ms;

    &:hover {
      color: #000;

      background: ${theme.colors.snow};
      border: 0.1rem solid ${theme.colors.snow};
    }
  `}
`

export const ErrorMSG = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.font12};
    pointer-events: none;
  `}
`
