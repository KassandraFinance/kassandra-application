import styled from 'styled-components'
import theme from '../../styles/theme'

export const ErrorSubgraph = styled.div`
  width: 100%;
  margin-top: 1.6rem;
  padding: 1.6rem 2.4rem;

  display: flex;
  align-items: center;

  border: 0.2rem solid ${theme.colors.amber};
  border-radius: 0.5rem;
  background-color: #1f2937;

  p {
    font-size: ${theme.font.sizes.font16};
    margin-top: 0.4rem;
    margin-left: 0.8rem;

    @media (max-width: 500px) {
      font-size: ${theme.font.sizes.font14};
    }
  }
`
