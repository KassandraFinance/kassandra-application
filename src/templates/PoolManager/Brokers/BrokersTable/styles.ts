import styled, { css } from 'styled-components'
import {
  TRHead,
  TRLink,
  Value
} from '@/templates/Explore/CommunityPoolsTable/styles'
import { Image } from '@/components/Governance/ImageProfileWithQuery/styles'
import { Value as V } from '@ui/Modals/ModalViewCoin/styles'

export const BrokersTable = styled.div`
  ${({ theme }) => css`
    ${TRLink}, ${TRHead} {
      grid-template-columns: 1fr 1fr 8rem;
      gap: 0.5rem;

      @media (min-width: 768px) {
        grid-template-columns:
          minmax(13.8rem, 1fr) 5.5rem 1fr 1fr 1fr
          1fr;
      }
    }

    ${Image} {
      justify-content: flex-start;

      pointer-events: none;

      span,
      a {
        margin-left: 0.8rem;

        color: ${theme.colors.white};
        font-weight: ${theme.font.weight.normal};
        font-size: ${theme.font.sizes.font14};
        line-height: 135%;
        letter-spacing: 0.05em;
      }
    }
  `}
`

export const AddressContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 12px;
    gap: 0.5rem;

    cursor: pointer;

    ${Value}, ${V} {
      overflow: hidden;

      line-height: 110%;
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

export const NoHaveBrokers = styled.p`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    color: ${theme.colors.grayDisabled};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font14};
    line-height: 2rem;
    letter-spacing: 0.3em;
    text-align: center;
    text-transform: uppercase;
  `}
`
