import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { IPoolSlice } from '../../store/reducers/pool'
import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import SharedImage from '../Pool/SharedImage'
import ShareImageModal from '../Pool/ShareImageModal'

import Header from '../../components/Header'
import SelectTabs from '../../components/SelectTabs'
import Overlay from '../../components/Overlay'
import SideBar from '../Manage/SideBar'
import Button from '../../components/Button'
import TokenWithNetworkImage from '../../components/TokenWithNetworkImage'

import Analytics from './Analytics'
import Allocations from './Allocations'
import ComingSoon from './ComingSoon'
import ManageAssets from './ManageAssets'

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

interface IPoolManagerProps {
  pool: IPoolSlice;
}

const PoolManager = ({ pool }: IPoolManagerProps) => {
  const [isManageAssets, setIsManageAssets] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('analytics')

  const { trackEventFunction } = useMatomoEcommerce()

  const PoolManagerComponents: { [key: string]: ReactElement } = {
    analytics: <Analytics poolId={pool.id} />,
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

        <Header />
        <S.Content>
          <S.Intro>
            <S.GridIntro>
              <TokenWithNetworkImage
                tokenImage={{
                  url: pool.logo,
                  height: 75,
                  width: 75,
                  withoutBorder: true
                }}
                networkImage={{
                  url: pool.chain.logo,
                  height: 20,
                  width: 20
                }}
                blockies={{
                  size: 8,
                  scale: 9,
                  seedName: pool.name
                }}
              />
              <S.NameIndex>
                <S.NameAndSymbol>
                  <h1>{pool.name}</h1>
                </S.NameAndSymbol>
                <S.SymbolAndLink>
                  <h3>${pool.symbol}</h3>
                  <Link href={`/pool/${pool.id}`}>
                    <button className="circle">
                      <Image
                        src="/assets/icons/website-with-bg.svg"
                        width={32}
                        height={32}
                      />
                    </button>
                  </Link>
                  <a
                    href={`${pool.chain.blockExplorerUrl}/address/${pool.address}`}
                    className="circle"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/assets/icons/go-to-site-with-bg.svg"
                      width={32}
                      height={32}
                    />
                  </a>
                  <button
                    onClick={() => {
                      setOpenModal(true)
                      trackEventFunction(
                        'click',
                        `social-share-${pool.name}`,
                        'pool'
                      )
                    }}
                    className="circle"
                  >
                    <Image
                      src="/assets/icons/share-with-bg.svg"
                      width={32}
                      height={32}
                    />
                  </button>
                </S.SymbolAndLink>
              </S.NameIndex>
            </S.GridIntro>

            <Button
              className="btn-manage-assets"
              backgroundSecondary
              size="large"
              text="Manage Assets"
              image={gear.src}
              onClick={() => setIsManageAssets(true)}
            />
          </S.Intro>
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
      <ShareImageModal
        poolId={pool.id}
        setOpenModal={setOpenModal}
        openModal={openModal}
        productName={pool.symbol}
      >
        <SharedImage
          crpPoolAddress={pool.id}
          totalValueLocked={pool.total_value_locked_usd || ''}
          socialIndex={pool.symbol}
          productName={pool.name}
        />
      </ShareImageModal>
    </S.PoolManager>
  )
}

export default PoolManager
