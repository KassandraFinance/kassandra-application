import styled, { css, keyframes } from 'styled-components'

export const PriceFee = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    hr {
      border: none;
      border-top: 0.1rem solid rgba(255, 255, 255, 0.5);
    }
  `}
`

export const PriceFeeTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const PriceFeeParagraph = styled.p`
  ${({ theme }) => css`
    margin-top: 0.8rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
  `}
`

export const NetworkFeesContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    margin-block: 2.4rem;

    > p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const WrapperPrice = styled.div`
  ${({ theme }) => css`
    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 2.5rem;
      text-transform: uppercase;
      text-align: right;
    }

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      text-transform: uppercase;
      text-align: right;
    }
  `}
`

export const WrapperInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0 auto;
    margin-top: 2.4rem;

    label {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
    }

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 1.6rem;
      text-decoration-line: underline;

      cursor: pointer;
    }
  `}
`
// export const test = styled.div`
//   ${() => css``}
// `
