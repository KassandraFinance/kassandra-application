import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import BigNumber from 'bn.js'
import Web3 from 'web3'

import { useAppSelector } from '../../../store/hooks'
import { ERC20 } from '../../../hooks/useERC20Contract'
import { poolsKacy, allPools } from '../../../constants/pools'
import { Staking, networks } from '../../../constants/tokenAddresses'
import useStakingContract from '../../../hooks/useStakingContract'

import { abbreviateNumber } from '../../../utils/abbreviateNumber'

import Kacy from './Kacy'
import ModalBuyKacyOnPangolin from '../ModalBuyKacyOnPangolin'
import Button from '../../Button'
import ModalBridge from '../ModalBridge'

import kacyIcon from '../../../../public/assets/logos/kacy-96.svg'

import * as S from './styles'

interface IKacyMarketDataProps {
  price: number;
  marketCap: number;
  supply: number;
  kacyPercentage: number;
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
  const [kacyStaked, setKacyStaked] = React.useState<BigNumber>(
    new BigNumber(0)
  )
  const [kacyUnclaimed, setKacyUnclaimed] = React.useState<
    Record<number, BigNumber>
  >({
    [43114]: new BigNumber(0),
    [137]: new BigNumber(0)
  })
  const [kacyWallet, setKacyWallet] = React.useState<Record<number, BigNumber>>(
    {
      [0]: new BigNumber(0)
    }
  )
  const [kacyTotal, setKacyTotal] = React.useState<BigNumber>(new BigNumber(0))

  const { data } = useSWR('/api/overview')

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const { userInfo, earnedMultChain } = useStakingContract(Staking)

  const connect = process.browser && localStorage.getItem('walletconnect')

  const isKacyZeroValue = kacyTotal.isZero()

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
    if (!userWalletAddress) {
      return
    }

    async function getKacyBalanceInWallet() {
      const kacyAmountInWallet: Record<number, BigNumber> = {}

      for (const kacy of KACY_MULTICHAIN) {
        const chain = networks[kacy.chain]

        if (chain.kacyAddress) {
          const contract = ERC20(chain.kacyAddress, new Web3(chain.rpc))
          const balance = await contract.balance(userWalletAddress)

          Object.assign(kacyAmountInWallet, { [kacy.chain]: balance ?? 0 })
        }
      }

      setKacyWallet(kacyAmountInWallet)
    }

    async function getTokenAmountInPool(pid: number) {
      const userInfoResponse = await userInfo(pid, userWalletAddress)

      return new BigNumber(userInfoResponse.amount)
    }

    const kacyTotalInPool = async () => {
      let count = new BigNumber(0)
      for (const kacy of poolsKacy) {
        const res = await getTokenAmountInPool(kacy.pid)

        count = count.add(res)
      }
      setKacyStaked(count)
    }

    const kacyEarned = async () => {
      const kacyCount: Record<number, BigNumber> = {
        [43114]: new BigNumber(0),
        [137]: new BigNumber(0)
      }

      for (const kacy of allPools) {
        const res = await earnedMultChain(
          kacy.pid,
          userWalletAddress,
          kacy.stakingContract,
          kacy.chain.id
        )

        kacyCount[kacy.chain.id] = kacyCount[kacy.chain.id].add(res)
      }

      setKacyUnclaimed(kacyCount)
    }

    getKacyBalanceInWallet()
    kacyTotalInPool()
    kacyEarned()
  }, [userWalletAddress, chainId])

  React.useEffect(() => {
    if (!userWalletAddress) return

    let count = new BigNumber(0)
    let countInWallet = new BigNumber(0)

    for (const kacy of KACY_MULTICHAIN) {
      countInWallet = countInWallet.add(
        kacyWallet[kacy.chain] ?? new BigNumber(0)
      )
    }

    count = count
      .add(kacyStaked)
      .add(kacyUnclaimed[43114])
      .add(kacyUnclaimed[137])
      .add(countInWallet)
    setKacyTotal(count)
  }, [kacyStaked, kacyUnclaimed, kacyWallet])

  return (
    <>
      <S.KacyAmount>
        {connect && isKacyZeroValue ? (
          <Button
            className="kacyAmount"
            text="Buy KACY"
            icon={<Image src={kacyIcon} width={18} height={18} />}
            backgroundBlack
            as="a"
            href="https://app.pangolin.exchange/#/swap?outputCurrency=0xf32398dae246C5f672B52A54e9B413dFFcAe1A44"
            target="_blank"
          />
        ) : (
          <Button
            className="kacyAmount"
            text={
              userWalletAddress
                ? isKacyZeroValue
                  ? 'Buy KACY'
                  : `${abbreviateNumber(
                      kacyTotal
                        .div(new BigNumber(10).pow(new BigNumber(18)))
                        .toString()
                    )} KACY`
                : 'Buy KACY'
            }
            icon={<Image src={kacyIcon} width={18} height={18} />}
            backgroundBlack
            onClick={() => setIsModalKacy(true)}
          />
        )}
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
