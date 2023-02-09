import styled, { css } from 'styled-components'

export const Withdraw = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding-top: 2rem;
    padding-right: 3.2rem;
    padding-bottom: 3.2rem;
    padding-left: 3.2rem;

    @media (max-width: 500px) {
      padding: 2rem;
    }

    > img {
      /* margin-block: 1.2rem; */
    }
  `}
`

export const TransactionSettingsOptions = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-top: 0.6rem;
  `}
`

export const TransactionSettingsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: -1rem;
  `}
`
interface IPriceImpactWrapperProps {
  price: string | number;
}

// eslint-disable-next-line prettier/prettier
export const PriceImpactWrapper = styled.span<IPriceImpactWrapperProps>`
  ${({ theme, price }) => css`
    height: 1.7rem;

    color: ${price <= 1
      ? '#5EE56B'
      : price <= 2
      ? '#bdbdbd'
      : price <= 5
      ? 'orange'
      : '#EA3224'};

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

export const ExchangeRate = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-top: 0.8rem;
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
