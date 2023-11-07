import styled, { css } from 'styled-components'

export const PoolInfo = styled.div`
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

      > p {
        display: none;
      }
    }

    @media (max-width: 576px) {
      > p {
        display: flex;
      }
    }
  `}
`

export const PoolInfoContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.2rem;
    align-items: center;

    .poolIcon,
    img {
      border-radius: 50%;
    }

    @media (max-width: 992px) {
      flex-direction: row-reverse;
      align-items: center;

      text-align: right;
    }
  `}
`

export const PoolInfoContent = styled.div`
  ${({ theme }) => css`
    span {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `}
`
