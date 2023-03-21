import styled, { css } from 'styled-components'

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
    /* display: flex;
    flex-wrap: wrap; */
    row-gap: 1rem;
    margin-top: 0.8rem;
    column-gap: 2.4rem;
    display: grid;
    grid-template-columns: min-content 1fr;
    /* grid-template-columns: repeat(auto-fit, minmax(15rem, 25rem)); */
    /* grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); */

    align-items: flex-start;

    @media (max-width: 660px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);

      /* li:nth-child(even) {
        justify-content: flex-end;
      } */
    }

    @media (max-width: 360px) {
      grid-template-columns: 1fr;

      /* li:nth-child(even) {
        justify-content: flex-start;
      } */
    }
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
