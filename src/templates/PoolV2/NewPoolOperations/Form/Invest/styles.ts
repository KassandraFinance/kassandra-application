import { WarningCard } from '@/components/WarningCard/styles'
import styled, { css } from 'styled-components'

export const Invest = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-height: 100%;
    padding-top: 2rem;
    padding-right: 3.2rem;
    padding-bottom: 3.2rem;
    padding-left: 3.2rem;

    .btn-submit {
      :disabled {
        img {
          opacity: 0.4;
        }
      }
    }

    @media (max-width: 500px) {
      padding: 2rem;
    }
  `}
`

export const PrivatePoolTooltip = styled.p`
  ${() => css`
    padding: 0.4rem;
  `}
`

export const ExchangeRate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 0.8rem;
`

export const TransactionSettingsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  `}
`

export const TransactionSettingsOptions = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 0.6rem;
  margin-bottom: 2rem;
`

export const TransactionSettings = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-size: ${theme.font.sizes.font14};
    text-align: center;

    button {
      position: relative;
      display: flex;
      align-items: center;

      margin-left: 0.4rem;

      border: none;
      background-color: transparent;

      cursor: pointer;
      transition: transform 300ms ease;

      :hover {
        transform: rotate(-180deg);
      }
    }

    label {
      display: flex;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: 300;

      > span {
        margin-left: 0.4rem;
      }

      @media (max-width: 360px) {
        font-size: 1.07rem;
      }
    }

    fieldset {
      position: absolute;
      right: 0.1rem;
      bottom: 3rem;

      padding: 2rem;

      background-color: #1f2937;
      border-radius: 1rem;
      border: 0.1rem solid rgba(255, 255, 255, 0.3);

      animation: OpenModalSettings 600ms ease;
      z-index: 22;

      @keyframes OpenModalSettings {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @media (max-width: 960px) {
        padding: 1.6rem;
      }

      @media (max-width: 360px) {
        padding: 1.2rem;
        right: -2rem;
      }
    }
  `}
`

interface IPriceImpactWrapperProps {
  price: number
}

// prettier-ignore
export const PriceImpactWrapper = styled.span<IPriceImpactWrapperProps>`
  ${({ theme, price }) => css`

    height: 1.7rem;

    color: ${price <= 1 ? '#5EE56B' : price <= 2 ? '#bdbdbd' : price <= 5 ? 'orange' : '#EA3224'};

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

export const WarningCardContainer = styled.div`
  ${({ theme }) => css`
    ${WarningCard} {
      color: ${theme.colors.gray};
      font-size: ${theme.font.sizes.font14};
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
