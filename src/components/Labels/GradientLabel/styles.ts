import theme from '@/styles/theme'
import styled from 'styled-components'

export const GradientLabel = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  border-radius: 80px;
  padding: 0.4rem 0.8rem;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  backdrop-filter: blur(2rem);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 0.8rem;
    border: 1px solid transparent;

    background: linear-gradient(90deg, #e843c4 0%, #ffbf00 100%);
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }

  & > p {
    color: #ffffff;
    font-size: ${theme.font.sizes.font12};
    font-weight: ${theme.font.weight.light};
    line-height: 1.2rem;
    text-decoration: none;

    background-image: linear-gradient(90deg, #e843c4 0%, #ffbf00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
