import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { PoolDetails } from '@/constants/pools'
import { networks } from '@/constants/tokenAddresses'

import { BNtoDecimal } from '@/utils/numerals'

import { ERC20 } from '@/hooks/useERC20'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import useStakingInfo from '@/hooks/useStakingInfo'

import Button from '../Button'
import TokenWithNetworkImage from '../TokenWithNetworkImage'
import ModalCancelUnstake from '../Modals/ModalCancelUnstake'
import ModalRequestUnstake from '../Modals/ModalRequestUnstake'
import ModalBuyKacyOnPangolin from '../Modals/ModalBuyKacyOnPangolin'
import ModalStakeAndWithdraw, {
  typeTransaction
} from '../Modals/ModalStakeAndWithdraw'

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
  const [stakeTransaction, setStakeTransaction] =
    React.useState<typeTransaction>(typeTransaction.NONE)
  const [userAboutPool, setUserAboutPool] = React.useState<IUserAboutPoolProps>(
    {
      currentAvailableWithdraw: Big(-1),
      delegateTo: '',
      lockPeriod: 0,
      yourStake: Big(-1),
      unstake: false,
      withdrawable: false,
      kacyEarned: Big(-1)
    }
  )
  const [poolInfo, setpoolInfo] = React.useState<IPoolInfoProps>({
    votingMultiplier: '-1',
    startDate: '',
    endDate: '',
    kacyRewards: Big(-1),
    withdrawDelay: -1,
    totalStaked: Big(-1),
    hasExpired: false,
    apr: Big(-1),
    stakingToken: '',
    vestingPeriod: '',
    lockPeriod: '',
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

  const stakingInfo = useStakingInfo(pool.chain.id, pool.pid)

  function openStakeAndWithdraw(transaction: typeTransaction) {
    setIsModalStake(true)
    setStakeTransaction(transaction)
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
    const allowance = await stakingInfo.handleApprove(
      poolInfo.stakingToken,
      pool?.symbol ?? ''
    )

    setAmountApproveKacyStaking(Big(allowance))
  }

  const getInfoPool = React.useCallback(async () => {
    if (poolPrice.lte(0) && poolPrice.lte(0)) return

    const poolInfo = await stakingInfo.getPoolInfo(
      pid,
      Big(kacyPrice),
      poolPrice
    )
    setpoolInfo(poolInfo)
  }, [wallet, poolPrice, kacyPrice])

  const userInfoAboutPool = React.useCallback(async () => {
    if (!wallet) return

    const userInfo = await stakingInfo.getUserInfoAboutPool(
      pid,
      wallet.accounts[0].address
    )
    setUserAboutPool(userInfo)
  }, [wallet])

  React.useEffect(() => {
    getInfoPool()
    const interval = setInterval(getInfoPool, 30000)

    return () => clearInterval(interval)
  }, [getInfoPool])

  React.useEffect(() => {
    userInfoAboutPool()
  }, [wallet])

  return (
    <>
      <div>
        <S.BorderGradient stakeWithVotingPower={!stakeWithVotingPower}>
          <S.StakeCard>
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
                {poolInfo.apr.lte(Big(0)) ? (
                  <S.LoadingAnimation width={5} height={2.4} />
                ) : (
                  <S.Percentage>
                    {BNtoDecimal(
                      poolInfo.hasExpired ? Big(0) : poolInfo.apr,
                      0
                    )}
                    %
                  </S.Percentage>
                )}
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
                  {Big(poolInfo.votingMultiplier).lte(0) ? (
                    <S.LoadingAnimation width={6} />
                  ) : (
                    <p>
                      {poolInfo.votingMultiplier}
                      <span>/$KACY</span>
                    </p>
                  )}
                </S.InfoPool>
                <S.InfoPool>
                  <h3>Withdraw delay</h3>
                  <S.Days>
                    {Big(poolInfo.withdrawDelay).lt(0) ? (
                      <S.LoadingAnimation width={8} />
                    ) : (
                      <>
                        <p>
                          {poolInfo.withdrawDelay / 60 / 60 / 24 < 1
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
                      </>
                    )}
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
                          background="secondary"
                          disabledNoEvent={
                            userAboutPool.kacyEarned?.lte(Big(0)) ||
                            networkChain.chainId !==
                              Number(wallet?.chains[0].id)
                          }
                          onClick={() => stakingInfo.handleClain(symbol)}
                        />
                      </S.Claim>
                    )}
                    <S.StakeContainer>
                      {userAboutPool.unstake &&
                      networkChain.chainId === Number(wallet?.chains[0].id) ? (
                        <>
                          <Button
                            type="button"
                            text="Cancel withdraw"
                            size="huge"
                            background="secondary"
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
                              className="chnageChainButton"
                              text={`Connect to ${networkChain.chainName}`}
                              size="huge"
                              background="secondary"
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
                              background="secondary"
                              fullWidth
                              onClick={() => setIsModalCancelUnstake(true)}
                            />
                          ) : (
                            <Button
                              type="button"
                              text={`Stake ${symbol}`}
                              size="huge"
                              background="secondary"
                              fullWidth
                              onClick={() =>
                                openStakeAndWithdraw(typeTransaction.STAKING)
                              }
                            />
                          )}
                          {userAboutPool.withdrawable ? (
                            <Button
                              type="button"
                              text="Withdraw"
                              size="huge"
                              background="black"
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
                              onClick={() =>
                                openStakeAndWithdraw(typeTransaction.UNSTAKING)
                              }
                            />
                          ) : (
                            <Button
                              type="button"
                              text="Request withdraw"
                              size="huge"
                              background="black"
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
                    background="secondary"
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
          pool={{
            pid: pool.pid,
            type: pool.type,
            symbol: pool.symbol,
            chainId: pool.chain.id,
            properties: pool.properties,
            stakingContract: pool.stakingContract
          }}
          setModalOpen={setIsModalStake}
          decimals={poolInfo.tokenDecimals}
          stakingToken={poolInfo.stakingToken}
          productCategories={productCategories}
          stakeTransaction={stakeTransaction}
          setStakeTransaction={setStakeTransaction}
          amountApproved={amountApproveKacyStaking}
          handleApprove={handleApproveKacy}
          updateAllowance={updateAllowance}
          getUserInfoAboutPool={userInfoAboutPool}
        />
      )}
      {isModalCancelUnstake && (
        <ModalCancelUnstake
          pool={pool}
          setModalOpen={setIsModalCancelUnstake}
          stakingContract={stakingContract}
          openStakeAndWithdraw={openStakeAndWithdraw}
          getUserInfoAboutPool={userInfoAboutPool}
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
          getUserInfoAboutPool={userInfoAboutPool}
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
