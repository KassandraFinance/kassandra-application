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

export const ExploreContainer = styled.div`
  padding-top: 3.2rem;
`

export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 114rem;
  padding: 3.2rem;
  z-index: 10;
  gap: 2.4rem;
  border-radius: 1.6rem;
  border: 0.1rem;
  margin-block: 5.6rem;
  font-family: 'Rubik';
  border: 1px transparent;
  background: linear-gradient(
    90deg,
    rgba(232, 67, 196, 0.08) 0%,
    rgba(255, 191, 0, 0.08) 100%
  );
  background-clip: padding-box;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    border: 0.1rem solid transparent;
    background: linear-gradient(90deg, #e843c4 0%, #ffbf00 100%) border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`
export const ExplorePoolsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;
`

export const MainTitle = styled.div`
  font-size: 4.8rem;
  font-weight: 900;
  line-height: 5.28rem;
  width: fit-content;

  background: linear-gradient(90deg, #e843c4 0%, #ffbf00 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 3.2rem;
  color: #fcfcfc;
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
