import React from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import InputSearch from '../../../../components/Inputs/InputSearch'

import CoinSummary from '../SelectAssets/CoinSummary'
import Checkbox from '../../../../components/Inputs/Checkbox'
import arrowDownIcon from '../../../../../public/assets/utilities/arrow-down-thin.svg'

import * as S from './styles'

import { mockData } from '../SelectAssets'

interface IAssetsTableProps {}

const AssetsTable = ({}: IAssetsTableProps) => {
  const [value, setValue] = React.useState('')

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    console.log(e)
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e)
  }

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5
  })

  return (
    <S.AssetsTable>
      <S.SearchWrapper>
        <InputSearch
          placeholder="Search for assets to add"
          name="search"
          value={value}
          onChange={handleSearch}
        />
      </S.SearchWrapper>

      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th className="asset">Asset</S.Th>
            <S.Th className="price">Price</S.Th>
            <S.Th className="marketCap">
              Market Cap
              <S.HeaderButton>
                <Image src={arrowDownIcon} />
              </S.HeaderButton>
            </S.Th>
            <S.Th className="balance">
              Balance
              <S.HeaderButton>
                <Image src={arrowDownIcon} />
              </S.HeaderButton>
            </S.Th>
            <S.Th className="add">Add</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          <S.TrsWrapper>
            {mockData.map((coin, i) => (
              <S.Tr
                key={coin.coinName}
                ref={i === mockData.length - 1 ? ref : null}
              >
                <S.Td className="asset">
                  <CoinSummary
                    coinImage={coin.coinImage}
                    coinName={coin.coinName}
                    coinSymbol={coin.coinSymbol}
                    price={coin.price}
                    url={coin.url}
                    table
                  />
                </S.Td>
                <S.Td className="price">{coin.price}</S.Td>
                <S.Td className="marketCap">$7,366,870,000</S.Td>
                <S.Td className="balance">
                  1000 {coin.coinSymbol}
                  <S.SecondaryText>~$2940.00</S.SecondaryText>
                </S.Td>
                <S.Td className="add">
                  <Checkbox
                    name={coin.coinName}
                    label={coin.coinSymbol}
                    checked={false}
                    showLabel={false}
                    onChange={handleCheckbox}
                  />
                </S.Td>
              </S.Tr>
            ))}
          </S.TrsWrapper>

          <S.Shadow inView={inView}></S.Shadow>
        </S.TBody>
      </S.Table>
    </S.AssetsTable>
  )
}

export default AssetsTable
