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
    [SubgraphStatus.Updated]: `Kassandra is up to date with the ${chainInfo.network} blockchain. All blockchain data is current, with no significant delays.`,
    [SubgraphStatus.PracticallyUpdated]: `Data updates are currently experiencing slower processing times than usual, attributed to network congestion and data verification processes. The estimated delay is approximately ${diffTime}.`,
    [SubgraphStatus.Outdated]: `Unable to sync with ${chainInfo.network} Blockchain.`,
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
