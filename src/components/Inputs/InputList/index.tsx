import Image from 'next/image'
import React from 'react'

import Overlay from '../../Overlay'

import arrowDownThin from '../../../../public/assets/utilities/arrow-down-thin.svg'

import * as S from './styles'

export type DataListType = string[]

interface IInputListProps {
  dataList: DataListType
  selected: string
  onClick: (period: string) => void
}

const InputList = ({ dataList, selected, onClick }: IInputListProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  function handleClick(data: string) {
    onClick(data)
  }

  return (
    <S.InputList>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}

      <S.Datalist
        id="range"
        height={dataList.length}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <S.Option>
          {selected}
          <S.IconWrapper isOpen={isOpen}>
            <Image src={arrowDownThin} width={5} height={8.57} />
          </S.IconWrapper>
        </S.Option>

        {dataList.map(data => (
          <S.Option key={data} onClick={() => handleClick(data)}>
            {data}
          </S.Option>
        ))}
      </S.Datalist>
    </S.InputList>
  )
}

export default InputList
