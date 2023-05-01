import styled, { css } from 'styled-components'

export const AssetRemovelCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 43.2rem;
    margin: 0 auto;
    padding: 3.2rem;
    gap: 3.2rem;

    background: rgba(255, 255, 255, 0.04);
    border-radius: 8px;

    > h2 {
      padding-inline: 5rem;

      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.bold};
      line-height: 1.2rem;
      line-height: 110%;

      text-align: center;

      @media (max-width: 425px) {
        padding-inline: 2rem;
      }
    }
  `}
`

export const LpSendWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`

export const LpSendValueWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-align: end;
  `}
`

export const LpSendValue = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 2rem;
    }

    span {
      color: #bfbfbf;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const RemovalInformation = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;

    > p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`

export const SymbolAndImgWrapper = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.medium};
      line-height: 2rem;
    }
  `}
`
