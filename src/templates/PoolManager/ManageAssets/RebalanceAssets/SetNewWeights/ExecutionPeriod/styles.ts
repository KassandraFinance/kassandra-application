import styled, { css } from 'styled-components'
import { Label } from '../../../../../../components/Inputs/InputRadio/styles'

// interface IProps {
//   isActive: boolean;
// }
// eslint-disable-next-line prettier/prettier

export const ExecutionPeriod = styled.div`
  ${({ theme }) => css`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 2.4rem;
    margin-bottom: 10rem;
    max-width: 36.1rem;

    > h3 {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    @media (max-width: 1160px) {
      min-width: 100%;
      margin-bottom: 15rem;
    }
  `}
`

export const ExecutionPeriodBody = styled.div`
  ${() => css`
    @media (min-width: 576px) and (max-width: 1160px) {
      display: flex;
    }
    /*
    @media (max-width: 576px) {
      flex-direction: column;
    } */
  `}
`

export const SelectPeriodCotainer = styled.div`
  ${() => css`
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 100%;

    @media (min-width: 576px) and (max-width: 1160px) {
      margin-right: 2.4rem;
      margin-bottom: 0;
    }
  `}
`

export const SelectPeriod = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${Label} {
      font-weight: ${theme.font.weight.light};
      line-height: 104%;
    }
  `}
`

export const SelectPeriodContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    > p {
      color: #fcfcfc;
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.medium};
      line-height: 110%;
    }
  `}
`

export const PersonalizePeriodContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding-top: 2.4rem;
    width: 100%;

    border-top: 1px solid rgba(255, 255, 255, 0.3);

    span {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
      line-height: 1.6rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;

      margin-bottom: 1.6rem;
    }

    @media (min-width: 576px) and (max-width: 1160px) {
      margin-top: 2.5rem;
      padding-left: 2.4rem;
      padding-top: 0;

      border-top: none;
      border-left: 1px solid rgba(255, 255, 255, 0.3);
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

    P {
      font-size: ${theme.font.sizes.font16};
      font-weight: ${theme.font.weight.light};
      line-height: 135%;

      padding-right: 2rem;
    }
  `}
`

export const ErrorPeriod = styled.p`
  ${({ theme }) => css`
    color: #e8372c;
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.light};
    line-height: 135%;
  `}
`
