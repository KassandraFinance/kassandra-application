import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Overview = styled.section`
  margin-top: 4rem;
  margin-right: auto;
  margin-left: auto;
`

export const VotginCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacings.space32};

  margin: 0 auto;

  @media (max-width: 960px) {
    gap: 2.3rem;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacings.space16};

    margin-top: ${theme.spacings.space32};
  }
`

export const VotingDataCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;

  padding: 2.3rem;
  border-radius: 12px;

  background: rgb(255 255 255 / 0.05);

  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: ${theme.spacings.space18};
    border-radius: 8px;
  }
`

export const TextVoting = styled.span`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  height: 1.6rem;

  color: ${theme.colors.grayDisabled};
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font14};
  line-height: 115%;

  @media (max-width: 960px) {
    font-size: ${theme.font.sizes.font14};
  }
`

export const Tooltip = styled.div`
  z-index: 19;

  padding: 0.1rem;
`

export const ValueVoting = styled.span`
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.sizes.font32};

  @media (max-width: 960px) {
    font-size: ${theme.font.sizes.font24};
  }

  @media (max-width: 700px) {
    margin-top: 0;

    font-size: ${theme.font.sizes.font18};
  }
`

export const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 36rem;
  margin-top: 1.6rem;

  a {
    display: flex;
    align-items: center;

    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font16};
    text-decoration: none;

    transition: 200ms;

    &:hover {
      color: ${theme.colors.cyan};

      cursor: pointer;
    }

    svg {
      margin-left: ${theme.spacings.space8};
    }

    &:hover {
      > svg {
        path {
          stroke: ${theme.colors.cyan} !important;
        }
      }
    }

    @media (max-width: 960px) {
      font-size: ${theme.font.sizes.font14};
    }

    @media (max-width: 700px) {
      font-size: ${theme.font.sizes.font12};
    }
  }

  @media (max-width: 700px) {
    max-width: 100%;
  }
`
