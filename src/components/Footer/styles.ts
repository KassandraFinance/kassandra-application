import styled from 'styled-components'
import theme from '../../styles/theme'

export const Footer = styled.footer`
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 3rem;

  color: ${theme.colors.snow};

  @media (min-width: 1600px) {
    max-width: 114rem;
  }

  @media (max-width: 770px) {
    margin-bottom: 4rem;
  }

  @media (max-width: 400px) {
    margin-bottom: 6rem;
  }
`
export const Container = styled.div``

export const UpperContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.6rem;

  max-width: 69rem;
  padding: 8rem 0;

  li {
    margin: 1.5rem 0;

    @media (max-width: 740px) {
      text-align: top;
    }
  }

  h4 {
    margin-bottom: 0.8rem;

    font-weight: 500;
    font-size: 2rem;

    @media (max-width: 740px) {
      font-size: ${theme.font.sizes.font16};
    }
  }

  a {
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    text-decoration: none;

    @media (max-width: 710px) {
      font-size: ${theme.font.sizes.font12};
    }
  }

  @media (max-width: 740px) {
    width: 100%;
    padding: 4rem 5rem;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding: 0;
  }
`
export const LowerContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 3rem;
  padding: 3.5rem 5rem;

  text-align: center;

  ul {
    display: flex;
    gap: 1.6rem;
    justify-content: center;

    margin-bottom: 1.6rem;

    @media (max-width: 400px) {
      margin: auto;
      padding: 1rem;
    }
  }

  @media (min-width: 740px) {
    display: none;
  }

  @media (max-width: 400px) {
    padding: 0;
  }
`
export const LowerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 7rem 0;

  ul {
    display: flex;
    justify-content: flex-end;

    li {
      flex: 1 0 4.8rem;
    }
  }

  @media (max-width: 740px) {
    display: none;
  }
`
export const Certified = styled.div`
  max-width: 100%;
  margin: 1.6rem auto 0;

  a {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    color: ${theme.colors.snow};
    text-decoration: none;
  }

  span {
    margin-right: 0.6rem;

    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font14};
    letter-spacing: 0.07rem;
  }

  img {
    margin-right: 1.6rem;

    @media (max-width: 576px) {
      margin-right: 0;
    }
  }
`

export const LowerLeft = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin-bottom: 2.8rem;
  }

  span {
    font-weight: 300;
    font-size: 1.6rem;
  }
`

export const LowerRight = styled.div`
  display: flex;
  flex-direction: column;
`

export const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid rgb(255 255 255 / 0);
  border-radius: 50%;

  background: rgb(255 255 255 / 0.1);

  transition: border ${theme.transition.default};

  /* img {
    padding: 0.5rem;
  } */

  &:hover {
    border: 1px solid rgb(255 255 255 / 0.3);
  }
`

export const Divider = styled.div`
  /* border-top: 1px solid rgba(255, 255, 255, 0.14); */
  border-bottom: 1px solid rgb(255 255 255 / 0.14);

  background-color: transparent;
`
