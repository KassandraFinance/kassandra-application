import React from 'react'
import Big from 'big.js'

import QuestionsAndAnswers from '@/components/QuestionsAndAnswers'

import * as S from './styles'

type Fee = {
  managementFee: string
  depositFee: string
  managerShare: string
}

interface IFaqsProps {
  poolName: string
  manager: string
  tokenSymbolList: string[]
  isPrivatePool: boolean
  fee: Fee
}
const Faqs = ({
  fee,
  manager,
  poolName,
  isPrivatePool,
  tokenSymbolList
}: IFaqsProps) => {
  const symbols = tokenSymbolList.toString().replaceAll(',', ', ')

  const privateAnswers =
    'Restricted access for investors selected by the manager.'
  const publicAnswers = 'Anyone can invest in this pool.'

  const faqListLeft = [
    {
      question: `What is this ${poolName} Pool?`,
      answers: `This pool is a decentralized investment portfolio created by the manager ${manager} within the Kassandra Project, consisting of digital assets: ${symbols} selected following liquidity and credibility criteria set by the Kassandra Foundation and the DAO. Being an investment pool within Balancer, it allows the portfolio to always be balanced and with the target percentages set by the manager.`
    },
    {
      question: 'Can I buy and sell shares in the pool/portfolio at any time?',
      answers:
        'Yes, investors have the flexibility to buy and sell their shares in the pool at any time. The Kassandra system enables investors to have the lowest price impact possible. We use a system in conjunction with Paraswap and 1inch to seek the best liquidity available in the market.'
    },
    {
      question: 'How is the security of investments in this pool ensured?',
      answers:
        "Security is ensured through smart contracts on the blockchain, where the manager never has access to investors' funds, only the management of the portfolio percentage. Kassandra emphasizes transparency and security, but it's important to be aware of the inherent risks when investing in DeFi. The contracts where the tokens are stored are owned by Balancer and have all been audited. The contracts that are part of Kassandra's management include those for entering and exiting the pool, retaining only the management fees."
    }
  ]

  const faqListRight = [
    {
      question: `What are the fees associated with this ${poolName} portfolio?`,
      answers: `The fees include: \n\n${Big(fee.depositFee)
        .add(fee.managerShare)
        .toFixed(2)}% deposit fee, of which ${
        fee.managerShare
      }% can go to a person who shared the pool.\n${
        fee.managementFee
      }% annualized management fee set by the manager, of which \n0.5% is allocated as an annualized fee for Kassandra.`
    },
    {
      question: 'Is this pool public or private?',
      answers: `This pool is ${isPrivatePool ? 'private' : 'public'}. ${
        isPrivatePool ? privateAnswers : publicAnswers
      }`
    }
  ]

  return (
    <S.Faqs>
      <QuestionsAndAnswers questionsAndAnswers={faqListLeft} />
      <QuestionsAndAnswers questionsAndAnswers={faqListRight} />
    </S.Faqs>
  )
}

export default Faqs
