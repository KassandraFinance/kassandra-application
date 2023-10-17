import { CardContainer } from '@/components/FundCard/styles'
import styled, { css } from 'styled-components'

export const MorePool = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 10rem;
    margin-block: 16rem;
  `}
`

export const MorePoolHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;

    h1 {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.font32};
      font-weight: ${theme.font.weight.bold};
      line-height: 3.2rem;
    }
  `}
`

export const Line = styled.div`
  ${() => css`
    height: 0.1rem;
    background: linear-gradient(99deg, #e843c4 0%, #ffbf00 100%, #ffbf00 100%);
    width: 60%;
  `}
`

export const FundCardContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 3.2rem;

    @media (max-width: 1200px) {
      flex-wrap: wrap;
      justify-content: center;
    }

    ${CardContainer} {
      max-width: 35rem;
    }

    > div {
      width: 100%;
    }
  `}
`
