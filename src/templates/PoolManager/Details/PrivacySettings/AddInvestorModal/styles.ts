import styled, { css } from 'styled-components'
import { ModalBody } from '@/components/Modals/Modal/styles'

export const AddInvestorModal = styled.div`
  ${() => css`
    ${ModalBody} {
      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
    }
  `}
`

export const Content = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    width: 52.1rem;

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const Addresses = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15.2rem, 1fr));
    gap: 0.8rem;

    width: 100%;
  `}
`

export const AddressContainer = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1rem;
    align-items: center;

    width: 100%;
    padding: 0.8rem;
    border-radius: 4px;

    background: #3d3f43;
  `}
`

export const Address = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font12};
    line-height: 100%;
  `}
`

export const RemoveAddresButton = styled.button`
  ${() => css`
    border: none;

    background-color: transparent;

    cursor: pointer;
  `}
`

export const HasAddress = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 15rem;
    left: 0;
    z-index: 20;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    button,
    strong,
    p {
      color: ${theme.colors.white};
      font-weight: ${theme.font.weight.light};
      font-size: ${theme.font.sizes.font12};
      text-align: center;
    }

    p {
      width: fit-content;
      padding: 1.6rem 1.2rem;
      border-radius: 8px;

      background-color: #26282d;

      transition: outline 0.2s ease;

      &:focus {
        outline: 0.2rem solid #ffffff30;
      }
    }

    button {
      display: flex;
      gap: 0.4rem;

      padding: 1.6rem 1.2rem;
      border: none;
      border-radius: 8px;

      background-color: #26282d;

      cursor: pointer;

      transition: outline 0.2s ease;

      &:focus {
        outline: 0.2rem solid #ffffff30;
      }
    }
  `}
`
