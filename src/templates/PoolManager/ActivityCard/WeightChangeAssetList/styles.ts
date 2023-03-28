import styled, { css } from 'styled-components'

export const WeightChangeAssetList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    row-gap: 1rem;
    column-gap: 2.4rem;
    margin-top: 1rem;

    max-width: 48rem;

    @media (max-width: 1200px) {
      max-width: 100%;
    }
  `}
`

export const AssetListMobile = styled.ul`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    row-gap: 2rem;
    column-gap: 2.4rem;
    margin-top: 1rem;
    min-width: 50rem;

    @media (max-width: 576px) {
      min-width: auto;
    }
  `}
`

export const AssetContent = styled.li`
  ${() => css`
    display: flex;
    align-items: center;
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

export const WrapperCheckAllWeights = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1.5rem;
  `}
`

export const WrapperAllWeightsModal = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1.5rem;
  `}
`
