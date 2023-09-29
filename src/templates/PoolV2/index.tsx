import React, { ReactElement } from 'react'

import SelectTabs from '@/components/SelectTabs'
import Contracts from './Contracts'

import { ContractsIcon } from './icons'

import * as S from './styles'

const tabs = [
  {
    asPathText: 'contracts',
    text: 'Contracts',
    svg: ContractsIcon
  }
]

const Pool = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('contracts')

  const PoolComponents: { [key: string]: ReactElement } = {
    contracts: <Contracts />
  }

  return (
    <S.Pool>
      <S.Container>
        <SelectTabs
          isSelect={isSelectTab}
          tabs={tabs}
          setIsSelect={setIsSelectTab}
        />
        {PoolComponents[isSelectTab?.toString() ?? '']}
      </S.Container>
    </S.Pool>
  )
}

export default Pool
