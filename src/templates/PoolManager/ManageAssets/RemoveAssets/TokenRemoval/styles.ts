import styled, { css } from 'styled-components'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const TokenRemoval = styled.span`
  ${() => css``}
`

export const TokenRemovalsBody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;

    > h2 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    > p {
      margin-top: 0.8rem;
      margin-bottom: 2.4rem;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;
    }
  `}
`

export const SelectTokenAndTableAllocation = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 36.1rem 1fr;
    gap: 2.4rem;
    margin-bottom: 10rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  `}
`

// export const RemoveAssets = styled.span`
//   ${() => css``}
// `
