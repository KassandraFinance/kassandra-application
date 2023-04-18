import styled from 'styled-components'
import theme from '../../../styles/theme'

export const TotalValuesCards = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2.4rem;
  border-radius: 8px;

  background: rgb(255 255 255 / 0.05);

  span {
    display: flex;
    gap: 0.8rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font14};

    @media (max-width: 880px) {
      font-size: ${theme.font.sizes.font12};
    }
  }

  p {
    margin-top: 2.4rem;

    color: #fff;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font32};

    @media (max-width: 880px) {
      font-size: ${theme.font.sizes.font24};
    }

    @media (max-width: 730px) {
      margin-top: 0;
      margin-left: auto;

      font-weight: ${theme.font.weight.bold};
      font-size: ${theme.font.sizes.font14};
    }
  }

  @media (max-width: 730px) {
    flex-direction: row;
    align-items: center;

    padding: 2rem;
  }
`
