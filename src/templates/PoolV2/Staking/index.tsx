import Big from 'big.js'
import React from 'react'
import { useRouter } from 'next/router'

import { KacyPoligon, networks } from '@/constants/tokenAddresses'

import { usePoolData } from '@/hooks/query/usePoolData'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import PoolStakingCard from './PoolStakingCard'
import QuestionsAndAnswers from '@/components/QuestionsAndAnswers'
import Loading from '@/components/Loading'

import * as S from './styles'

const Staking = () => {
  const router = useRouter()
  const { data: poolInfo } = usePoolData({ id: router.query.address as string })

  const polygonChainId = 137
  const networkChain = networks[polygonChainId]

  const { data } = useTokensData({
    chainId: networkChain.chainId,
    tokenAddresses: [KacyPoligon]
  })
  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain.nativeCurrency.address,
    tokens: data || {}
  })

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  const poolData = {
    id: poolInfo?.id,
    chainId: poolInfo?.chain_id ?? 0,
    poolId: poolInfo?.pool_id ?? undefined,
    symbol: poolInfo?.symbol,
    address: poolInfo?.address,
    logo: poolInfo?.logo ?? '',
    chainLogo: poolInfo?.chain.logo ?? '',
    decimals: poolInfo?.decimals
  }

  return (
    <S.Staking>
      <S.PoolStakingCardContainer>
        {poolInfo ? (
          <PoolStakingCard
            pool={poolData}
            kacyPrice={Big(kacyPrice)}
            poolPrice={Big(poolInfo?.price_usd ?? 0)}
          />
        ) : (
          <Loading marginTop={10} />
        )}
      </S.PoolStakingCardContainer>

      <S.QuestionsAndAnswersWrapper>
        <QuestionsAndAnswers questionsAndAnswers={questionsAndAnswersList} />
      </S.QuestionsAndAnswersWrapper>
    </S.Staking>
  )
}

export default Staking

const questionsAndAnswersList = [
  {
    question: 'How do rewards work in a Feature Pool?',
    answers:
      'Rewards are distributed to pool participants based on the amount they deposit and the length of time they hold their deposits. The longer you hold your investments in the pool, the larger your share of the distributed rewards will be. Rewards are given in Kacy.'
  },
  {
    question: 'Is it possible to do compound investing in Feature Pools?',
    answers:
      'Yes! You can take your rewards, which are given in Kacy, and make a new investment using Kacy directly, thereby allowing you to stake it and earn a larger share in the Feature Pools. This leads to higher rewards since you have a greater stake in the pool.'
  },
  {
    question: 'What are Feature Pools and how can I participate?',
    answers:
      'Feature Pools are investment pools that earn rewards for gaining recognition from the Kassandra Foundation and community. All Feature Pools go through a vote by the DAO https://app.kassandra.finance/gov to receive rewards in Kacy. If you are interested in including your investment pool in the reward program, we have a program that can assist you, called the Managers Incentive Program https://www.kassandra.finance/incentives-program. Alternatively, you can make a proposal on our forum https://gov.kassandra.finance/ or within the DAO https://app.kassandra.finance/gov.'
  },
  {
    question: "How do I earn Kacy by investing in Kassandra's pools?",
    answers:
      "To stake, follow these steps: \n\n a. Connect your wallet to the platform. \nb. Choose a feature pool on the platform's investment page. \nc. Select the amount you wish to invest; you can invest with any token. \nd. Confirm the transaction and receive the token representing the pool, for example: pECO or aECO. \ne. Go to the stake section and select the pool you invested in, and stake all the tokens. \nf. You're all set, and now you're earning Kacy as a reward."
  },
  {
    question: 'How can I check my accumulated rewards?',
    answers:
      "ou can check your accumulated rewards in the platform's interface, where you made the deposit; it displays the balance of earned rewards. Make sure to be connected to your wallet to access this information."
  },
  {
    question: 'How often are rewards distributed?',
    answers:
      'It is done with every block on the network where you are receiving the reward'
  },
  {
    question: 'Is there any risk associated with investments in Feature Pools?',
    answers:
      'Yes, the primary risk is linked to the volatility of the prices of assets involved in Feature Pools. Currently, our stake contracts have been audited by Certik, and the investment pool contracts are derived from Balancer Labs.'
  }
]
