import Big from 'big.js'
import React from 'react'
import { useRouter } from 'next/router'

import { KacyPoligon, networks } from '@/constants/tokenAddresses'

import { usePoolData } from '@/hooks/query/usePoolData'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import PoolStakingCard from './PoolStakingCard'
import QuestionsAndAnswers from '@/components/QuestionsAndAnswers'

import * as S from './styles'

const Staking = () => {
  const router = useRouter()
  const { data: poolInfo } = usePoolData({ id: router.query.address as string })
  const networkChain = networks[poolInfo?.chain_id ?? 137]

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
        <PoolStakingCard
          pool={poolData}
          kacyPrice={Big(kacyPrice)}
          poolPrice={Big(poolInfo?.price_usd ?? 0)}
        />
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
