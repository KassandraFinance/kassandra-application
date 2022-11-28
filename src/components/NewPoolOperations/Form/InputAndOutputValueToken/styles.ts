import styled, { css } from 'styled-components'

export const InputAndOutputValueToken = styled.div`
  display: flex;

  width: 100%;
  padding: 1rem 1.6rem;

  background: rgba(31, 31, 31, 0.72);
  border-radius: 1.6rem;
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

      color: #c4c4c4;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
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

        color: ${theme.colors.grayDisabled};
        font-size: ${theme.font.sizes.font14};
        font-weight: ${theme.font.weight.light};
        letter-spacing: 0.03rem;`
      : `
        color: ${theme.colors.snow};
        font-size: ${theme.font.sizes.font12};
      `}
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
