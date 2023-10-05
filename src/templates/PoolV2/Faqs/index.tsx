import React from 'react'

import QuestionsAndAnswers from '@/components/QuestionsAndAnswers'

import * as S from './styles'

const Faqs = () => {
  return (
    <S.Faqs>
      <QuestionsAndAnswers questionsAndAnswers={faqListLeft} />
      <QuestionsAndAnswers questionsAndAnswers={faqListRight} />
    </S.Faqs>
  )
}

export default Faqs

const faqListLeft = [
  {
    question: 'What is the Kassandra’s Manager Incentive Program?',
    answers:
      'The Managers Incentive Program is a new initiative designed to empower our pool managers and enhance the Kassandra platform experience. We offer a range of benefits, including featured placement for your pool, active marketing support, and staking rewards in our native KACY token for pool investors. Shaped not just as a reward program but as a partnership, the Managers Incentive Program provides benefits for all members of our community, adding value for investors who will have access to advantageous fund strategies, and for managers who can attract more investors to their featured pools and earn fees for their work.'
  },
  {
    question: 'Who can participate?',
    answers:
      'Shaped not just as a reward program but as a partnership, the Managers Incentive Program provides benefits for all members of our community, adding value for investors who will have access to advantageous fund strategies, and for managers who can attract more investors to their featured pools and earn fees for their work.'
  },
  {
    question: 'How can I become a featured manager?',
    answers:
      'The Managers Incentive Program is a new initiative designed to empower our pool managers and enhance the Kassandra platform experience.'
  }
]

const faqListRight = [
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
