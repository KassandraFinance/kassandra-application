import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import Big from 'big.js'

import { KacyPoligon, networks } from '@/constants/tokenAddresses'

import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'
import useStakingInfo from '@/hooks/useStakingInfo'

import Button from '@/components/Button'

import { BNtoDecimal } from '@/utils/numerals'

import * as S from './styles'

interface IStakeAndEarnCardProps {
  poolPrice: string
  poolId?: number
  chainId: number
  handleClickStakeButton: () => void
}

const StakeAndEarnCard = ({
  poolPrice,
  chainId,
  poolId,
  handleClickStakeButton
}: IStakeAndEarnCardProps) => {
  const [aprValue, setAprValue] = React.useState<Big>(Big(0))

  const networkChain = networks[chainId]

  const { data } = useTokensData({
    chainId: networkChain?.chainId,
    tokenAddresses: [KacyPoligon]
  })
  const { priceToken } = useGetToken({
    nativeTokenAddress: networkChain?.nativeCurrency?.address,
    tokens: data || {}
  })

  const stakingInfo = useStakingInfo(chainId, poolId)

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  async function handleAprCalc() {
    if (!poolId) return setAprValue(Big(0))

    const poolInfo = await stakingInfo.getPoolInfo(
      poolId,
      Big(kacyPrice),
      Big(poolPrice)
    )

    setAprValue(poolInfo.hasExpired ? Big(0) : poolInfo.apr)
  }

  React.useEffect(() => {
    handleAprCalc()
  }, [poolPrice, kacyPrice])

  return (
    <S.StakeAndEarnCard>
      <S.CardTitle>STAKE AND EARN</S.CardTitle>

      <S.BodyContent>
        <S.AprTextWrapper>
          <p>APR</p>

          <span>
            {BNtoDecimal(aprValue, 0)}%
            <Tippy content={'asd'}>
              <span>
                <Image
                  src="/assets/utilities/tooltip.svg"
                  alt="Explanation"
                  width={16}
                  height={16}
                />
              </span>
            </Tippy>
          </span>
        </S.AprTextWrapper>

        <S.ButtonWrapper>
          <Button
            size="medium"
            text="Stake"
            background="transparent"
            as="a"
            icon={
              <img
                src="/assets/logos/ahype.svg"
                alt=""
                width={16}
                height={16}
              />
            }
            onClick={handleClickStakeButton}
          />
        </S.ButtonWrapper>
      </S.BodyContent>
    </S.StakeAndEarnCard>
  )
}

export default StakeAndEarnCard
