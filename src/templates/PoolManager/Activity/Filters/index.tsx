import React from 'react'

import Button from '@/components/Button'
import Checkbox from '@/components/Inputs/Checkbox'

import * as S from './styles'

export type OptionsFilter = {
  name: string,
  key: string
}

type Props = {
  options: OptionsFilter[],
  handleCheckbox: (key: string) => void,
  handleClear: () => void,
  handleSelectAll: (options: OptionsFilter[]) => void,
  optionsSelected: string[]
}

const Filters = ({
  options,
  optionsSelected,
  handleCheckbox,
  handleClear,
  handleSelectAll
}: Props) => {
  return (
    <S.Filters>
      <S.Header>
        <span>Filters</span>
      </S.Header>
      <S.OptionsUl>
        {options.map(option => (
          <S.OptionLi key={option.key}>
            <Checkbox
              checked={optionsSelected.includes(option.key)}
              label={option.key}
              name={option.name}
              onChange={() => handleCheckbox(option.key)}
              showLabel={false}
            />
            <S.OptionName>{option.name}</S.OptionName>
          </S.OptionLi>
        ))}
      </S.OptionsUl>
      <S.Hr />
      <S.ButtonsContainer>
        <Button
          backgroundTransparent={true}
          text={'Clear'}
          onClick={handleClear}
        />
        <Button
          backgroundTransparent={true}
          text={'Select All'}
          onClick={() => handleSelectAll(options)}
        />
      </S.ButtonsContainer>
    </S.Filters>
  )
}

export default Filters
