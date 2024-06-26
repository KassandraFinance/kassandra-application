import styled, { css } from 'styled-components'
import theme from '../../styles/theme'

interface ICardContainerProps {
  isLink: boolean
}

export const CardContainer = styled.div<ICardContainerProps>`
  ${({ isLink }) => css`
    min-width: 33rem;
    max-width: 33rem;
    height: 41rem;

    background: rgba(31, 31, 31, 0.72);
    border-radius: 1.2rem;

    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    pointer-events: ${isLink ? 'auto' : 'none'};

    &:hover {
      transform: scale(1.05);

      z-index: 1;
    }

    @media (max-width: 786px) {
      min-width: 33rem;
    }
  `}
`

export const CardContent = styled.div`
  cursor: auto;
`
export const CardLinkContent = styled.a`
  text-decoration: none;
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 8.8rem;
  padding: 0 2rem;

  background: #190e1d;
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
`
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.8rem;

  border-radius: 50%;
`

export const FundPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 0.4rem;

  font-weight: ${theme.font.weight.medium};

  h3 {
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${theme.colors.grayDisabled};
  }

  span {
    font-size: ${theme.font.sizes.font24};
    line-height: 104%;
    color: ${theme.colors.white};
  }
`

export const CardBody = styled.div`
  padding: 2rem;
`

export const FundName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;

  & > h3 {
    color: #ffffff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font20};
    letter-spacing: 0.02em;
    margin-bottom: 2.4rem;
  }

  /* & > span {
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;

    text-transform: uppercase;
  } */
`

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: -2.2rem;
`

export const LabelContent = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const FundStatusContainer = styled.div`
  width: 100%;
`

export const SkeletonLoadingWrapper = styled.div`
  margin-top: 2.4rem;
`

export const FundStatus = styled.div`
  span {
    color: #ffffff;
    font-size: ${theme.font.sizes.font18};
    line-height: 2rem;
    letter-spacing: 0.05em;
  }

  h4 {
    margin-top: 0.4rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};
    line-height: 100%;
    letter-spacing: 0.05em;
  }

  div {
    display: flex;
    gap: 0.4rem;
  }
`

export const TokenIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  margin-top: 2.5rem;

  p {
    font-weight: ${theme.font.weight.normal};
    color: #d3d3d3;
    font-size: 1.1rem;
    line-height: 180%;

    span {
      font-weight: ${theme.font.weight.light};
    }
  }
`
