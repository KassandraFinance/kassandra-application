import React from 'react'

import * as S from './styles'

type IQuestionProps = {
  question: string
  answers: string
}

interface IQuestionsAndAnswersProps {
  questionsAndAnswers: IQuestionProps[]
}

const QuestionsAndAnswers = ({
  questionsAndAnswers
}: IQuestionsAndAnswersProps) => {
  return (
    <S.QuestionsAndAnswers>
      {questionsAndAnswers.map(item => {
        return (
          <S.Questions key={item.question}>
            <S.Summary>
              <p>{item.question}</p>
              <S.IconWrapper>
                <S.PlusIcon>
                  <img src="/assets/utilities/plus.svg" />
                </S.PlusIcon>
                <S.DashIcon>
                  <img src="/assets/utilities/dash.svg" />
                </S.DashIcon>
              </S.IconWrapper>
            </S.Summary>
            <S.text>{item.answers}</S.text>
          </S.Questions>
        )
      })}
    </S.QuestionsAndAnswers>
  )
}

export default QuestionsAndAnswers
