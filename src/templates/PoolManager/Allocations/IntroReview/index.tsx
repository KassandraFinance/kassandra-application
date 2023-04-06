import Big from 'big.js'
import React from 'react'

import ExternalLink from '@/components/ExternalLink'
import PieChartAllocations from './PieChartAllocations'
import RadialProcentageBar from './RebalancingProgressGraph'
import WeightRebalanceProgressModal from '@/components/Modals/WeightRebalanceProgressModal'

import priceUp from '@assets/notificationStatus/arrow-ascend.svg'
import priceDown from '@assets/notificationStatus/arrow-descend.svg'

import * as S from './styles'

export type IRebancingProgressProps = {
  started: string,
  remaning: string,
  progress: number
}

export type ITokenProps = {
  address: string,
  logo: string,
  name: string,
  symbol: string,
  decimals: number
}

export type IRebalanceWeightsProps = {
  poolName: string,
  poolPrice: string,
  listTokenWeights: {
    token: Omit<ITokenProps, 'decimals'>,
    previous: string,
    current: string,
    final: string
  }[]
} | null

export interface IlistTokenWeightsProps {
  token: ITokenProps;
  allocation: string;
  holding: {
    value: Big,
    valueUSD: Big
  };
  price: {
    value: number,
    changeValue: number
  };
}
interface IIntroReviewProps {
  RebalancingProgress: IRebancingProgressProps | null;
  listTokenWeights: IlistTokenWeightsProps[];
  rebalanceWeights: IRebalanceWeightsProps;
}

const IntroReview = ({
  RebalancingProgress,
  listTokenWeights,
  rebalanceWeights
}: IIntroReviewProps) => {
  // eslint-disable-next-line prettier/prettier
  const [isOpenTokenInfoMobile, setIsOpenTokenInfoMobile] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const tokenSeleted = listTokenWeights[activeIndex]
  const allocationsDataChart = listTokenWeights.map(item => ({
    image: item.token.logo,
    symbol: item.token.symbol,
    value: Number(item.allocation)
  }))

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
              src={tokenSeleted?.token.logo ?? ''}
              alt=""
              width={16}
              height={16}
            />
            <p>{tokenSeleted?.token.symbol}</p>
          </S.ImgAndSymbolWrapper>
          <S.HoldingAndPriceContainer>
            <S.HoldingWrapper>
              <S.TitleHoldingAndPrice>holding</S.TitleHoldingAndPrice>
              <S.ValueHoldingAndPrice>
                ${tokenSeleted?.holding.valueUSD?.toFixed(2) ?? 0}
              </S.ValueHoldingAndPrice>
              <p>
                {tokenSeleted?.holding.value.toFixed(2, 2) ?? 0}{' '}
                {tokenSeleted?.token.symbol}
              </p>
            </S.HoldingWrapper>
            <S.PriceDayWrapper>
              <S.TitleHoldingAndPrice>PRICE 24H</S.TitleHoldingAndPrice>
              <S.PriceDayValue>
                <S.ValueHoldingAndPrice>
                  ${tokenSeleted?.price.value?.toFixed(2)}
                </S.ValueHoldingAndPrice>
                <S.ChangeDayValue
                  changePrice={tokenSeleted?.price.changeValue ?? 0}
                >
                  <p>{tokenSeleted?.price.changeValue?.toFixed(2) ?? 0}%</p>
                  <img
                    src={
                      tokenSeleted?.price.changeValue >= 0
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
                <p id="remaning">{RebalancingProgress?.remaning ?? 0}</p>
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