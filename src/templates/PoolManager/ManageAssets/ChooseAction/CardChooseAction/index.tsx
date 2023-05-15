import React from 'react'

import { chooseActionStep } from '..'

import * as S from './styles'

interface ICardChooseActionProps {
  ImageUrl: string
  title: string
  paragraph: string
  NumberActive: number
  isActive: chooseActionStep
  isDisable?: boolean
  setChooseActionSelect: React.Dispatch<React.SetStateAction<chooseActionStep>>
}

const CardChooseAction = ({
  ImageUrl,
  paragraph,
  title,
  NumberActive,
  isDisable,
  isActive,
  setChooseActionSelect
}: ICardChooseActionProps) => {
  function handleClickChoseCard() {
    if (isActive === NumberActive) {
      setChooseActionSelect(chooseActionStep.Default)
    } else {
      setChooseActionSelect(NumberActive)
    }
  }

  return (
    <S.CardChooseAction
      isActive={isActive === NumberActive}
      onClick={() => handleClickChoseCard()}
      type="button"
      disabled={isDisable}
    >
      <S.imageContent>
        <img src={ImageUrl} alt="" />
      </S.imageContent>
      <S.TitleAndParagraph>
        <span>{title}</span>
        <p>{paragraph}</p>
      </S.TitleAndParagraph>
      <input
        form="manageAssetsForm"
        id="selectAction"
        name="selectAction"
        type="radio"
        value={NumberActive}
        required
        checked={isActive === NumberActive}
        onChange={() => {
          return
        }}
      />
    </S.CardChooseAction>
  )
}

export default CardChooseAction
