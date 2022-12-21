import Image from 'next/image'
import Tippy from '@tippyjs/react'

import CoinSummary from '../../SelectAssets/CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import tooltip from '../../../../../../public/assets/utilities/tooltip.svg'

import * as S from './styles'
import { Table, THead, Tr, Th, TBody, Td } from '../../AssetsTable/styles'

import { mockData } from '../../SelectAssets'

interface IAddLiquidityTableProps {}

const AddLiquidityTable = ({}: IAddLiquidityTableProps) => {
  return (
    <S.AddLiquidityTable>
      <Table>
        <THead>
          <Tr>
            <Th className="asset">Asset</Th>
            <Th className="price">Price</Th>
            <Th className="balance">Balance</Th>
            <Th className="liquidity">
              Initial Liquidity
              <Tippy content="This is a tip">
                <S.Tooltip tabIndex={0}>
                  <Image src={tooltip} alt="Explanation" layout="responsive" />
                </S.Tooltip>
              </Tippy>
            </Th>
          </Tr>
        </THead>

        <TBody>
          {mockData.map(coin => (
            <Tr key={coin.coinName}>
              <Td className="asset">
                <CoinSummary
                  coinImage={coin.coinImage}
                  coinName={coin.coinName}
                  coinSymbol={coin.coinSymbol}
                  price={coin.price}
                  url={coin.url}
                  balance={1000}
                  table
                />
              </Td>

              <Td className="price">${coin.price}</Td>

              <Td className="balance">
                10000 {coin.coinSymbol}
                <S.SecondaryText>~$5000</S.SecondaryText>
              </Td>

              <Td className="liquidity">
                <S.InputWrapper>
                  <InputNumberRight
                    name={coin.coinSymbol}
                    type="number"
                    value={'10'}
                    min={0}
                    max={100}
                    placeholder=""
                    lable="add liquidity"
                    onChange={() => {
                      return
                    }}
                    button
                    buttonText={'Max'}
                    onClick={() => console.log('Function not implemented')}
                  />
                </S.InputWrapper>
              </Td>
            </Tr>
          ))}
        </TBody>

        <S.Footer>
          <Tr>
            <S.Title>Total</S.Title>

            <S.TotalContainer>
              <S.Total>
                $20,000.00
                <S.MaxButton
                  onClick={() => console.log('Function not implemented')}
                >
                  Max
                </S.MaxButton>
              </S.Total>

              <S.Available>Available: $20,000.00</S.Available>
            </S.TotalContainer>
          </Tr>
        </S.Footer>
      </Table>
    </S.AddLiquidityTable>
  )
}

export default AddLiquidityTable
