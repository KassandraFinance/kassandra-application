import styled, { css, keyframes } from 'styled-components'
import {
  FeeBreakdown,
  WarningContainer
} from '../../ConfigureFee/FeeBreakdown/styles'

export const PoolReview = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    margin-bottom: 10rem;

    ${FeeBreakdown} {
      margin-bottom: 0;
    }
    ${WarningContainer} {
      display: none;
    }

    @media (max-width: 998px) {
      margin-bottom: 0;
    }
  `}
`

export const PoolReviewContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding: 2.4rem 3.2rem;
    border-radius: 0.8rem;

    background: rgb(255 255 255 / 0.05);

    hr {
      border: none;
      border: 0.1rem solid rgb(255 255 255 / 0.5);
    }
  `}
`

export const PoolReviewHeader = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  `}
`

export const PoolNameContainer = styled.span`
  ${() => css`
    display: flex;
    gap: 2.4rem;
    align-items: center;

    @media (max-width: 576px) {
      justify-content: space-between;

      width: 100%;
    }
  `}
`

export const ImageWrapper = styled.div`
  overflow: hidden;

  width: 7.2rem;
  height: 7.2rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
`

export const PoolNameContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;

    > p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font24};
      line-height: 100%;
    }

    span {
      display: flex;
      gap: 1rem;
      align-items: center;

      padding: 0.8rem 1.1rem;
      border-radius: 0.4rem;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      line-height: 100%;

      background: rgb(0 0 0 / 0.19);
    }

    @media (max-width: 576px) {
      align-items: flex-end;
    }
  `}
`

export const PoolValueContent = styled.div`
  ${({ theme }) => css`
    span {
      display: flex;
      gap: 0.8rem;
      align-items: center;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font24};
      line-height: 3.2rem;

      @media (max-width: 576px) {
        font-size: ${theme.font.sizes.font18};
        line-height: 2rem;
      }
    }

    p {
      color: #c4c4c4;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font12};
      line-height: 1.4rem;
      text-align: center;
      text-transform: uppercase;
    }

    @media (max-width: 576px) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      margin-top: 2.4rem;
    }
  `}
`

export const TvlContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: flex;
      gap: 0.8rem;
      align-items: center;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font20};
      line-height: 2rem;

      @media (max-width: 576px) {
        font-size: ${theme.font.sizes.font18};
        line-height: 1.8rem;
      }
    }

    p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font24};
      line-height: 100%;

      @media (max-width: 576px) {
        font-size: ${theme.font.sizes.font18};
        line-height: 2rem;
      }
    }
  `}
`

export const WrapperPoolPrivacy = styled.div`
  ${() => css`
    padding: 2.4rem 3.2rem;
    border-radius: 0.8rem;

    background: rgb(255 255 255 / 0.05);
  `}
`

export const PoolPrivacyLine = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > p {
      color: #c4c4c4;
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    > span {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font24};
      line-height: 3.2rem;
      text-transform: capitalize;

      @media (max-width: 576px) {
        font-size: ${theme.font.sizes.font18};
        line-height: 2rem;
      }
    }
  `}
`

export const WrapperPoolPrivate = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 0.1rem solid rgb(255 255 255 / 0.5);

    > p {
      margin-bottom: 1.2rem;

      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const PrivateAddressList = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  `}
`

interface IPrivateAddressprops {
  hasBorder: boolean;
}

// eslint-disable-next-line prettier/prettier
export const PrivateAddress = styled.div<IPrivateAddressprops>`
  ${({ theme, hasBorder }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding-right: 1.2rem;
    padding-bottom: 0.6rem;
    padding-left: ${hasBorder ? '0' : '1.2rem'};
    border-right: ${hasBorder
      ? '0.1rem solid rgba(255, 255, 255, 0.5)'
      : 'none'};

    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 100%;

    :last-child {
      padding-bottom: 0.2rem;
    }

    svg {
      cursor: pointer;
    }

    span,
    a {
      display: flex;
    }

    @media (max-width: 576px) {
      margin-bottom: 1rem;
      padding: 0;
      border: none;
    }
  `}
`

export const WrapperAddressImages = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`

export const ReviewTable = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 100%;
  `}
`

export const ReviewThead = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 15rem 1fr 1fr 1fr;

    @media (max-width: 576px) {
      display: grid;
      grid-template-columns: 1fr 1fr 6rem;
    }
  `}
`

interface IIsViewProps {
  isView?: boolean;
}

// eslint-disable-next-line prettier/prettier
export const ReviewTh = styled.div<IIsViewProps>`
  ${({ theme, isView }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 104%;
    text-align: right;

    :first-child {
      text-align: start;
    }

    :last-child {
      text-align: end;
    }

    @media (max-width: 576px) {
      display: ${isView ? 'block' : 'none'};

      animation: ${tableAnim} 0.4s ease;

      :first-child {
        display: block;
      }
    }
  `}
`

export const ReviewThImg = styled.div`
  ${() => css`
    display: flex;
    display: none;
    gap: 0.8rem;
    align-items: center;

    span {
      display: flex;
      align-items: center;

      padding: 0.6rem 0.85rem;
      border: 0.1rem solid transparent;
      border-radius: 50%;

      background: rgb(255 255 255 / 0.05);

      cursor: pointer;

      transition: border 0.3s ease;

      &:hover {
        border: 0.1rem solid rgb(255 255 255 / 0.3);
      }
    }

    #arrow-right {
      transform: rotate(180deg);
    }

    @media (max-width: 576px) {
      display: flex;
    }
  `}
`

export const ReviewTbody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;

    ${ReviewTr} {
      border-bottom: 0.1rem solid rgb(255 255 255 / 0.3);

      :last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  `}
`

export const ReviewTr = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 15rem 1fr 1fr 1fr;

    padding-top: 1.6rem;
    padding-bottom: 1.6rem;

    #eyeIcon {
      display: none;

      @media (max-width: 576px) {
        display: flex;
        justify-content: center;

        cursor: pointer;
      }
    }

    @media (max-width: 576px) {
      display: grid;
      grid-template-columns: 1fr 1fr 6rem;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const ReviewTd = styled.span<IIsViewProps>`
  ${({ theme, isView }) => css`
    width: 100%;

    color: #fcfcfc;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: 104%;
    text-align: right;

    :first-child {
      display: flex;
      gap: 0.8rem;
      align-items: center;

      text-align: start;
    }

    :last-child {
      text-align: end;
    }

    @media (max-width: 576px) {
      display: ${isView ? 'block' : 'none'};

      animation: ${tableAnim} 0.4s ease;
    }
  `}
`

const tableAnim = keyframes`
  from {
    transform: translateX(-1rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`
