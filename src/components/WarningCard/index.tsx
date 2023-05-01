import React from 'react'

import * as S from './styles'

interface IWarningCardProps {
  showCard?: boolean;
  children: React.ReactNode;
}

const WarningCard = ({ children, showCard = true }: IWarningCardProps) => {
  return (
    <S.WarningCard showCard={showCard}>
      <img src="/assets/notificationStatus/queued.svg" alt="" />
      {children}
    </S.WarningCard>
  )
}

export default WarningCard
