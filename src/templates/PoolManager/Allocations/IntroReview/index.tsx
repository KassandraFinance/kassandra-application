import Big from 'big.js'
import React from 'react'

import { mockTokens } from '@/constants/tokenAddresses'

import ExternalLink from '@/components/ExternalLink'
import PieChartAllocations from './PieChartAllocations'
import RadialProcentageBar from './RebalancingProgressGraph'
import WeightRebalanceProgressModal from '@/components/Modals/WeightRebalanceProgressModal'

import priceUp from '@assets/notificationStatus/arrow-ascend.svg'
import priceDown from '@assets/notificationStatus/arrow-descend.svg'

import * as S from './styles'

export type IRebancingProgressProps = {
  started: string
  remaning: string
  progress: number
}

export type ITokenProps = {
  address: string
  logo: string
  name: string
  symbol: string
  decimals: number
}

export type IRebalanceWeightsProps = {
  poolName: string
  poolPrice: string
  listTokenWeights: {
    token: {
      address: string
      logo: string
      name: string | null | undefined
      symbol: string | null | undefined
    }
    previous: string
    current: string
    final: string
  }[]
} | null

type CoinsMetadataType = {
  [key: string]: {
    usd: number
    pricePercentageChangeIn24h: number
    marketCap: number
  }
}
export interface IlistTokenWeightsProps {
  token: {
    address: string
    logo: string
    name: string | null | undefined
    symbol: string | null | undefined
    decimals: number | null | undefined
  }
  allocation: string
  holding: {
    value: Big
  }
}
interface IIntroReviewProps {
  RebalancingProgress: IRebancingProgressProps | null
  listTokenWeights: IlistTokenWeightsProps[]
  rebalanceWeights: IRebalanceWeightsProps
  countDownDate: string
  coingeckoData: CoinsMetadataType
  chainId: number
}

const IntroReview = ({
  RebalancingProgress,
  listTokenWeights,
  rebalanceWeights,
  countDownDate,
  coingeckoData,
  chainId
}: IIntroReviewProps) => {
  const [isOpenTokenInfoMobile, setIsOpenTokenInfoMobile] =
    React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const tokenSeleted = listTokenWeights[activeIndex] ?? {}
  const allocationsDataChart = listTokenWeights.map(item => ({
    image: item.token.logo,
    symbol: item.token?.symbol || '',
    value: Number(item.allocation)
  }))
  const coingeckoTokenInfo =
    coingeckoData[
      chainId === 5
        ? mockTokens[tokenSeleted?.token?.address]?.toLowerCase()
        : tokenSeleted?.token?.address.toLowerCase()
    ]

  return (
    <S.IntroReview>
      <S.TokenInfoContainer>
        <S.GridChart>
          <PieChartAllocations
            data={allocationsDataChart}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            isRebalancing={!!RebalancingProgress}
          />
        </S.GridChart>

        <S.TokenInfoContent>
          <S.ImgAndSymbolWrapper>
            <img
              src={tokenSeleted?.token?.logo ?? ''}
              alt=""
              width={16}
              height={16}
            />
            <p>{tokenSeleted?.token?.symbol}</p>
          </S.ImgAndSymbolWrapper>
          <S.HoldingAndPriceContainer>
            <S.HoldingWrapper>
              <S.TitleHoldingAndPrice>holding</S.TitleHoldingAndPrice>
              <S.ValueHoldingAndPrice>
                $
                {tokenSeleted?.holding?.value
                  .mul(Big(coingeckoTokenInfo?.usd ?? 0))
                  .toFixed(2) ?? 0}
              </S.ValueHoldingAndPrice>
              <p>
                {tokenSeleted?.holding?.value.toFixed(2, 2) ?? 0}{' '}
                {tokenSeleted?.token?.symbol}
              </p>
            </S.HoldingWrapper>
            <S.PriceDayWrapper>
              <S.TitleHoldingAndPrice>PRICE 24H</S.TitleHoldingAndPrice>
              <S.PriceDayValue>
                <S.ValueHoldingAndPrice>
                  ${Big(coingeckoTokenInfo?.usd ?? 0).toFixed(2)}
                </S.ValueHoldingAndPrice>
                <S.ChangeDayValue
                  changePrice={
                    coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0
                  }
                >
                  <p>
                    {(
                      coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0
                    ).toFixed(2)}
                    %
                  </p>
                  <img
                    src={
                      (coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0) >= 0
                        ? priceUp.src
                        : priceDown.src
                    }
                    alt=""
                    width={12}
                    height={12}
                  />
                </S.ChangeDayValue>
              </S.PriceDayValue>
            </S.PriceDayWrapper>
          </S.HoldingAndPriceContainer>
        </S.TokenInfoContent>
      </S.TokenInfoContainer>

      <S.RebalancingFundCard>
        <S.FundInfoBody>
          <S.TitleWrapper>
            <img
              src="/assets/icons/rebalance.svg"
              alt=""
              width={18}
              height={18}
            />
            <p>Rebalancing Fund</p>
          </S.TitleWrapper>
          {RebalancingProgress ? (
            <S.RebalancingInfoList>
              <S.RebalancingInfo>
                <p>Started</p>
                <S.HoursAgoWrapper>
                  <p>{RebalancingProgress?.started ?? 0} ago</p>
                  <img
                    src="/assets/utilities/external-link.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </S.HoursAgoWrapper>
              </S.RebalancingInfo>
              <S.RebalancingInfo>
                <p>Remaining</p>
                {/* <p id="remaning">{RebalancingProgress?.remaning ?? 0}</p> */}
                <p id="remaning">{countDownDate ?? 0}</p>
              </S.RebalancingInfo>
              <S.RebalancingInfo>
                <p>ASSETS</p>
                <ExternalLink
                  text={`${rebalanceWeights?.listTokenWeights.length} new weights`}
                  onClick={() => setIsOpenTokenInfoMobile(true)}
                />
              </S.RebalancingInfo>
            </S.RebalancingInfoList>
          ) : (
            <S.NotRebalancingProgress>
              there is no rebalancing of asset weights at the moment
            </S.NotRebalancingProgress>
          )}
        </S.FundInfoBody>
        {RebalancingProgress && (
          <S.GraphAllocationWrapper>
            <RadialProcentageBar
              ProgressValue={RebalancingProgress?.progress ?? 0}
            />
          </S.GraphAllocationWrapper>
        )}
      </S.RebalancingFundCard>

      {isOpenTokenInfoMobile && (
        <WeightRebalanceProgressModal
          handleCloseModal={() => setIsOpenTokenInfoMobile(false)}
          rebalanceWeights={rebalanceWeights}
          RebalancingProgress={RebalancingProgress}
        />
      )}
    </S.IntroReview>
  )
}

export default IntroReview
