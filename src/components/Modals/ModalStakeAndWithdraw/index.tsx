import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import { PoolDetails } from '@/constants/pools'
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

interface IModalStakeProps {
  pool: PoolDetails
  decimals: string
  amountApproved: Big
  stakingToken: string
  stakeTransaction: string
  productCategories: string | string[]
  setStakeTransaction: React.Dispatch<React.SetStateAction<string>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  updateAllowance: () => Promise<void>
  handleApprove: () => Promise<void>
}

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
  handleApprove
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

  const networkChain = networks[pool.chain.id]
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

  async function handleConfirm() {
    const erc20 = await ERC20(stakingToken, networkChain.rpc)

    const tokenName = await erc20.name()

    if (stakeTransaction === 'staking') {
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
        tokenName,
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
          onSuccess: () => trackBought(productSKU, 0, 0),
          onFail: () => trackCancelBuying()
        }
      )

      await updateAllowance()
    } else if (stakeTransaction === 'unstaking') {
      const productSKU = `${Staking}_${pool.pid}`

      trackBuying(
        productSKU,
        tokenName,
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
  }

  async function getBalance() {
    if (wallet?.provider && stakeTransaction === 'staking') {
      const erc20 = await ERC20(stakingToken, networkChain.rpc)

      const balanceKacy = await erc20.balance(wallet?.accounts[0].address)
      setBalance(Big(balanceKacy))
    } else if (stakeTransaction === 'unstaking') {
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
    if (stakeTransaction === 'staking') {
      handleEventProductPageView()
    }
  }, [stakingToken])

  let title: string
  if (stakeTransaction === 'staking') {
    title = 'Stake in Pool'
  } else if (stakeTransaction === 'unstaking') {
    title = 'Withdraw'
  } else {
    title = 'Transaction not defined'
  }

  return (
    <>
      <Overlay
        onClick={() => {
          setModalOpen(false)
          setStakeTransaction('')
        }}
      />

      <S.BorderGradient
        stakeInKacy={pool.symbol === 'KACY'}
        unstaking={stakeTransaction}
      >
        <S.BackgroundBlack>
          <S.InterBackground>
            <span>{title}</span>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false)
                setStakeTransaction('')
              }}
            >
              <img src="assets/utilities/close-icon.svg" alt="Close" />
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
              <button
                type="button"
                style={{
                  background: multiplier === 25 ? '#fff' : 'transparent',
                  color: multiplier === 25 ? '#000' : '#fff'
                }}
                onClick={() => {
                  multiplier === 25 ? setMultiplier(0) : setMultiplier(25)
                  multiplier === 25
                    ? handleKacyAmount(Big(0))
                    : handleKacyAmount(Big(25))
                }}
              >
                25%
              </button>

              <button
                type="button"
                style={{
                  background: multiplier === 50 ? '#fff' : 'transparent',
                  color: multiplier === 50 ? '#000' : '#fff'
                }}
                onClick={() => {
                  multiplier === 50 ? setMultiplier(0) : setMultiplier(50)
                  multiplier === 50
                    ? handleKacyAmount(Big(0))
                    : handleKacyAmount(Big(50))
                }}
              >
                50%
              </button>

              <button
                type="button"
                style={{
                  background: multiplier === 75 ? '#fff' : 'transparent',
                  color: multiplier === 75 ? '#000' : '#fff'
                }}
                onClick={() => {
                  multiplier === 75 ? setMultiplier(0) : setMultiplier(75)
                  multiplier === 75
                    ? handleKacyAmount(Big(0))
                    : handleKacyAmount(Big(75))
                }}
              >
                75%
              </button>

              <button
                type="button"
                style={{
                  background: multiplier === 100 ? '#fff' : 'transparent',
                  color: multiplier === 100 ? '#000' : '#fff'
                }}
                onClick={() => {
                  multiplier === 100 ? setMultiplier(0) : setMultiplier(100)
                  multiplier === 100
                    ? handleKacyAmount(Big(0))
                    : handleKacyAmount(Big(100))
                }}
              >
                max
              </button>
            </S.ButtonContainer>
            <S.WrapperButton>
              {amountApproved.lt(amountStake.toString()) &&
              stakeTransaction === 'staking' ? (
                <Button
                  type="button"
                  text="Approve Contract"
                  disabledNoEvent={amountStake.gt(balance)}
                  backgroundSecondary
                  fullWidth
                  onClick={handleApprove}
                />
              ) : (
                <Button
                  backgroundSecondary
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
                    setStakeTransaction('')
                  }}
                />
              )}
            </S.WrapperButton>

            {pool.symbol === 'KACY' ? (
              <Button
                backgroundBlack
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
                  backgroundBlack
                  fullWidth
                  text={`Get ${pool.symbol}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setModalOpen(false)
                    setStakeTransaction('')
                  }}
                />
              </Link>
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
