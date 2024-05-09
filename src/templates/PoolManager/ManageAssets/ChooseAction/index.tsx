import React from 'react'
import Tippy from '@tippyjs/react'

import CardChooseAction from './CardChooseAction'
import FundCard from '../../../../components/FundCard'

import * as S from './styles'

export enum chooseActionStep {
  Default,
  Add,
  Remove,
  Rebalance
}

interface IChooseActionProps {
  poolId: string
  actionSelected: chooseActionStep
  setActionSelected: React.Dispatch<React.SetStateAction<chooseActionStep>>
  amountTokenInPool: number
}

// eslint-disable-next-line prettier/prettier
const ChooseAction = ({
  poolId,
  actionSelected,
  setActionSelected,
  amountTokenInPool
}: IChooseActionProps) => {
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
        <p>Choose an action you would like to start on your portfolio</p>
      </S.Header>
      <S.ChooseActionBody>
        <S.CardChooseActionContainer>
          <CardChooseAction
            ImageUrl="/assets/iconGradient/rebalance.svg"
            title="Rebalance Weights"
            paragraph="Choose the new allocation value and select the rebalance execution period. It must be between 24 and 72 hours."
            NumberActive={chooseActionStep.Rebalance}
            isActive={actionSelected}
            setChooseActionSelect={setActionSelected}
          />
          <CardChooseAction
            ImageUrl="/assets/iconGradient/add.svg"
            title="Add asset"
            paragraph="Select one or more asset you would like to add in the portfolio to be part of your strategy."
            NumberActive={chooseActionStep.Add}
            isActive={actionSelected}
            setChooseActionSelect={setActionSelected}
          />
          <Tippy
            content="You cannot have less than 2 assets in a managed portfolio. Currently this portfolio has only 2 assets."
            disabled={!(amountTokenInPool <= 2)}
          >
            <span>
              <CardChooseAction
                ImageUrl="/assets/iconGradient/remove.svg"
                title="remove asset"
                paragraph="Choose one or more assets you would like to remove from the portfolio. This is something that."
                NumberActive={chooseActionStep.Remove}
                isActive={actionSelected}
                setChooseActionSelect={setActionSelected}
                isDisable={amountTokenInPool <= 2}
              />
            </span>
          </Tippy>
        </S.CardChooseActionContainer>

        <S.FundCardContainer>
          <FundCard poolAddress={poolId} />
        </S.FundCardContainer>
      </S.ChooseActionBody>
    </S.ChooseAction>
  )
}

export default ChooseAction
