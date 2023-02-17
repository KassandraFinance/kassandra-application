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

    /* perspective: 500px; */

    /* transform-style: preserve-3d; */

    transition-duration: 300ms;
    transition-timing-function: ease;
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

    max-width: 48rem;
    min-height: 28.5rem;
    padding-top: 1.6rem;
    padding-inline: 1.6rem;

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0);

    opacity: 1;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border opacity;

    overflow: hidden;

    ${ShowMore}:hover ~ & {
      border: 1px solid rgba(255, 255, 255, 0.08);
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

export const ImageWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3.979rem;
    height: 3.979rem;

    background-color: rgba(189, 189, 189, 0.1);
    mix-blend-mode: normal;

    border-radius: 50%;
    overflow: hidden;
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
    align-items: center;
    gap: 0.4rem;
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
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;

    width: 7.4rem;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-transform: uppercase;
    white-space: nowrap;

    background-color: transparent;
    border: none;

    cursor: pointer;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: color;

    z-index: 2;

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

    background: ${theme.colors.cyan};
    border-radius: 8px 8px 0px 0px;
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
    align-items: center;
    gap: 0.4rem;
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
    text-transform: uppercase;
    letter-spacing: 0.025em;
    text-align: right;
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
    transform: rotateY(180deg);
    z-index: 1;
    opacity: 0;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 100%;
    min-height: 28.5rem;
    padding-top: 1.6rem;
    padding-inline: 1.6rem;

    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0);

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: border opacity;

    overflow: hidden;
    pointer-events: none;

    ${ShowMore}:hover ~ & {
      border: 1px solid rgba(255, 255, 255, 0.08);
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
