import React, { ReactElement } from 'react'

import Faqs from './Faqs'
import Staking from './Staking'
import Contracts from './Contracts'
import SelectTabs from '@/components/SelectTabs'

import { ContractsIcon, StakingIcon, FaqIcon } from './icons'

import * as S from './styles'

const tabs = [
  {
    asPathText: 'contracts',
    text: 'Contracts',
    svg: ContractsIcon
  },
  {
    asPathText: 'staking',
    text: 'Staking',
    svg: StakingIcon
  },
  {
    asPathText: 'faqs',
    text: 'FAQs',
    svg: FaqIcon
  }
]

const Pool = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('contracts')

  const PoolComponents: { [key: string]: ReactElement } = {
    contracts: <Contracts />,
    staking: <Staking />,
    faqs: <Faqs />
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
