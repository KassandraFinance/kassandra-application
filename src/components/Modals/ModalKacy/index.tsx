import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import BigNumber from 'bn.js'

import { useAppSelector } from '../../../store/hooks'
import { ERC20 } from '../../../hooks/useERC20Contract'
import { poolsKacy, allPools } from '../../../constants/pools'
import { Staking, chains } from '../../../constants/tokenAddresses'
import useStakingContract from '../../../hooks/useStakingContract'

import { BNtoDecimal } from '../../../utils/numerals'
import { abbreviateNumber } from '../../../utils/abbreviateNumber'

import Kacy from './Kacy'
import ModalBuyKacyOnPangolin from '../ModalBuyKacyOnPangolin'
import Button from '../../Button'
import ModalWalletConnect from '../ModalWalletConnect'

import kacyIcon from '../../../../public/assets/logos/kacy-96.svg'

import * as S from './styles'

const poolPlatform =
  process.env.NEXT_PUBLIC_MASTER === '1' ? 'Avalanche' : 'Fuji'

const chain =
  process.env.NEXT_PUBLIC_MASTER === '1' ? chains.avalanche : chains.fuji

interface IKacyMarketDataProps {
  price: number;
  marketCap: number;
  supply: number;
  kacyPercentage: number;
}

const ModalKacy = () => {
  const [isModalKacy, setIsModalKacy] = React.useState(false)
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [isModalWallet, setIsModalWallet] = React.useState<boolean>(false)
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
  const [kacyUnclaimed, setKacyUnclaimed] = React.useState<BigNumber>(
    new BigNumber(0)
  )
  const [kacyWallet, setKacyWallet] = React.useState<BigNumber>(
    new BigNumber(0)
  )
  const [kacyTotal, setKacyTotal] = React.useState<BigNumber>(new BigNumber(0))

  const { data } = useSWR('/api/overview')

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const ERC20Contract = ERC20(poolsKacy[0].address)
  const { userInfo, earned } = useStakingContract(Staking)
  const chainId = useAppSelector(state => state.chainId)

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
  }, [poolPlatform, data])

  React.useEffect(() => {
    if (!userWalletAddress) {
      return
    }

    if (Number(chainId) !== chain.chainId) {
      return
    }

    async function getKacyBalanceInWallet() {
      const balanceToken = await ERC20Contract.balance(userWalletAddress)
      setKacyWallet(balanceToken)
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

    async function earnedKacy(pid: number) {
      const earnedResponse: BigNumber = await earned(pid, userWalletAddress)
      return earnedResponse
    }

    const kacyEarned = async () => {
      let count = new BigNumber(0)
      for (const kacy of allPools) {
        const res = await earnedKacy(kacy.pid)

        count = count.add(res)
      }
      setKacyUnclaimed(count)
    }

    getKacyBalanceInWallet()
    kacyTotalInPool()
    kacyEarned()
  }, [userWalletAddress, chainId])

  React.useEffect(() => {
    if (!userWalletAddress) {
      return
    }
    let count = new BigNumber(0)

    count = count.add(kacyStaked).add(kacyUnclaimed).add(kacyWallet)
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
              userWalletAddress && Number(chainId) === chain.chainId
                ? isKacyZeroValue
                  ? 'Buy KACY'
                  : `${abbreviateNumber(BNtoDecimal(kacyTotal, 18, 2))} KACY`
                : 'Buy KACY'
            }
            icon={<Image src={kacyIcon} width={18} height={18} />}
            backgroundBlack
            onClick={() =>
              isKacyZeroValue && Number(chainId) === chain.chainId
                ? setIsOpenModal(true)
                : setIsModalKacy(true)
            }
          />
        )}
      </S.KacyAmount>

      {isModalKacy && (
        <Kacy
          price={kacyMarketData.price}
          supply={kacyMarketData.supply}
          kacyStaked={kacyStaked}
          kacyUnclaimed={kacyUnclaimed}
          kacyWallet={kacyWallet}
          kacyTotal={kacyTotal}
          setIsModalKacy={setIsModalKacy}
          setIsOpenModal={setIsOpenModal}
          setIsModalWallet={setIsModalWallet}
        />
      )}

      {isOpenModal && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModal}
          setModalOpen={setIsOpenModal}
        />
      )}
      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModalWallet} />}
    </>
  )
}

export default ModalKacy
