import Big from 'big.js'
import { ethers } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'
import { getDate } from '@/utils/date'
import { handleCalcAPR } from '@/components/StakeCard/utils'

import { ERC20 } from './useERC20'
import useStaking from './useStaking'
import useTransaction from './useTransaction'
import useMatomoEcommerce from './useMatomoEcommerce'

const useStakingInfo = (chaindId: number, pid?: number) => {
  const networkChain = networks[chaindId]

  const transaction = useTransaction()
  const [{ wallet }] = useConnectWallet()
  const { trackEventFunction } = useMatomoEcommerce()
  const staking = useStaking(
    networkChain?.stakingContract ?? ethers.ZeroAddress,
    networkChain?.chainId ?? 137
  )

  function handleClain(poolSymbol: string) {
    if (!pid) return

    staking.getReward(
      pid,
      {
        pending: `Waiting for the blockchain to claim your rewards...`,
        sucess: `Rewards claimed successfully`
      },
      {
        onSuccess: () =>
          trackEventFunction('reward-claim', `${poolSymbol}`, 'stake-farm')
      }
    )
  }

  async function handleApprove(stakingToken: string, poolSymbol: string) {
    const erc20 = await ERC20(stakingToken, networkChain.rpc, {
      transactionErrors: transaction.transactionErrors,
      txNotification: transaction.txNotification,
      wallet: wallet
    })

    await erc20.approve(
      networkChain.stakingContract ?? '',
      {
        pending: `Waiting approval of ${poolSymbol}...`,
        sucess: `Approval of ${poolSymbol} confirmed`
      },
      {
        onSuccess: () =>
          trackEventFunction('approve-contract', `${poolSymbol}`, 'stake-farm')
      }
    )

    const allowance = await erc20.allowance(
      networkChain.stakingContract ?? '',
      wallet?.accounts[0].address || ''
    )

    return Big(allowance)
  }

  async function getPoolInfo(pid: number, kacyPrice: Big, poolPrice: Big) {
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

    return {
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
    }
  }

  async function getUserInfoAboutPool(pid: number, walletAddress: string) {
    const promise = [
      staking.availableWithdraw(pid, walletAddress),
      staking.lockUntil(pid, walletAddress),
      staking.userInfo(pid, walletAddress),
      staking.balance(pid, walletAddress),
      staking.withdrawable(pid, walletAddress),
      staking.unstaking(pid, walletAddress),
      staking.earned(pid, walletAddress)
    ]

    const result = await Promise.all(promise)

    return {
      currentAvailableWithdraw: result[0],
      lockPeriod: result[1],
      delegateTo: result[2]?.delegatee ?? '',
      yourStake: Big(result[3]),
      withdrawable: result[4],
      unstake: result[5],
      kacyEarned: Big(result[6] ?? 0)
    }
  }

  return {
    handleClain,
    handleApprove,
    getPoolInfo,
    getUserInfoAboutPool
  }
}

export default useStakingInfo
