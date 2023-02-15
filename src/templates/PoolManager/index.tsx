import React, { ReactElement } from 'react'

import Header from '../../components/Header'
import SelectTabs from '../../components/SelectTabs'
import Overlay from '../../components/Overlay'
import SideBar from '../Manage/SideBar'
import Button from '../../components/Button'

import Analytics from './Analytics'
import Allocations from './Allocations'
import ComingSoon from './ComingSoon'
import ManageAssets from '../Manage/ManageAssets'

import analytics from '../../../public/assets/tabManage/analytics.svg'
import allocations from '../../../public/assets/tabManage/allocations.svg'
import activity from '../../../public/assets/tabManage/activity.svg'
import investors from '../../../public/assets/tabManage/investors.svg'
import rewards from '../../../public/assets/tabManage/rewards.svg'
import brokers from '../../../public/assets/tabManage/brokers.svg'
import info from '../../../public/assets/tabManage/info.svg'
import gear from '../../../public/assets/icons/gear.svg'

import * as S from './styles'

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

const PoolManager = () => {
  const [isManageAssets, setIsManageAssets] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('analytics')

  const PoolManagerComponents: { [key: string]: ReactElement } = {
    analytics: <Analytics />,
    allocations: <Allocations />,
    activity: <ComingSoon />,
    investors: <ComingSoon />,
    feeRewards: <ComingSoon />,
    brokers: <ComingSoon />,
    info: <ComingSoon />
  }

  return (
    <S.PoolManager>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={() => setIsOpen(!isOpen)} />}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <S.Content>
          <Header />
          <S.Intro>
            <p>Awesome Pool</p>
          </S.Intro>
          <Button
            backgroundSecondary
            size="large"
            text="Manage Assets"
            image={gear.src}
            onClick={() => setIsManageAssets(true)}
          />
          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />
          {
            PoolManagerComponents[
              `${isSelectTab === 'fee-rewards' ? 'feeRewards' : isSelectTab}`
            ]
          }
        </S.Content>
      </S.DashBoard>
      {isManageAssets && <ManageAssets />}
    </S.PoolManager>
  )
}

export default PoolManager
