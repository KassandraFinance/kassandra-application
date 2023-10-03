import React from 'react'

import PoolStakingCard from './PoolStakingCard'
import QuestionsAndAnswers from '@/components/QuestionsAndAnswers'

import * as S from './styles'

const Card = () => {
  return (
    <S.Card>
      <S.PoolStakingCardContainer>
        <PoolStakingCard />
      </S.PoolStakingCardContainer>

      <S.QuestionsAndAnswersWrapper>
        <QuestionsAndAnswers questionsAndAnswers={questionsAndAnswersList} />
      </S.QuestionsAndAnswersWrapper>
    </S.Card>
  )
}

export default Card

const questionsAndAnswersList = [
  {
    question: 'What is the Kassandra’s Manager Incentive Program?',
    answers:
      'The Managers Incentive Program is a new initiative designed to empower our pool managers and enhance the Kassandra platform experience. We offer a range of benefits, including featured placement for your pool, active marketing support, and staking rewards in our native KACY token for pool investors. Shaped not just as a reward program but as a partnership, the Managers Incentive Program provides benefits for all members of our community, adding value for investors who will have access to advantageous fund strategies, and for managers who can attract more investors to their featured pools and earn fees for their work.'
  },
  {
    question: 'What is the Kassandra Manager Incentive Program?',
    answers:
      'Shaped not just as a reward program but as a partnership, the Managers Incentive Program provides benefits for all members of our community, adding value for investors who will have access to advantageous fund strategies, and for managers who can attract more investors to their featured pools and earn fees for their work.'
  },
  {
    question: 'What is Kassandra’s Manager Incentive Program?',
    answers:
      'The Managers Incentive Program is a new initiative designed to empower our pool managers and enhance the Kassandra platform experience.'
  }
]
