import React from 'react'

import CardChooseAction from './CardChooseAction'
import FundCard from '../../../../components/FundCard'

import * as S from './styles'

export enum chooseAction {
  Default,
  Add,
  Remove,
  Rebalance
}

const ChooseAction = () => {
  // eslint-disable-next-line prettier/prettier
  const [chooseActionSelect, setChooseActionSelect] = React.useState(chooseAction.Default)

  return (
    <S.ChooseAction>
      <S.Header>
        <S.HeaderImageContent>
          <img
            src="/assets/iconGradient/gear-gradient.svg"
            width={22}
            height={22}
          />
          <h1>Manage Assets</h1>
        </S.HeaderImageContent>
        <p>Choose an action you would like to start on your pool</p>
      </S.Header>
      <S.ChooseActionBody>
        <S.CardChooseActionContainer>
          <CardChooseAction
            ImageUrl="/assets/iconGradient/rebalance.svg"
            title="Rebalance Weights"
            paragraph="Choose the new allocation value and select the rebalance execution period. It must be between 24 and 72 hours."
            NumberActive={chooseAction.Rebalance}
            isActive={chooseActionSelect}
            setChooseActionSelect={setChooseActionSelect}
          />
          <CardChooseAction
            ImageUrl="/assets/iconGradient/add.svg"
            title="Add asset"
            paragraph="Select one or more asset you would like to add in the pool to be part of your strategy."
            NumberActive={chooseAction.Add}
            isActive={chooseActionSelect}
            setChooseActionSelect={setChooseActionSelect}
          />
          <CardChooseAction
            ImageUrl="/assets/iconGradient/remove.svg"
            title="remove asset"
            paragraph="Choose one or more assets you would like to remove from the pool. This is something that."
            NumberActive={chooseAction.Remove}
            isActive={chooseActionSelect}
            setChooseActionSelect={setChooseActionSelect}
          />
        </S.CardChooseActionContainer>

        <S.FundCardContainer>
          <FundCard poolAddress="0x38918142779e2CD1189cBd9e932723C968363D1E" />
        </S.FundCardContainer>
      </S.ChooseActionBody>
    </S.ChooseAction>
  )
}

export default ChooseAction
