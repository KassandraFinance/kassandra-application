import { Image } from '@/components/Governance/ImageProfile/styles'
import styled, { css } from 'styled-components'

export const CommunityPoolsTable = styled.div`
  ${() => css`
    overflow: hidden;

    width: 100%;
    border-radius: 8px;
  `}
`

export const THead = styled.div`
  ${() => css`
    border-radius: 8px 8px 0 0;

    background: rgba(0 0 0 / 0.25);
  `}
`

export const TRHead = styled.div`
  display: grid;
  grid-template-columns: minmax(10rem, 1.5fr) 1fr 8rem;
  gap: 1rem;

  margin-inline: 1.6rem;

  @media (min-width: 768px) {
    grid-template-columns:
      minmax(13.9rem, 1.5fr) repeat(3, 1fr) minmax(9rem, 1fr) minmax(
        6.3rem,
        1fr
      )
      minmax(6.3rem, 1fr);

    margin-inline: 2.4rem;
  }
`

export const TBody = styled.div`
  ${() => css`
    border-radius: 0 0 8px 8px;

    background: rgba(255 255 255 / 0.05);
  `}
`

interface ICommunityPoolsTBodyProps {
  tableRowsNumber: number;
  lineHeight: number;
}
// eslint-disable-next-line prettier/prettier
export const TBodyWithHeight = styled(TBody)<ICommunityPoolsTBodyProps>`
  ${({ tableRowsNumber, lineHeight }) => css`
    transition-timing-function: ease-in-out;
    transition-duration: 400ms;
    transition-property: height;

    overflow-y: hidden;

    height: ${tableRowsNumber * lineHeight}rem;
  `}
`

export const TR = styled.div`
  ${({ theme }) => css`
    margin-inline: 1.6rem;
    border-top: 1px solid transparent;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: background-color border;

    &:not(:last-of-type) {
      border-bottom: 1px solid rgba(255 255 255 / 0.3);
    }

    &:hover {
      margin: 0;
      padding-inline: 1.6rem;

      background-color: ${theme.colors.darkPurple};

      &:not(:first-of-type) {
        margin-top: -1px;
        padding-top: 1px;
        border-top: 1px solid rgba(255 255 255 / 0.3);
      }

      @media (min-width: 768px) {
        padding-inline: 2.4rem;
      }
    }

    @media (min-width: 768px) {
      margin-inline: 2.4rem;
    }
  `}
`

export const TRLink = styled.a`
  ${() => css`
    display: grid;
    grid-template-columns: minmax(10rem, 1.5fr) 1fr 8rem;
    gap: 1rem;

    text-decoration: none;

    cursor: pointer;

    @media (min-width: 768px) {
      grid-template-columns:
        minmax(13.9rem, 1.5fr) repeat(3, 1fr) minmax(9rem, 1fr) minmax(
          6.3rem,
          1fr
        )
        minmax(6.3rem, 1fr);
    }
  `}
`

export const PoolInfoContainer = styled.div`
  ${({ theme }) => css`
    margin-inline: 1.6rem;
    border-top: 1px solid transparent;
    border-bottom: 1px solid rgba(255 255 255 / 0.3);

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: background-color border;

    &:hover {
      margin: 0;
      margin-top: -1px;
      padding-inline: 1.6rem;
      padding-top: 1px;
      border-top: 1px solid rgba(255 255 255 / 0.3);

      background-color: ${theme.colors.darkPurple};

      @media (min-width: 768px) {
        padding-inline: 2.4rem;
      }
    }

    @media (min-width: 768px) {
      margin-inline: 2.4rem;
    }
  `}
`

interface ITHProps {
  isView?: boolean;
}

// prettier-ignore
export const TH = styled.div<ITHProps>`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    width: 100%;
    height: 6.4rem;

    @media (min-width: 768px) {
      &:last-of-type {
        display: none;
      }
    }
  `}
  ${({ isView = true }) => !isView && css`
    display: none;

    @media (min-width: 768px) {
      display: grid;
    }
  `}
`

interface ITDProps {
  isView?: boolean;
}

// prettier-ignore
export const TD = styled.div<ITDProps>`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    width: 100%;
    height: 8.4rem;

    @media (min-width: 768px) {
      &:last-of-type {
        display: none;
      }
    }
  `}
  ${({ isView = true }) => !isView && css`
    display: none;

    @media (min-width: 768px) {
      display: grid;
    }
  `}
`

interface IColumnTitleProps {
  align?: 'right' | 'left' | 'center';
}

// prettier-ignore
export const ColumnTitle = styled.div<IColumnTitleProps>`
  ${({ theme, align = 'left' }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
    letter-spacing: 0.22em;
    text-align: ${align};
    text-transform: uppercase;

    @media (min-width: 768px) {
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font14};
      line-height: ${theme.font.sizes.font18};
      letter-spacing: normal;
      text-transform: capitalize;
    }
  `}
`

interface ITvlButtonSortingProps {
  isRotateArrow: boolean;
}

// eslint-disable-next-line prettier/prettier
export const THButtonSorting = styled(ColumnTitle)<ITvlButtonSortingProps>`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    justify-content: flex-end;

    border: none;
    background-color: transparent;

    cursor: pointer;

    img {
      margin-bottom: 0.3rem;

      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
      transition-property: transform;

      transform: rotate(0);
    }
  `}

  ${({ isRotateArrow }) =>
    isRotateArrow &&
    css`
      img {
        transform: rotate(180deg);
      }
    `}

`
interface IValueProps {
  value?: number;
  align?: 'right' | 'left' | 'center';
}

// prettier-ignore
export const Value = styled.span<IValueProps>`
  ${({ theme, align = 'right' }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-align: ${align};
  `}
  ${({ theme, value = 0 }) => value > 0 && css`
    color: ${theme.colors.green};
  `}
  ${({ theme, value = 0 }) => value < 0 && css`
    color: ${theme.colors.red};
  `}
`

export const TextValue = styled.span`
  ${({ theme }) => css`
    overflow: hidden;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 110%;
    letter-spacing: 0.05em;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`

export const SecondaryTextValue = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 135%;
    letter-spacing: 0.05em;
  `}
`

export const ValueWrapper = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem;
  `}
`

export const ValueContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 2.4rem 1fr;
    gap: 1.6rem;
    align-items: center;
  `}
`

export const Imagecontainer = styled.div`
  ${() => css`
    position: relative;

    width: 2.4rem;
    height: 2.4rem;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: relative;

    overflow: hidden;

    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
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

export const Container = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: end;

    margin-right: 1.8rem;

    @media (max-width: 768px) {
      margin-right: 0.9rem;
    }
  `}
`

export const CoinImageContainer = styled.div`
  ${() => css`
    position: relative;

    width: fit-content;
    height: 1.8rem;

    @media (max-width: 768px) {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      width: auto;
    }
  `}
`

interface ICoinImageWrapperProps {
  position: number;
}

// prettier-ignore
export const CoinImageWrapper = styled.div<ICoinImageWrapperProps>`
  ${({ position }) => css`
    position: absolute;
    left: ${position * -0.9}rem;

    overflow: hidden;

    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;

    @media (max-width: 768px) {
      position: relative;
      left: 0;

      margin-right: -0.8rem;
    }
  `}
`

export const TableViewButtonContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
  `}
`

export const TableViewButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 3.2rem;
    min-height: 3.2rem;
    border: none;
    border-radius: 50%;

    background-color: rgba(255 255 255 / 0.05);

    cursor: pointer;
  `}
`

export const ViewButton = styled.button`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`

export const CoinModalContainer = styled.div`
  ${() => css`
    padding-right: 0.8rem;
  `}
`

export const PoolInfoDesktop = styled.a`
  ${() => css`
    display: none;

    text-decoration: none;

    cursor: pointer;

    @media (min-width: 768px) {
      display: block;
    }
  `}
`

export const PoolInfoMobile = styled.div`
  ${() => css`
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  `}
`

export const LoadingContainer = styled.div`
  ${() => css`
    min-height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`

export const PaginationWrapper = styled.div`
  ${() => css`
    margin-top: 6rem;
  `}
`
