import React, { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { BNtoDecimal, calcChange } from '../../utils/numerals'
import Big from 'big.js'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'
import { usePoolPrice } from '@/hooks/query/usePoolPrice'
import { usePoolRebalanceTime } from '@/hooks/query/usePoolRebalanceTime'

import { useUserProfile } from '@/hooks/query/useUserProfile'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import { useAppDispatch } from '@/store/hooks'
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
  }
]

const detailsTab = {
  asPathText: 'details',
  text: 'Details',
  svg: detailsIcon
}
const brokersTab = {
  asPathText: 'brokers',
  text: 'Brokers',
  svg: brokersIcon
}
const feeRewardTab = {
  asPathText: 'fee-rewards',
  text: 'Fee Rewards',
  svg: rewardsIcon
}

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

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { trackEventFunction } = useMatomoEcommerce()
  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()
  const [{ settingChain }, setChain] = useSetChain()

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const { data: poolAssets } = usePoolAssets({ id: poolId })
  const { data } = usePoolRebalanceTime({ id: poolId })

  const chainId = Number(connectedChain?.id ?? '0x89')

  const currentTime = new Date().getTime()
  const endRebalanceTime = data ? data * 1000 : 0

  const { dateFormated } = useCountdown(endRebalanceTime)

  const updatedTabs = handleCheckTabs(tabs)

  function handleCheckTabs(tabsList: typeof tabs) {
    const newTabsList = tabsList.slice()
    if (!poolInfo) return newTabsList

    if (
      poolInfo[0]?.manager?.id.toLowerCase() ===
      wallet?.accounts[0].address.toLowerCase()
    ) {
      newTabsList.splice(4, 0, feeRewardTab, brokersTab, detailsTab)
    }

    return newTabsList
  }

  const PoolManagerComponents: { [key: string]: ReactElement } = {
    analytics: <Analytics poolId={poolId} />,
    allocations: <Allocations countDownDate={dateFormated} />,
    activity: <Activity />,
    investors: <Investors />,
    feeRewards: <FeeRewards />,
    brokers: <Brokers />,
    details: <Details />
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

  const { data: change } = usePoolPrice({
    id: poolId,
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    quarterly: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 90),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
  })

  const { data: userProfile } = useUserProfile({
    address: wallet?.accounts[0].address
  })

  React.useEffect(() => {
    const isManager = poolInfo?.length === 0 ? true : false
    if (isManager) {
      router.push(`/pool/${poolId}`)
    }
  }, [poolInfo])

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
    if (change) {
      const changeDay = calcChange(change.now[0].close, change.day[0]?.close)
      const changeWeek = calcChange(change.now[0].close, change.week[0]?.close)
      const changeMonth = calcChange(
        change.now[0].close,
        change.month[0]?.close
      )
      const changeQuarterly = calcChange(
        change.now[0].close,
        change.quarterly[0]?.close
      )
      const changeYear = calcChange(change.now[0].close, change.year[0]?.close)

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
    if (43114 === chainId && wallet) {
      setNetworkIcon(avalancheIcon)
    } else if (137 === chainId && wallet) {
      setNetworkIcon(polygonIcon)
    } else {
      return
    }
  }, [wallet])

  return (
    <S.PoolManager>
      <S.DashBoard isOpen={isOpen}>
        {isOpen && <Overlay onClick={handleDashBoardButton} />}

        <S.UserDashBoardButton
          id="userDashBoardButton"
          onClick={handleDashBoardButton}
        >
          <S.UserImageWrapper isOpen={isOpen}>
            {wallet ? (
              <>
                <img
                  src={userProfile?.image ? userProfile.image : userIcon.src}
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
                        url: poolInfo[0]?.logo || '',
                        height: 75,
                        width: 75,
                        withoutBorder: true
                      }}
                      networkImage={{
                        url: poolInfo[0]?.chain?.logo || '',
                        height: 20,
                        width: 20
                      }}
                      blockies={{
                        size: 8,
                        scale: 9,
                        seedName: poolInfo[0]?.name
                      }}
                    />
                    <S.NameIndex>
                      <S.NameAndSymbol>
                        <h1>{poolInfo[0]?.name}</h1>
                      </S.NameAndSymbol>
                      <S.SymbolAndLink>
                        <h3>${poolInfo[0]?.symbol}</h3>
                        <Link href={`/pool/${poolInfo[0]?.id}`}>
                          <button className="circle">
                            <Image
                              src="/assets/icons/website-with-bg.svg"
                              width={32}
                              height={32}
                            />
                          </button>
                        </Link>
                        <a
                          href={`${poolInfo[0]?.chain?.block_explorer_url}/address/${poolInfo[0]?.address}`}
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
                              `social-share-${poolInfo[0]?.name}`,
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

                  {poolInfo[0]?.chain_id !== chainId ? (
                    <Button
                      text={`Connect to ${networks[poolInfo[0]?.chain_id]
                        ?.chainName}`}
                      background="secondary"
                      size="large"
                      className="btn-manage-assets"
                      disabledNoEvent={settingChain}
                      onClick={() =>
                        setChain({
                          chainId: `0x${poolInfo[0].chain_id.toString(16)}`
                        })
                      }
                    />
                  ) : poolInfo[0].strategy.toLowerCase() ===
                    wallet?.accounts[0].address ? (
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
                          background="secondary"
                          size="large"
                          text="Manage Assets"
                          fullWidth
                          image={gear.src}
                          onClick={() => setIsOpenManageAssets(true)}
                          disabledNoEvent={currentTime < endRebalanceTime}
                        />
                      </span>
                    </Tippy>
                  ) : (
                    <Tippy content="I wanted to remind you that you're not the designated pool strategist.">
                      <span>
                        <Button
                          className="btn-manage-assets"
                          background="secondary"
                          size="large"
                          text="Manage Assets"
                          fullWidth
                          image={gear.src}
                          disabledNoEvent={true}
                        />
                      </span>
                    </Tippy>
                  )}
                </S.Intro>
                <SelectTabs
                  tabs={updatedTabs}
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
          poolId={poolInfo[0]?.id}
          setOpenModal={setOpenModal}
          openModal={openModal}
          productName={poolInfo[0]?.symbol}
        >
          <SharedImage
            crpPoolAddress={poolInfo[0]?.id}
            totalValueLocked={BNtoDecimal(
              Big(poolInfo[0]?.total_value_locked_usd || 0),
              0
            )}
            socialIndex={poolInfo[0]?.symbol}
            productName={poolInfo[0]?.name}
            poolLogo={poolInfo[0]?.logo || ''}
            tokens={poolAssets}
          />
        </ShareImageModal>
      )}
    </S.PoolManager>
  )
}

export default PoolManager
