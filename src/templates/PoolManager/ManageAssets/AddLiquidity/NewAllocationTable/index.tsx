import React from 'react'
import Image from 'next/image'
import Big from 'big.js'

import { AssetType } from '../../../../../store/reducers/addAssetSlice'

import { BNtoDecimal } from '../../../../../utils/numerals'

import CoinSummary from '@/templates/Manage/CreatePool/SelectAssets/CoinSummary'

import arrowRight from '../../../../../../public/assets/utilities/arrow-right.svg'
import notFound from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

interface INewAllocationTablePorps {
  assets?: (AssetType & { newWeight: string })[];
}

const NewAllocationTable = ({ assets }: INewAllocationTablePorps) => {
  return (
    <S.NewAllocationTable>
      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th className="asset">Asset</S.Th>
            <S.Th className="allocation">Allocation</S.Th>
            <S.Th className="arrow"></S.Th>
            <S.Th className="newAllocation">New Allocation</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody height={assets ? assets.length * 8.28 : 30.5}>
          {assets ? (
            assets.map(asset => (
              <S.Tr key={asset.token.id}>
                <S.Td className="asset">
                  <CoinSummary
                    coinImage={asset.token.logo || notFound}
                    coinName={asset.token.name}
                    coinSymbol={asset.token.symbol}
                    price={0}
                    url={`https://heimdall-frontend.vercel.app/coins/${asset.token.symbol}`}
                    table
                  />
                </S.Td>
                <S.Td className="allocation">
                  {BNtoDecimal(Big(asset.weight_normalized).mul(100), 2)}%
                </S.Td>
                <S.Td className="arrow">
                  <Image src={arrowRight} />
                </S.Td>
                <S.Td className="newAllocation">
                  {BNtoDecimal(Big(asset.newWeight).mul(100), 2)}%
                </S.Td>
              </S.Tr>
            ))
          ) : (
            <S.textContainer>
              <S.text>Select asset to preview the allocations</S.text>
            </S.textContainer>
          )}
        </S.TBody>
      </S.Table>
    </S.NewAllocationTable>
  )
}

export default NewAllocationTable
