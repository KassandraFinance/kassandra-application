import styled, { css, keyframes } from 'styled-components'

export const ReviewTable = styled.div`
  ${() => css`
    width: 100%;
    padding: 3.2rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
  `}
`

export const PoolInfoContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 2.6rem;
    align-items: center;

    margin-bottom: 2.4rem;
    padding-bottom: 2.4rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.5);

    @media (max-width: 576px) {
      justify-content: space-between;
    }
  `}
`

export const PoolInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;

    p {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font24};
      line-height: 100%;
    }

    span {
      padding: 0.8rem 1.1rem;
      border-radius: 8px;

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

export const TableContainer = styled.table`
  ${() => css`
    overflow: hidden;

    width: 100%;
    margin-bottom: 2.4rem;
    border-collapse: collapse;
  `}
`

export const Thead = styled.thead`
  ${() => css`
    width: 100%;
  `}
`
interface IIsViewProps {
  isView?: number;
}

// prettier-ignore
export const TrHead = styled.tr<IIsViewProps>`
  ${({ isView }) => css`
    display: flex;
    justify-content: space-between;

    width: 100%;

    th:nth-child(2) {
      margin-left: 8rem;

      @media (max-width: 630px) {
        margin-left: 6rem;
      }

      @media (max-width: 576px) {
        display: ${isView === 3 || isView === 4 ? 'none' : 'flex'};

        margin-left: 0;
      }
    }
  `}
`

// prettier-ignore
export const Th = styled.th<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    align-items: center;

    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;

    strong {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: 104%;
    }

    .newAssetAmount {
      padding-right: 3rem;
    }

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font16};

      strong {
        display: none;
      }

      :first-child {
        display: none;
      }

      .currentWeight {
        display: ${isView === 1 ? 'block' : 'none'};

        animation: ${tableAnim} 0.4s ease;
      }

      .assetAmount {
        display: ${isView === 2 ? 'block' : 'none'};

        animation: ${tableAnim} 0.4s ease;
      }

      .newWeight {
        display: ${isView === 3 ? 'block' : 'none'};

        animation: ${tableAnim} 0.4s ease;
      }

      .newAssetAmount {
        display: ${isView === 4 ? 'block' : 'none'};

        animation: ${tableAnim} 0.4s ease;
      }
    }
  `}
`

export const ReviewThImg = styled.th`
  ${() => css`
    display: none;

    span {
      display: flex;
      align-items: center;

      padding: 0.6rem 0.85rem;
      border: 1px solid transparent;
      border-radius: 50%;

      background: rgb(255 255 255 / 0.05);

      cursor: pointer;

      transition: border 0.3s ease;

      &:hover {
        border: 1px solid rgb(255 255 255 / 0.3);
      }
    }

    #arrow-right {
      transform: rotate(180deg);
    }

    @media (max-width: 576px) {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }
  `}
`

export const Tbody = styled.tbody`
  ${() => css`
    tr:last-child {
      border-bottom: none;
    }
  `}
`

export const TrBody = styled.tr`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr 8rem 1fr;
    align-items: center;

    margin-top: 2.4rem;
    padding-bottom: 1.6rem;
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.3);

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

export const TokenNameContainer = styled.td`
  ${({ theme }) => css`
    display: flex;
    gap: 1.4rem;

    p {
      color: #bdbdbd;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      line-height: 104%;
    }
  `}
`

export const TokenName = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.4rem;
    align-items: center;

    color: #fcfcfc;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

export const Arrow = styled.td`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
      margin-left: 5rem;

      @media (max-width: 1110px) {
        max-width: 3.2rem;
        margin-left: 0;
      }
    }

    @media (max-width: 1110px) {
      justify-content: center;
    }

    @media (max-width: 576px) {
      display: none;
    }
  `}
`

interface IIsOpenGraphProps {
  isOpenGraph: boolean;
}

// prettier-ignore
export const VisualInformation = styled.button<IIsOpenGraphProps>`
  ${({ theme, isOpenGraph }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    margin: 0 auto;
    border: none;

    color: #fff;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    font-family: Rubik, sans-serif;
    line-height: 104%;

    background-color: transparent;

    cursor: pointer;

    img {
      transition: transform 0.3s ease;
      transform: rotate(${isOpenGraph ? '180deg' : '0'});
    }
  `}
`

// prettier-ignore
export const CurrentWeightContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;

    > p {
      width: 100%;
      padding-right: 0.8rem;

      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 104%;
      text-align: center;
    }

    @media (max-width: 576px) {
      display: ${isView === 1 || isView === 2 ? 'flex' : 'none'};
      justify-content: flex-end;

      animation: ${tableAnim} 0.4s ease;

      > p {
        display: ${isView === 1 ? 'flex' : 'none'};

        width: auto;
      }

      ${CurrentWeight} {
        display: ${isView === 2 ? 'flex' : 'none'};
        justify-content: flex-end;

        margin-right: 1rem;
        border-left: none;
      }
    }
  `}
`

export const CurrentWeight = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.4rem;
    justify-content: center;

    width: 100%;
    padding-left: 1.6rem;
    border-left: 1px solid #ccc;

    text-align: center;

    p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 104%;
    }

    @media (max-width: 576px) {
      padding-left: 0;
    }
  `}
`

// prettier-ignore
export const NewWeightContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    align-items: center;

    > p {
      width: 100%;
      padding-right: 1.6rem;
      border-right: 1px solid #ccc;

      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 104%;
      text-align: center;
    }

    @media (max-width: 576px) {
      display: ${isView === 3 || isView === 4 ? 'flex' : 'none'};
      justify-content: flex-end;

      margin-right: 1rem;

      animation: ${tableAnim} 0.4s ease;

      > p {
        display: ${isView === 3 ? 'flex' : 'none'};

        width: auto;
        padding-right: 0;
        border-right: none;

        text-align: center;
      }

      ${NewWeight} {
        display: ${isView === 4 ? 'flex' : 'none'};
        justify-content: flex-end;
      }
    }
  `}
`

export const NewWeight = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    > p {
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 104%;
    }
  `}
`

// prettier-ignore
export const MobileEyeContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    width: 100%;

    color: #fcfcfc;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font16};
    line-height: 104%;
    text-align: center;

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
