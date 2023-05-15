import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'
import Tippy from '@tippyjs/react'
import { BNtoDecimal } from '../../utils/numerals'
import Big from 'big.js'

import { BACKEND_KASSANDRA, networks } from '@/constants/tokenAddresses'
import { GET_POOL_REBALANCE_TIME, GET_POOL_PRICE } from './graphql'

import changeChain from '@/utils/changeChain'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import usePoolInfo from '@/hooks/usePoolInfo'
import usePoolAssets from '@/hooks/usePoolAssets'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { useCountdown } from '@/hooks/useCountDown'
import { setPerformanceValues } from '@/store/reducers/performanceValues'

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

import gear from '@assets/icons/gear.svg'
import userIcon from '@assets/icons/user.svg'
import avalancheIcon from '@assets/logos/avax.png'
import polygonIcon from '@assets/logos/polygon.svg'
import walletIcon from '@assets/utilities/wallet.svg'
import closeIcon from '@assets/utilities/close-icon.svg'

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
    asPathText: 'details',
    text: 'Details',
    svg: detailsIcon
  }
]

const PoolManager = () => {
  const [isOpenManageAssets, setIsOpenManageAssets] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [networkIcon, setNetworkIcon] = React.useState(avalancheIcon)
  const [openModal, setOpenModal] = React.useState(false)
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('analytics')

  const dispatch = useAppDispatch()
  const router = useRouter()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { trackEventFunction } = useMatomoEcommerce()

  const { poolInfo, isManager } = usePoolInfo(userWalletAddress, poolId)
  const { poolAssets } = usePoolAssets(poolId)
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
    details: <Details />
  }

  function calcChange(newPrice: number, oldPrice: number) {
    const calc = ((newPrice - oldPrice) / oldPrice) * 100
    return calc ? calc.toFixed(2) : '0'
  }

  function handleDashBoardButton() {
    setIsOpen(!isOpen)
    const top = document.getElementById('top')?.style
    if (top) {
      if (isOpen) {
        top.zIndex = '1020'
      } else {
        top.zIndex = '0'
      }
    }
  }

  const { data: change } = useSWR([GET_POOL_PRICE], query =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
      week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
      month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
      quarterly: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 90),
      year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
    })
  )

  const { image } = useAppSelector(state => state.user)

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

  React.useEffect(() => {
    if (change?.pool) {
      const changeDay = calcChange(
        change.pool.now[0].close,
        change.pool.day[0]?.close
      )
      const changeWeek = calcChange(
        change.pool.now[0].close,
        change.pool.week[0]?.close
      )
      const changeMonth = calcChange(
        change.pool.now[0].close,
        change.pool.month[0]?.close
      )
      const changeQuarterly = calcChange(
        change.pool.now[0].close,
        change.pool.quarterly[0]?.close
      )
      const changeYear = calcChange(
        change.pool.now[0].close,
        change.pool.year[0]?.close
      )

      dispatch(
        setPerformanceValues({
          title: 'Weekly Performance',
          allPerformancePeriod: {
            'Daily Performance': changeDay,
            'Weekly Performance': changeWeek,
            'Monthly Performance': changeMonth,
            '3 Months Performance': changeQuarterly,
            'Yearly Performance': changeYear
          }
        })
      )
    }
  }, [change])

  React.useEffect(() => {
    if (43114 === chainId && userWalletAddress.length > 0) {
      setNetworkIcon(avalancheIcon)
    } else if (137 === chainId && userWalletAddress.length > 0) {
      setNetworkIcon(polygonIcon)
    } else {
      return
    }
  }, [chainId, userWalletAddress])

  return (
    <S.PoolManager>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={handleDashBoardButton} />}

        <S.UserDashBoardButton
          id="userDashBoardButton"
          onClick={handleDashBoardButton}
        >
          <S.UserImageWrapper isOpen={isOpen}>
            {userWalletAddress.length > 0 ? (
              <>
                <img
                  src={image?.profilePic ? image.profilePic : userIcon.src}
                  width={20}
                  height={20}
                />

                <S.NetworkImageWrapper>
                  <Image src={networkIcon} />
                </S.NetworkImageWrapper>
              </>
            ) : (
              <Image src={walletIcon} />
            )}
          </S.UserImageWrapper>

          <S.CloseIconWrapper isOpen={isOpen}>
            <Image src={closeIcon} />
          </S.CloseIconWrapper>
        </S.UserDashBoardButton>

        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div></div>

        <div>
          <Header />
          <S.Content>
            {poolInfo ? (
              <>
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

                  {poolInfo.chain_id !== chainId ? (
                    <Button
                      text={`Connect to ${
                        networks[poolInfo.chain_id].chainName
                      }`}
                      backgroundSecondary
                      size="large"
                      className="btn-manage-assets"
                      onClick={() =>
                        changeChain({
                          chainId: networks[poolInfo.chain_id].chainId,
                          chainName: networks[poolInfo.chain_id].chainName,
                          rpcUrls: [networks[poolInfo.chain_id].rpc],
                          nativeCurrency:
                            networks[poolInfo.chain_id].nativeCurrency
                        })
                      }
                    />
                  ) : (
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
                          fullWidth
                          image={gear.src}
                          onClick={() => setIsOpenManageAssets(true)}
                          disabledNoEvent={currentTime < endRebalanceTime}
                        />
                      </span>
                    </Tippy>
                  )}
                </S.Intro>
                <SelectTabs
                  tabs={tabs}
                  isSelect={isSelectTab}
                  setIsSelect={setIsSelectTab}
                />
                {
                  PoolManagerComponents[
                    `${
                      isSelectTab === 'fee-rewards' ? 'feeRewards' : isSelectTab
                    }`
                  ]
                }
              </>
            ) : (
              <S.LoadingWrapper>
                <Loading marginTop={0} />
              </S.LoadingWrapper>
            )}
          </S.Content>
        </div>
      </S.DashBoard>
      {isOpenManageAssets && (
        <ManageAssets setIsOpenManageAssets={setIsOpenManageAssets} />
      )}
      {poolInfo && poolAssets && (
        <ShareImageModal
          poolId={poolInfo?.id}
          setOpenModal={setOpenModal}
          openModal={openModal}
          productName={poolInfo?.symbol}
        >
          <SharedImage
            crpPoolAddress={poolInfo?.id}
            totalValueLocked={BNtoDecimal(
              Big(poolInfo?.total_value_locked_usd) || '0',
              0
            )}
            socialIndex={poolInfo?.symbol}
            productName={poolInfo?.name}
            poolLogo={poolInfo?.logo}
            tokens={poolAssets}
          />
        </ShareImageModal>
      )}
    </S.PoolManager>
  )
}

export default PoolManager
