import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'
import Tippy from '@tippyjs/react'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_POOL_REBALANCE_TIME } from './graphql'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import usePoolInfo from '@/hooks/usePoolInfo'
import { useAppSelector } from '@/store/hooks'
import { useCountdown } from '@/hooks/useCountDown'

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
import ManageAssets from './ManageAssets'
import Activity from './Activity'
import Brokers from './Brokers'
import Details from './Details'

import gear from '../../../public/assets/icons/gear.svg'

import {
  analyticsIcon,
  detailsIcon,
  brokersIcon,
  rewardsIcon,
  allocationsIcon,
  activityIcon,
  investorsIcon
} from './icons'

import * as S from './styles'

const tabs = [
  {
    asPathText: 'analytics',
    text: 'Analytics',
    svg: analyticsIcon
  },
  {
    asPathText: 'allocations',
    text: 'Allocations',
    svg: allocationsIcon
  },
  {
    asPathText: 'activity',
    text: 'Activity',
    svg: activityIcon
  },
  {
    asPathText: 'investors',
    text: 'Investors',
    svg: investorsIcon
  },
  {
    asPathText: 'fee-rewards',
    text: 'Fee Rewards',
    svg: rewardsIcon
  },
  {
    asPathText: 'brokers',
    text: 'Brokers',
    svg: brokersIcon
  },
  {
    asPathText: 'Details',
    text: 'Details',
    svg: detailsIcon
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
  const { data } = useSWR([GET_POOL_REBALANCE_TIME, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, { id: poolId })
  )

  const currentTime = new Date().getTime()
  const endRebalanceTime = data?.pool?.weight_goals[0].end_timestamp * 1000

  const { dateFormated } = useCountdown(endRebalanceTime)

  const PoolManagerComponents: { [key: string]: ReactElement } = {
    analytics: <Analytics poolId={poolId} />,
    allocations: <Allocations countDownDate={dateFormated} />,
    activity: <Activity />,
    investors: <Investors />,
    feeRewards: <FeeRewards />,
    brokers: <Brokers />,
    Details: <Details />
  }

  React.useEffect(() => {
    if (isManager) {
      router.push(`/pool/${poolId}`)
    }
    return
  }, [isManager])

  React.useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!router.query.tab) {
      return
    }

    setIsSelectTab(router.query.tab)
  }, [router])

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

              <Tippy
                allowHTML={true}
                content={[
                  <S.RebalancingProgressText key="title">
                    REBALANCING IN PROGRESS
                  </S.RebalancingProgressText>,
                  <S.RebalancingProgressTime key="hours">
                    {dateFormated}
                  </S.RebalancingProgressTime>
                ]}
                disabled={!(currentTime < endRebalanceTime)}
              >
                <span>
                  <Button
                    className="btn-manage-assets"
                    backgroundSecondary
                    size="large"
                    text="Manage Assets"
                    image={gear.src}
                    onClick={() => setIsOpenManageAssets(true)}
                    disabledNoEvent={currentTime < endRebalanceTime}
                  />
                </span>
              </Tippy>
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
