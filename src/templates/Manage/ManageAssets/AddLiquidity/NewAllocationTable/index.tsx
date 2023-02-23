import React from 'react'
import Image from 'next/image'

import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'

import arrowRight from '../../../../../../public/assets/utilities/arrow-right.svg'

import * as S from './styles'

const NewAllocationTable = () => {
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

        <S.TBody>
          <S.Tr>
            <S.Td className="asset">
              <CoinSummary
                coinImage="https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"
                coinName="Bitcoin"
                coinSymbol="wbtc.e"
                price={0}
                url={`https://heimdall-frontend.vercel.app/coins/${'bitcoin'}`}
                table
              />
            </S.Td>
            <S.Td className="allocation">10%</S.Td>
            <S.Td className="arrow">
              <Image src={arrowRight} />
            </S.Td>
            <S.Td className="newAllocation">---</S.Td>
          </S.Tr>
        </S.TBody>
      </S.Table>
    </S.NewAllocationTable>
  )
}

export default NewAllocationTable
