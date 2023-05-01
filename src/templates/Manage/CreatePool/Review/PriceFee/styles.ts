import styled, { css } from 'styled-components'

export const PriceFee = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    padding: 2.4rem;
    margin-bottom: 15rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    hr {
      border: none;
      border-top: 0.1rem solid rgba(255, 255, 255, 0.5);
      margin-block: 2.4rem;
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
    margin-bottom: 2.4rem;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
  `}
`

export const PriceFeeBody = styled.div`
  ${() => css`
    @media (min-width: 650px) and (max-width: 992px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  `}
`

export const NetworkFeesContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    > p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (min-width: 650px) and (max-width: 992px) {
      width: 100%;
      align-items: center;
      border-right: 0.1rem solid rgba(255, 255, 255, 0.5);
      padding-right: 1.6rem;
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

      @media (max-width: 650px) {
        font-size: ${theme.font.sizes.font18};
        font-weight: ${theme.font.weight.medium};
        line-height: 110%;
      }
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
    justify-content: center;
    gap: 0.8rem;
    margin: 0 auto;

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

    @media (min-width: 650px) and (max-width: 992px) {
      margin: 0;
      width: 100%;
      justify-content: flex-start;
      margin-left: 1.6rem;
    }
  `}
`
