import styled from 'styled-components'
import theme from '../../styles/theme'

export const BackgroundCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: ${theme.spacings.space48};
  margin-bottom: 8rem;
  padding: ${theme.spacings.space56} 0 ${theme.spacings.space56} 0;
  border: none;
  border-radius: 8px;

  color: ${theme.colors.snow};
  font-weight: ${theme.font.weight.light};
  font-size: ${theme.font.sizes.font16};

  background-color: rgb(255 255 255 / 0.04);

  p {
    display: block;

    margin: 0 auto;

    color: #fff;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font14};
    letter-spacing: 0.22em;

    @media (max-width: 992px) {
      font-size: ${theme.font.sizes.font18};
      text-align: center;
    }

    @media (max-width: 600px) {
      font-size: ${theme.font.sizes.font14};
    }
  }

  a {
    margin-top: 2.4rem;

    text-decoration: none;
  }

  @media (max-width: 600px) {
    margin-top: 2rem;
    margin-bottom: 7.2rem;
    padding: 4rem 0;
  }
`
