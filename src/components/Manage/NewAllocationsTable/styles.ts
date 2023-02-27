import styled, { css } from 'styled-components'

export const NewAllocationsTable = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 3.2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    height: 100%;

    > h3 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (max-width: 576px) {
      padding: 2.4rem;
    }
  `}
`

export const AllocationTable = styled.table`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin-top: 2.4rem;
    width: 100%;
    height: 100%;

    border-collapse: collapse;
    overflow: hidden;
  `}
`

export const TableHead = styled.thead`
  ${() => css`
    display: flex;
    width: 100%;
  `}
`

export const TrHead = styled.tr`
  ${() => css`
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    width: 100%;

    @media (max-width: 1100px) {
      grid-template-columns: 2fr 1fr 4rem 1fr;
    }

    @media (max-width: 992px) {
      grid-template-columns: 2fr repeat(3, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
    }

    th:nth-child(2) {
      @media (max-width: 400px) {
        margin-left: 1rem;
      }

      @media (max-width: 375px) {
        margin-left: 1.8rem;
      }
    }

    #arrow {
      @media (max-width: 576px) {
        display: none;
      }
    }
  `}
`

export const ThHead = styled.th`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;

    :first-child {
      justify-content: flex-start;
    }

    :last-child {
      justify-content: flex-end;
    }

    @media (max-width: 1100px) {
      p {
        margin-left: 2rem;
      }
    }

    @media (max-width: 992px) {
      p {
        margin-left: 0;
      }
    }

    @media (max-width: 576px) {
      p {
        margin-left: 5rem;
      }
    }
  `}
`

export const AllocationTBody = styled.tbody`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `}
`

export const TrBody = styled.tr`
  ${() => css`
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    width: 100%;
    margin-top: 1.6rem;
    padding-bottom: 1.6rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    :last-child {
      border: none;
    }

    @media (max-width: 1100px) {
      grid-template-columns: 2fr 1fr 4rem 1fr;
    }

    @media (max-width: 992px) {
      grid-template-columns: 2fr repeat(3, 1fr);
    }
  `}
`

export const AssetsInfoContent = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 100%;

    #mobile {
      display: none;
    }

    @media (max-width: 576px) {
      #desktop {
        display: none;
      }

      #mobile {
        display: flex;
      }
    }
  `}
`

export const AssetsInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    a {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      color: #fcfcfc;
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 104%;
      text-decoration: none;
    }

    span {
      margin-top: 0.2rem;
      color: #bdbdbd;
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const CurrentWeight = styled.td`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
    }
  `}
`

export const ArrowImage = styled.td`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-left: 5rem;
    }

    @media (max-width: 1100px) {
      img {
        margin-left: 2rem;
      }
    }

    @media (max-width: 576px) {
      img {
        margin-left: 0;
      }
    }
  `}
`

export const NewWeight = styled.td`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2.4rem;

    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    line-height: 104%;

    @media (max-width: 1020px) {
      padding-right: 1.4rem;
    }

    @media (max-width: 992px) {
      padding-right: 2.4rem;
    }

    @media (max-width: 576px) {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
    }

    @media (max-width: 450px) {
      padding-right: 1.4rem;
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
