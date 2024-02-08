import React from 'react'

import { StatusIndicator } from '@/components/StatusIndicator/styles'

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

const SubgraphStatusMessages: Record<SubgraphStatus, string> = {
  [SubgraphStatus.Updated]: 'All data successfully loaded',
  [SubgraphStatus.PracticallyUpdated]: 'Most data is up to date',
  [SubgraphStatus.Outdated]: 'Data is outdated',
  [SubgraphStatus.FetchingData]: 'Fetching the latest data'
}

interface IModalSubgraphStatusProps {
  chainInfo: ChainInfo
  status: SubgraphStatus
}

const ModalSubgraphStatus = ({
  chainInfo,
  status
}: IModalSubgraphStatusProps) => {
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
