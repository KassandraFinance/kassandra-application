import {
  QuestionsAndAnswers,
  Questions,
  Summary
} from '@/components/QuestionsAndAnswers/styles'
import styled, { css } from 'styled-components'

export const Faqs = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 3.2rem;
    width: 100%;
    margin-top: 5.6rem;

    ${QuestionsAndAnswers} {
      gap: 1.6rem;
      background-color: transparent;
    }

    ${Questions} {
      border-radius: 8px;
      background-color: rgba(252, 252, 252, 0.03);
    }
    ${Summary} {
      border-radius: 8px;
    }
  `}
`
