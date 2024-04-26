import React from 'react'
import Image from 'next/image'

import SkeletonLoading from '@/components/SkeletonLoading'

import arrowAscend from '@assets/notificationStatus/arrow-ascend.svg'
import arrowDescend from '@assets/notificationStatus/arrow-descend.svg'

import * as S from './styles'

interface IFundStatusProps {
  tvl?: number
  monthly?: number
  day?: number
}

const FundStatus = ({ day, monthly, tvl }: IFundStatusProps) => {
  const FundStatusList = [
    {
      name: 'MONTHLY',
      value: monthly
    },
    {
      name: '24H',
      value: day
    }
  ]

  return (
    <S.FundStatusWrapper>
      <S.FundStatus>
        {tvl ? (
          <S.ValueContainer>
            <S.Value value={0}>
              {tvl.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </S.Value>
          </S.ValueContainer>
        ) : (
          <SkeletonLoading height={2} width={6} />
        )}
        <h4>TVL</h4>
      </S.FundStatus>
      {FundStatusList.map(item => (
        <S.FundStatus key={item.name}>
          {item?.value ? (
            <S.ValueContainer>
              <S.Value value={item.value}>{item.value}%</S.Value>
              <Image
                src={item.value >= 0 ? arrowAscend : arrowDescend}
                width={16}
                height={16}
              />
            </S.ValueContainer>
          ) : (
            <SkeletonLoading height={2} width={6} />
          )}

          <h4>{item.name}</h4>
        </S.FundStatus>
      ))}
    </S.FundStatusWrapper>
  )
}

export default FundStatus
