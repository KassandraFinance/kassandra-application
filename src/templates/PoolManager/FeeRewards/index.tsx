import React from 'react'
import router from 'next/router'
import Big from 'big.js'
import { ZeroAddress } from 'ethers'
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

const legend: Record<string, string> = {
  feesJoinManager: 'DEPOSIT FEE',
  feesAumManager: 'MANAGED FEE'
}

const FeeRewards = () => {
  const [feesData, setFeesData] = React.useState<Record<string, FeesData>>({})

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const [{ connectedChain }] = useSetChain()
  const { data } = useFees({ poolId })
  const { setJoinFees } = useManagePoolController(
    data?.controller || ZeroAddress,
    networks[data?.chain_id ?? 137].rpc
  )

  const pool = data ?? undefined

  const currentBrokerCommision = Big(pool?.fee_join_broker ?? '0').mul(100)
  const currentManagerShare = Big(pool?.fee_join_manager ?? '0').mul(100)
  const currentDepositFee = Big(pool?.fee_join_broker ?? '0')
    .add(pool?.fee_join_manager ?? '0')
    .mul(100)

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

    await setJoinFees(
      {
        feesToManager: feeBrokers.toString(),
        feesToReferral: feeManager.toString()
      },
      {
        sucess: 'Updated fee!'
      }
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

  function handleClickToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name

    let feeData
    if (inputName === 'depositFee' && feesData[inputName].isChecked) {
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
    } else if (inputName === 'depositFee' && !feesData[inputName].isChecked) {
      feeData = {
        depositFee: {
          isChecked: true,
          feeRate: currentDepositFee.toFixed()
        },
        refferalFee: {
          isChecked: true,
          brokerCommision: parseFloat(currentBrokerCommision.toFixed()),
          managerShare: parseFloat(currentManagerShare.toFixed())
        }
      }
    } else if (inputName === 'refferalFee' && !feesData[inputName].isChecked) {
      feeData = {
        ...feesData,
        refferalFee: {
          isChecked: true,
          brokerCommision: parseFloat(currentBrokerCommision.toFixed()),
          managerShare: parseFloat(currentManagerShare.toFixed())
        }
      }
    } else if (inputName === 'refferalFee' && feesData[inputName].isChecked) {
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

  function handleRefferalCommission(
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

  React.useEffect(() => {
    if (!pool || feesData?.depositFee) return

    const feeData = {
      depositFee: {
        isChecked: currentDepositFee.gt(0),
        feeRate: currentDepositFee.toFixed()
      },
      refferalFee: {
        isChecked: currentBrokerCommision.gt(0) || currentManagerShare.gt(0),
        brokerCommision: parseFloat(currentBrokerCommision.toFixed()),
        managerShare: parseFloat(currentManagerShare.toFixed())
      }
    }

    setFeesData(feeData)
  }, [pool])

  return pool ? (
    <S.FeeRewards>
      <S.FeesContainer>
        <AvailableRewards pool={pool} />
        <FeeBreakDown pool={pool} />
      </S.FeesContainer>

      <DepositFee
        feesData={feesData}
        handleFeeChange={handleFeeChange}
        handleClickToggle={handleClickToggle}
        handleClickUpdateFee={handleClickUpdateFee}
        handleRefferalCommission={handleRefferalCommission}
        disabledNoEvent={
          (Big(
            feesData?.depositFee?.feeRate ? feesData?.depositFee?.feeRate : '0'
          ).eq(currentDepositFee) &&
            Big(feesData?.refferalFee?.managerShare ?? 0).eq(
              currentManagerShare
            ) &&
            Big(feesData?.refferalFee?.brokerCommision ?? 0).eq(
              currentBrokerCommision
            )) ||
          Number(connectedChain?.id ?? '0x89') !== pool?.chain_id
        }
      />

      <S.FeesChartContainer>
        <S.TitleWrapper>
          <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
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
