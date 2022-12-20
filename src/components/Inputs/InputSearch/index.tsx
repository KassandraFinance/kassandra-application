import Image from 'next/image'

import searchIcon from '../../../../public/assets/utilities/search.svg'

import * as S from './styles'

interface IInputSearchProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = ({
  name,
  placeholder,
  value,
  onChange
}: IInputSearchProps) => {
  return (
    <S.InputSearch>
      <S.InputSearchContainer>
        <S.Input
          type="search"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />

        <S.ImageWrapper>
          <Image src={searchIcon} />
        </S.ImageWrapper>

        <S.PlaceholderWrapper>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>
      </S.InputSearchContainer>
    </S.InputSearch>
  )
}

export default InputSearch
