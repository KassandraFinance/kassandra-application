import styled, { css } from 'styled-components'

export const ShareAndEarnCard = styled.div`
  ${() => css`
    position: relative;

    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.2rem;
    padding: 3.2rem;

    border-radius: 16px;
    border: 1px solid rgba(252, 252, 252, 0.05);
    background: rgba(252, 252, 252, 0.05);

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      border-radius: 0.8rem;
      border: 0.1rem solid transparent;
      background: linear-gradient(270deg, #ffbf00 -1.42%, #e843c4 101.42%)
        border-box;

      -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;

      z-index: -1;
    }
  `}
`

export const ShareAndEarnContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `}
`

export const CardHeader = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.8rem;
  `}
`

export const CardTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.font40};
    font-weight: ${theme.font.weight.bold};
    line-height: 3.8rem;
  `}
`

export const ReferralParagraph = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font24};
    font-weight: ${theme.font.weight.medium};
    line-height: 3.2rem;
  `}
`

export const CardDescription = styled.p`
  ${({ theme }) => css`
    max-width: 49rem;

    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 1.8rem;
  `}
`

export const ShareLinkContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `}
`

export const ShareLinkTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 1.8rem;
  `}
`

export const ShareLinkContent = styled.div`
  ${() => css``}
`

export const ShareLink = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 1.8rem;

    /* display: flex;
    align-items: center;
    justify-content: space-between; */
    display: grid;
    grid-template-columns: 1fr 8.6rem;
    align-items: center;

    border-radius: 4px;
    border: 1px solid ${theme.colors.grayDisabled};
    background: rgba(252, 252, 252, 0.05);

    .small-button {
      max-width: 8.6rem;
      max-height: 3.8rem;
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;

      .small-button {
        display: none;
      }
    }

    span {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 1.8rem;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  `}
`

export const ButtonWrapper = styled.div`
  ${() => css`
    display: none;

    @media (max-width: 576px) {
      display: block;

      .medium-button {
        margin-top: 3.2rem;
      }
    }
  `}
`

export const ShareLinkWrapper = styled.div`
  ${() => css`
    margin-top: 0.8rem;
  `}
`

export const SocialMediaContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 2.4rem;
  `}
`

export const SocialMedia = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    min-width: 4rem;

    cursor: pointer;

    &.last {
      @media (max-width: 900px) {
        display: none;
      }
    }

    @media (max-width: 550px) {
      min-width: 0;
      max-width: 4.2rem;
    }

    @media (max-width: 500px) {
      min-width: 0;
      max-width: 5.6rem;
    }
  `}
`
// export const ShareAndEarnContainer = styled.`
//   ${() => css``}
// `
