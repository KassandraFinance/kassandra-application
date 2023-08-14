import styled, { css } from 'styled-components'
import theme from '../../../styles/theme'

import {
  TRHead,
  TRLink,
  TD
} from '@/templates/Explore/CommunityPoolsTable/styles'

export const Distribution = styled.div`
  margin: ${theme.spacings.space48} 0;
`

export const DistributionTable = styled.div`
  ${() => css`
    ${TRHead}, ${TRLink} {
      grid-template-columns: 0.7fr 1fr 6rem;

      @media (min-width: 768px) {
        grid-template-columns: 0.9fr repeat(4, 1fr);
      }
    }

    ${TD} {
      height: 6rem;
    }
  `}
`

export const FlexWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 0.5rem;
    align-items: center;
  `}
`

export const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  margin: ${theme.spacings.space24} 0;

  background-color: rgb(255 255 255 / 0.1);
`

export const Title = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-left: ${theme.spacings.space16};

    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.sizes.font18};
  }
`

export const YieldYakContent = styled.a`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-end;

  color: ${theme.colors.grayDisabled};
  font-size: ${theme.font.sizes.font12};
  text-decoration: none;

  cursor: pointer;

  p {
    color: ${theme.colors.grayDisabled};
  }
`
