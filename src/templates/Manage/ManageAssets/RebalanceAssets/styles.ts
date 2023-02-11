import styled, { css } from 'styled-components'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const RebalanceAssets = styled.div`
  ${() => css``}
`

export const RebalanceAssetsBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    > h2 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;

      @media (max-width: 768px) {
        display: none;
      }
    }

    > p {
      margin-top: 0.8rem;
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;

      @media (max-width: 768px) {
        display: none;
      }
    }
  `}
`

export const AllocationsAndExecutionPeriod = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 74.6rem 1fr;
    /* align-items: center; */
    justify-content: center;
    gap: 2.4rem;
  `}
`
