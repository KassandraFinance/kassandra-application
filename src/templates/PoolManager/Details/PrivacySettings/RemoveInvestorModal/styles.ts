import styled, { css } from 'styled-components'
import { ModalBody } from '@/components/Modals/Modal/styles'
import { Image } from '@/components/Governance/ImageProfile/styles'

export const RemoveInvestorModal = styled.div`
  ${() => css`
    ${ModalBody} {
      background: linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%);
    }
  `}
`

export const Content = styled.div`
  ${() => css`
    width: 46.9rem;

    @media (max-width: 576px) {
      width: 100%;
    }
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    display: inline-block;

    margin-bottom: 1.3rem;

    color: #c4c4c4;
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font12};
    line-height: ${theme.font.sizes.font14};
    text-transform: uppercase;
  `}
`

export const InputWrapper = styled.div`
  ${() => css`
    margin-bottom: 2.1rem;
  `}
`

export const Investors = styled.div`
  ${() => css`
    margin-bottom: 0.8rem;
  `}
`

export const InvestorContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1.6rem 1fr 7.2rem;
    gap: 1.2rem;
    align-items: center;

    height: 5.2rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);

    ${Image} {
      gap: 0.8rem;
      justify-content: flex-start;

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

export const TableHeader = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;

    margin-bottom: 1.1rem;
  `}
`

export const TableTitle = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.snow};
    font-weight: ${theme.font.weight.light};
    font-size: ${theme.font.sizes.font14};
    line-height: ${theme.font.sizes.font18};
  `}
`

export const Value = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.font.weight.normal};
    font-size: ${theme.font.sizes.font16};
    line-height: 135%;
    letter-spacing: 0.05em;
    text-align: right;
  `}
`
