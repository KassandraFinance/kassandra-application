import styled, { css, keyframes } from 'styled-components'

export const ReviewTable = styled.div`
  ${() => css`
    width: 100%;
    padding: 3.2rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    @media (max-width: 576px) {
      padding: 1.6rem;
    }
  `}
`

export const PoolInfoContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 2.6rem;
    padding-bottom: 2.4rem;
    margin-bottom: 2.4rem;

    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.5);

    @media (max-width: 576px) {
      justify-content: space-between;
    }
  `}
`

export const PoolInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    p {
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
    }

    span {
      background: rgba(0, 0, 0, 0.19);
      border-radius: 8px;
      padding: 0.8rem 1.1rem;

      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 100%;
    }

    @media (max-width: 576px) {
      align-items: flex-end;
    }
  `}
`

export const TableContainer = styled.table`
  ${() => css`
    width: 100%;
    margin-bottom: 2.4rem;

    border-collapse: collapse;
    overflow: hidden;
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

// eslint-disable-next-line prettier/prettier
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

// eslint-disable-next-line prettier/prettier
export const Th = styled.th<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;

    strong {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
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
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50%;

      border: 0.1rem solid transparent;

      cursor: pointer;

      transition: border 0.3s ease;

      &:hover {
        border: 0.1rem solid rgba(255, 255, 255, 0.3);
      }
    }

    #arrow-right {
      transform: rotate(180deg);
    }

    @media (max-width: 576px) {
      display: flex;
      align-items: center;
      gap: 0.8rem;
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
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.3);

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
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const TokenName = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;
  `}
`

export const Arrow = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      margin-left: 5rem;

      @media (max-width: 1110px) {
        margin-left: 0;
        max-width: 3.2rem;
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

// eslint-disable-next-line prettier/prettier
export const VisualInformation = styled.button<IIsOpenGraphProps>`
  ${({ theme, isOpenGraph }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0 auto;

    background-color: transparent;
    border: none;

    font-family: 'Rubik';
    color: #ffffff;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;

    cursor: pointer;

    img {
      transform: rotate(${isOpenGraph ? '180deg' : '0'});

      transition: transform 0.3s ease;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const CurrentWeightContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    > p {
      width: 100%;
      text-align: center;
      padding-right: 0.8rem;
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }

    @media (max-width: 576px) {
      display: ${isView === 1 || isView === 2 ? 'flex' : 'none'};
      justify-content: flex-end;

      > p {
        display: ${isView === 1 ? 'flex' : 'none'};
        width: auto;
        margin-right: 4rem;
      }

      ${CurrentWeight} {
        display: ${isView === 2 ? 'flex' : 'none'};
        justify-content: flex-end;
        margin-right: 4rem;
        border-left: none;
      }

      animation: ${tableAnim} 0.4s ease;
    }
  `}
`

export const CurrentWeight = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    padding-left: 1.6rem;
    width: 100%;
    gap: 0.4rem;

    border-left: 1px solid #ccc;
    text-align: center;

    p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }

    @media (max-width: 576px) {
      padding-left: 0;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const NewWeightContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    display: flex;
    align-items: center;

    > p {
      width: 100%;
      padding-right: 1.6rem;

      border-right: 1px solid #ccc;

      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
      text-align: center;
    }

    @media (max-width: 576px) {
      display: ${isView === 3 || isView === 4 ? 'flex' : 'none'};
      justify-content: flex-end;
      margin-right: 4rem;

      animation: ${tableAnim} 0.4s ease;

      > p {
        display: ${isView === 3 ? 'flex' : 'none'};
        padding-right: 0;
        width: auto;

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
    align-items: center;
    justify-content: center;
    width: 100%;

    > p {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
    }
  `}
`

// eslint-disable-next-line prettier/prettier
export const MobileEyeContainer = styled.td<IIsViewProps>`
  ${({ theme, isView }) => css`
    width: 100%;

    color: #fcfcfc;
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;
    text-align: center;

    :first-child {
      display: flex;
      align-items: center;
      gap: 0.8rem;

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
