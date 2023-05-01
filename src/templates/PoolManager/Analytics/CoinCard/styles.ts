import styled, { css } from 'styled-components'

interface ICoinCardProps {
  isShowMore: boolean;
}

// prettier-ignore
export const CoinCard = styled.article<ICoinCardProps>`
  ${() => css`
    position: relative;

    max-width: 48rem;
    height: fit-content;

    transition-timing-function: ease;

    /* perspective: 500px; */

    /* transform-style: preserve-3d; */

    transition-duration: 300ms;
    transition-property: transform;
  `}
  ${({ isShowMore }) => isShowMore && css`
      transform: rotateY(180deg);
  `}
`

interface ICoinCardFrontProps {
  isShowMore: boolean;
}

// prettier-ignore
export const CoinCardFront = styled.div<ICoinCardFrontProps>`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    overflow: hidden;

    max-width: 48rem;
    min-height: 28.5rem;
    padding-inline: 1.6rem;
    padding-top: 1.6rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    opacity: 1;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border opacity;

    ${ShowMore}:hover ~ & {
      border: 1px solid rgb(255 255 255 / 0.08);
    }
  `}
  ${({ isShowMore }) => isShowMore && css`
      opacity: 0;
  `}
`

export const PoolAssetsCardName = styled.div`
  ${() => css`
    position: relative;

    display: flex;
  `}
`

export const NameContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 1.2rem;
  `}
`

export const InputListWrapper = styled.div`
  ${() => css`
    position: absolute;
    right: 0;
    z-index: 2;
  `}
`

export const PeriodSpan = styled.span`
  ${({ theme }) => css`
    padding: 0.4rem 1rem;
    border: 1px solid rgb(255 255 255 / 0.1);
    border-radius: 2px;

    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    width: 3.979rem;
    height: 3.979rem;
    border-radius: 50%;

    background-color: rgb(189 189 189 / 0.1);
    mix-blend-mode: normal;
  `}
`

export const TextWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
  `}
`

export const AssetName = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 2.1rem;
    letter-spacing: -0.01em;
    text-transform: capitalize;
  `}
`

export const AssetSymbol = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 1.9rem;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  `}
`

export const ChartWrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 11.2rem;
  `}
`

export const ChartData = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`

export const Volume = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: 2.1rem;
    letter-spacing: -0.01em;
  `}
`

export const ChangeWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.4rem;
    align-items: center;
  `}
`

export const Change = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 1.9rem;
    letter-spacing: -0.01em;
  `}
`

interface IShowMoreProps {
  isShowMore: boolean;
}

// prettier-ignore
export const ShowMore = styled.button<IShowMoreProps>`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;

    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;

    width: 7.4rem;
    border: none;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-transform: uppercase;
    white-space: nowrap;

    background-color: transparent;

    cursor: pointer;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: color;
    transform: translateX(-50%);

    &:hover {
      color: ${theme.colors.snow};
    }
  `}
  ${({ isShowMore }) => isShowMore && css`
    transform: rotateY(180deg) translateX(50%);
  `}
`

export const Line = styled.span`
  ${({ theme }) => css`
    display: block;

    width: 7.4rem;
    height: 0.3rem;
    border-radius: 8px 8px 0 0;

    background: ${theme.colors.cyan};
  `}
`

export const MoreInfoContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `}
`

export const Info = styled.span`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`

export const InfoName = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-transform: uppercase;
  `}
`

export const InfoValueWrapper = styled.span`
  ${() => css`
    display: flex;
    gap: 0.4rem;
    align-items: center;
  `}
`

interface IInfoValueProps {
  value?: number;
}

// prettier-ignore
export const InfoValue = styled.span<IInfoValueProps>`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
    letter-spacing: 0.025em;
    text-align: right;
    text-transform: uppercase;
  `}
  ${({ theme, value = 0 }) => value > 0 && css`
    color: ${theme.colors.green};
  `}
  ${({ theme, value = 0 }) => value < 0 && css`
    color: ${theme.colors.red};
  `}
`

interface ICoinCardBackProps {
  isShowMore: boolean;
}

// prettier-ignore
export const CoinCardBack = styled.div<ICoinCardBackProps>`
  ${() => css`
    position: absolute;
    top: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    overflow: hidden;

    width: 100%;
    min-height: 28.5rem;
    padding-inline: 1.6rem;
    padding-top: 1.6rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    opacity: 0;
    pointer-events: none;

    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: border opacity;
    transform: rotateY(180deg);

    ${ShowMore}:hover ~ & {
      border: 1px solid rgb(255 255 255 / 0.08);
    }
  `}
  ${({ isShowMore }) => isShowMore && css`
      opacity: 1;
      pointer-events: auto;
  `}
`

export const InfoLogoWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;

    margin-bottom: 0.3rem;
  `}
`
