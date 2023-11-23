import styled, { css } from 'styled-components'

export const StakeAndEarnCard = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.6rem 1.6rem;
    width: 100%;

    border-radius: 8px;
    border: 1px solid rgba(252, 252, 252, 0.05);
    background: rgba(252, 252, 252, 0.05);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      border-radius: 0.8rem;
      border: 0.1rem solid transparent;
      background: linear-gradient(270deg, #ffbf00 -1.42%, #e843c4 101.42%)
        border-box;

      -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  `}
`

export const BodyContent = styled.div`
  ${() => css`
    display: flex;
    gap: 2.4rem;
  `}
`

export const CardTitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font20};
    font-weight: ${theme.font.weight.medium};
    line-height: 2.2rem;
    letter-spacing: 0.4px;

    background: linear-gradient(270deg, #ffbf00 -1.42%, #e843c4 101.42%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`

export const AprTextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 2.4rem;
    }

    span {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.normal};
    }
  `}
`

export const ButtonWrapper = styled.div`
  ${() => css`
    width: 12rem;

    .stake-button {
      > span {
        border-radius: 50%;
        overflow: hidden;
      }
    }
  `}
`
