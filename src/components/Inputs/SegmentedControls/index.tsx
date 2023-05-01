import React from 'react'

import * as S from './styles'

export type DataListType = string[]

interface ISegmentedControlsProps {
  dataList: DataListType;
  selected: string;
  onClick: (period: string) => void;
}

const SegmentedControls = ({
  dataList,
  selected,
  onClick
}: ISegmentedControlsProps) => {
  return (
    <S.SegmentedControls>
      {dataList.map(item => {
        return (
          <S.Control key={item}>
            <S.ControlButton
              selected={item === selected}
              onClick={() => onClick(item)}
            >
              {item}
            </S.ControlButton>
          </S.Control>
        )
      })}
    </S.SegmentedControls>
  )
}

export default SegmentedControls
