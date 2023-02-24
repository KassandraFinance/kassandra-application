import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { BACKEND_KASSANDRA } from '../../../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from '../graphql'
import { useAppSelector } from '../../../../../store/hooks'

import { BNtoDecimal } from '../../../../../utils/numerals'

import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'

import arrowRight from '../../../../../../public/assets/utilities/arrow-right.svg'
import notFound from '../../../../../../public/assets/icons/coming-soon.svg'

import { GetPoolTokensType } from '../AddLiquidityOperation'

import * as S from './styles'

const NewAllocationTable = () => {
  const poolId = useAppSelector(state => state.addAsset.poolId)

  const params = {
    id: poolId
  }

  const { data } = useSWR<GetPoolTokensType>(
    [GET_POOL_TOKENS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )

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
          {data
            ? data.pool.weight_goals[0].weights.map(asset => (
                <S.Tr key={asset.token.id}>
                  <S.Td className="asset">
                    <CoinSummary
                      coinImage={asset.token.logo || notFound}
                      coinName={asset.token.name}
                      coinSymbol={asset.token.symbol}
                      price={0}
                      url={`https://heimdall-frontend.vercel.app/coins/${'bitcoin'}`}
                      table
                    />
                  </S.Td>
                  <S.Td className="allocation">
                    {BNtoDecimal(Big(asset.weight_normalized).mul(100), 2)}%
                  </S.Td>
                  <S.Td className="arrow">
                    <Image src={arrowRight} />
                  </S.Td>
                  <S.Td className="newAllocation">---</S.Td>
                </S.Tr>
              ))
            : null}
        </S.TBody>
      </S.Table>
    </S.NewAllocationTable>
  )
}

export default NewAllocationTable
