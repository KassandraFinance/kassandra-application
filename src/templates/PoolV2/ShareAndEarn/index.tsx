import React from 'react'

import ShareAndEarnCard from './ShareAndEarnCard'

import * as S from './styles'

interface IShareAndEarnProps {
  feeJoinBroker: string
  poolId: string
}

const ShareAndEarn = ({ feeJoinBroker, poolId }: IShareAndEarnProps) => {
  return (
    <S.ShareAndEarn>
      <ShareAndEarnCard feeJoinBroker={feeJoinBroker} poolId={poolId} />
    </S.ShareAndEarn>
  )
}

export default ShareAndEarn
