import React from 'react'
import Link from 'next/link'
import Tippy from '@tippyjs/react'

import InputNumber from '../../../../../components/Inputs/InputNumber'
import PoolToken from './PoolToken'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const AllocationsTable = () => {
  const [AllocationValue, setAllocationValue] = React.useState(0)

  const poolToken = {
    name: 'Tricrypto',
    symbol: '$K3C',
    currentAmount: 1000,
    currentAmountInDollar: 2940,
    allocationPorcentage: 20,
    newAllocation: 10,
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
          <S.ThHead id="test"></S.ThHead>
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
                newAllocation={token.newAllocation}
                newAmount={token.newAmount}
                newAmountInDollar={token.newAmountInDollar}
                symbol={token.symbol}
              />
              {/* <S.TokenInfo>
                <img
                  src="/assets/logos/tricrypto.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <S.TokenNameContainer>
                  <S.TokenName>
                    <Link href="#" passHref>
                      <a>
                        {token.name}
                        <img
                          src="/assets/utilities/go-to-site.svg"
                          alt=""
                          width={12}
                          height={12}
                        />
                      </a>
                    </Link>
                  </S.TokenName>
                  <p>{token.symbol}</p>
                </S.TokenNameContainer>
              </S.TokenInfo>
              <S.CurrentAmount>
                <span>
                  {token.currentAmount} {token.symbol}
                </span>
                <p>~${token.currentAmountInDollar.toFixed(2)}</p>
              </S.CurrentAmount>
              <S.Allocation>{token.allocationPorcentage}%</S.Allocation>
              <S.Arrow>
                <img
                  src="/assets/utilities/arrow-right.svg"
                  alt=""
                  width={32}
                />
              </S.Arrow>
              <S.NewAllocation>
                <InputNumber
                  InputNumberValue={AllocationValue}
                  name="number"
                  handleInputNumber={event =>
                    setAllocationValue(Number(event.target.value))
                  }
                  min={0}
                  max={100}
                  step={1}
                />
                <S.ImageContent>
                  <img
                    src="/assets/utilities/unlock.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </S.ImageContent>
              </S.NewAllocation>
              <S.NewAmount>
                <span>
                  {token.newAmount} {token.symbol}
                </span>
                <p>~${token.newAmountInDollar.toFixed(2)}</p>
              </S.NewAmount> */}
            </S.TrBody>
          )
        })}
      </S.TBodyAllocations>
    </S.AllocationsTable>
  )
}

export default AllocationsTable
