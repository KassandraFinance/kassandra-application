import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import { PoolType } from '@/constants/pools'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '@/utils/numerals'

import useStaking from '@/hooks/useStaking'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import { Staking, networks } from '@/constants/tokenAddresses'
import { ERC20 } from '@/hooks/useERC20'

import Button from '@/components/Button'
import Overlay from '@/components/Overlay'
import InputTokenValue from './InputTokenValue'
import ModalBuyKacyOnPangolin from '../ModalBuyKacyOnPangolin'

import * as S from './styles'

type IPoolProps = {
  pid: number
  type: PoolType
  symbol: string
  stakingContract: string
  chainId: number
  properties?: {
    logo: {
      src: string
      style: {
        width: string
      }
    }
    title?: string
    link?: string
  }
}

interface IModalStakeProps {
  pool: IPoolProps
  decimals: string
  amountApproved: Big
  stakingToken: string
  productCategories: string | string[]
  stakeTransaction: typeTransaction
  setStakeTransaction: React.Dispatch<React.SetStateAction<typeTransaction>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  updateAllowance: () => Promise<void>
  handleApprove: () => Promise<void>
  getUserInfoAboutPool: () => Promise<void>
}

export enum typeTransaction {
  NONE,
  STAKING,
  UNSTAKING
}

const porcentageButtonArray = [25, 50, 75, 100]

const ModalStakeAndWithdraw = ({
  pool,
  setModalOpen,
  decimals,
  stakingToken,
  productCategories,
  stakeTransaction,
  setStakeTransaction,
  amountApproved,
  updateAllowance,
  handleApprove,
  getUserInfoAboutPool
}: IModalStakeProps) => {
  const [isAmount, setIsAmount] = React.useState<boolean>(false)
  const [balance, setBalance] = React.useState<Big>(Big(0))
  const [multiplier, setMultiplier] = React.useState<number>(0)
  const [amountStake, setAmountStake] = React.useState<Big>(Big(0))
  const [isOpenModalPangolin, setIsOpenModalPangolin] = React.useState(false)

  const [{ wallet }] = useConnectWallet()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const {
    trackEventFunction,
    trackProductPageView,
    trackBought,
    trackBuying,
    trackCancelBuying
  } = useMatomoEcommerce()

  const networkChain = networks[pool.chainId]
  const productSKU = `${Staking}_${pool.pid}`

  const staking = useStaking(pool.stakingContract, networkChain.chainId)

  function handleKacyAmount(percentage: Big) {
    const kacyAmount = percentage.mul(balance).div(Big(100))

    if (inputRef.current !== null) {
      inputRef.current.value = BNtoDecimal(
        kacyAmount.div(Big(10).pow(18)),
        18
      ).replace(/\u00A0/g, '')
    }

    trackEventFunction(
      'click-value-btn',
      `${percentage.toString()}`,
      `modal-${stakeTransaction}`
    )
    setAmountStake(kacyAmount)
    setIsAmount(true)
  }

  function handleMultiplier(percentage: number) {
    if (percentage === multiplier) {
      setMultiplier(0)
      handleKacyAmount(Big(0))
    }

    setMultiplier(percentage)
    handleKacyAmount(Big(percentage))
  }

  async function handleStaking() {
    const toDelegate = await staking.userInfo(
      pool.pid,
      wallet?.accounts[0].address
    )
    const delegate =
      toDelegate.delegatee === '0x0000000000000000000000000000000000000000'
        ? wallet?.accounts[0].address
        : toDelegate.delegatee

    trackBuying(
      productSKU,
      pool.symbol,
      amountStake.div(Big(10).pow(18)).toNumber(),
      productCategories
    )

    await staking.stake(
      pool.pid,
      amountStake.toFixed(0),
      delegate,
      {
        pending: `Confirming stake of ${pool.symbol}...`,
        sucess: `Stake of ${pool.symbol} confirmed`
      },
      {
        onSuccess: () => {
          getUserInfoAboutPool()
          trackBought(productSKU, 0, 0)
        },
        onFail: () => trackCancelBuying()
      }
    )

    await updateAllowance()
  }

  async function handleUnstaking() {
    const productSKU = `${Staking}_${pool.pid}`

    trackBuying(
      productSKU,
      pool.symbol,
      -Big(amountStake.toString()).div(Big(10).pow(18)).toNumber(),
      productCategories
    )

    staking.withdraw(
      pool.pid,
      amountStake.toFixed(0),
      {
        pending: `Confirming unstake of ${pool.symbol}...`,
        sucess: `Unstake of ${pool.symbol} completed`
      },
      {
        onSuccess: () => trackBought(productSKU, 0, 0),
        onFail: () => trackCancelBuying()
      }
    )
  }

  async function handleConfirm() {
    if (stakeTransaction === typeTransaction.STAKING) {
      handleStaking()
    } else if (stakeTransaction === typeTransaction.UNSTAKING) {
      handleUnstaking()
    }
  }

  async function getBalance() {
    if (wallet?.provider && stakeTransaction === typeTransaction.STAKING) {
      const erc20 = await ERC20(stakingToken, networkChain.rpc)

      const balanceKacy = await erc20.balance(wallet?.accounts[0].address)
      setBalance(Big(balanceKacy))
    } else if (stakeTransaction === typeTransaction.UNSTAKING) {
      if (wallet?.provider) {
        const balance = await staking.availableWithdraw(
          pool.pid,
          wallet?.accounts[0].address
        )
        setBalance(balance)
      }
    }
  }

  async function handleEventProductPageView() {
    trackProductPageView(productSKU, pool.symbol, productCategories)
  }

  React.useEffect(() => {
    if (!isAmount) {
      setMultiplier(0)
    }
    setIsAmount(false)
  }, [amountStake])

  React.useEffect(() => {
    getBalance()
  }, [])

  React.useEffect(() => {
    setMultiplier(0)
    handleKacyAmount(Big(0))
    updateAllowance()
  }, [])

  React.useEffect(() => {
    if (stakeTransaction === typeTransaction.STAKING) {
      handleEventProductPageView()
    }
  }, [stakingToken])

  let title: string
  if (stakeTransaction === typeTransaction.STAKING) {
    title = 'Stake in Pool'
  } else if (stakeTransaction === typeTransaction.UNSTAKING) {
    title = 'Withdraw'
  } else {
    title = 'Transaction not defined'
  }

  return (
    <>
      <Overlay
        onClick={() => {
          setModalOpen(false)
          setStakeTransaction(typeTransaction.NONE)
        }}
      />

      <S.BorderGradient>
        <S.BackgroundBlack>
          <S.InterBackground>
            <span>{title}</span>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false)
                setStakeTransaction(typeTransaction.NONE)
              }}
            >
              <img src="/assets/utilities/close-icon.svg" alt="Close" />
            </button>
          </S.InterBackground>

          <S.Main>
            <S.Amount>
              <span>${pool.symbol} Total</span>
              <InputTokenValue
                inputRef={inputRef}
                decimals={Big(decimals)}
                setInputValue={setAmountStake}
              />
              <h5>Balance: {BNtoDecimal(balance.div(Big(10).pow(18)), 18)}</h5>
            </S.Amount>

            <S.ButtonContainer>
              {porcentageButtonArray.map(number => {
                return (
                  <S.PorcentageButton
                    key={number}
                    type="button"
                    isActive={multiplier === number}
                    onClick={() => handleMultiplier(number)}
                  >
                    {number}%
                  </S.PorcentageButton>
                )
              })}
            </S.ButtonContainer>

            <S.WrapperButton>
              {amountApproved.lt(amountStake.toString()) &&
              stakeTransaction === typeTransaction.STAKING ? (
                <Button
                  type="button"
                  text="Approve Contract"
                  disabledNoEvent={amountStake.gt(balance)}
                  background="secondary"
                  fullWidth
                  onClick={handleApprove}
                />
              ) : (
                <Button
                  background="secondary"
                  type="button"
                  disabledNoEvent={
                    amountStake.eq(Big(0)) || amountStake.gt(balance)
                  }
                  text="Confirm"
                  fullWidth
                  onClick={() => {
                    setModalOpen(false)
                    handleConfirm()
                    setAmountStake(Big(0))
                    setStakeTransaction(typeTransaction.NONE)
                  }}
                />
              )}
            </S.WrapperButton>

            {pool.properties && (
              <S.WrapperGetButton>
                {pool.type === PoolType.STAKE ? (
                  <Button
                    background="black"
                    fullWidth
                    text={`Buy ${pool.symbol}`}
                    rel="noopener noreferrer"
                    onClick={() => {
                      setIsOpenModalPangolin(true)
                    }}
                  />
                ) : (
                  <Link href={pool.properties?.link ?? ''} passHref>
                    <Button
                      as="a"
                      background="black"
                      fullWidth
                      text={`Get ${pool.symbol}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setStakeTransaction(typeTransaction.NONE)
                        setModalOpen(false)
                      }}
                    />
                  </Link>
                )}
              </S.WrapperGetButton>
            )}
          </S.Main>
        </S.BackgroundBlack>
      </S.BorderGradient>

      {isOpenModalPangolin && (
        <ModalBuyKacyOnPangolin
          modalOpen={isOpenModalPangolin}
          setModalOpen={setIsOpenModalPangolin}
        />
      )}
    </>
  )
}

export default ModalStakeAndWithdraw
