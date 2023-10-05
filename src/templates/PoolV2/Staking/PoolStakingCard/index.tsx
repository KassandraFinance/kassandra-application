import Big from 'big.js'
import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

import { PoolType } from '@/constants/pools'
import { networks } from '@/constants/tokenAddresses'

import { BNtoDecimal } from '@/utils/numerals'
import { getBalanceToken } from '@/utils/poolUtils'

import useStakingInfo from '@/hooks/useStakingInfo'
import { ERC20 } from '@/hooks/useERC20'

import Button from '@/components/Button'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'
import ModalStakeAndWithdraw, {
  typeTransaction
} from '@/components/Modals/ModalStakeAndWithdraw'

import * as S from './styles'

type IPoolInfoProps = {
  id?: string
  chainId: number
  poolId?: number
  symbol?: string
  address?: string
  logo?: string
  chainLogo?: string
  decimals?: number
}
interface IPoolStakingCardProps {
  pool: IPoolInfoProps
  kacyPrice: Big
  poolPrice: Big
}

const PoolStakingCard = ({
  pool,
  kacyPrice,
  poolPrice
}: IPoolStakingCardProps) => {
  const [isOpenModalStake, setIsOpenModalStake] = React.useState(false)
  const [stakeTransaction, setStakeTransaction] =
    React.useState<typeTransaction>(typeTransaction.NONE)
  const [amountApproveStaking, setAmountApproveStaking] = React.useState<Big>(
    Big(0)
  )
  const [userBalance, setUserBalance] = React.useState<Big>(Big(0))
  const [userAboutPool, setUserAboutPool] = React.useState({
    currentAvailableWithdraw: Big(0),
    delegateTo: '',
    lockPeriod: 0,
    yourStake: Big(0),
    unstake: false,
    withdrawable: false,
    kacyEarned: Big(0)
  })
  const [poolInfo, setpoolInfo] = React.useState({
    votingMultiplier: '0',
    startDate: '',
    endDate: '',
    kacyRewards: Big(0),
    withdrawDelay: 0,
    totalStaked: Big(0),
    hasExpired: false,
    apr: Big(0),
    stakingToken: '',
    vestingPeriod: '',
    lockPeriod: '',
    tokenDecimals: '18'
  })

  const [{ wallet }] = useConnectWallet()
  const networkChain = networks[pool.chainId]
  const { handleClain, handleApprove, getPoolInfo, getUserInfoAboutPool } =
    useStakingInfo(pool.chainId, pool.poolId)

  const productCategories = ['Stake', networkChain.chainName, 'OtherStake']

  function openStakeAndWithdraw(transaction: typeTransaction) {
    setIsOpenModalStake(true)
    setStakeTransaction(transaction)
  }

  async function updateAllowance() {
    const erc20 = await ERC20(poolInfo.stakingToken, networkChain.rpc)

    const allowance = await erc20.allowance(
      networkChain.stakingContract ?? ethers.ZeroAddress,
      wallet?.accounts[0].address || ''
    )

    setAmountApproveStaking(Big(allowance))
  }

  async function handleApproveStaking() {
    const allowance = await handleApprove(
      poolInfo.stakingToken,
      pool?.symbol ?? ''
    )

    setAmountApproveStaking(Big(allowance))
  }

  const getInfoPool = React.useCallback(async () => {
    if (!pool?.poolId) return
    if (poolPrice.lte(0) && Big(kacyPrice).lte(0)) return

    const poolInfo = await getPoolInfo(pool?.poolId, Big(kacyPrice), poolPrice)

    setpoolInfo(poolInfo)
  }, [wallet, pool, kacyPrice])

  const userInfoAboutPool = React.useCallback(async () => {
    if (!pool?.poolId) return
    if (!wallet) return

    const userInfo = await getUserInfoAboutPool(
      pool?.poolId,
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

  React.useEffect(() => {
    if (pool?.id?.length === 0 || !wallet) {
      return setUserBalance(Big(0))
    }

    ;(async () => {
      const balance = await getBalanceToken(
        pool?.address || '',
        wallet.accounts[0].address,
        pool.chainId
      )
      setUserBalance(balance)
    })()
  }, [wallet, pool])

  return (
    <S.PoolStakingCard>
      <S.StakingCardHeaderWrapper>
        <TokenWithNetworkImage
          tokenImage={{
            url: pool?.logo ?? '',
            height: 38,
            width: 38,
            withoutBorder: false
          }}
          networkImage={{
            url: pool.chainLogo ?? '',
            height: 18,
            width: 18
          }}
          blockies={{
            size: 6,
            scale: 6,
            seedName: 'pool'
          }}
        />

        <S.AprWrapper>
          <span>APR</span>
          <p>{BNtoDecimal(poolInfo.hasExpired ? Big(0) : poolInfo.apr, 0)}%</p>
        </S.AprWrapper>
      </S.StakingCardHeaderWrapper>

      <S.StakingCardBodyWrapper>
        <S.StakingUserDataListCard>
          <S.StakingUserData>
            <p>YOUR BALANCE</p>
            <span>
              {BNtoDecimal(
                userBalance
                  .mul(poolPrice)
                  .div(Big(10).pow(pool?.decimals ?? 18)),
                2,
                2,
                2
              )}{' '}
              <strong>USD</strong>
            </span>
          </S.StakingUserData>
          <S.StakingUserData>
            <p>STAKED</p>
            <span>
              {BNtoDecimal(
                userAboutPool.yourStake.mul(poolPrice).div(Big(10).pow(18)),
                2,
                2,
                2
              )}
              <strong>USD</strong>
            </span>
          </S.StakingUserData>
        </S.StakingUserDataListCard>
        <S.StakingUserDataListCard>
          <S.StakingUserData>
            <p>KACY Reward</p>
            <span>
              {BNtoDecimal(
                userAboutPool.kacyEarned.div(Big(10).pow(18)),
                18,
                2
              )}
            </span>
          </S.StakingUserData>
          <S.StakingUserData>
            <p />
            <span>
              $
              {BNtoDecimal(
                userAboutPool.kacyEarned.mul(kacyPrice).div(Big(10).pow(18)),
                6,
                2,
                2
              )}{' '}
              <strong>USD</strong>
            </span>
          </S.StakingUserData>
        </S.StakingUserDataListCard>

        <Button
          background="secondary"
          text="Claim"
          onClick={() => handleClain(pool?.symbol ?? '')}
          disabledNoEvent={
            userAboutPool.kacyEarned?.lte(Big(0)) ||
            networkChain.chainId !== Number(wallet?.chains[0].id)
          }
        />

        <S.Line />

        <S.ButtonsWrapper>
          <Button
            background="transparent"
            text="Unstake"
            fullWidth
            onClick={() => openStakeAndWithdraw(typeTransaction.UNSTAKING)}
            disabledNoEvent={
              userAboutPool.yourStake.lte(0) ||
              networkChain.chainId !== Number(wallet?.chains[0].id)
            }
          />
          <Button
            background="secondary"
            text="stake"
            fullWidth
            onClick={() => openStakeAndWithdraw(typeTransaction.STAKING)}
            disabledNoEvent={
              userBalance.lte(0) ||
              networkChain.chainId !== Number(wallet?.chains[0].id)
            }
          />
        </S.ButtonsWrapper>
      </S.StakingCardBodyWrapper>

      {isOpenModalStake && (
        <ModalStakeAndWithdraw
          pool={{
            pid: pool.poolId ?? 99,
            chainId: pool.chainId,
            symbol: pool?.symbol ?? '',
            stakingContract: networkChain.stakingContract ?? ethers.ZeroAddress,
            type: PoolType.FARM
          }}
          setModalOpen={setIsOpenModalStake}
          decimals={pool?.decimals?.toString() ?? '18'}
          stakingToken={poolInfo.stakingToken}
          productCategories={productCategories}
          stakeTransaction={stakeTransaction}
          setStakeTransaction={setStakeTransaction}
          amountApproved={amountApproveStaking}
          handleApprove={handleApproveStaking}
          updateAllowance={updateAllowance}
          getUserInfoAboutPool={userInfoAboutPool}
        />
      )}
    </S.PoolStakingCard>
  )
}

export default PoolStakingCard
