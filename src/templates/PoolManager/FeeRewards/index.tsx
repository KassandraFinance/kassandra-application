import React from 'react'
import router from 'next/router'
import Big from 'big.js'
import { ZeroAddress, ethers } from 'ethers'
import { useSetChain } from '@web3-onboard/react'

import { networks } from '@/constants/tokenAddresses'

import { useFees } from '@/hooks/query/useFees'
import useManagePoolController from '@/hooks/useManagePoolController'

import TitleSection from '@/components/TitleSection'
import FeesChart, { FeeGraph } from './FeesChart'
import AvailableRewards from './AvailableRewards'
import DepositFee from '@/components/DepositFee'
import { ToastError } from '@/components/Toastify/toast'

import Loading from '@ui/Loading'
import FeeBreakDown from './FeeBreakDown'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

type Fees = {
  type: string
  period: number
  volume_usd: string
  volume_broker_usd?: string | null
  timestamp: number
}

export type Pool = {
  chain_id: number
  price_usd: string
  symbol: string
  controller: string
  fee_join_manager: string
  fee_join_broker: string
  total_fees_join_manager_usd: string
  total_fees_join_broker_usd: string
  total_fees_aum_manager_usd: string
  total_fees_aum_kassandra_usd: string
  fee_aum: string
  fee_aum_kassandra: string
  last_harvest?: string | null
  manager: {
    id: string
  }
  fees: {
    type: string
    period: number
    volume_usd: string
    volume_broker_usd?: string | null
    timestamp: number
  }[]
  lasCollectedAum: {
    timestamp: number
  }[]
}

type FeesData = {
  isChecked: boolean
  feeRate?: string
  brokerCommision?: number
  managerShare?: number
}

type CurrentFee = {
  rate: Big
  manager: Big
  referral: Big
}

const legend: Record<string, string> = {
  feesJoinManager: 'DEPOSIT FEE',
  feesAumManager: 'MANAGED FEE'
}

const FeeRewards = () => {
  const [feesData, setFeesData] = React.useState<Record<string, FeesData>>({})
  const [currentFees, setCurrentFees] = React.useState<CurrentFee>({
    rate: Big(0),
    manager: Big(0),
    referral: Big(0)
  })

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const [{ connectedChain }] = useSetChain()
  const { data } = useFees({ poolId })

  const pool = data ?? undefined

  const { setJoinFees, getJoinFees } = useManagePoolController(
    pool?.controller || ZeroAddress,
    networks[pool?.chain_id ?? 137].rpc
  )

  function createIntervalTime(months = 12): Array<number> {
    const date = new Date()
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()
    const periods = []
    for (let index = 0; index < months; index++) {
      const dateTime = Date.UTC(year, month, 1, 0, 0, 0, 0)
      periods.push(dateTime / 1000)
      month = month === 1 ? months : month - 1
      year = month === months ? year - 1 : year
    }
    return periods
  }

  async function handleClickUpdateFee() {
    if (
      feesData?.refferalFee?.brokerCommision === undefined ||
      feesData?.refferalFee?.managerShare === undefined
    ) {
      return ToastError('Incorrect values')
    }

    const feeBrokers = Big(feesData.refferalFee.brokerCommision.toString())
      .div(100)
      .mul(Big(10).pow(18))
      .toFixed()

    const feeManager = Big(feesData.refferalFee.managerShare.toString())
      .div(100)
      .mul(Big(10).pow(18))
      .toFixed()

    async function handleSuccess() {
      await handleGetCurrentFee()
    }

    await setJoinFees(
      {
        feesToManager: feeBrokers.toString(),
        feesToReferral: feeManager.toString()
      },
      {
        sucess: 'Updated fee!'
      },
      handleSuccess
    )
  }

  function addTotalOnFees(fees: Fees[]): FeeGraph {
    const periods = createIntervalTime()
    const size = periods.length
    const aggFees: FeeGraph = new Array(periods.length)
    for (let index = 0; index < size; index++) {
      aggFees[index] = {
        feesAumManager: '0',
        feesJoinManager: '0',
        totalFeesToManager: '0',
        timestamp: periods[index]
      }
    }
    for (const fee of fees) {
      const index = periods.findIndex(period => fee.timestamp > period)
      const feeBroker = Big(fee.volume_broker_usd ?? 0)
      if (index !== -1) {
        let feesToManager = Big(fee.volume_usd).sub(feeBroker)
        if (fee.type === 'aum') {
          feesToManager = Big(fee.volume_usd)
          const feeManager = aggFees[index].feesAumManager
          aggFees[index].feesAumManager = Big(feeManager)
            .add(feesToManager)
            .toFixed()
        } else {
          const feeManager = aggFees[index].feesJoinManager
          aggFees[index].feesJoinManager = Big(feeManager)
            .add(feesToManager)
            .toFixed()
        }
        aggFees[index].totalFeesToManager = Big(
          aggFees[index].totalFeesToManager
        )
          .add(feesToManager)
          .toFixed()
      }
    }

    for (let index = 0; index < size; index++) {
      const firstAgg = aggFees.at(-1)
      if (
        firstAgg?.feesAumManager === '0' &&
        firstAgg?.feesJoinManager === '0'
      ) {
        aggFees.pop()
      }
    }

    return aggFees
  }

  function handleToggleClick(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = feesData[inputName].isChecked

    let feeData
    switch (inputName) {
      case 'depositFee':
        if (isChecked) {
          feeData = {
            depositFee: {
              isChecked: false,
              feeRate: '0'
            },
            refferalFee: {
              isChecked: false,
              brokerCommision: 0,
              managerShare: 0
            }
          }
        } else {
          feeData = {
            depositFee: {
              isChecked: true,
              feeRate: currentFees.rate.toFixed()
            },
            refferalFee: {
              isChecked: true,
              brokerCommision: parseFloat(currentFees.manager.toFixed()),
              managerShare: parseFloat(currentFees.referral.toFixed())
            }
          }
        }
        break

      case 'refferalFee':
        if (isChecked) {
          feeData = {
            ...feesData,
            refferalFee: {
              isChecked: false,
              brokerCommision: 0,
              managerShare: 0
            }
          }
        } else {
          feeData = {
            ...feesData,
            refferalFee: {
              isChecked: true,
              brokerCommision: parseFloat(currentFees.manager.toFixed()),
              managerShare: parseFloat(currentFees.referral.toFixed())
            }
          }
        }
        break
      default:
        feeData = {
          ...feesData,
          [inputName]: {
            ...feesData[inputName],
            isChecked: !feesData[inputName].isChecked
          }
        }
    }
    setFeesData(feeData)
  }

  function handleFeeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    let inputValue = event.target.value

    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/^0+/, '')

      const [value, decimals] = inputValue.split('.')
      if (decimals && decimals.length >= 1) {
        inputValue = `${value ? value : '0'}.${decimals.slice(0, 1)}`
      }

      if (Number(inputValue) > 100) inputValue = '100'
    }

    let feeData
    if (inputName === 'depositFee' && feesData.refferalFee.isChecked) {
      feeData = {
        depositFee: {
          ...feesData[inputName],
          feeRate: inputValue
        },
        refferalFee: {
          ...feesData.refferalFee,
          brokerCommision: Number(inputValue) / 2,
          managerShare: Number(inputValue) / 2
        }
      }
    } else {
      feeData = {
        ...feesData,
        [inputName]: {
          ...feesData[inputName],
          feeRate: inputValue
        }
      }
    }

    setFeesData(feeData)
  }

  function handleReferralCommission(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = event.target.name
    const value = parseFloat(event.target.value ? event.target.value : '0')
    const depositFee = feesData?.depositFee?.feeRate ?? '0'

    let feeData
    if (name === 'brokerCommision') {
      feeData = {
        ...feesData,
        refferalFee: {
          ...feesData.refferalFee,
          [name]: value,
          managerShare: parseFloat((parseFloat(depositFee) - value).toFixed(2))
        }
      }
    } else {
      feeData = {
        ...feesData,
        refferalFee: {
          ...feesData.refferalFee,
          [name]: value,
          brokerCommision: parseFloat(
            (parseFloat(depositFee) - value).toFixed(2)
          )
        }
      }
    }

    setFeesData(feeData)
  }

  async function handleGetCurrentFee() {
    try {
      const fees = await getJoinFees()

      const feeToManager = Big(ethers.formatEther(fees.feesToManager)).mul(100)
      const feeToReferral = Big(ethers.formatEther(fees.feesToReferral)).mul(
        100
      )
      const feeToRate = feeToManager.add(feeToReferral)

      setCurrentFees({
        manager: feeToManager,
        referral: feeToReferral,
        rate: feeToRate
      })

      if (!feesData?.depositFee) {
        setFeesData({
          depositFee: {
            isChecked: feeToRate.gt(0),
            feeRate: feeToRate.toFixed()
          },
          refferalFee: {
            isChecked: feeToManager.gt(0) || feeToReferral.gt(0),
            brokerCommision: parseFloat(feeToManager.toFixed()),
            managerShare: parseFloat(feeToReferral.toFixed())
          }
        })
      }
    } catch (error) {
      setCurrentFees({
        rate: Big(0),
        manager: Big(0),
        referral: Big(0)
      })
    }
  }

  React.useEffect(() => {
    if (!pool) return

    handleGetCurrentFee()
  }, [getJoinFees])

  return pool ? (
    <S.FeeRewards>
      <S.FeesContainer>
        <AvailableRewards pool={pool} />
        <FeeBreakDown
          pool={{
            ...pool,
            fee_join_broker: currentFees.manager.div(100).toFixed(),
            fee_join_manager: currentFees.referral.div(100).toFixed()
          }}
        />
      </S.FeesContainer>

      <DepositFee
        feesData={feesData}
        handleFeeChange={handleFeeChange}
        handleToggleClick={handleToggleClick}
        handleClickUpdateFee={handleClickUpdateFee}
        handleReferralCommission={handleReferralCommission}
        changeFeeButtonDisabled={
          (Big(
            feesData?.depositFee?.feeRate ? feesData?.depositFee?.feeRate : '0'
          ).eq(currentFees.rate) &&
            Big(feesData?.refferalFee?.managerShare ?? 0).eq(
              currentFees.referral
            ) &&
            Big(feesData?.refferalFee?.brokerCommision ?? 0).eq(
              currentFees.manager
            )) ||
          Number(connectedChain?.id ?? '0x89') !== pool?.chain_id
        }
      />

      <S.FeesChartContainer>
        <S.TitleWrapper>
          <TitleSection title="Rewards History" image={poolsAssetsIcon} />
        </S.TitleWrapper>

        <FeesChart
          fees={addTotalOnFees(pool.fees)}
          title="Rewards History"
          legend={legend}
        />
      </S.FeesChartContainer>
    </S.FeeRewards>
  ) : (
    <Loading marginTop={10} />
  )
}

export default FeeRewards
