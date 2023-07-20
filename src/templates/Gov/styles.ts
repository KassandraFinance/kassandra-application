import styled from 'styled-components'
import theme from '../../styles/theme'

export const VoteContent = styled.div`
  max-width: 114rem;
  margin: 0 auto;

  a {
    display: flex;
    justify-content: center;

    margin: 3.2rem auto 10rem;
  }

  @media (max-width: 1200px) {
    padding: 0 3rem;
  }

  @media (max-width: 540px) {
    padding: 0 1.6rem;
  }
`

export const OverViewLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 35.8rem;
  margin-top: 1.6rem;
  margin-bottom: 10rem;

  a {
    margin: 0;
  }

  @media (max-width: 700px) {
    max-width: 100%;
  }
`

export const TitleAndLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const LinkForum = styled.a`
  display: flex;
  align-items: center;

  margin: 0 !important;
  padding: 1.6rem 2.4rem;
  border: 0.1rem solid rgb(255 255 255 / 0.04);
  border-radius: 0.8rem;

  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font16};
  line-height: ${theme.font.sizes.font16};
  text-decoration: none;

  background: rgb(255 255 255 / 0.04);

  &:hover {
    border: 0.1rem solid rgb(255 255 255 / 0.5);
  }

  span {
    margin-right: ${theme.spacings.space16};
  }

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
`
