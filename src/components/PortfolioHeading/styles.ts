import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 4.8rem;

  @media (max-width: 960px) {
    margin-top: 2.4rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 2.4rem;
    align-items: flex-start;
  }
`

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 37.2rem;
  height: 4.8rem;
  padding: 1.6rem 2.4rem;
  border-radius: 8px;

  background: rgb(255 255 255 / 0.04);

  @media (max-width: 700px) {
    width: 100%;
    padding: 1.6rem 2rem;
  }
`

export const Total = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  span {
    height: 1.4rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 1.6rem;
    letter-spacing: 0.025em;
    text-transform: uppercase;
  }
`

export const Tooltip = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.1rem;
`

export const Value = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 540px) {
    gap: 1rem;
  }
`

export const ValueUSD = styled.div`
  color: #fff;
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font16};
  text-align: right;
  text-transform: uppercase;

  span {
    font-weight: ${theme.font.weight.light};
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font14};
  }
`

interface IChangeProps {
  change: number;
}

// prettier-ignore
export const Change = styled.div<IChangeProps>`
  display: flex;
  align-items: center;

  ${({ change }) => css`
    color: ${change < 0 ? '#EA3224' : ' #5ee66b'};
  `}
  font-weight: ${theme.font.weight.normal};
  font-size: ${theme.font.sizes.font16};

  div {
    width: 1.4rem;
    height: 1.4rem;
  }

  @media (max-width: 540px) {
    font-size: ${theme.font.sizes.font14};

    div {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`
