import styled, { css } from 'styled-components'

export const PoolReview = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-bottom: 10rem;
  `}
`

export const PoolReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem 3.2rem;

  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;

  hr {
    border: none;
    border: 0.1rem solid rgba(255, 255, 255, 0.5);
  }
`

export const PoolReviewHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`

export const PoolNameContainer = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2.4rem;
  `}
`

export const PoolNameContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    > p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
    }

    span {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 1.1rem;

      background: rgba(0, 0, 0, 0.19);
      border-radius: 0.4rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
    }
  `}
`

export const PoolValueContent = styled.div`
  ${({ theme }) => css`
    span {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 3.2rem;
    }
    p {
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.4rem;
      text-transform: uppercase;
      text-align: center;
    }
  `}
`

export const TvlContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font20};
      font-weight: ${theme.font.weight.light};
      line-height: 2rem;
    }

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 100%;
    }
  `}
`

export const PrivacySetting = styled.div`
  ${({ theme }) => css`
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    width: 100%;
    padding: 2.4rem 3.2rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    > P {
      color: #c4c4c4;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      letter-spacing: 0.22em;
      text-transform: uppercase;
      line-height: 1.6rem;
    }

    span {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.medium};
      line-height: 3.2rem;
    }
  `}
`

export const ReviewTable = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    width: 100%;
  `}
`

export const ReviewThead = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
  `}
`

export const ReviewTh = styled.p`
  ${({ theme }) => css`
    width: 100%;

    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;

    text-align: center;

    :first-child {
      text-align: start;
    }
    :last-child {
      text-align: end;
    }
  `}
`

export const ReviewTbody = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    ${ReviewTr} {
      border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);
      :last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  `}
`

export const ReviewTr = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.6rem;
    padding-top: 1.6rem;

    #imgContent {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
  `}
`

export const ReviewTd = styled.span`
  ${({ theme }) => css`
    color: #fcfcfc;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;
    width: 100%;
    text-align: center;

    :first-child {
      text-align: start;
    }
    :last-child {
      text-align: end;
    }
  `}
`

// export const ReviewTable = styled.table`
//   ${({ theme }) => css``}
// `