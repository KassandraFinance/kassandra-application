import styled, { css } from 'styled-components'

export const AvailableRewards = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 100%;

    p {
      color: #c4c4c4;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22rem;
    }
  `}
`

export const AvailableAumFees = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    padding: 2.4rem;
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    h3 {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (min-width: 576px) {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      justify-content: center;
    }
  `}
`

export const ManagerFee = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    @media (min-width: 576px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `}
`

export const AmountFees = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    span {
      color: #bdbdbd;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }

    span:first-child {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font24};
      line-height: 104%;
    }

    @media (min-width: 576px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `}
`

export const Harvest = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    p {
      text-transform: uppercase;
    }

    span {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
    }

    @media (min-width: 576px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `}
`

export const ClaimedRewards = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 2.4rem;
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    span {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font16};
    }
  `}
`
