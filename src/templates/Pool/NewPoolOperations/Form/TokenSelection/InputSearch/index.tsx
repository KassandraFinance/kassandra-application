import React from 'react'

import * as S from './styles'

interface IInputSearchProps {
  searchToken: string;
  setSearchToken: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line prettier/prettier
const InputSearch = ({ searchToken, setSearchToken  }: IInputSearchProps) => {

  function handleSearchToken(text: string) {
    setSearchToken(text.trim().toLocaleLowerCase())
  }

  return (
    <S.InputContent>
      <img src="/assets/utilities/search.svg" alt="" />
      <S.SearchListInput
        placeholder="Search by name or paste address"
        value={searchToken}
        onChange={event => handleSearchToken(event.target.value)}
      />
      <S.DeleteSearch
        isShowIcon={searchToken.length > 0}
        onClick={() => setSearchToken('')}
      >
        <img src="/assets/utilities/close.svg" alt="" />
      </S.DeleteSearch>
    </S.InputContent>
  )
}

export default InputSearch
