import styled from 'styled-components'
import theme from '../../../styles/theme'

export const KacyAmount = styled.div`
  .kacyAmount {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    width: fit-content;
    padding: 2rem;

    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.normal};

    border: 0.1rem solid ${theme.colors.snow};
    border-radius: ${theme.border.radius};
    background-color: #ffffff00;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: color background-color border-color;
    outline-color: ${theme.colors.amber};

    &:hover,
    &:focus {
      border-color: ${theme.colors.amber};
    }

    @media (max-width: 576px) {
      padding: 1.2rem;

      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      line-height: ${theme.font.sizes.font12};
    }
  }
`
