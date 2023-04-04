import React from 'react'
import Image from 'next/image'
import Big from 'big.js'

import { BNtoDecimal, calcChange } from '@/utils/numerals'
import { calcVolatility } from '../../utils'

import InputList from '../../../../components/Inputs/InputList'
import SparkLineChart, { sparkData } from '../SparkLineChart'

import arrowAscendIcon from '../../../../../public/assets/notificationStatus/arrow-ascend.svg'
import arrowDescendIcon from '../../../../../public/assets/notificationStatus/arrow-descend.svg'
import heimdallLogo from '../../../../../public/assets/logos/heimdall-logo.svg'
import comingSoon from '../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

interface ICoinCardProps {
  image: string;
  name: string;
  symbol: string;
  sparkLine: sparkData[];
  priceChangeIn24h: string;
  volume: number;
  score24h: string;
  dataList?: string[];
  period?: {
    time: number,
    frame: string,
    abvFrame: string
  };
}

const CoinCard = ({
  image,
  name,
  symbol,
  sparkLine,
  priceChangeIn24h,
  volume,
  score24h,
  dataList,
  period
}: ICoinCardProps) => {
  const [dataPeriod, setDataPeriod] = React.useState<string>('1D')
  const [isShowMore, setIsShowMore] = React.useState<boolean>(false)

  let color = '#FCFCFC'
  let changeIcon = null
  if (Big(sparkLine[sparkLine.length - 1].close).gt(Big(sparkLine[0].close))) {
    color = '#2CE878'
    changeIcon = arrowAscendIcon
  } else if (
    Big(sparkLine[sparkLine.length - 1].close).lt(Big(sparkLine[0].close))
  ) {
    color = '#E8372C'
    changeIcon = arrowDescendIcon
  } else {
    color = '#FCFCFC'
    changeIcon = arrowAscendIcon
  }

  const volatility = calcVolatility(sparkLine)

  const sharpRatio = React.useMemo(() => {
    if (!sparkLine.length) return '0'
    if (Big(volatility).lte(0)) return '0'
    const total = sparkLine.reduce((acc, value, i) => {
      const oldClose = sparkLine[i + 1]?.close
      if (!oldClose) return acc
      return acc.add(calcChange(Number(value.close), Number(oldClose)))
    }, Big(0))

    return total.div(sparkLine.length).div(volatility).toFixed(2)
  }, [sparkLine])

  return (
    <S.CoinCard isShowMore={isShowMore}>
      <S.ShowMore
        onClick={() => setIsShowMore(!isShowMore)}
        isShowMore={isShowMore}
      >
        Show More
        <S.Line />
      </S.ShowMore>

      <S.CoinCardFront isShowMore={isShowMore}>
        <S.PoolAssetsCardName>
          <S.NameContainer>
            <S.ImageWrapper>
              <Image src={image || comingSoon} width={26.67} height={26.67} />
            </S.ImageWrapper>

            <S.TextWrapper>
              <S.AssetName>{name}</S.AssetName>

              <S.AssetSymbol>{symbol}</S.AssetSymbol>
            </S.TextWrapper>
          </S.NameContainer>

          <S.InputListWrapper>
            {period && (
              <S.PeriodSpan>{`${period.time}${period.abvFrame}`}</S.PeriodSpan>
            )}
            {dataList && (
              <InputList
                dataList={dataList}
                selected={dataPeriod}
                onClick={(period: string) => setDataPeriod(period)}
              />
            )}
          </S.InputListWrapper>
        </S.PoolAssetsCardName>

        <S.ChartWrapper>
          <SparkLineChart data={sparkLine} color={color} />
        </S.ChartWrapper>

        <S.ChartData>
          <S.Volume>${BNtoDecimal(Big(volume), 2)}</S.Volume>

          <S.ChangeWrapper>
            <S.Change>{priceChangeIn24h}%</S.Change>

            <Image src={changeIcon} width={20} height={20} />
          </S.ChangeWrapper>
        </S.ChartData>
      </S.CoinCardFront>

      <S.CoinCardBack isShowMore={isShowMore}>
        <S.MoreInfoContainer>
          {period && (
            <S.Info>
              <S.InfoName>Time Frame</S.InfoName>

              <S.InfoValue>{`${period.time} ${period.frame}`}</S.InfoValue>
            </S.Info>
          )}

          <S.Info>
            <S.InfoName>Asset</S.InfoName>

            <S.InfoValue>{name}</S.InfoValue>
          </S.Info>

          <S.Info>
            <S.InfoName>Symbol</S.InfoName>

            <S.InfoValueWrapper>
              <S.InfoValue>{symbol}</S.InfoValue>

              <S.InfoLogoWrapper>
                <Image src={image || comingSoon} width={14} height={14} />
              </S.InfoLogoWrapper>
            </S.InfoValueWrapper>
          </S.Info>
          <S.Info>
            <S.InfoName>Volume</S.InfoName>

            <S.InfoValue>${BNtoDecimal(Big(volume), 2)}</S.InfoValue>
          </S.Info>

          <S.Info>
            <S.InfoName>Change</S.InfoName>

            <S.InfoValueWrapper>
              <S.InfoValue value={Number(priceChangeIn24h)}>
                {priceChangeIn24h}%
              </S.InfoValue>

              <Image src={changeIcon} width={16} height={16} />
            </S.InfoValueWrapper>
          </S.Info>
          <S.Info>
            <S.InfoName>Volatility</S.InfoName>

            <S.InfoValue>{volatility}%</S.InfoValue>
          </S.Info>
          <S.Info>
            <S.InfoName>Sharpe ratio</S.InfoName>
            <S.InfoValue>{sharpRatio}</S.InfoValue>
          </S.Info>
          {/* <S.Info>
            <S.InfoName>Risk factor</S.InfoName>
            <S.InfoValue value={0.3}>?%</S.InfoValue>
          </S.Info> */}
          <S.Info>
            <S.InfoName>Social score</S.InfoName>

            <S.InfoValueWrapper>
              <Image src={heimdallLogo} />

              <S.InfoValue>{score24h}</S.InfoValue>
            </S.InfoValueWrapper>
          </S.Info>
        </S.MoreInfoContainer>
      </S.CoinCardBack>
    </S.CoinCard>
  )
}

export default CoinCard
