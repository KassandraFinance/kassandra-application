import styled, { css } from 'styled-components'

export const InputAndOutputValueToken = styled.div`
  display: flex;

  min-width: 38rem;
  padding: 1rem 1.6rem;

  background: rgba(31, 31, 31, 0.72);
  border-radius: 1rem;

  @media (max-width: 960px) {
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
  @media (max-width: 450px) {
    min-width: 30rem;
  }
  @media (max-width: 390px) {
    min-width: 25rem;
  }
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
`

export const Top = styled.div`
  display: flex;
  align-items: flex-end;

  width: 100%;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
`

export const Amount = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  /* justify-content: space-between; */

  width: 100%;
  /* height: 100%; */

  .price-dolar {
    ${({ theme }) => css`
      margin-top: 0.2rem;
      max-width: 20rem;

      color: #c4c4c4;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  }
`
interface ISpanProps {
  spanlight?: boolean;
}

// eslint-disable-next-line prettier/prettier
export const Span = styled.span<ISpanProps>`
  ${({ theme, spanlight }) => css`
    ${spanlight
      ? `
        height: 1.7rem;
        width: 100%;

        color: ${theme.colors.grayDisabled};
        font-size: ${theme.font.sizes.font14};
        font-weight: ${theme.font.weight.light};
        letter-spacing: 0.03rem;`
      : `
        color: ${theme.colors.snow};
        font-size: ${theme.font.sizes.font12};
      `}

    cursor: pointer;
  `}

  @media(max-width: 380px) {
    font-size: 1.3rem;
  }

  @media (max-width: 360px) {
    padding-left: 1.2rem;
    font-size: 1.07rem;
  }
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

export const amountTokenOutText = styled.p`
  ${({ theme }) => css`
    color: #fff;
    font-size: ${theme.font.sizes.font20};
    max-width: 20rem;

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
`

export const Input = styled.input`
  ${({ theme }) => css`
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: ${theme.font.sizes.font20};
    max-width: 20rem;

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
    /* position: absolute;
    bottom: 1rem;
    left: 1.8rem; */

    color: ${theme.colors.red};
    pointer-events: none;
  `}
`

export const GasFeeError = styled.span`
  ${({ theme }) => css`
    color: #ffbf00;
    font-size: ${theme.font.sizes.font12};

    @media (max-width: 380px) {
      font-size: 1.3rem;
    }

    @media (max-width: 360px) {
      padding-left: 1.2rem;
      font-size: 1.07rem;
    }
  `}
`
