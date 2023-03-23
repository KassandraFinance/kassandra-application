import styled, { css } from 'styled-components'

export const ActivityCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;
    // color: ${theme.colors.blue};
  `}
`

export const ActivityActionTitle = styled.div`
  ${({ theme }) => css`
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
        font-size: ${theme.font.sizes.font14};
        margin-bottom: 0.2rem;
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
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    @media (max-width: 576px) {
      flex-direction: row-reverse;
      align-items: center;
    }
  `}
`

export const TitleInfo = styled.div`
  ${({ theme }) => css`
    p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }

    span {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }

    @media (max-width: 576px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `}
`

export const ActivityBodyContainer = styled.div`
  ${({ theme }) => css`
    /* display: flex;
    flex-direction: column;
    gap: 1.2rem; */

    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 576px) {
      display: block;
    }
  `}
`
export const PoolAndUserWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding-left: 4.6rem;
    /* padding-left: 3.2rem; */

    border-right: 1.2px solid rgba(255, 255, 255, 0.15);

    @media (max-width: 576px) {
      border-right: none;
      padding-left: 0rem;
    }
  `}
`

export const TokenWrapper = styled.div`
  ${({ theme }) => css`
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

export const AssetList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    row-gap: 1rem;
    margin-top: 0.8rem;
    column-gap: 2.4rem;
    /* display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 25rem));
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

    align-items: flex-start;


    @media (max-width: 660px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);

      li:nth-child(even) {
        justify-content: flex-end;
      }
    }

    @media (max-width: 360px) {
      grid-template-columns: 1fr;

      li:nth-child(even) {
        justify-content: flex-start;
      }
    } */
  `}
`

export const AssetContent = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    min-width: min-content;
  `}
`

export const AssetInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding-right: 0.4rem;
    border-right: 1px solid rgba(255, 255, 255, 0.3);

    > p {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 100%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
  `}
`

export const WeightsValues = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding-left: 0.4rem;
    gap: 0.6rem;

    > span {
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
  `}
`

export const WrapperExternalLink = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1.5rem;
  `}
`
