import React from 'react'
import { chooseAction } from '..'

import * as S from './styles'

interface ICardChooseActionProps {
  ImageUrl: string;
  title: string;
  paragraph: string;
  NumberActive: number;
  isActive: chooseAction;
  setChooseActionSelect: React.Dispatch<React.SetStateAction<chooseAction>>;
}

const CardChooseAction = ({
  ImageUrl,
  paragraph,
  title,
  NumberActive,
  isActive,
  setChooseActionSelect
}: ICardChooseActionProps) => {
  function handleClickChoseCard() {
    if (isActive === NumberActive) {
      setChooseActionSelect(chooseAction.Default)
    } else {
      setChooseActionSelect(NumberActive)
    }
  }

  return (
    <S.CardChooseAction
      isActive={isActive === NumberActive}
      onClick={() => handleClickChoseCard()}
      form="poolCreationForm"
    >
      <S.imageContent>
        <img src={ImageUrl} alt="" />
      </S.imageContent>
      <S.TitleAndParagraph>
        <span>{title}</span>
        <p>{paragraph}</p>
      </S.TitleAndParagraph>
    </S.CardChooseAction>
  )
}

export default CardChooseAction
