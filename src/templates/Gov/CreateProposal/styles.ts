import { Input } from '@/components/Inputs/InputText/styles'
import styled, { css } from 'styled-components'

export const CreateProposal = styled.form`
  ${() => css`
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    gap: 3.2rem;
    max-width: 114rem;
    margin: 0 auto;
    margin-top: 6rem;
    margin-bottom: 6rem;
    padding: 2.4rem;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column-reverse;
    }
  `}
`

export const InputsContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 4rem;

    ${Input} {
      &:valid {
        border: 1px solid rgb(255 255 255 / 0.15);
      }
    }
  `}
`

export const MarkdownEditorContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `}
`

export const ReviewContainer = styled.div`
  ${() => css`
    margin-top: 2rem;
  `}
`

export const ContractsContainer = styled.div``

export const ButtonContainer = styled.div`
  ${() => css`
    margin-top: 4.8rem;
  `}
`

export const ExternalLinkWrapper = styled.div`
  ${() => css`
    margin-top: 1.6rem;
  `}
`

export const ErrorMessage = styled.p`
  text-align: center;
`
