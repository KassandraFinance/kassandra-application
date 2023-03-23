import styled, { css } from 'styled-components'

export const ActivityCard = styled.div`
  ${() => css`
    width: 100%;
    padding: 2.4rem 3.2rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
  `}
`

export const ActivityActionTitle = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.4rem;
  `}
`

export const ActionTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font18};
      font-weight: ${theme.font.weight.medium};
      line-height: 80%;

      @media (max-width: 576px) {
        margin-bottom: 0.2rem;
        font-size: ${theme.font.sizes.font14};
      }
    }
  `}
`

export const ActionTimeContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    text-decoration: none;

    p,
    span {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 80%;
    }

    P {
      border-right: 1px solid #ccc;
      padding-right: 0.4rem;
    }

    @media (max-width: 576px) {
      p,
      span {
        font-size: ${theme.font.sizes.font12};
      }

      img {
        margin-bottom: 0.35rem;
      }
    }
  `}
`

export const TitleInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (max-width: 576px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-left: 0;

      text-align: right;
    }
  `}
`

export const TitleInfoContent = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @media (max-width: 576px) {
      flex-direction: row-reverse;
      align-items: center;
    }
  `}
`

export const ActivityBodyContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 576px) {
      display: block;
    }
  `}
`
export const PoolAndUserWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding-left: 3.4rem;
    /* padding-left: 3.2rem; */

    border-right: 1.2px solid rgba(255, 255, 255, 0.15);

    @media (max-width: 576px) {
      border-right: none;
      padding-left: 0rem;
    }
  `}
`

export const TokenWrapper = styled.div`
  ${() => css`
    padding-left: 2.4rem;

    @media (max-width: 576px) {
      padding-left: 0;

      margin-top: 3.2rem;
    }
  `}
`

export const SharesRedeemedContent = styled.div`
  ${({ theme }) => css`
    margin-top: 2rem;

    p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    span {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `}
`

export const WeightChangeAssetList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`
