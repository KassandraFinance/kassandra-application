import React from 'react'

import Button from '../../../../components/Button'

import * as S from './styles'

interface IRebalanceSuccessProps {
  time: number
  setIsOpenManageAssets: React.Dispatch<React.SetStateAction<boolean>>
}

const RebalanceSuccess = ({
  time,
  setIsOpenManageAssets
}: IRebalanceSuccessProps) => {
  return (
    <S.RebalanceSuccess>
      <S.RebalanceSuccessCard>
        <img
          src="/assets/iconGradient/rebalance.svg"
          alt=""
          width={90}
          height={90}
        />
        <S.RebalanceSuccessdTitle>
          Asset rebalance has been approved
        </S.RebalanceSuccessdTitle>
        <S.RebalanceSuccessdParagraph>
          The rebalancing will end in
        </S.RebalanceSuccessdParagraph>
        <S.TimeParagraph>{time} hours</S.TimeParagraph>
        <Button
          fullWidth
          background="primary"
          text="Done"
          className="doneButton"
          onClick={() => setIsOpenManageAssets(false)}
        />
      </S.RebalanceSuccessCard>
    </S.RebalanceSuccess>
  )
}

export default RebalanceSuccess
