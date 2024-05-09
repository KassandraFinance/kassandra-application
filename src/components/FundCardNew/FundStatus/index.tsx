import React from 'react'
import Image from 'next/image'

import SkeletonLoading from '@/components/SkeletonLoading'

import arrowAscend from '@assets/notificationStatus/arrow-ascend.svg'
import arrowDescend from '@assets/notificationStatus/arrow-descend.svg'

import * as S from './styles'

interface IFundStatusProps {
  tvl?: number
  monthly?: number
}

const FundStatus = ({ monthly, tvl }: IFundStatusProps) => {
  return (
    <S.FundStatusWrapper>
      <S.FundStatus>
        {tvl || tvl === 0 ? (
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

      <S.FundStatus>
        {monthly || monthly === 0 ? (
          <S.ValueContainer>
            <S.Value value={monthly}>{monthly}%</S.Value>
            <Image
              src={monthly >= 0 ? arrowAscend : arrowDescend}
              width={16}
              height={16}
            />
          </S.ValueContainer>
        ) : (
          <SkeletonLoading height={2} width={6} />
        )}

        <h4>MONTHLY</h4>
      </S.FundStatus>
    </S.FundStatusWrapper>
  )
}

export default FundStatus
