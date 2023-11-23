import styled, { css } from 'styled-components'

export const ActivityCard = styled.div`
  ${() => css`
    width: 100%;
    padding: 2.4rem 3.2rem;
    border-radius: 16px;

    background: rgb(255 255 255 / 0.04);
  `}
`

export const ActivityActionTitle = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    margin-bottom: 2.4rem;
  `}
`

export const ActionTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    p {
      color: ${theme.colors.snow};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font18};
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
    gap: 0.4rem;
    align-items: center;

    text-decoration: none;

    p,
    span {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 80%;
    }

    p {
      padding-right: 0.4rem;
      border-right: 1px solid #ccc;
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
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (max-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding-left: 0;

      text-align: right;
    }
  `}
`

export const TitleInfoContent = styled.div`
  ${() => css`
    display: flex;
    gap: 1.2rem;
    align-items: center;

    @media (max-width: 992px) {
      flex-direction: row-reverse;
      align-items: center;
    }
  `}
`

export const ActivityBodyContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 992px) {
      display: block;
    }
  `}
`
export const PoolAndUserWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 992px) {
      flex-direction: row;
    }

    @media (max-width: 576px) {
      flex-direction: column;
    }
  `}
`

export const ActivityCardBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 46rem;

    padding: 2.4rem 1.6rem;

    border-radius: 12px;
    border: 1px solid rgba(252, 252, 252, 0.15);

    @media (max-width: 992px) {
      margin-top: 3.2rem;
      min-width: 100%;
      /* padding-left: 0; */
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
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`
