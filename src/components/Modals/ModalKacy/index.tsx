import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import { ERC20 } from '@/hooks/useERC20'
import useStakingContract from '@/hooks/useStaking'
import { poolsKacy, allPools } from '@/constants/pools'
import { Staking, networks } from '@/constants/tokenAddresses'

import { abbreviateNumber } from '@/utils/abbreviateNumber'

import Kacy from './Kacy'
import ModalBuyKacyOnPangolin from '../ModalBuyKacyOnPangolin'
import Button from '../../Button'
import ModalBridge from '../ModalBridge'

import kacyIcon from '@assets/logos/kacy-96.svg'

import * as S from './styles'

interface IKacyMarketDataProps {
  price: number
  marketCap: number
  supply: number
  kacyPercentage: number
}

const KACY_MULTICHAIN = [
  {
    chain: 43114
  },
  {
    chain: 137
  }
]

const ModalKacy = () => {
  const [isModalKacy, setIsModalKacy] = React.useState(false)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [isModalBridge, setIsModalBridge] = React.useState(false)
  const [kacyMarketData, setKacyMarketData] =
    React.useState<IKacyMarketDataProps>({
      price: 0,
      marketCap: 0,
      supply: 0,
      kacyPercentage: 0
    })
  const [kacyStaked, setKacyStaked] = React.useState<Big>(Big(0))
  const [kacyUnclaimed, setKacyUnclaimed] = React.useState<Record<number, Big>>(
    {
      [43114]: Big(0),
      [137]: Big(0)
    }
  )
  const [kacyWallet, setKacyWallet] = React.useState<Record<number, Big>>({
    [0]: Big(0)
  })
  const [kacyTotal, setKacyTotal] = React.useState<Big>(Big(0))

  const [{ wallet }] = useConnectWallet()
  const { data } = useSWR('/api/overview')

  const { userInfo, earnedMultChain } = useStakingContract(Staking)

  const isKacyZeroValue = kacyTotal.eq(Big(0))

  React.useEffect(() => {
    if (data) {
      setKacyMarketData({
        price: data.kacyPrice,
        marketCap: data.marketCap,
        supply: data.supply,
        kacyPercentage: data.kacyPercentage
      })
    }
  }, [data])

  React.useEffect(() => {
    async function getKacyBalanceInWallet(wallet: string) {
      const kacyAmountInWallet: Record<number, Big> = {}

      for (const kacy of KACY_MULTICHAIN) {
        const chain = networks[kacy.chain]

        if (chain.kacyAddress) {
          const contract = await ERC20(chain.kacyAddress, chain.rpc)
          const balance = await contract.balance(wallet)

          Object.assign(kacyAmountInWallet, {
            [kacy.chain]: Big(balance) ?? Big(0)
          })
        }
      }

      setKacyWallet(kacyAmountInWallet)
    }

    async function getTokenAmountInPool(pid: number, wallet: string) {
      const userInfoResponse = await userInfo(pid, wallet)

      return Big(userInfoResponse.amount.toString())
    }

    const kacyTotalInPool = async (wallet: string) => {
      let count = Big(0)
      for (const kacy of poolsKacy) {
        const res = await getTokenAmountInPool(kacy.pid, wallet)

        count = count.add(res)
      }
      setKacyStaked(count)
    }

    const kacyEarned = async (wallet: string) => {
      const kacyCount: Record<number, Big> = {
        [43114]: Big(0),
        [137]: Big(0)
      }

      for (const kacy of allPools) {
        const res = await earnedMultChain(
          kacy.pid,
          wallet,
          kacy.stakingContract,
          kacy.chain.id
        )

        kacyCount[kacy.chain.id] = kacyCount[kacy.chain.id].add(
          Big(res.toString())
        )
      }

      setKacyUnclaimed(kacyCount)
    }

    if (wallet?.provider) {
      getKacyBalanceInWallet(wallet.accounts[0].address)
      kacyTotalInPool(wallet.accounts[0].address)
      kacyEarned(wallet.accounts[0].address)
    }
  }, [wallet])

  React.useEffect(() => {
    if (wallet?.provider) {
      let count = Big(0)
      let countInWallet = Big(0)

      for (const kacy of KACY_MULTICHAIN) {
        countInWallet = countInWallet.add(Big(kacyWallet[kacy.chain] ?? Big(0)))
      }

      count = count
        .add(kacyStaked)
        .add(kacyUnclaimed[43114])
        .add(kacyUnclaimed[137])
        .add(countInWallet)
      setKacyTotal(count)
    }
  }, [kacyStaked, kacyUnclaimed, kacyWallet])

  return (
    <>
      <S.KacyAmount>
        <Button
          className="kacyAmount"
          text={
            wallet?.provider
              ? isKacyZeroValue
                ? 'Buy KACY'
                : `${abbreviateNumber(
                    kacyTotal.div(Big(10).pow(18)).toString()
                  )} KACY`
              : 'Buy KACY'
          }
          icon={<Image src={kacyIcon} width={18} height={18} />}
          backgroundBlack
          onClick={() => setIsModalKacy(true)}
        />
      </S.KacyAmount>

      {isModalKacy && (
        <Kacy
          price={kacyMarketData.price ?? 0}
          supply={kacyMarketData.supply}
          kacyStaked={kacyStaked}
          kacyUnclaimed={kacyUnclaimed}
          kacyWallet={kacyWallet}
          kacyTotal={kacyTotal}
          setIsModalKacy={setIsModalKacy}
          setIsOpenModal={setIsOpenModal}
          setIsModalBridge={setIsModalBridge}
        />
      )}

      {isOpenModal && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModal}
          setModalOpen={setIsOpenModal}
        />
      )}

      {isModalBridge ? <ModalBridge setIsModalOpen={setIsModalBridge} /> : null}
    </>
  )
}

export default ModalKacy
