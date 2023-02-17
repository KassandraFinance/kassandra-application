import React from 'react'
import Image from 'next/image'
import Big from 'big.js'

import InputList from '../../../../components/Inputs/InputList'
import SparkLineChart, { sparkData } from '../SparkLineChart'

import arrowAscendIcon from '../../../../../public/assets/notificationStatus/arrow-ascend.svg'
import arrowDescendIcon from '../../../../../public/assets/notificationStatus/arrow-descend.svg'
import heimdallLogo from '../../../../../public/assets/logos/heimdall-logo.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const sparkDataMock: sparkData[] = [
  {
    close: '94318.37054523511140168523952945796',
    timestamp: 1675728000
  },
  {
    close: '95091.74746429377807836123162616105',
    timestamp: 1675814400
  },
  {
    close: '85241.17251719990223997877332444707',
    timestamp: 1675900800
  },
  {
    close: '85045.29234618072344962470317197355',
    timestamp: 1675987200
  },
  {
    close: '85257.29515923262661250333474590629',
    timestamp: 1676073600
  },
  {
    close: '83021.6322759742165446435973994729',
    timestamp: 1676246400
  },
  {
    // close: '83021.6322759742165446435973994729',
    // close: '94318.37054523511140168523952945796',
    close: '95091.74746429377807836123162616105',
    timestamp: 1675814400
  }
]

interface ICoinCardProps {
  image: string;
  name: string;
  symbol: string;
}

const CoinCard = ({ image, name, symbol }: ICoinCardProps) => {
  const [dataPeriod, setDataPeriod] = React.useState<string>('1D')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const change = Big(sparkDataMock[sparkDataMock.length - 1].close).sub(
    sparkDataMock[0].close
  )
  let color = '#FCFCFC'
  let changeIcon = null
  if (
    Big(sparkDataMock[sparkDataMock.length - 1].close).gt(
      Big(sparkDataMock[0].close)
    )
  ) {
    color = '#2CE878'
    changeIcon = arrowAscendIcon
  } else if (
    Big(sparkDataMock[sparkDataMock.length - 1].close).lt(
      Big(sparkDataMock[0].close)
    )
  ) {
    color = '#E8372C'
    changeIcon = arrowDescendIcon
  } else {
    color = '#FCFCFC'
    changeIcon = arrowAscendIcon
  }

  return (
    <S.CoinCard isOpen={isOpen}>
      <S.ShowMore onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        Show More
        <S.Line />
      </S.ShowMore>

      <S.CoinCardFront isOpen={isOpen}>
        <S.PoolAssetsCardName>
          <S.NameContainer>
            <S.ImageWrapper>
              <Image src={image} width={26.67} height={26.67} />
            </S.ImageWrapper>

            <S.TextWrapper>
              <S.AssetName>{name}</S.AssetName>

              <S.AssetSymbol>{symbol}</S.AssetSymbol>
            </S.TextWrapper>
          </S.NameContainer>

          <S.InputListWrapper>
            <InputList
              dataList={dataList}
              selected={dataPeriod}
              onClick={(period: string) => setDataPeriod(period)}
            />
          </S.InputListWrapper>
        </S.PoolAssetsCardName>

        <S.ChartWrapper>
          <SparkLineChart data={sparkDataMock} color={color} />
        </S.ChartWrapper>

        <S.ChartData>
          <S.Volume>$21,326.28</S.Volume>

          <S.ChangeWrapper>
            <S.Change>{change.toFixed(2)}%</S.Change>

            <Image src={changeIcon} width={20} height={20} />
          </S.ChangeWrapper>
        </S.ChartData>
      </S.CoinCardFront>

      <S.CoinCardBack isOpen={isOpen}>
        <S.MoreInfoContainer>
          <S.Info>
            <S.InfoName>Asset</S.InfoName>

            <S.InfoValue>{name}</S.InfoValue>
          </S.Info>

          <S.Info>
            <S.InfoName>Symbol</S.InfoName>

            <S.InfoValueWrapper>
              <S.InfoValue>{symbol}</S.InfoValue>

              <S.InfoLogoWrapper>
                <Image src={image} width={14} height={14} />
              </S.InfoLogoWrapper>
            </S.InfoValueWrapper>
          </S.Info>
          <S.Info>
            <S.InfoName>Volume</S.InfoName>

            <S.InfoValue>$21,326.28</S.InfoValue>
          </S.Info>

          <S.Info>
            <S.InfoName>Change</S.InfoName>

            <S.InfoValueWrapper>
              <S.InfoValue value={change.toNumber()}>
                {change.toFixed(2)}%
              </S.InfoValue>

              <Image src={changeIcon} width={16} height={16} />
            </S.InfoValueWrapper>
          </S.Info>
          <S.Info>
            <S.InfoName>Volatility</S.InfoName>

            <S.InfoValue>500%</S.InfoValue>
          </S.Info>
          <S.Info>
            <S.InfoName>Sharper ratio</S.InfoName>
            <S.InfoValue>0.8</S.InfoValue>
          </S.Info>
          <S.Info>
            <S.InfoName>Risk factor</S.InfoName>
            <S.InfoValue value={0.3}>0.3%</S.InfoValue>
          </S.Info>
          <S.Info>
            <S.InfoName>Social score</S.InfoName>

            <S.InfoValueWrapper>
              <Image src={heimdallLogo} />

              <S.InfoValue>0.8</S.InfoValue>
            </S.InfoValueWrapper>
          </S.Info>
        </S.MoreInfoContainer>
      </S.CoinCardBack>
    </S.CoinCard>
  )
}

export default CoinCard
