/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import useSWR from 'swr'
import Big from 'big.js'
import BigNumber from 'bn.js'
import { request } from 'graphql-request'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import {
  BACKEND_KASSANDRA,
  KacyPoligon,
  LPDaiAvax,
  WETH_POLYGON,
  networks
} from '@/constants/tokenAddresses'
import { LP_KACY_AVAX_PNG } from '@/constants/pools'

import usePriceLP from '@/hooks/usePriceLPEthers'
import useCoingecko from '@/hooks/useCoingecko'
import { ERC20 } from '@/hooks/useERC20'
import useTransaction from '@/hooks/useTransaction'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import useStaking from '@/hooks/useStaking'

import { GET_INFO_POOL } from './graphql'

import { BNtoDecimal } from '@/utils/numerals'

import Button from '../Button'
import ModalRequestUnstake from '../Modals/ModalRequestUnstake'
import ModalCancelUnstake from '../Modals/ModalCancelUnstake'
import ModalStakeAndWithdraw from '../Modals/ModalStakeAndWithdraw'
import TokenWithNetworkImage from '../TokenWithNetworkImage'
import ModalBuyKacyOnPangolin from '../Modals/ModalBuyKacyOnPangolin'
import Loading from '../Loading'

import Details from './Details'
import YourStake from './YourStake'
import WithdrawDate from './WithdrawDate'
import KacyEarned from './KacyEarned'

import infoCyanIcon from '@assets/notificationStatus/info.svg'
import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

export interface IInfoStaked {
  yourStake: BigNumber
  withdrawable: boolean
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: BigNumber
  yourDailyKacyReward: BigNumber
  withdrawDelay: any
  totalStaked: BigNumber
  hasExpired: boolean
  unstake: boolean
  apr: BigNumber
  stakingToken: string
  vestingPeriod: string
  lockPeriod: string
}

interface IStakingProps {
  pid: number
  symbol: string
  stakingAddress: string
  chain: {
    id: number
    logo: string
  }
  properties: {
    logo: {
      src: string
      style: {
        width: string
      }
    }
    addressProviderReserves?: string
    title?: string
    link?: string
  }
  stakeWithVotingPower: boolean
  stakeWithLockPeriod: boolean
  isLP: boolean
  address?: string
}

const StakeCard = ({
  pid,
  symbol,
  properties,
  stakeWithVotingPower,
  stakeWithLockPeriod,
  isLP,
  address,
  stakingAddress,
  chain
}: IStakingProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isDetails, setIsDetails] = React.useState<boolean>(false)
  const [isModalStake, setIsModalStake] = React.useState<boolean>(false)
  const [isOpenModalPangolin, setIsOpenModalPangolin] =
    React.useState<boolean>(false)
  const [isModalCancelUnstake, setIsModalCancelUnstake] =
    React.useState<boolean>(false)
  const [isModalRequestUnstake, setIsModalRequestUnstake] =
    React.useState<boolean>(false)
  const [amountApproveKacyStaking, setAmountApproveKacyStaking] =
    React.useState<Big>(Big(0))
  const [lockPeriod, setLockPeriod] = React.useState(0)
  const [decimals, setDecimals] = React.useState<string>('18')
  const [stakeTransaction, setStakeTransaction] = React.useState<string>('')
  const [currentAvailableWithdraw, setCurrentAvailableWithdraw] =
    React.useState(Big(-1))
  const [kacyEarned, setKacyEarned] = React.useState<BigNumber>(
    new BigNumber(-1)
  )
  const [poolPrice, setPoolPrice] = React.useState<Big>(Big(-1))
  const [kacyPrice, setKacyPrice] = React.useState<Big>(Big(-1))
  const [infoStaked, setInfoStaked] = React.useState<IInfoStaked>({
    yourStake: new BigNumber(-1),
    withdrawable: false,
    votingMultiplier: '',
    startDate: '...',
    endDate: '...',
    withdrawDelay: '',
    kacyRewards: new BigNumber(-1),
    totalStaked: new BigNumber(-1),
    yourDailyKacyReward: new BigNumber(-1),
    hasExpired: false,
    unstake: false,
    apr: new BigNumber(-1),
    stakingToken: '',
    vestingPeriod: '...',
    lockPeriod: '...'
  })
  const [{ wallet, connecting }, connect] = useConnectWallet()
  const [{ settingChain }, setChain] = useSetChain()
  const { getPriceKacyAndLP, getPriceKacyAndLPBalancer } = usePriceLP(chain.id)
  const { trackEventFunction } = useMatomoEcommerce()
  const transaction = useTransaction()

  const networkChain = networks[chain.id]

  const staking = useStaking(stakingAddress, networkChain.chainId)
  const { data: price } = useCoingecko(
    chain.id,
    networkChain.nativeCurrency.address,
    [WETH_POLYGON, KacyPoligon]
  )

  const { data } = useSWR([GET_INFO_POOL, address], (query, id) =>
    request(BACKEND_KASSANDRA, query, { id })
  )

  const productCategories = [
    'Stake',
    process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji',
    stakeWithVotingPower ? 'VotingStake' : 'OtherStake'
  ]

  const stakeLogoString = properties.logo.style.width.search('rem')
  const stakeLogoWidthString = properties.logo.style.width.substring(
    0,
    stakeLogoString
  )
  const stakeLogoWidth = Number(stakeLogoWidthString) * 10

  function openStakeAndWithdraw(transaction: 'staking' | 'unstaking') {
    setIsModalStake(true)
    setStakeTransaction(transaction)
  }

  async function updateAllowance() {
    const erc20 = await ERC20(infoStaked.stakingToken, networkChain.rpc, {
      transactionErrors: transaction.transactionErrors,
      txNotification: transaction.txNotification,
      wallet: null
    })

    const allowance = await erc20.allowance(
      stakingAddress,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  async function getLiquidityPoolPriceInDollar() {
    if (chain.id === 137 && isLP && address) {
      return
    } else if (isLP) {
      const addressProviderReserves =
        isLP && address ? address : LP_KACY_AVAX_PNG

      const { priceLP } = await getPriceKacyAndLP(
        addressProviderReserves,
        LPDaiAvax,
        isLP
      )

      if (isLP && priceLP) {
        setPoolPrice(priceLP)
        return
      }
    } else if (kacyPrice.gte(0)) {
      if (data?.pools?.length) {
        setPoolPrice(Big(data.pools[0]?.price_usd || -1))
        return
      }
      setPoolPrice(kacyPrice)
    }
  }

  async function handleApproveKacy() {
    const erc20 = await ERC20(infoStaked.stakingToken, networkChain.rpc, {
      transactionErrors: transaction.transactionErrors,
      txNotification: transaction.txNotification,
      wallet: wallet
    })

    const decimals = await erc20.decimals()
    setDecimals(decimals.toString())

    await erc20.approve(
      stakingAddress,
      {
        pending: `Waiting approval of ${symbol}...`,
        sucess: `Approval of ${symbol} confirmed`
      },
      {
        onSuccess: () =>
          trackEventFunction('approve-contract', `${symbol}`, 'stake-farm')
      }
    )

    const allowance = await erc20.allowance(
      stakingAddress,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  async function handleCheckStaking() {
    if (wallet?.provider && infoStaked.stakingToken) {
      const erc20 = await ERC20(infoStaked.stakingToken, networkChain.rpc, {
        transactionErrors: transaction.transactionErrors,
        txNotification: transaction.txNotification,
        wallet: null
      })
      erc20
        .allowance(stakingAddress, wallet?.accounts[0].address)
        .then((response: string) => setAmountApproveKacyStaking(Big(response)))

      staking.availableWithdraw &&
        staking
          .availableWithdraw(pid, wallet?.accounts[0].address)
          .then(response => setCurrentAvailableWithdraw(Big(response)))
          .catch(error => console.log(error))

      staking.lockUntil &&
        staking
          .lockUntil(pid, wallet?.accounts[0].address)
          .then(response => setLockPeriod(response))
          .catch(error => console.log(error))

      return
    }
  }

  React.useEffect(() => {
    async function getBalancerLP(address: string) {
      if (!price) {
        return
      }

      const priceWETH = price[WETH_POLYGON.toLowerCase()].usd
      if (priceWETH) {
        setPoolPrice(await getPriceKacyAndLPBalancer(priceWETH, address))
      }
    }

    if (poolPrice.gte(0)) {
      return
    }

    if (chain.id === 137 && isLP && address) {
      getBalancerLP(address)
      return
    }
    return
  }, [price])

  React.useEffect(() => {
    if (!price) {
      return
    }

    if (kacyPrice.gte(0)) {
      return
    }

    const priceKacy = price[KacyPoligon.toLowerCase()].usd
    setKacyPrice(Big(priceKacy))
  }, [price])

  React.useEffect(() => {
    getLiquidityPoolPriceInDollar()
  }, [infoStaked.stakingToken, pid, data, kacyPrice])

  React.useEffect(() => {
    handleCheckStaking()
  }, [wallet, infoStaked.stakingToken])

  React.useEffect(() => {
    if (infoStaked.apr.lt(new BigNumber(0))) {
      return
    }

    setIsLoading(false)
  }, [infoStaked])

  return (
    <>
      <div>
        <S.BorderGradient stakeWithVotingPower={!stakeWithVotingPower}>
          {isLoading && (
            <div
              style={{
                height: `${
                  wallet?.accounts[0].address ? '52.3rem' : '30.2rem'
                }`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Loading marginTop={0} />
            </div>
          )}
          <S.StakeCard style={{ display: `${isLoading ? 'none' : 'block'}` }}>
            <S.InterBackground stakeWithVotingPower={!stakeWithVotingPower}>
              <TokenWithNetworkImage
                tokenImage={{
                  url: properties.logo.src,
                  width: stakeLogoWidth,
                  withoutBorder: true
                }}
                networkImage={{
                  url: chain.logo,
                  height: 20,
                  width: 20
                }}
              />
              <S.IntroStaking>
                <S.APR>
                  <Tippy content="The Annual Percentage Rate is the yearly rate earned not taking compounding into account">
                    <S.TooltipAPR tabIndex={0}>
                      <Image src={infoCyanIcon} alt="Explanation" />
                    </S.TooltipAPR>
                  </Tippy>
                  <h4>APR</h4>
                </S.APR>
                <S.Percentage>
                  {infoStaked.apr.lt(new BigNumber(0))
                    ? '...'
                    : infoStaked.hasExpired
                    ? 0
                    : BNtoDecimal(infoStaked.apr, 0)}
                  %
                </S.Percentage>
              </S.IntroStaking>
            </S.InterBackground>
            {!stakeWithVotingPower ? (
              <S.PoolName>
                <S.StakeAndEarn>
                  <p>STAKE</p>
                  <Link href={properties.link || ''} passHref>
                    <a target="_blank" rel="noreferrer">
                      {properties.title}
                      <img src="/assets/utilities/go-to-site.svg" alt="" />
                    </a>
                  </Link>
                </S.StakeAndEarn>
                <S.StakeAndEarn>
                  <p>EARN</p>
                  <p>$KACY</p>
                </S.StakeAndEarn>
              </S.PoolName>
            ) : (
              <S.VotingPowerAndWithdrawDelay>
                <S.InfoPool>
                  <h3>Voting Power</h3>
                  <p>
                    {infoStaked.votingMultiplier.toString() || '...'}
                    <span>/$KACY</span>
                  </p>
                </S.InfoPool>
                <S.InfoPool>
                  <h3>Withdraw delay</h3>
                  <S.Days>
                    <p>
                      {infoStaked.withdrawDelay.length === 0
                        ? '...'
                        : infoStaked.withdrawDelay / 60 / 60 / 24 < 1
                        ? infoStaked.withdrawDelay / 60
                        : infoStaked.withdrawDelay / 60 / 60 / 24}
                      <span>
                        {infoStaked.withdrawDelay / 60 / 60 / 24 < 1
                          ? ' min'
                          : ' days'}
                      </span>
                    </p>
                    <Tippy content="To redeem your assets you will have to first request a withdrawal and wait this amount of time to be able to redeem your assets. You will stop receiving rewards during this period and your voting power multiplier will be reduced to 1.">
                      <S.TooltipAPR tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          width={16}
                          height={16}
                        />
                      </S.TooltipAPR>
                    </Tippy>
                  </S.Days>
                </S.InfoPool>
              </S.VotingPowerAndWithdrawDelay>
            )}
            {wallet?.accounts[0].address && <S.Line />}

            <S.InfosStaking>
              <YourStake
                pid={pid}
                infoStaked={infoStaked}
                poolPrice={poolPrice}
                kacyPrice={kacyPrice}
                setInfoStaked={setInfoStaked}
                lockPeriod={lockPeriod}
                stakeWithVotingPower={stakeWithVotingPower}
                stakeWithLockPeriod={stakeWithLockPeriod}
                availableWithdraw={currentAvailableWithdraw}
                stakingAddress={stakingAddress}
                chainId={chain.id}
              />
              <S.ButtonContainer stakeWithVotingPower={!stakeWithVotingPower}>
                {wallet?.accounts[0].address ? (
                  <>
                    {!stakeWithLockPeriod && (
                      <S.Claim>
                        <KacyEarned
                          pid={pid}
                          userWalletAddress={wallet?.accounts[0].address || ''}
                          kacyEarned={kacyEarned}
                          setKacyEarned={setKacyEarned}
                          kacyPrice={kacyPrice}
                          stakingAddress={stakingAddress}
                          chainId={chain.id}
                        />
                        <Button
                          type="button"
                          text="Claim"
                          size="claim"
                          backgroundSecondary
                          disabledNoEvent={
                            kacyEarned.lte(new BigNumber(0)) ||
                            networkChain.chainId !==
                              Number(wallet?.chains[0].id)
                          }
                          onClick={() =>
                            staking.getReward(
                              pid,
                              {
                                pending: `Waiting for the blockchain to claim your rewards...`,
                                sucess: `Rewards claimed successfully`
                              },
                              {
                                onSuccess: () =>
                                  trackEventFunction(
                                    'reward-claim',
                                    `${symbol}`,
                                    'stake-farm'
                                  )
                              }
                            )
                          }
                        />
                      </S.Claim>
                    )}
                    <S.StakeContainer>
                      {infoStaked.unstake ? (
                        <>
                          <Button
                            type="button"
                            text="Cancel withdraw"
                            size="huge"
                            backgroundSecondary
                            fullWidth
                            onClick={() => setIsModalCancelUnstake(true)}
                          />
                          <WithdrawDate
                            pid={pid}
                            stakingAddress={stakingAddress}
                            chainId={chain.id}
                          />
                        </>
                      ) : (
                        <>
                          {networkChain.chainId !==
                          Number(wallet?.chains[0].id) ? (
                            <Button
                              type="button"
                              text={`Connect to ${networkChain.chainName}`}
                              size="huge"
                              backgroundSecondary
                              fullWidth
                              disabledNoEvent={settingChain}
                              onClick={() =>
                                setChain({
                                  chainId: `0x${networkChain.chainId.toString(
                                    16
                                  )}`
                                })
                              }
                            />
                          ) : stakeWithLockPeriod ? null : infoStaked.withdrawDelay !==
                              '0' && infoStaked.withdrawable ? (
                            <Button
                              type="button"
                              text={`Stake ${symbol}`}
                              size="huge"
                              backgroundSecondary
                              fullWidth
                              onClick={() => setIsModalCancelUnstake(true)}
                            />
                          ) : (
                            <Button
                              type="button"
                              text={`Stake ${symbol}`}
                              size="huge"
                              backgroundSecondary
                              fullWidth
                              onClick={() => {
                                openStakeAndWithdraw('staking')
                              }}
                            />
                          )}
                          {stakeWithLockPeriod ||
                          (infoStaked.yourStake.toString() !== '0' &&
                            infoStaked.withdrawable) ? (
                            <Button
                              type="button"
                              text="Withdraw"
                              size="huge"
                              backgroundBlack
                              disabledNoEvent={
                                (stakeWithLockPeriod &&
                                  currentAvailableWithdraw.lte(0)) ||
                                networkChain.chainId !==
                                  Number(wallet?.chains[0].id)
                              }
                              fullWidth
                              onClick={() => {
                                openStakeAndWithdraw('unstaking')
                              }}
                            />
                          ) : (
                            <Button
                              type="button"
                              text="Request withdraw"
                              size="huge"
                              backgroundBlack
                              disabledNoEvent={
                                infoStaked.yourStake.toString() === '0' ||
                                networkChain.chainId !==
                                  Number(wallet?.chains[0].id)
                              }
                              fullWidth
                              onClick={() => setIsModalRequestUnstake(true)}
                            />
                          )}
                        </>
                      )}
                    </S.StakeContainer>
                  </>
                ) : (
                  <Button
                    type="button"
                    text="Connect Wallet"
                    size="huge"
                    backgroundSecondary
                    fullWidth
                    disabledNoEvent={connecting}
                    onClick={() => connect()}
                  />
                )}
                <S.ButtonDetails
                  type="button"
                  isDetails={isDetails}
                  isConnect={!!wallet?.accounts[0].address}
                  onClick={() => {
                    setIsDetails(!isDetails)
                    trackEventFunction(
                      'click-details',
                      `${isDetails ? 'details-closed' : 'details-open'}`,
                      'stake-farm'
                    )
                  }}
                >
                  Details
                  <img
                    src="assets/notificationStatus/arrow-down-blue.svg"
                    alt=""
                  />
                </S.ButtonDetails>
                {isDetails && (
                  <Details
                    pid={pid}
                    hasExpired={infoStaked.hasExpired}
                    infoStakeStatic={infoStaked}
                    stakingToken={infoStaked.stakingToken}
                    decimals={decimals}
                    symbol={symbol}
                    poolPrice={poolPrice}
                    kacyPrice={kacyPrice}
                    link={properties.link ?? ''}
                    setIsOpenModal={setIsOpenModalPangolin}
                    stakingAddress={stakingAddress}
                    chainId={chain.id}
                  />
                )}
              </S.ButtonContainer>
            </S.InfosStaking>
          </S.StakeCard>
        </S.BorderGradient>
      </div>

      {isModalStake && (
        <ModalStakeAndWithdraw
          setModalOpen={setIsModalStake}
          pid={pid}
          decimals={decimals}
          stakingToken={infoStaked.stakingToken}
          productCategories={productCategories}
          symbol={symbol}
          stakeTransaction={stakeTransaction}
          setStakeTransaction={setStakeTransaction}
          link={properties.link ?? ''}
          amountApproved={amountApproveKacyStaking}
          handleApprove={handleApproveKacy}
          updateAllowance={updateAllowance}
          stakingAddress={stakingAddress}
          chainId={chain.id}
        />
      )}
      {isModalCancelUnstake && (
        <ModalCancelUnstake
          setModalOpen={setIsModalCancelUnstake}
          pid={pid}
          isStaking={
            infoStaked.withdrawDelay !== '0' && infoStaked.withdrawable
          }
          symbol={symbol}
          chainId={chain.id}
          stakingToken={infoStaked.stakingToken}
          openStakeAndWithdraw={openStakeAndWithdraw}
        />
      )}
      {isModalRequestUnstake && (
        <ModalRequestUnstake
          modalOpen={isModalRequestUnstake}
          setModalOpen={setIsModalRequestUnstake}
          pid={pid}
          votingMultiplier={infoStaked.votingMultiplier}
          yourStake={infoStaked.yourStake}
          symbol={symbol}
          chainId={chain.id}
          stakingAddress={stakingAddress}
        />
      )}
      {isOpenModalPangolin && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModalPangolin}
          setModalOpen={setIsOpenModalPangolin}
        />
      )}
    </>
  )
}

export default StakeCard
