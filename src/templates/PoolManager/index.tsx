import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import usePoolInfo from '@/hooks/usePoolInfo'
import { useAppSelector } from '@/store/hooks'

import SharedImage from '../Pool/SharedImage'
import ShareImageModal from '../Pool/ShareImageModal'

import Header from '../../components/Header'
import SelectTabs from '../../components/SelectTabs'
import Overlay from '../../components/Overlay'
import SideBar from '../Manage/SideBar'
import Button from '../../components/Button'
import TokenWithNetworkImage from '../../components/TokenWithNetworkImage'
import Loading from '@ui/Loading'
import FeeRewards from './FeeRewards'

import Analytics from './Analytics'
import Allocations from './Allocations'
import Investors from './Investors'
import ComingSoon from './ComingSoon'
import ManageAssets from './ManageAssets'
import Brokers from './Brokers'

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
  const [isOpenManageAssets, setIsOpenManageAssets] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('analytics')

  const router = useRouter()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { trackEventFunction } = useMatomoEcommerce()

  const { poolInfo, isManager } = usePoolInfo(userWalletAddress, poolId)

  const PoolManagerComponents: { [key: string]: ReactElement } = {
    analytics: <Analytics poolId={poolId} />,
    allocations: <Allocations />,
    activity: <ComingSoon />,
    investors: <Investors />,
    feeRewards: <FeeRewards />,
    brokers: <Brokers />,
    info: <ComingSoon />
  }

  React.useEffect(() => {
    if (isManager) {
      router.push(`/pool/${poolId}`)
    }
    return
  }, [isManager])

  return (
    <S.PoolManager>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={() => setIsOpen(!isOpen)} />}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <Header />
        {poolInfo ? (
          <S.Content>
            <S.Intro>
              <S.GridIntro>
                <TokenWithNetworkImage
                  tokenImage={{
                    url: poolInfo?.logo,
                    height: 75,
                    width: 75,
                    withoutBorder: true
                  }}
                  networkImage={{
                    url: poolInfo?.chain?.logo,
                    height: 20,
                    width: 20
                  }}
                  blockies={{
                    size: 8,
                    scale: 9,
                    seedName: poolInfo?.name
                  }}
                />
                <S.NameIndex>
                  <S.NameAndSymbol>
                    <h1>{poolInfo?.name}</h1>
                  </S.NameAndSymbol>
                  <S.SymbolAndLink>
                    <h3>${poolInfo?.symbol}</h3>
                    <Link href={`/pool/${poolInfo?.id}`}>
                      <button className="circle">
                        <Image
                          src="/assets/icons/website-with-bg.svg"
                          width={32}
                          height={32}
                        />
                      </button>
                    </Link>
                    <a
                      href={`${poolInfo?.chain?.blockExplorerUrl}/address/${poolInfo?.address}`}
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
                          `social-share-${poolInfo?.name}`,
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
                onClick={() => setIsOpenManageAssets(true)}
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
        ) : (
          <S.LoadingWrapper>
            <Loading marginTop={0} />
          </S.LoadingWrapper>
        )}
      </S.DashBoard>
      {isOpenManageAssets && (
        <ManageAssets setIsOpenManageAssets={setIsOpenManageAssets} />
      )}
      {poolInfo && (
        <ShareImageModal
          poolId={poolInfo?.id}
          setOpenModal={setOpenModal}
          openModal={openModal}
          productName={poolInfo?.symbol}
        >
          <SharedImage
            crpPoolAddress={poolInfo?.id}
            totalValueLocked={poolInfo?.total_value_locked_usd || ''}
            socialIndex={poolInfo?.symbol}
            productName={poolInfo?.name}
          />
        </ShareImageModal>
      )}
    </S.PoolManager>
  )
}

export default PoolManager
