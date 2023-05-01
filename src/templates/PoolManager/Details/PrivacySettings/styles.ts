import styled, { css } from 'styled-components'
import { Wrapper } from '@/components/Button/styles'
import { Image } from '@/components/Governance/ImageProfile/styles'

export const PrivacySettings = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    width: 100%;
    padding: 2.4rem;
    border-radius: 8px;

    background: rgb(255 255 255 / 0.05);
  `}
`

export const Line = styled.span`
  ${() => css`
    display: inline-block;

    width: 4.9rem;
    height: 0;
    margin-inline: auto;
    border: 1px solid rgb(255 255 255 / 0.3);
    border-radius: 1px;
  `}
`

export const TitleContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
  `}
`

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.sizes.font24};
    line-height: ${theme.font.sizes.font32};
    text-align: center;
  `}
`

export const ButtonEdit = styled.button`
  ${() => css`
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid rgb(255 255 255 / 0);
    border-radius: 50%;

    background-color: rgb(255 255 255 / 0.1);

    cursor: pointer;

    transition: border 300ms ease-in-out;

    &:hover {
      border: 1px solid rgb(255 255 255 / 0.1);
    }
  `}
`

export const SubTitle = styled.h3`
  ${({ theme }) => css`
    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-align: center;
    text-transform: uppercase;
  `}
`

export const AddressesContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `}
`

export const Address = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    width: 100%;
    height: 4.8rem;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;

    background: rgb(255 255 255 / 0.05);

    ${Image} {
      gap: 0.8rem;

      cursor: auto;

      a,
      span {
        display: flex;

        margin: 0;

        color: ${theme.colors.white};
        font-weight: ${theme.font.weight.light};
        font-size: ${theme.font.sizes.font16};
        line-height: 100%;
      }
    }
  `}
`

export const LinksContainer = styled.div`
  ${() => css`
    display: flex;
    gap: 0.8rem;

    margin-left: auto;
  `}
`

export const Link = styled.a`
  ${({ theme }) => css`
    cursor: pointer;

    svg {
      path {
        transition: fill 300ms ease-in-out;
      }
    }

    &:hover {
      svg {
        path {
          fill: ${theme.colors.cyan};
        }
      }
    }
  `}
`

export const ButtonContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;

    ${Wrapper} {
      border: 1px solid rgb(255 255 255 / 0);

      background-color: rgb(255 255 255 / 0.05);

      transition: border 300ms ease-in-out;

      &:hover {
        border: 1px solid rgb(255 255 255 / 0.1);
      }
    }

    @media (max-width: 575.98px) {
      grid-template-columns: 1fr;
    }
  `}
`
