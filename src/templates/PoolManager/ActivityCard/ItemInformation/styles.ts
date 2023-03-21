import styled, { css } from 'styled-components'

export const ItemInformation = styled.div`
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

    .poolIcon,
    img {
      border-radius: 50%;
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

// export const ItemInformation = styled.div`
//   ${({ theme }) => css``}
// `
