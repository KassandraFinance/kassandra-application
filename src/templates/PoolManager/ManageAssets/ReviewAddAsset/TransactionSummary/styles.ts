import styled, { css } from 'styled-components'

export const TransactionSummary = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;
    height: 30rem;
    padding: 2.4rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font16};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const Container = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    padding: 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 8px;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: block;

    width: 100%;
    height: 0.2rem;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 1px;
  `}
`

export const FlexContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  `}
`

export const ContentTitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const ValueContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 3.2rem;
    align-items: center;
    gap: 0.8rem;
  `}
`

export const ValueWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-align: right;
  `}
`

export const SecondaryValue = styled.span`
  ${({ theme }) => css`
    color: #bfbfbf;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: relative;

    width: 3.2rem;
    height: 3.2rem;

    border-radius: 50%;
    overflow: hidden;
  `}
`
