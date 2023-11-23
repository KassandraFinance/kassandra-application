import React from 'react'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import Blockies from 'react-blockies'

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
  poolIcon: string
  poolName: string
  handleClickStakeButton: () => void
}

const StakeAndEarnCard = ({
  poolPrice,
  chainId,
  poolId,
  poolIcon,
  poolName,
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
            <Tippy
              content={
                'This is a feature pool managed by the Kassandra Foundation, where we provide incentives for people to deposit and use these pools with Kacy incentives.'
              }
            >
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
            className="stake-button"
            size="medium"
            text="Stake"
            background="transparent"
            as="a"
            icon={
              poolIcon ? (
                <Image
                  src={poolIcon}
                  alt="Explanation"
                  width={16}
                  height={16}
                />
              ) : (
                <span>
                  <Blockies
                    className="poolIcon"
                    seed={poolName}
                    size={4}
                    scale={4}
                  />
                </span>
              )
            }
            onClick={handleClickStakeButton}
          />
        </S.ButtonWrapper>
      </S.BodyContent>
    </S.StakeAndEarnCard>
  )
}

export default StakeAndEarnCard
