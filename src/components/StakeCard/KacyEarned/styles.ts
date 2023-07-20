import styled from 'styled-components'
import theme from '../../../styles/theme'

export const KacyEarned = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  p {
    font-size: ${theme.font.sizes.font14};
    font-weight: ${theme.font.weight.medium};
    span {
      font-size: ${theme.font.sizes.font14};
      font-weight: ${theme.font.weight.normal};
    }
  }

  h3 {
    font-size: ${theme.font.sizes.font16};
    font-weight: ${theme.font.weight.medium};
    margin: 0.2rem 0 !important;
  }

  span {
    font-size: ${theme.font.sizes.font12};
    b {
      color: #bdbdbd;
      font-weight: ${theme.font.weight.normal};
    }
  }
`
