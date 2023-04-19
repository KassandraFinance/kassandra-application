import styled, { css } from 'styled-components'

export const FeeBreakdown = styled.div`
  ${() => css`
    margin-bottom: 5.2rem;
  `}
`

export const TitleWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.4rem;
    align-items: center;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    margin-bottom: 2rem;

    h2 {
      margin-left: ${theme.spacings.space16};

      font-weight: ${theme.font.weight.bold};
      font-size: ${theme.font.sizes.font18};
    }
  `}
`

export const Container = styled.div`
  ${() => css`
    width: 100%;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: inline-block;

    width: 100%;
    height: 0;
    border: 1px solid rgb(255 255 255 / 0.3);
    border-radius: 2px;
  `}
`

export const FeesContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: flex-start;

    width: 100%;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);
  `}
`

export const FeeContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  `}
`

export const FeeName = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 1.6rem;
    margin-top: 0.2rem;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  `}
`

export const FeeValue = styled.span`
  ${({ theme }) => css`
    color: #fff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font18};
    line-height: ${theme.font.sizes.font20};
    letter-spacing: 0.05em;
    text-align: center;
  `}
`

interface IFeeSmallContainerProps {
  isCollapsed: boolean;
}

// prettier-ignore
export const FeeSmallContainer = styled.div<IFeeSmallContainerProps>`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow: hidden;

    height: 0;
    padding-top: 0.8rem;

    opacity: 0;

    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: height opacity;
  `}
  ${({ isCollapsed }) => isCollapsed && css`
    height: 5.378rem;

    opacity: 1;
  `}
`

export const FeeSmall = styled.span`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.3em;
    text-transform: uppercase;
  `}
`

export const FeeValueSmall = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-align: right;
  `}
`

interface IOpenBtnProps {
  isCollapsed: boolean;
}

// prettier-ignore
export const OpenBtn = styled.button<IOpenBtnProps>`
  ${({ isCollapsed }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.6rem;
    height: 1.6rem;
    border: none;

    background-color: transparent;

    transform: ${ isCollapsed ? 'rotate(0deg)' :'rotate(180deg)'};
    transition-timing-function: ease;
    transition-duration: 500ms;
    transition-property: transform;

    cursor: pointer;
  `}
`
