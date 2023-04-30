import styled, { css } from 'styled-components'
import { Label } from '../../../../../components/Inputs/InputRadio/styles'

export const ExecutionPeriod = styled.div`
  ${() => css`
    max-width: 36.1rem;
    margin-bottom: 10rem;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);

    @media (max-width: 1160px) {
      min-width: 100%;
      margin-bottom: 15rem;
    }
  `}
`

export const ExecutionTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h3 {
      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }
  `}
`

export const ExecutionPeriodBody = styled.div`
  ${() => css`
    @media (min-width: 576px) and (max-width: 1160px) {
      display: flex;
    }
  `}
`

export const SelectPeriodCotainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 100%;
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;

    @media (min-width: 576px) and (max-width: 1160px) {
      margin-right: 2.4rem;
      margin-bottom: 0;
    }
  `}
`

export const SelectPeriod = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${Label} {
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const SelectPeriodContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.8rem;
    align-items: center;

    > p {
      color: #fcfcfc;
      font-weight: ${theme.font.weight.medium};
      font-size: ${theme.font.sizes.font16};
      line-height: 110%;
    }
  `}
`

export const PersonalizePeriodContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    width: 100%;
    padding-top: 2.4rem;
    border-top: 1px solid rgb(255 255 255 / 0.3);

    span {
      margin-bottom: 1.6rem;

      font-weight: ${theme.font.weight.normal};
      font-size: ${theme.font.sizes.font14};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (min-width: 576px) and (max-width: 1160px) {
      margin-top: 2.5rem;
      padding-top: 0;
      padding-left: 2.4rem;
      border-top: none;
      border-left: 1px solid rgb(255 255 255 / 0.3);
    }
  `}
`

export const PersonalizePeriod = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    width: 100%;

    > input {
      max-width: 6.9rem;
    }

    p {
      padding-right: 2rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font16};
      line-height: 135%;
    }
  `}
`

export const ErrorPeriod = styled.p`
  ${({ theme }) => css`
    color: #e8372c;
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: 135%;
  `}
`
