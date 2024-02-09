import React from 'react'

import StatusIndicator from '@/components/StatusIndicator'

import * as S from './styles'

type ChainInfo = {
  icon: JSX.Element
  network: string
}

export enum SubgraphStatus {
  Updated,
  PracticallyUpdated,
  Outdated,
  FetchingData
}

export const StatusColor: Record<SubgraphStatus, string> = {
  [SubgraphStatus.Updated]: '#5EC768FF',
  [SubgraphStatus.PracticallyUpdated]: '#F2B83BFF',
  [SubgraphStatus.Outdated]: '#E1464AFF',
  [SubgraphStatus.FetchingData]: '#A9A9A9FF'
}

interface IModalSubgraphStatusProps {
  chainInfo: ChainInfo
  status: SubgraphStatus
  diffTime: string
}

const ModalSubgraphStatus = ({
  chainInfo,
  status,
  diffTime
}: IModalSubgraphStatusProps) => {
  const SubgraphStatusMessages: Record<SubgraphStatus, string> = {
    [SubgraphStatus.Updated]: `A difference between the platform and the blockchain is: ${diffTime}`,
    [SubgraphStatus.PracticallyUpdated]: `A difference between the platform and the blockchain is: ${diffTime}`,
    [SubgraphStatus.Outdated]: `A difference between the platform and the blockchain is: ${diffTime}`,
    [SubgraphStatus.FetchingData]: 'Fetching the latest data'
  }

  return (
    <S.ModalSubgraphStatus>
      <S.ModalHeader>
        <S.IconWrapper>{chainInfo.icon}</S.IconWrapper>

        <p>{chainInfo.network} UPDATES</p>
      </S.ModalHeader>

      <S.ModalBodyContainer>
        <p>CONNECTION STATUS</p>

        <S.TextWrapper>
          <StatusIndicator
            color={StatusColor[status]}
            isLoading={status === SubgraphStatus.FetchingData}
          />
          <p>{SubgraphStatusMessages[status]}</p>
        </S.TextWrapper>
      </S.ModalBodyContainer>
    </S.ModalSubgraphStatus>
  )
}

export default ModalSubgraphStatus
