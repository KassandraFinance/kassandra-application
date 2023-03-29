import React from 'react'
import { underlyingAssetsInfo } from '@/store/reducers/pool'

import ExternalLink from '@/components/ExternalLink'

import PieChartAllocations from './PieChartAllocations'
import RadialProcentageBar from './RebalancingProgressGraph'
import WeightRebalanceProgressModal from '@/components/Modals/WeightRebalanceProgressModal'

import priceUp from '@assets/notificationStatus/arrow-ascend.svg'
import priceDown from '@assets/notificationStatus/arrow-descend.svg'

import * as S from './styles'

interface IIntroReviewProps {
  poolAssets: underlyingAssetsInfo[] | undefined;
}

const IntroReview = ({ poolAssets }: IIntroReviewProps) => {
  // eslint-disable-next-line prettier/prettier
  const [isOpenTokenInfoMobile, setIsOpenTokenInfoMobile] = React.useState(false)

  return (
    <>
      <S.IntroReview>
        <S.TokenInfoContainer>
          <S.GridChart>
            <PieChartAllocations />
          </S.GridChart>

          <S.TokenInfoContent>
            <S.ImgAndSymbolWrapper>
              <img
                src="https://assets.coingecko.com/coins/images/28542/thumb/l7jRo-5-_400x400.jpg"
                alt=""
                width={16}
                height={16}
              />
              <p>WBTC</p>
            </S.ImgAndSymbolWrapper>
            <S.HoldingAndPriceContainer>
              <S.HoldingWrapper>
                <S.TitleHoldingAndPrice>holding</S.TitleHoldingAndPrice>
                <S.ValueHoldingAndPrice>$51,882.45</S.ValueHoldingAndPrice>
                <p>3 WBTC</p>
              </S.HoldingWrapper>
              <S.PriceDayWrapper>
                <S.TitleHoldingAndPrice>PRICE 24H</S.TitleHoldingAndPrice>
                <S.PriceDayValue>
                  <S.ValueHoldingAndPrice>$17,294.15</S.ValueHoldingAndPrice>
                  <S.ChangeDayValue>
                    <p>-1,45%</p>
                    <img src={priceDown.src} alt="" width={12} height={12} />
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

            <S.RebalancingInfoList>
              <S.RebalancingInfo>
                <p>Started</p>
                <S.HoursAgoWrapper>
                  <p>3 hours ago</p>
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
                <p>2h</p>
              </S.RebalancingInfo>
              <S.RebalancingInfo>
                <p>ASSETS</p>
                <ExternalLink
                  text="3 new weights"
                  onClick={() => setIsOpenTokenInfoMobile(true)}
                />
              </S.RebalancingInfo>
            </S.RebalancingInfoList>
          </S.FundInfoBody>
          <S.GraphAllocationWrapper>
            <RadialProcentageBar />
          </S.GraphAllocationWrapper>
        </S.RebalancingFundCard>
      </S.IntroReview>
      {isOpenTokenInfoMobile && (
        <WeightRebalanceProgressModal
          handleCloseModal={() => setIsOpenTokenInfoMobile(false)}
        />
      )}
    </>
  )
}

export default IntroReview
