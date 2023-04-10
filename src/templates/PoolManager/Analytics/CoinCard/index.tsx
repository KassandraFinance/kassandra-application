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
  priceChangeIn7d: string;
  marketCap: number;
  score24h: string;
  price: string;
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
  priceChangeIn7d,
  marketCap,
  score24h,
  price,
  dataList,
  period
}: ICoinCardProps) => {
  const [dataPeriod, setDataPeriod] = React.useState<string>('1D')
  const [isShowMore, setIsShowMore] = React.useState<boolean>(false)

  let color = '#FCFCFC'
  let changeIcon = null
  if (Big(priceChangeIn7d).gt(0)) {
    color = '#2CE878'
    changeIcon = arrowAscendIcon
  } else if (
    Big(priceChangeIn7d).lt(0)
  ) {
    color = '#E8372C'
    changeIcon = arrowDescendIcon
  } else {
    color = '#FCFCFC'
    changeIcon = arrowAscendIcon
  }

  const volatility = React.useMemo(() => {
    const size = (sparkLine.length / 7)
    let aggIndex = 0
    let index = 0
    const data = sparkLine.reduce((acc, _value, i) => {
      if (!acc[index]) {
        acc.push({close: '0'})
      }

      if (i === aggIndex) {
        acc[index].close = _value.close
        index++
        aggIndex += size
      } else if (i > aggIndex) {
        acc.push({ close: _value.close })
      }
      return acc
    // eslint-disable-next-line prettier/prettier
    }, [] as sparkData[])
    return calcVolatility(data)
  }, [])

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
          <S.Volume>${BNtoDecimal(Big(price), 2, 2, 2)}</S.Volume>

          <S.ChangeWrapper>
            <S.Change>{priceChangeIn7d}%</S.Change>

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
            <S.InfoName>Market Cap.</S.InfoName>

            <S.InfoValue>${BNtoDecimal(Big(marketCap), 2)}</S.InfoValue>
          </S.Info>

          <S.Info>
            <S.InfoName>Change</S.InfoName>

            <S.InfoValueWrapper>
              <S.InfoValue value={Number(priceChangeIn7d)}>
                {priceChangeIn7d}%
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
