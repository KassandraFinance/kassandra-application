import styled, { css } from 'styled-components'
import { TR } from '@/templates/Explore/CommunityPoolsTable/styles'
import { Image } from '@ui/Governance/ImageProfile/styles'

export const ManagersPoolTable = styled.div`
  ${() => css`
    overflow: hidden;

    width: 100%;
    border-radius: 8px;

    ${TR} {
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

    ${Image} {
      justify-content: flex-start;

      span,
      a {
        margin-left: 0.8rem;
      }
    }
  `}
`