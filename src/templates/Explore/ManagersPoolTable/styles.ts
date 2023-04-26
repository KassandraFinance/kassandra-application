import styled, { css } from 'styled-components'

import { TRHead, TRLink } from '@/templates/Explore/CommunityPoolsTable/styles'
import { Image } from '@ui/Governance/ImageProfile/styles'

export const ManagersPoolTable = styled.div`
  ${() => css`
    overflow: hidden;

    width: 100%;
    border-radius: 8px;

    ${TRHead}, ${TRLink} {
      grid-template-columns: 1rem minmax(10rem, 1fr) 1fr 8rem;
      gap: 0.5rem;

      @media (min-width: 768px) {
        grid-template-columns:
          1rem minmax(13.5rem, 1fr) minmax(12rem, 1fr) minmax(12.5rem, 1fr) minmax(
            6.3rem,
            1fr
          )
          minmax(6.3rem, 1fr)
          minmax(6.3rem, 1fr);
      }
    }

    #manager {
      margin-left: 1.9rem;
    }

    ${Image} {
      justify-content: flex-start;
      margin-left: 1.9rem;

      pointer-events: none;

      span,
      a {
        margin-left: 0.8rem;
      }

      @media (max-width: 768px) {
        pointer-events: auto;
      }
    }
  `}
`
