import React from 'react'

import InputSearch from '../../../../../components/Inputs/InputSearch'
import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const AddAssetsTable = () => {
  const [searchValue, setSearchValue] = React.useState('')
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  return (
    <S.AddAssetsTable>
      <S.InputSearchWrapper>
        <InputSearch
          name="addAssetsInput"
          placeholder="Search for asset to add"
          value={searchValue}
          onChange={handleSearch}
        />
      </S.InputSearchWrapper>

      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th>Select</S.Th>
            <S.Th>Asset</S.Th>
            <S.Th>Price</S.Th>
            <S.Th>Allocation</S.Th>
            <S.Th>Market Cap</S.Th>
            <S.Th>Balance</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          <S.Td></S.Td>
          <S.Td></S.Td>
          <S.Td>teste</S.Td>
          <S.Td></S.Td>
          <S.Td></S.Td>
          <S.Td></S.Td>
        </S.TBody>
      </S.Table>
    </S.AddAssetsTable>
  )
}

export default AddAssetsTable
