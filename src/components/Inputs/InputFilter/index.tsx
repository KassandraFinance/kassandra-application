import Image from 'next/image'

import searchIcon from '../../../../public/assets/utilities/search.svg'
import clearIcon from '../../../../public/assets/utilities/clear.svg'

import * as S from './styles'

interface IInputFilterProps {
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

const InputFilter = ({
  name,
  placeholder,
  value,
  onChange,
  onClear
}: IInputFilterProps) => {
  return (
    <S.InputFilter>
      <S.InputFilterContainer>
        <S.Input
          type="search"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />

        <S.ImageWrapper>
          <Image src={searchIcon} width={24} height={24} />
        </S.ImageWrapper>

        <S.PlaceholderWrapper>
          <S.Placeholder>{placeholder}</S.Placeholder>
        </S.PlaceholderWrapper>

        <S.SearchCancelButton onClick={onClear}>
          <Image src={clearIcon} />
        </S.SearchCancelButton>
      </S.InputFilterContainer>
    </S.InputFilter>
  )
}

export default InputFilter
