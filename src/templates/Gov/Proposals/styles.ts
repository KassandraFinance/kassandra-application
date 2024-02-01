import styled from 'styled-components'
import theme from '../../../styles/theme'

export const VoteContent = styled.div`
  max-width: 114rem;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0 3rem;
  }

  @media (max-width: 540px) {
    padding: 0 1.6rem;
  }
`

export const GovernanceProposalsContent = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 710px) {
    flex-direction: column;
  }
`

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  a {
    max-width: 17.2rem;

    margin: 0;
  }

  @media (max-width: 710px) {
    margin-bottom: ${theme.spacings.space24};
    width: 100%;
  }
`
export const VotingPowerContent = styled.div`
  margin-top: 4rem;
  margin-bottom: 1.6rem;

  @media (max-width: 960px) {
    max-width: 30rem;
    margin-top: 0;
  }

  & > div {
    border: 0.1rem solid rgba(255, 255, 255, 0.2);
    border-radius: 1.2rem;
  }
`

export const AllProposalsContent = styled.section`
  margin-top: 10rem;
  margin-bottom: 10rem;
`

export const TitleAndLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
  }

  @media (max-width: 576px) {
    gap: 0;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 992px) {
    width: 100%;

    > a {
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const LinkForum = styled.a`
  border: 0.1rem solid rgba(255, 255, 255, 0.04);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  color: ${theme.colors.grayDisabled};

  line-height: ${theme.font.sizes.font16};
  font-size: ${theme.font.sizes.font16};
  text-decoration: none;

  display: flex;
  align-items: center;

  margin: 0 !important;
  padding: 1.6rem 2.4rem;

  @media (max-width: 960px) {
    font-size: ${theme.font.sizes.font14};
  }

  @media (max-width: 560px) {
    margin-top: 1.6rem !important;
  }

  @media (max-width: 440px) {
    width: 100%;
  }

  @media (max-width: 350px) {
    font-size: 1.2rem;
  }

  &:hover {
    border: 0.1rem solid rgba(255, 255, 255, 0.5);
  }

  span {
    margin-right: ${theme.spacings.space16};
  }
`

export const VotingPowerLeaderboard = styled.section`
  margin-top: 1.6rem;
  margin-bottom: 10rem;
`
