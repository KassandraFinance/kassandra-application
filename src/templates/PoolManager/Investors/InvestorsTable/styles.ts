import styled, { css } from 'styled-components'
import { TR, Value } from '@/templates/Explore/CommunityPoolsTable/styles'
import { Image } from '@ui/Governance/ImageProfile/styles'
import { Value as V } from '@ui/Modals/ModalViewCoin/styles'

export const InvestorsTable = styled.div`
  ${() => css`
    ${TR} {
      grid-template-columns: 1fr 1fr 8rem;
      gap: 0.5rem;

      @media (min-width: 768px) {
        grid-template-columns:
          1fr 1fr 1fr 1fr 1fr
          1fr
          1fr;
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

export const AddressContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 12px;

    cursor: pointer;

    ${Value}, ${V} {
      overflow: hidden;

      line-height: 110%;
      text-overflow: ellipsis;
      white-space: nowrap;

      transition-timing-function: ease-in-out;
      transition-duration: 300ms;
      transition-property: color;
    }

    svg {
      path {
        transition-timing-function: ease-in-out;
        transition-duration: 300ms;
        transition-property: fill;
      }
    }

    &:hover {
      ${Value}, ${V} {
        color: ${theme.colors.cyan};
      }

      svg {
        path {
          fill: ${theme.colors.cyan};
        }
      }
    }
  `}
`
