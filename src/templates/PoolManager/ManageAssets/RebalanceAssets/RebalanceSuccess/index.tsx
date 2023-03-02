import React from 'react'
import Link from 'next/link'

import Button from '../../../../../components/Button'

import * as S from './styles'

interface IRebalanceSuccessProps {
  time: number;
  pool?: string;
}

const RebalanceSuccess = ({ time, pool }: IRebalanceSuccessProps) => {
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
        <Link href={`/manage/${pool ?? ''}`} passHref>
          <Button
            as="a"
            fullWidth
            backgroundPrimary
            text="Done"
            className="doneButton"
          />
        </Link>
      </S.RebalanceSuccessCard>
    </S.RebalanceSuccess>
  )
}

export default RebalanceSuccess
