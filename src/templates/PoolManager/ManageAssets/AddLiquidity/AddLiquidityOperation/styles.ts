import styled, { css } from 'styled-components'

import {
  Name,
  Symbol
} from '@/templates/Manage/CreatePool/SelectAssets/CoinSummary/styles'

export const AddLiquidityOperation = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;
    height: 38.7rem;
    padding: 1.6rem;

    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;

    ${Name} {
      display: grid;
      grid-template-columns: 1fr 1.4rem;
      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    ${Symbol} {
      > span {
        display: none;
      }
    }
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
    gap: 1rem;

    padding: 1.6rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 0.8rem;
  `}
`

export const InputContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
  `}
`

export const InputWrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    width: 100%;
  `}
`

export const InputText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font12};
    letter-spacing: 0.22em;
    text-transform: uppercase;
  `}
`

export const Line = styled.span`
  ${() => css`
    display: block;

    height: 0.2rem;

    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.1rem;
  `}
`

export const Balance = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
    text-align: right;
  `}
`

export const Value = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    line-height: 104%;
    text-align: right;
  `}
`

export const SecondaryValue = styled.div`
  ${({ theme }) => css`
    color: #bfbfbf;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 104%;
    text-align: right;
  `}
`
