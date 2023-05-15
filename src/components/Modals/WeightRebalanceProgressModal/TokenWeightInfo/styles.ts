import styled, { css } from 'styled-components'

interface IIsOpenTokenInfoProps {
  isOpenTokenInfo: boolean
}
// eslint-disable-next-line prettier/prettier
export const TokenWeightInfo = styled.div<IIsOpenTokenInfoProps>`
  ${() => css`
    position: relative;

    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1.2rem;
    margin-top: 1.2rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.25);

    :last-child {
      border-bottom: none;
    }

    transition-duration: 600ms;
    transition-timing-function: ease;
    transition-property: min-height;

    @media (max-width: 576px) {
      justify-content: flex-start;
      flex-direction: column;

      gap: 2.8rem;

      min-height: 4rem;
      max-height: 4rem;
      overflow: hidden;
    }
  `}

  ${({ isOpenTokenInfo }) =>
    isOpenTokenInfo &&
    css`
      @media (max-width: 576px) {
        min-height: 20rem;
      }
    `}
`

export const TokenInfoContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
  `}
`

export const TokenInfoContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const TokenNameContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    text-decoration: none;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 110%;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const ArrowDownContainer = styled.div<IIsOpenTokenInfoProps>`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    img {
      transform: rotate(0);

      transition-duration: 600ms;
      transition-timing-function: ease;
      transition-property: transform;
    }

    @media (min-width: 576px) {
      display: none;
    }
  `}
  ${({ isOpenTokenInfo }) =>
    isOpenTokenInfo &&
    css`
      img {
        transform: rotate(180deg);
      }
    `}
`

export const WeightContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    span {
      display: none;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    p {
      padding-right: 2.4rem;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      justify-content: space-between;

      span {
        display: block;
      }

      p {
        padding-right: 0;
      }
    }
  `}
`
