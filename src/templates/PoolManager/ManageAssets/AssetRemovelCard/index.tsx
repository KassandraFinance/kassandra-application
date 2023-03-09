import React from 'react'
import Link from 'next/link'

import { useAppSelector } from '@/store/hooks'
import { BNtoDecimal } from '@/utils/numerals'

import Button from '../../../../components/Button'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import * as S from './styles'

const AssetRemovelCard = () => {
  const { tokenSelection, lpNeeded, poolInfo } = useAppSelector(
    state => state.removeAsset
  )

  return (
    <S.AssetRemovelCard>
      <img
        src="/assets/iconGradient/remove.svg"
        alt=""
        width={70}
        height={70}
      />
      <h2>Asset removel has been approved</h2>

      <S.RemovalInformation>
        <p>Asset removed</p>

        <S.SymbolAndImgWrapper>
          <p>{tokenSelection.symbol}</p>
          <img src={tokenSelection.logo} alt="" width={20} height={20} />
        </S.SymbolAndImgWrapper>
      </S.RemovalInformation>

      <S.LpSendWrapper>
        <p>LP Sent</p>

        <S.LpSendValueWrapper>
          <S.LpSendValue>
            <p>{BNtoDecimal(lpNeeded.value, 2)}</p>
            <span>~${BNtoDecimal(lpNeeded.valueInDollar, 2)}</span>
          </S.LpSendValue>
          <TokenWithNetworkImage
            tokenImage={{
              url: poolInfo.logo,
              height: 20,
              width: 20,
              withoutBorder: true
            }}
            networkImage={{
              url: poolInfo.chainLogo,
              height: 10,
              width: 10
            }}
            blockies={{
              size: 4,
              scale: 7,
              seedName: poolInfo.name
            }}
          />
        </S.LpSendValueWrapper>
      </S.LpSendWrapper>

      <Link href={`/manage/${poolInfo.id}`}>
        <Button text="Done" backgroundPrimary fullWidth as="a" />
      </Link>
    </S.AssetRemovelCard>
  )
}

export default AssetRemovelCard
