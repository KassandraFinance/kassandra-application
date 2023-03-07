import styled, { css } from 'styled-components'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const SelectTokenRemove = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
  `}
`

export const RemovedTokenReviewCard = styled.ul`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
    padding: 1.6rem 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    @media (max-width: 992px) {
      width: 100%;
    }
  `}
`

export const LineRemovedTokenReview = styled.li`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `}
`

interface IValueTextProps {
  color?: string;
}

// eslint-disable-next-line prettier/prettier
export const ValueText = styled.p<IValueTextProps>`
  ${({ theme, color }) => css`
    max-width: 13rem;

    color: ${color ? color : theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.normal};
    line-height: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
  `}
`

export const AllocationAndHoldingValue = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.medium};
    line-height: 2rem;
    text-align: right;
  `}
`

export const TextBalance = styled.p`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: right;

    img {
      display: none;

      @media (max-width: 576px) {
        display: flex;
      }
    }

    strong {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: right;

      @media (max-width: 576px) {
        display: none;
      }
    }
  `}
`

export const TokenValueContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `}
`

interface INotificationStatusProps {
  showError: boolean;
}

// eslint-disable-next-line prettier/prettier
export const NotificationStatusContainer = styled.div<INotificationStatusProps>`
  ${({ theme }) => css`
    display: flex;
    align-items: start;
    gap: 1rem;
    padding: 1.6rem 2.4rem;
    opacity: 0;

    background: rgba(255, 255, 255, 0.04);
    border: 0.1rem solid rgba(255, 191, 0, 0.5);
    border-radius: 8px;

    transition-duration: 600ms;
    transition-timing-function: ease;
    transition-property: opacity;

    img {
      margin-top: 0.1rem;
    }

    p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 160%;
    }
  `}

  ${({ showError }) =>
    showError &&
    css`
      opacity: 1;
    `}
`
