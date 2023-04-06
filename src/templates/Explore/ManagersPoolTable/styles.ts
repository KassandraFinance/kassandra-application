import styled, { css } from 'styled-components'
import { TRHead, TR } from '@/templates/Explore/CommunityPoolsTable/styles'
import { Image } from '@ui/Governance/ImageProfile/styles'

export const ManagersPoolTable = styled.div`
  ${() => css`
    overflow: hidden;

    width: 100%;
    border-radius: 8px;

    ${TRHead}, ${TR} {
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

      span,
      a {
        margin-left: 0.8rem;
      }
    }
  `}
`
export const LoadingContainer = styled.div`
  padding-block: 8rem;
`

export const ManagerInfoDesktop = styled.a`
  display: none;

  text-decoration: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: block;
  }
`
export const ManagerInfoMobile = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

export const ManagerInfoConainer = styled.div`
  ${({ theme }) => css`
    margin-inline: 1.6rem;

    border-top: 1px solid transparent;

    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    transition-property: background-color border;

    border-bottom: 1px solid rgba(255 255 255 / 0.3);

    &:hover {
      margin: 0;
      padding-inline: 1.6rem;

      background-color: ${theme.colors.darkPurple};

      margin-top: -1px;
      padding-top: 1px;
      border-top: 1px solid rgba(255 255 255 / 0.3);

      @media (min-width: 768px) {
        padding-inline: 2.4rem;
      }
    }

    @media (min-width: 768px) {
      margin-inline: 2.4rem;
    }
  `}
`
