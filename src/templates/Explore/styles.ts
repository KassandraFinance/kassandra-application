import styled from 'styled-components'

import theme from '../../styles/theme'

export const Explore = styled.section`
  margin: 0 auto;
  max-width: 114rem;
  max-height: 100%;
  margin-top: ${theme.spacings.space32};

  @media (max-width: 1200px) {
    padding: 0 3rem;
  }

  @media (max-width: 960px) {
    padding: 0 2.4rem;
  }
`

export const ExploreContainer = styled.div`
  padding-top: 3.2rem;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.1);
`

export const TitleContainer = styled.div`
  margin-bottom: 4.7rem;
`
export const LoadingContainer = styled.div`
  margin-top: 18rem;
  margin-bottom: 18rem;
`

interface ICardContainerProps {
  loading: boolean;
}

// eslint-disable-next-line prettier/prettier
export const CardContainer =
  styled.div <
  ICardContainerProps >
  `
  display: ${props => (props.loading ? 'none' : 'grid')};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.4rem;

  max-width: 40rem;
  margin-top: 2.4rem;
  margin-inline: auto;

   @media (min-width: 768px) {
      max-width: 100%;
    }
`

export const ComunitFundsContainer = styled.section`
  margin-top: 4.8rem;
`
