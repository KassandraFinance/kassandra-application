import styled, { css } from 'styled-components'
import { NumberStatus } from './index'

export const StatusCard = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    height: 8.6rem;
    padding: 1.6rem;
    border-radius: 8px;

    background-color: rgb(255 255 255 / 0.05);

    @media (min-width: 992px) {
      gap: 1.2rem;

      height: 11.467rem;
      padding: 2.4rem;
    }
  `}
`

export const TitleContainer = styled.div`
  ${() => css`
    display: flex;

    height: 2rem;
  `}
`

export const Title = styled.h5`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font18};

    @media (min-width: 992px) {
      font-size: ${theme.font.sizes.font16};
      line-height: ${theme.font.sizes.font16};
      letter-spacing: 0.05em;
    }
  `}
`

interface IValueProps {
  status: NumberStatus;
}

// prettier-ignore
export const Value = styled.span<IValueProps>`
  ${({ theme }) => css`
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font20};
    line-height: 110%;
    letter-spacing: 0.02em;

    @media (min-width: 992px) {
      font-size: ${theme.font.sizes.font24};
      line-height: ${theme.font.sizes.font32};
    }
  `}
  ${({ theme, status }) => status === 'NEUTRAL' && css`
    color: ${theme.colors.snow};
  `}
  ${({ theme, status }) => status === 'POSITIVE' && css`
    color: ${theme.colors.green};
  `}
  ${({ theme, status }) => status === 'NEGATIVE' && css`
    color: ${theme.colors.red};
  `}
`
