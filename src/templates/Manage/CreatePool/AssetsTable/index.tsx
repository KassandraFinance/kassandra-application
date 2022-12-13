import Image from 'next/image'

import CoinSummary from '../SelectAssets/CoinSummary'

import arrowDownIcon from '../../../../../public/assets/utilities/arrow-down-thin.svg'

import * as S from './styles'

import { mockData } from '../SelectAssets'

interface IAssetsTableProps {}

const AssetsTable = ({}: IAssetsTableProps) => {
  return (
    <S.AssetsTable>
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
          {mockData.map(coin => (
            <S.Tr key={coin.coinName}>
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
              <S.Td className="add">a</S.Td>
            </S.Tr>
          ))}
        </S.TBody>
      </S.Table>
    </S.AssetsTable>
  )
}

export default AssetsTable
