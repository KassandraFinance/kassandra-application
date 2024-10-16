import styled, { css } from 'styled-components'
import theme from '../../../../styles/theme'

export const TableWrapper = styled.div`
  display: block;
  overflow-x: auto;

  margin-top: 1.6rem;

  white-space: nowrap;

  @media (max-width: 960px) {
    margin-top: 2.4rem;
  }
`

export const Table = styled.table`
  overflow: hidden;

  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border-radius: 8px;

  color: ${theme.colors.snow};
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;

  @media (max-width: 960px) {
    width: 114rem;
  }

  @media (max-width: 540px) {
    width: 93.5rem;
  }
`

export const THead = styled.thead`
  background: rgb(0 0 0 / 0.25);
`

export const TBody = styled.tbody`
  background: rgb(255 255 255 / 0.04);

  tr {
    margin-top: -0.1rem;
    border-top: 0.1rem solid rgb(255 255 255 / 0);
    border-bottom: 0.1rem solid rgb(255 255 255 / 0.3);

    transition:
      background-color ease-in-out 0.3s,
      border ease-in-out 0.3s,
      padding ease-in-out 0.3s,
      margin ease-in-out 0.3s;

    &:hover {
      margin: 0;
      margin-top: -0.1rem;
      padding: 2.4rem 3.2rem;
      border-top: 0.1rem solid ${theme.colors.grayDisabled};
      border-bottom: 0.1rem solid ${theme.colors.grayDisabled};

      background-color: ${theme.colors.darkPurple};

      cursor: pointer;

      @media (max-width: 540px) {
        padding: 2rem;
      }
    }

    &:first-child {
      border-top: none;
    }

    &:last-child,
    last-child:hover {
      border-bottom: none;
    }
  }
`

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  align-items: center;

  margin: 0 3.2rem;
  padding: 2.4rem 0;

  @media (max-width: 540px) {
    margin: 0 2rem;
    padding: 2rem 0;
  }
`

export const Th = styled.th`
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};
  line-height: 1.6rem;
  letter-spacing: 0.05em;

  &:first-of-type {
    text-align: left;
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font14};
  }
`

export const Td = styled.td`
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font14};
  text-align: center;

  &:first-child {
    text-align: left;
  }
`

export const ProductWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`

export const ImageWrapper = styled.div`
  overflow: hidden;

  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 540px) {
    width: 1.8rem;
    height: 1.8rem;
  }
`

export const FundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span:last-of-type {
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  }
`

export const NetworkWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;

  @media (max-width: 540px) {
    span {
      display: none;
    }
  }
`

interface IChangeProps {
  change: number
}

// prettier-ignore
export const Change = styled.div<IChangeProps>`
  ${({ change }) => css`
    color: ${change < 0 ? '#EA3224' : ' #5ee66b'};
  `}
`

export const FlexWrapper = styled.div`
  span {
    color: #d3d3d3;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
  }

  div {
    span {
      color: #fcfcfc;
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
    }
  }
`

export const Imagecontainer = styled.div`
  ${() => css`
    position: relative;

    width: 2.4rem;
    height: 2.4rem;
  `}
`

export const SkeletonLoadingWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
  `}
`

export const ChainLogoWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: -0.5rem;
    bottom: 0;

    overflow: hidden;

    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;

    background-color: ${theme.colors.white};
  `}
`
