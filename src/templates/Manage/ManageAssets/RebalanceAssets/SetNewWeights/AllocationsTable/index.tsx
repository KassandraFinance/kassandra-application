import React from 'react'
import Tippy from '@tippyjs/react'

import PoolToken from './PoolToken'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const AllocationsTable = () => {
  const poolToken = {
    name: 'Tricrypto',
    symbol: '$K3C',
    currentAmount: 1000,
    currentAmountInDollar: 2940,
    allocationPorcentage: 9,
    newAmount: 1000,
    newAmountInDollar: 2940
  }
  const poolTokenList: Array<typeof poolToken> = Array(4).fill(poolToken)

  return (
    <S.AllocationsTable>
      <S.TableHead>
        <S.TableHeadRow>
          <S.ThHead>Asset Name</S.ThHead>
          <S.ThHead>Current amount</S.ThHead>
          <S.ThHead>
            Allocation
            <Tippy content="TIPPY">
              <img src="/assets/utilities/tooltip.svg" />
            </Tippy>
          </S.ThHead>
          <S.ThHead id="arrowIconContent" />
          <S.ThHead>
            New Allocation
            <Tippy content="TIPPY">
              <img src="/assets/utilities/tooltip.svg" />
            </Tippy>
          </S.ThHead>
          <S.ThHead>New amount</S.ThHead>
        </S.TableHeadRow>
      </S.TableHead>
      <S.TBodyAllocations>
        {poolTokenList.map((token, index) => {
          return (
            <S.TrBody key={token.currentAmount + index}>
              <PoolToken
                allocationPorcentage={token.allocationPorcentage}
                currentAmount={token.currentAmount}
                currentAmountInDollar={token.currentAmountInDollar}
                name={token.name}
                newAmount={token.newAmount}
                newAmountInDollar={token.newAmountInDollar}
                symbol={token.symbol}
              />
            </S.TrBody>
          )
        })}
      </S.TBodyAllocations>
    </S.AllocationsTable>
  )
}

export default AllocationsTable
