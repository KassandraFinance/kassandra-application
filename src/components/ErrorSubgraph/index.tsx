import React from 'react'

import * as S from './styles'

const ErrorSubgraph = () => {
  return (
    <S.ErrorSubgraph>
      <img src="/assets/notificationStatus/warning-yellow.svg" alt="" />
      <p>Prices might be wrong due to subgraph indexing in progress</p>
    </S.ErrorSubgraph>
  )
}

export default ErrorSubgraph
