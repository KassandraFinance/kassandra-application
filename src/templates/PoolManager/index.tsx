import React from 'react'
import Header from '../../components/Header'

import SelectTabs from '../../components/SelectTabs'
import Overlay from '../../components/Overlay'
import SideBar from '../Manage/SideBar'

import analytics from '../../../public/assets/tabManage/analytics.svg'
import allocations from '../../../public/assets/tabManage/allocations.svg'
import activity from '../../../public/assets/tabManage/activity.svg'
import investors from '../../../public/assets/tabManage/investors.svg'
import rewards from '../../../public/assets/tabManage/rewards.svg'
import brokers from '../../../public/assets/tabManage/brokers.svg'
import info from '../../../public/assets/tabManage/info.svg'

import * as S from './styles'

const PoolManager = () => {
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('analytics')
  const [isOpen, setIsOpen] = React.useState(false)

  const tabs = [
    {
      asPathText: 'analytics',
      text: 'Analytics',
      icon: analytics
    },
    {
      asPathText: 'allocations',
      text: 'Allocations',
      icon: allocations
    },
    {
      asPathText: 'activity',
      text: 'Activity',
      icon: activity
    },
    {
      asPathText: 'investors',
      text: 'Investors',
      icon: investors
    },
    {
      asPathText: 'fee-rewards',
      text: 'Fee Rewards',
      icon: rewards
    },
    {
      asPathText: 'brokers',
      text: 'Brokers',
      icon: brokers
    },
    {
      asPathText: 'info',
      text: 'Info',
      icon: info
    }
  ]

  return (
    <S.PoolManager>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={() => setIsOpen(!isOpen)} />}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <S.Content>
          <Header />

          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
          <h1>saudades do que a gente ainda não viveu</h1>
        </S.Content>
      </S.DashBoard>
    </S.PoolManager>
  )
}

export default PoolManager
