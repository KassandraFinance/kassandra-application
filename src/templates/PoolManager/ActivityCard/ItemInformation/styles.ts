import styled, { css } from 'styled-components'

export const ItemInformation = styled.div`
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

    @media (max-width: 576px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      padding-left: 0;
    }
  `}
`

export const TitleInfoContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 1.6rem;
      letter-spacing: 0.05em;
    }
  `}
`

export const WeightsWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
`

export const TitleInfoContent = styled.div`
  ${() => css`
    display: flex;
    gap: 1.2rem;
    align-items: center;

    .poolIcon,
    img {
      border-radius: 50%;
    }

    @media (max-width: 576px) {
      flex-direction: row-reverse;
      align-items: center;

      text-align: right;
    }
  `}
`

export const TitleInfo = styled.div`
  ${({ theme }) => css`
    span {
      color: ${theme.colors.grayDisabled};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }

    @media (max-width: 576px) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `}
`
