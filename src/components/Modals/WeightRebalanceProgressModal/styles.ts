import styled, { css } from 'styled-components'
import { ModalBody } from '../Modal/styles'

export const WeightRebalanceProgressModal = styled.div`
  position: absolute;

  ${ModalBody} {
    background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);

    padding: 1rem;
  }
`

export const WeightRebalanceProgressBody = styled.div`
  ${() => css`
    width: 68rem;

    @media (max-width: 768px) {
      width: 50rem;
    }

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const IntroInfoPoolContainer = styled.div`
  ${() => css`
    padding: 0.6rem;
  `}
`

export const PoolInfoContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    font-size: ${theme.font.sizes.font24};
    font-weight: ${theme.font.weight.normal};
    line-height: 104%;

    span {
      font-weight: ${theme.font.weight.light};
    }
  `}
`

export const TimeProgressContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2.4rem;
  `}
`

export const TimeContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 104%;
  `}
`

export const ProgressContent = styled.div`
  ${() => css`
    display: flex;
    margin-top: 1rem;

    width: 100%;
  `}
`

export const PogressBar = styled.progress`
  ${() => css`
    width: 100%;
    height: 0.6rem;

    border-radius: 3rem;
    border: none;

    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    ::-webkit-progress-bar {
      border-radius: 2rem;
      background-color: rgba(255, 255, 255, 0.25);
    }
    ::-webkit-progress-value {
      background: linear-gradient(270deg, #ffbf00 -1.42%, #e843c4 101.42%);
      border-radius: 3rem;
    }
    ::-moz-progress-bar {
      border-radius: 3rem;
    }
  `}
`

export const TimeToFinalize = styled.p`
  ${({ theme }) => css`
    width: 100%;
    text-align: right;
    margin-top: 0.8rem;

    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 110%;
  `}
`

export const TableRebalanceWeightsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
  `}
`

export const Tablehead = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0.6rem;
    width: 100%;

    p {
      width: 100%;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.light};
      line-height: 110%;

      text-align: right;
      :first-child {
        text-align: left;
      }

      :last-child {
        padding-right: 2.4rem;
      }
    }

    @media (max-width: 576px) {
      display: none;
    }
  `}
`

export const TableBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 40rem;
    padding: 0.6rem;

    overflow-y: scroll;
  `}
`

export const BodyTrContainer = styled.label`
  ${() => css`
    position: relative;
    width: 100%;
  `}
`

export const BodyTr = styled.div`
  ${() => css`
    position: relative;

    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1.2rem;
    margin-top: 1.2rem;

    border-bottom: 1px solid rgba(255, 255, 255, 0.25);

    :last-child {
      border-bottom: none;
    }

    transition: height 300ms ease;
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 4rem;

      height: 2.8rem;
      overflow: hidden;
    }
  `}
`

export const TokenInfoContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
  `}
`

export const TokenInfoContent = styled.span`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    > p {
      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const TokenNameContent = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    text-decoration: none;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.medium};
      line-height: 110%;
    }
  `}
`

export const ArrowDownContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    @media (min-width: 576px) {
      display: none;
    }
  `}
`

export const WeightContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    span {
      display: none;

      color: ${theme.colors.grayDisabled};
      font-size: ${theme.font.sizes.font12};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.2rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    p {
      padding-right: 2.4rem;

      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 135%;
      letter-spacing: 0.05em;
    }

    @media (max-width: 576px) {
      justify-content: space-between;

      span {
        display: block;
      }

      p {
        padding-right: 0;
      }
    }
  `}
`

export const ShowAssetsContainer = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `}
`
