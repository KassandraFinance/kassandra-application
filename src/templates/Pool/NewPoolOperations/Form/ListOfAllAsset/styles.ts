import styled, { css } from 'styled-components'

export const ListOfAllAsset = styled.form`
  ${() => css`
    width: 100%;

    padding-top: 1.6rem;
    padding-right: 0.8rem;
    padding-bottom: 1.6rem;
    padding-left: 1.6rem;

    background-color: rgba(31, 31, 31, 0.72);
    border-radius: 1rem;
  `}
`

export const title = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
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

export const SymbolContainer = styled.h3`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin: 0.8rem 0;

    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.normal};
    line-height: ${theme.font.sizes.font16};

    @media (max-width: 380px) {
      font-size: 2.2rem;
    }

    @media (max-width: 360px) {
      font-size: ${theme.font.sizes.font16};
    }
  `}
`

export const tokenLogo = styled.span`
  margin-right: 0.8rem !important;

  img {
    border-radius: 50%;
  }
`

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    margin: 0.8rem 0;

    color: #fff;
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.normal};
    line-height: ${theme.font.sizes.font14};
    text-align: right;

    background-color: transparent;
    border: none;

    outline: none;

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
  `}
`

export const SpanLight = styled.span`
  ${({ theme }) => css`
    height: 1.7rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    letter-spacing: 0.03rem;

    @media (max-width: 380px) {
      font-size: 1.3rem;
    }

    @media (max-width: 360px) {
      font-size: 1.07rem;
    }
  `}
`

export const IntroBestValue = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-right: 0.8rem;
    padding-bottom: 0.2rem;
  `}
`

export const AllInput = styled.div`
  ${() => css`
    max-height: 23rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
    }
    @media (max-height: 800px) {
      max-height: 10rem;
    }
  `}
`

export const InputBestValueGrid = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content: space-between;
    align-items: flex-start;
  `}
`

export const BestValueItem = styled.div`
  ${() => css`
    width: 100%;
    height: 7.4rem;
  `}
`
