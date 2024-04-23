import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

export const Explore = styled.section`
  max-width: 114rem;
  max-height: 100%;
  margin: 0 auto;
  margin-top: ${theme.spacings.space32};

  @media (max-width: 1200px) {
    padding: 0 3rem;
  }

  @media (max-width: 960px) {
    padding: 0 1.6rem;
  }
`

export const SliderWrapper = styled.div``

export const ExploreContainer = styled.div`
  position: relative;

  padding: 2.4rem;
  width: 100%;
  background-color: rgba(252, 252, 252, 0.05);
  border-radius: 16px;
  margin-top: 10rem;

  @media (max-width: 576px) {
    padding: 1.6rem;
  }
`

export const TitleContainer = styled.div`
  margin-bottom: 4.7rem;
`
export const LoadingContainer = styled.div`
  margin-top: 18rem;
  margin-bottom: 18rem;
`

interface ICardContainerProps {
  isLoading: boolean
}

// eslint-disable-next-line prettier/prettier
export const CardContainer = styled.div<ICardContainerProps>`
  display: ${props => (props.isLoading ? 'none' : 'grid')};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.4rem;

  max-width: 40rem;
  margin-inline: auto;
  margin-top: 2.4rem;

  @media (min-width: 768px) {
    max-width: 100%;
  }
`

export const ComunitFundsContainer = styled.section`
  margin-top: 4.8rem;
`

export const TitleWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.4rem;
  `}
`

export const PaginationWrapper = styled.div`
  ${() => css`
    margin-top: 6rem;
  `}
`

export const ImageWrapper = styled.div`
  ${() => css`
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    width: 6rem;
    height: 6rem;
    background-color: rgba(252, 252, 252, 0.05);
    border-radius: 50%;
  `}
`
