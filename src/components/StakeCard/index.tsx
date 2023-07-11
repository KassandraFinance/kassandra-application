import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { PoolDetails } from '@/constants/pools'
import { networks } from '@/constants/tokenAddresses'

import { getDate } from '@/utils/date'
import { handleCalcAPR } from './utils'
import { BNtoDecimal } from '@/utils/numerals'

import { ERC20 } from '@/hooks/useERC20'
import useStaking from '@/hooks/useStaking'
import useTransaction from '@/hooks/useTransaction'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import Button from '../Button'
import TokenWithNetworkImage from '../TokenWithNetworkImage'
import ModalCancelUnstake from '../Modals/ModalCancelUnstake'
import ModalRequestUnstake from '../Modals/ModalRequestUnstake'
import ModalStakeAndWithdraw from '../Modals/ModalStakeAndWithdraw'
import ModalBuyKacyOnPangolin from '../Modals/ModalBuyKacyOnPangolin'
import Loading from '../Loading'

import Details from './Details'
import YourStake from './YourStake'
import KacyEarned from './KacyEarned'
import WithdrawDate from './WithdrawDate'

import tooltip from '@assets/utilities/tooltip.svg'
import infoCyanIcon from '@assets/notificationStatus/info.svg'

import * as S from './styles'

interface IStakingProps {
  pool: PoolDetails
  poolPrice: Big
  kacyPrice: Big
}

interface IPoolInfoProps {
  votingMultiplier: string
  startDate: string
  endDate: string
  kacyRewards: Big
  withdrawDelay: number
  totalStaked: Big
  hasExpired: boolean
  apr: Big
  stakingToken: string
  vestingPeriod: string
  lockPeriod: string
  tokenDecimals: string
}

interface IUserAboutPoolProps {
  currentAvailableWithdraw: Big
  lockPeriod: number
  delegateTo: string
  yourStake: Big
  withdrawable: boolean
  unstake: boolean
  kacyEarned: Big
}

const StakeCard = ({ pool, kacyPrice, poolPrice }: IStakingProps) => {
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
  const [stakeTransaction, setStakeTransaction] = React.useState<string>('')
  const [userAboutPool, setUserAboutPool] = React.useState<IUserAboutPoolProps>(
    {
      currentAvailableWithdraw: Big(-1),
      delegateTo: '',
      lockPeriod: 0,
      yourStake: Big(0),
      unstake: false,
      withdrawable: false,
      kacyEarned: Big(0)
    }
  )
  const [poolInfo, setpoolInfo] = React.useState<IPoolInfoProps>({
    votingMultiplier: '0',
    startDate: '...',
    endDate: '...',
    kacyRewards: Big(-1),
    withdrawDelay: -1,
    totalStaked: Big(-1),
    hasExpired: false,
    apr: Big(-1),
    stakingToken: '...',
    vestingPeriod: '...',
    lockPeriod: '...',
    tokenDecimals: '18'
  })

  const {
    chain,
    properties,
    stakingContract,
    symbol,
    pid,
    stakeWithVotingPower,
    stakeWithLockPeriod
  } = pool
  const networkChain = networks[chain.id]
  const stakeLogoString = properties.logo.style.width.search('rem')
  const stakeLogoWidthString = properties.logo.style.width.substring(
    0,
    stakeLogoString
  )
  const stakeLogoWidth = Number(stakeLogoWidthString) * 10
  const productCategories = [
    'Stake',
    process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji',
    stakeWithVotingPower ? 'VotingStake' : 'OtherStake'
  ]

  const [{ wallet, connecting }, connect] = useConnectWallet()
  const [{ settingChain }, setChain] = useSetChain()
  const { trackEventFunction } = useMatomoEcommerce()
  const transaction = useTransaction()
  const staking = useStaking(stakingContract, networkChain.chainId)

  function openStakeAndWithdraw(transaction: 'staking' | 'unstaking') {
    setIsModalStake(true)
    setStakeTransaction(transaction)
  }

  function handleClain() {
    staking.getReward(
      pid,
      {
        pending: `Waiting for the blockchain to claim your rewards...`,
        sucess: `Rewards claimed successfully`
      },
      {
        onSuccess: () =>
          trackEventFunction('reward-claim', `${symbol}`, 'stake-farm')
      }
    )
  }

  async function updateAllowance() {
    const erc20 = await ERC20(poolInfo.stakingToken, networkChain.rpc)

    const allowance = await erc20.allowance(
      stakingContract,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  async function handleApproveKacy() {
    const erc20 = await ERC20(poolInfo.stakingToken, networkChain.rpc, {
      transactionErrors: transaction.transactionErrors,
      txNotification: transaction.txNotification,
      wallet: wallet
    })

    await erc20.approve(
      stakingContract,
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
      stakingContract,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  const getInfoPool = React.useCallback(async () => {
    const poolInfoRes = await staking.poolInfo(pid)
    const erc20 = await ERC20(poolInfoRes.stakingToken, networkChain.rpc)
    const decimals = await erc20.decimals()

    const totalStaked = Big(poolInfoRes.depositedAmount.toString())
    const kacyRewards = Big(poolInfoRes.rewardRate.toString()).mul(Big(86400))

    const apr = handleCalcAPR({
      kacyPrice: kacyPrice,
      poolPrice: poolPrice,
      rewardRate: kacyRewards,
      totalDeposit: totalStaked
    })

    const endDate = getDate(Number(poolInfoRes.periodFinish))
    const timestampNow = new Date().getTime()
    const startDate = getDate(
      Number(poolInfoRes.periodFinish) - Number(poolInfoRes.rewardsDuration)
    )
    const periodFinish = new Date(
      Number(poolInfoRes.periodFinish) * 1000
    ).getTime()

    setpoolInfo({
      apr,
      endDate,
      startDate,
      kacyRewards,
      totalStaked,
      tokenDecimals: decimals.toString(),
      lockPeriod: poolInfoRes.lockPeriod,
      stakingToken: poolInfoRes.stakingToken,
      hasExpired: periodFinish < timestampNow,
      vestingPeriod: poolInfoRes.vestingPeriod,
      votingMultiplier: poolInfoRes.votingMultiplier.toString(),
      withdrawDelay: Number(poolInfoRes.withdrawDelay)
    })
  }, [wallet, poolPrice, kacyPrice])

  const getUserInfoAboutPool = React.useCallback(async () => {
    if (!wallet) return

    const promise = [
      staking.availableWithdraw(pid, wallet?.accounts[0].address),
      staking.lockUntil(pid, wallet?.accounts[0].address),
      staking.userInfo(pid, wallet?.accounts[0].address),
      staking.balance(pid, wallet?.accounts[0].address),
      staking.withdrawable(pid, wallet?.accounts[0].address),
      staking.unstaking(pid, wallet?.accounts[0].address),
      staking.earned(pid, wallet?.accounts[0].address)
    ]

    const result = await Promise.all(promise)

    setUserAboutPool({
      currentAvailableWithdraw: result[0],
      lockPeriod: result[1],
      delegateTo: result[2]?.delegatee ?? '',
      yourStake: Big(result[3]),
      withdrawable: result[4],
      unstake: result[5],
      kacyEarned: Big(result[6] ?? 0)
    })
  }, [wallet])

  React.useEffect(() => {
    getInfoPool()
    const interval = setInterval(getInfoPool, 30000)

    return () => clearInterval(interval)
  }, [getInfoPool])

  React.useEffect(() => {
    if (poolInfo.apr.lt(0)) return
    setIsLoading(false)
  }, [poolInfo])

  React.useEffect(() => {
    getUserInfoAboutPool()
  }, [wallet])

  return (
    <>
      <div>
        <S.BorderGradient stakeWithVotingPower={!stakeWithVotingPower}>
          {isLoading && (
            <div
              style={{
                height: `${wallet?.accounts[0].address ? '56.6rem' : '28rem'}`,
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
                  {poolInfo.apr.lte(Big(0)) || poolInfo.hasExpired
                    ? 0
                    : BNtoDecimal(poolInfo.apr, 0)}
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
                    {poolInfo.votingMultiplier || '...'}
                    <span>/$KACY</span>
                  </p>
                </S.InfoPool>
                <S.InfoPool>
                  <h3>Withdraw delay</h3>
                  <S.Days>
                    <p>
                      {poolInfo.withdrawDelay === -1
                        ? '...'
                        : poolInfo.withdrawDelay / 60 / 60 / 24 < 1
                        ? poolInfo.withdrawDelay / 60
                        : poolInfo.withdrawDelay / 60 / 60 / 24}
                      <span>
                        {poolInfo.withdrawDelay / 60 / 60 / 24 < 1
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
                poolInfo={poolInfo}
                poolPrice={poolPrice}
                kacyPrice={kacyPrice}
                userAboutPool={userAboutPool}
                stakeWithVotingPower={stakeWithVotingPower}
                stakeWithLockPeriod={stakeWithLockPeriod}
              />
              <S.ButtonContainer stakeWithVotingPower={!stakeWithVotingPower}>
                {wallet?.accounts[0].address ? (
                  <>
                    {!stakeWithLockPeriod && (
                      <S.Claim>
                        <KacyEarned
                          kacyEarned={userAboutPool.kacyEarned}
                          kacyPrice={kacyPrice}
                        />
                        <Button
                          type="button"
                          text="Claim"
                          size="claim"
                          backgroundSecondary
                          disabledNoEvent={
                            userAboutPool.kacyEarned?.lte(Big(0)) ||
                            networkChain.chainId !==
                              Number(wallet?.chains[0].id)
                          }
                          onClick={() => handleClain()}
                        />
                      </S.Claim>
                    )}
                    <S.StakeContainer>
                      {userAboutPool.unstake ? (
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
                            stakingAddress={stakingContract}
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
                              image="/assets/icons/rebalance.svg"
                              disabledNoEvent={settingChain}
                              onClick={() =>
                                setChain({
                                  chainId: `0x${networkChain.chainId.toString(
                                    16
                                  )}`
                                })
                              }
                            />
                          ) : stakeWithLockPeriod ? null : poolInfo.withdrawDelay !==
                              0 && userAboutPool.withdrawable ? (
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
                              onClick={() => openStakeAndWithdraw('staking')}
                            />
                          )}
                          {userAboutPool.withdrawable ? (
                            <Button
                              type="button"
                              text="Withdraw"
                              size="huge"
                              backgroundBlack
                              disabledNoEvent={
                                userAboutPool.yourStake.lte(0) ||
                                (stakeWithLockPeriod &&
                                  userAboutPool.currentAvailableWithdraw.lte(
                                    0
                                  )) ||
                                networkChain.chainId !==
                                  Number(wallet?.chains[0].id)
                              }
                              fullWidth
                              onClick={() => openStakeAndWithdraw('unstaking')}
                            />
                          ) : (
                            <Button
                              type="button"
                              text="Request withdraw"
                              size="huge"
                              backgroundBlack
                              disabledNoEvent={
                                userAboutPool.yourStake.lte(0) ||
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
                    symbol={symbol}
                    chainId={chain.id}
                    poolInfo={poolInfo}
                    poolPrice={poolPrice}
                    kacyPrice={kacyPrice}
                    link={properties.link ?? ''}
                    setIsOpenModal={setIsOpenModalPangolin}
                  />
                )}
              </S.ButtonContainer>
            </S.InfosStaking>
          </S.StakeCard>
        </S.BorderGradient>
      </div>

      {isModalStake && (
        <ModalStakeAndWithdraw
          pool={pool}
          setModalOpen={setIsModalStake}
          decimals={poolInfo.tokenDecimals}
          stakingToken={poolInfo.stakingToken}
          productCategories={productCategories}
          stakeTransaction={stakeTransaction}
          setStakeTransaction={setStakeTransaction}
          amountApproved={amountApproveKacyStaking}
          handleApprove={handleApproveKacy}
          updateAllowance={updateAllowance}
        />
      )}
      {isModalCancelUnstake && (
        <ModalCancelUnstake
          pool={pool}
          setModalOpen={setIsModalCancelUnstake}
          stakingToken={poolInfo.stakingToken}
          openStakeAndWithdraw={openStakeAndWithdraw}
          isStaking={
            poolInfo.withdrawDelay === -1 && userAboutPool.withdrawable
          }
        />
      )}
      {isModalRequestUnstake && (
        <ModalRequestUnstake
          pool={pool}
          modalOpen={isModalRequestUnstake}
          setModalOpen={setIsModalRequestUnstake}
          votingMultiplier={poolInfo.votingMultiplier}
          yourStake={userAboutPool.yourStake}
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
