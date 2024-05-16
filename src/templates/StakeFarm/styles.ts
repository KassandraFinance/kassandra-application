import theme from '@/styles/theme'
import styled from 'styled-components'

export const StakeFarm = styled.section``

export const StakeFarmHeader = styled.div`
  background: linear-gradient(
    90deg,
    rgba(232, 67, 196, 0.08) 0%,
    rgba(255, 191, 0, 0.08) 100%
  );
  background-clip: padding-box;
`

export const StakeWithPowerVote = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 976px) {
    flex-wrap: wrap;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  max-width: 114rem;
  margin-inline: auto;
  flex-direction: column;
  z-index: 10;
  gap: 2.4rem;
  border-radius: 1.6rem;
  border: 0.1rem;
  font-family: 'Rubik';
  border: 1px transparent;
  padding-block: 5.6rem;

  @media (max-width: 976px) {
    padding-inline: 2.4rem;
  }
`
export const MainTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 900;
  line-height: 5.28rem;
  width: fit-content;

  background: linear-gradient(90deg, #e843c4 0%, #ffbf00 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 3.2rem;
  color: #fcfcfc;
`

export const TabsWrapper = styled.div`
  max-width: 114rem;
  width: 100%;
  margin: 0 auto;

  margin-bottom: 2.4rem;
`

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 114rem;
  margin-inline: auto;
  margin-block: 5.6rem;
  gap: 2.4rem;
  border-radius: 0.8rem;
  border: 0.1rem solid rgba(252, 252, 252, 0.08);
  padding: 2.4rem;
  background: rgba(252, 252, 252, 0.05);

  @media (max-width: 976px) {
    padding-inline: 2.4rem;
  }
`

export const VotingPowerContainer = styled.div`
  width: 100%;
  max-width: 32rem;

  @media (max-width: 976px) {
    margin-top: 2rem;
  }
`

export const StakeFarmContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  gap: 2.4rem;

  @media (max-width: 976px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    max-width: 36rem;
  }
`

export const textContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: 2;
  padding: 2.4rem;

  p {
    max-width: 30rem;
    font-size: ${theme.font.sizes.font18};
    font-weight: ${theme.font.weight.normal};
    letter-spacing: 0.22em;
    line-height: 2.4rem;
    text-align: center;
  }
`
