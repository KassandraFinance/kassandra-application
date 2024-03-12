import React from 'react'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import { ERC20 } from '@/hooks/useERC20'
import useStakingContract from '@/hooks/useStaking'
import { poolsKacy, allPools } from '@/constants/pools'
import { Staking, networks } from '@/constants/tokenAddresses'
import { useKacyData } from '@/hooks/query/useKacyData'

import { abbreviateNumber } from '@/utils/abbreviateNumber'

import Kacy from './Kacy'
import ModalBuyKacyOnPangolin from '../ModalBuyKacyOnPangolin'
import Button from '../../Button'
import ModalBridge from '../ModalBridge'

import kacyIcon from '@assets/logos/kacy-token.svg'

import * as S from './styles'

const AVALANCHE_CHAIN_ID = 43114

const KACY_MULTICHAIN = [
  {
    chain: 43114
  },
  {
    chain: 137
  },
  {
    chain: 42161
  }
]

const ModalKacy = () => {
  const [isModalKacy, setIsModalKacy] = React.useState(false)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [isModalBridge, setIsModalBridge] = React.useState(false)
  const [kacyStaked, setKacyStaked] = React.useState<Big>(Big(0))
  const [kacyUnclaimed, setKacyUnclaimed] = React.useState<Record<number, Big>>(
    {
      [43114]: Big(0),
      [137]: Big(0),
      [42161]: Big(0)
    }
  )
  const [totalKacyOnChain, setTotalKacyOnChain] = React.useState<
    Record<number, Big>
  >({
    [43114]: Big(0),
    [137]: Big(0),
    [42161]: Big(0)
  })
  const [kacyWallet, setKacyWallet] = React.useState<Record<number, Big>>({})
  const [kacyTotal, setKacyTotal] = React.useState<Big>(Big(0))

  const [{ wallet }] = useConnectWallet()
  const { data } = useKacyData()

  const { userInfo, earnedMultChain } = useStakingContract(Staking)

  const isKacyZeroValue = kacyTotal.eq(Big(0))

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
        [137]: Big(0),
        [42161]: Big(0)
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
      getKacyBalanceInWallet(wallet.accounts[0]?.address)
      kacyTotalInPool(wallet.accounts[0].address)
      kacyEarned(wallet.accounts[0].address)
    }
  }, [wallet])

  React.useEffect(() => {
    if (wallet?.provider) {
      let count = Big(0)
      const _totalKacyOnChain: Record<number, Big> = {}

      for (const kacy of KACY_MULTICHAIN) {
        const kacyInWallet = kacyWallet[kacy.chain] ?? Big(0)
        const totalAmountKacyOnChain = kacyInWallet.add(
          kacyUnclaimed[kacy.chain]
        )

        _totalKacyOnChain[kacy.chain] = totalAmountKacyOnChain
        count = count.add(totalAmountKacyOnChain)
      }

      count = count.add(kacyStaked)
      setKacyTotal(count)

      _totalKacyOnChain[AVALANCHE_CHAIN_ID] =
        _totalKacyOnChain[AVALANCHE_CHAIN_ID].add(kacyStaked)
      setTotalKacyOnChain(_totalKacyOnChain)
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
          background="black"
          onClick={() => setIsModalKacy(true)}
        />
      </S.KacyAmount>

      {isModalKacy && (
        <Kacy
          price={data?.kacyPrice || 0}
          supply={data?.supply || 0}
          kacyStaked={kacyStaked}
          kacyUnclaimed={kacyUnclaimed}
          kacyWallet={kacyWallet}
          kacyTotal={kacyTotal}
          totalKacyOnChain={totalKacyOnChain}
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
