import theme from '@/styles/theme'
import styled from 'styled-components'

export const Label = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  border-radius: 80px;
  border: 1px solid ${theme.colors.snow};
  padding: 0.4rem 0.8rem;

  p {
    color: ${theme.colors.snow};
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 1.2rem;
    text-decoration: none;
  }
`
