import styled, { css } from 'styled-components'

export const OwnershipClaim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 3.2rem;
  height: calc(100vh - 11rem);

  background-image: url('/assets/images/404background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  @media (max-height: 768px) {
    @media (max-width: 576px) {
      height: 100vh;
    }
  }
`

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.6rem;
    padding: 4rem 2rem;
    margin-bottom: 20rem;

    background-color: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(1.2rem);
    border-radius: 0.8rem;

    -webkit-box-shadow: -2px 13px 45px 8px rgba(0, 0, 0, 0.38);
    -moz-box-shadow: -2px 13px 45px 8px rgba(0, 0, 0, 0.38);
    box-shadow: -2px 13px 45px 8px rgba(0, 0, 0, 0.38);

    @media (max-height: 768px) {
      margin-bottom: 10rem;
    }

    h1 {
      font-size: ${theme.font.sizes.font24};
      font-weight: ${theme.font.weight.bold};

      @media (max-width: 576px) {
        text-align: center;
      }
    }

    p {
      font-size: ${theme.font.sizes.font18};
      font-weight: ${theme.font.weight.light};
      max-width: 100rem;

      @media (max-width: 576px) {
        text-align: center;
      }
    }

    a {
      text-decoration: underline;
      color: ${theme.colors.snow};
      font-size: ${theme.font.sizes.font18};
      line-height: 135%;
    }
  `}
`

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
`
