import Big from 'big.js'
import React from 'react'
import BigNumber from 'bn.js'
import web3 from '../../../../../utils/web3'
import useSWR from 'swr';
import { request } from 'graphql-request';
import Tippy from '@tippyjs/react';

import { BACKEND_KASSANDRA } from '../../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'
import { setModalWalletActive } from '../../../../../store/reducers/modalWalletActive'

import { ERC20 } from '../../../../../hooks/useERC20Contract'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce';

import waitTransaction, { MetamaskError, TransactionCallback } from '../../../../../utils/txWait'
import changeChain from '../../../../../utils/changeChain'
import { BNtoDecimal } from '../../../../../utils/numerals'
import { getBalanceToken, decimalToBN } from '../../../../../utils/poolUtils';

import PoolOperationContext from '../PoolOperationContext';

import { ToastSuccess, ToastWarning } from '../../../../../components/Toastify/toast'
import Button from '../../../../../components/Button'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import TokenAssetIn from '../TokenAssetIn'
import TransactionSettings from '../TransactionSettings'

import { GET_POOL } from './graphql'

import * as S from './styles'

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
}

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;
interface IWithdrawProps {
  typeWithdraw: string;
  typeAction: Titles;
  privateInvestors: string[];
}

enum Approval {
  Denied,
  Approved,
  WaitingTransaction,
  Syncing
}

type Approvals = { [key in Titles]: Approval[] }

const Withdraw = ({ typeWithdraw, typeAction, privateInvestors }: IWithdrawProps) => {
  const [amountTokenIn, setamountTokenIn] = React.useState<Big | string>(
    Big(0)
  )
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big | string>(
    Big(0)
  )
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )
  const [selectedTokenOutBalance, setSelectedTokenOutBalance] = React.useState(
    new Big(-1)
  )
  const [amountApproved, setAmountApproved] = React.useState(Big(0))
  const [errorMsg, setErrorMsg] = React.useState('')
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const [amountAllTokenOut, setamountAllTokenOut] = React.useState<BigNumber[]>([])
  const [balanceAllTokenOut, setbalanceAllTokenOut] = React.useState<BigNumber[]>([])
  const [walletConnect, setWalletConnect] = React.useState<string | null>(null)
  const [priceImpact, setPriceImpact] = React.useState<Big>(Big(0))
  const [priceInDollarOnWithdraw, setPriceInDollarOnWithdraw] = React.useState<string>('')
  const [approvals, setApprovals] = React.useState<Approvals>({
    Withdraw: [],
    Invest: []
  })
  const [slippage, setSlippage] = React.useState({
    value: '0.5',
    custom: '2.0',
    isCustom: false
  })

  const inputAmountInTokenRef = React.useRef<HTMLInputElement>(null)
  const inputAmountOutTokenRef = React.useRef<HTMLInputElement>(null)

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const dispatch = useAppDispatch()
  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const { data } = useSWR([GET_POOL], query =>
    request(BACKEND_KASSANDRA, query, { id: pool.id })
  )

  const approvalCallback = React.useCallback(
    (
      tokenSymbol: string,
      tokenAddress: string,
      tabTitle: Titles
    ): TransactionCallback => {
      return async (error: MetamaskError, txHash: string) => {
        if (error) {
          if (error.code === 4001) {
            dispatch(
              setModalAlertText({
                errorText: `Approval of ${tokenSymbol} cancelled`
              })
            )
            return
          }

          dispatch(
            setModalAlertText({
              errorText: `Failed to approve ${tokenSymbol}. Please try again later.`
            })
          )
          return
        }

        setApprovals(old => {
          return {
            ...old,
            [tabTitle]: [Approval.WaitingTransaction]
          }
        })

        ToastWarning(`Waiting approval of ${tokenSymbol}...`)
        const txReceipt = await waitTransaction(txHash)

        setApprovals(old => {
          return {
            ...old,
            [tabTitle]: [Approval.Syncing]
          }
        })

        if (txReceipt.status) {
          ToastSuccess(
            `Approval of ${tokenSymbol} confirmed, wait while we sync with the latest block of the blockchain.`
          )
          let approved = false
          while (!approved) {
            await new Promise(r => setTimeout(r, 1000)) // sleep
            const allowance = await ERC20(pool.address).allowance(
              operation.withdrawContract,
              userWalletAddress
            )

            if (amountApproved.toFixed() !== Big(allowance).toFixed() || amountApproved.gte(amountTokenIn)) {
              await updateAllowance()
              approved = true
            }
          }
          return
        }

        setApprovals(old => {
          return {
            ...old,
            [tabTitle]: [Approval.Denied]
          }
        })
      }
    },
    [approvals]
  )

  const withdrawCallback = React.useCallback(
    (tokenSymbol: string, amountInUSD: number): TransactionCallback => {
      return async (error: MetamaskError, txHash: string) => {
        if (error) {
          trackCancelBuying()

          if (error.code === 4001) {
            dispatch(setModalAlertText({ errorText: `Withdrawal of ${tokenSymbol} cancelled` }))
            return
          }

          dispatch(setModalAlertText({ errorText: `Failed to withdraw ${tokenSymbol}. Please try again later.` }))
          return
        }

        trackBought(txHash, amountInUSD, 0)
        ToastWarning(`Confirming withdrawal of ${tokenSymbol}...`)
        const txReceipt = await waitTransaction(txHash)

        if (txReceipt.status) {
          ToastSuccess(`Withdrawal of ${tokenSymbol} confirmed`)
          let amountPool= Big(0)
          for (let index = 0; index < 100; index++) {
            await new Promise(r => setTimeout(r, 500))
            amountPool = await getBalanceToken(pool.address, userWalletAddress)
            if (amountPool.toFixed() !== selectedTokenInBalance.toFixed() && amountPool.gt(0)) break
          }
            if (inputAmountInTokenRef && inputAmountInTokenRef.current !== null) {
              inputAmountInTokenRef.current.value = ''
            }
            if (typeWithdraw === 'Single_asset') {
              const amountToken = await getBalanceToken(tokenSelect.address, userWalletAddress, pool.pool_version === 1 ? pool.chain.addressWrapped : undefined)

              setSelectedTokenInBalance(amountPool)
              setSelectedTokenOutBalance(amountToken)

              setAmountTokenOut(Big(0))
              setamountTokenIn(Big(0))
            } else {
              getUserBalanceAllToken()
            }
          return
        }
      }
    },
    []
  )

  const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const slippageVal = slippage.value
    const slippageExp = new BigNumber(10).pow(new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0)))
    const slippageBase = slippageExp.sub(new BigNumber(slippageVal.replace('.', '')))

    try {
      trackBuying(pool.id, pool.symbol, -1 * data?.pool?.price_usd, pool.chain.chainName)

      if (approvals[typeAction][0] === 0) {
        ERC20(pool.address).approve(
          operation.withdrawContract,
          userWalletAddress,
          approvalCallback(pool.symbol, pool.address, typeAction)
        )
        return
      }
      if (typeWithdraw === 'Single_asset') {
        operation.exitswapPoolAmountIn({
          tokenOutAddress: tokenSelect.address,
          tokenAmountIn: new BigNumber(Big(amountTokenIn).toFixed()),
          minPoolAmountOut: new BigNumber(Big(amountTokenOut).toFixed()).mul(slippageBase).div(slippageExp),
          userWalletAddress,
          transactionCallback: withdrawCallback(pool.symbol, -1 * 0)
        })
        return
      }

      operation.exitswapPoolAllTokenAmountIn({
        tokenAmountIn: new BigNumber(Big(amountTokenIn).toFixed()),
        amountAllTokenOut,
        slippageBase,
        slippageExp,
        userWalletAddress,
        transactionCallback: withdrawCallback(pool.symbol, -1 * 0)
      })
      return
    } catch (error) {
      dispatch(setModalAlertText({ errorText: 'Could not connect with the Blockchain!' }))
    }
  }

  const getUserBalanceAllToken = async () => {
    const newSwapOutBalance = await Promise.all(
      pool.underlying_assets.map(async (item) => {

        if (item.token.id === pool.chain.addressWrapped) {
          const balance = await web3.eth.getBalance(userWalletAddress)
          return new BigNumber(balance)
        }
        const token = ERC20(item.token.wraps?.id ?? item.token.id)
        return token.balance(userWalletAddress)
      })
    )

    setbalanceAllTokenOut(newSwapOutBalance)
  }

  async function updateAllowance() {
    const allowance = await ERC20(pool.address).allowance(
      operation.withdrawContract,
      userWalletAddress
    )

    setAmountApproved(Big(allowance))
    setApprovals((old) => ({
      ...old,
      [typeAction]: Big(allowance).gte(amountTokenIn) ? [Approval.Approved] : [Approval.Denied]
    }))
  }

  React.useEffect(() => {
    if (typeAction !== 'Withdraw' || tokenSelect.address === pool.id) {
      return
    }

    if (chainId !== pool.chain_id || Big(amountTokenIn).lte(0)) {
      setamountAllTokenOut(Array(pool.underlying_assets.length).fill(new BigNumber(0)))
      setAmountTokenOut(new Big(0))
      setErrorMsg('')
      updateAllowance()

      if (tokenSelect.address === '') {
        setAmountTokenOut(new Big(0))
        return
      }
      return
    }

    const calc = async () => {
      if (!(inputAmountInTokenRef && inputAmountInTokenRef.current !== null)) return

      const tokenAddress = pool.underlying_assets.find(item =>
        (item.token.wraps ? item.token.wraps.id : item.token.id) === tokenSelect.address
      )

      if (typeWithdraw === 'Best_value') {
        if (userWalletAddress.length > 0 && Big(amountTokenIn).gt(Big('0'))) {
          const { transactionError, withdrawAllAmoutOut } = await operation.calcAllOutGivenPoolIn({
            poolAmountIn: Big(amountTokenIn),
            userWalletAddress,
            selectedTokenInBalance
          })

          const valueFormatted = decimalToBN(inputAmountInTokenRef.current.value, tokenSelect.decimals)

          if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

          setamountAllTokenOut(withdrawAllAmoutOut ?? [])
          transactionError && setErrorMsg(transactionError)

          return
        }
      }

      try {
        if (!tokenAddress) return

        const { withdrawAmoutOut, transactionError } = await operation.calcSingleOutGivenPoolIn({
          tokenInAddress: tokenAddress.token.id,
          tokenSelectAddress: tokenSelect.address,
          poolAmountIn: Big(amountTokenIn).toFixed(),
          isWrap: tokenAddress.token.wraps ? true : false,
          userWalletAddress,
          selectedTokenInBalance
        })

        const valueFormatted = decimalToBN(inputAmountInTokenRef.current.value)

        if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

        setAmountTokenOut(withdrawAmoutOut.toString())
        transactionError && setErrorMsg(transactionError)
      } catch (error) {
        return error
      }
    }

    const verifyIsApproved = () => {
      if (amountApproved.lt(amountTokenIn)) {
        setApprovals(old => ({
          ...old,
          [typeAction]: [Approval.Denied]
        }))
      } else {
        setApprovals(old => ({
          ...old,
          [typeAction]: [Approval.Approved]
        }))
      }
    }

    verifyIsApproved()
    calc()
    setErrorMsg('')
    setAmountTokenOut(new Big(0))
  }, [typeAction, typeWithdraw, chainId, amountTokenIn, tokenSelect])

  React.useEffect(() => {
    if (
      pool.id.length === 0 ||
      userWalletAddress.length === 0 ||
      chainId.toString().length === 0 ||
      chainId !== pool.chain_id
    ) {
      return setSelectedTokenInBalance(Big(0))
    }


    (async () => {
      const balance = await getBalanceToken(pool.address, userWalletAddress)
      setSelectedTokenInBalance(balance)
    })()

  }, [userWalletAddress, pool, typeAction, typeWithdraw])

  React.useEffect(() => {
    const handleWallectConnect = () => {
      const connect = localStorage.getItem('walletconnect')

      if (connect) {
        setWalletConnect(connect)
      } else {
        setWalletConnect(null)
      }
    }

    handleWallectConnect()
  }, [])

  React.useEffect(() => {
    const res: Big = pool.underlying_assets.reduce((accumulator, current, index) => {
      const priceUSD = priceToken(current.token.wraps ?
        current.token.wraps.id.toLocaleLowerCase() :
        current.token.id.toLocaleLowerCase())

      return Big((amountAllTokenOut[index] || 0).toString())
        .mul(Big(priceUSD || 0))
        .div(Big(10).pow(Number(current.token.decimals)))
        .add(accumulator)
    }, Big(0))

    setPriceInDollarOnWithdraw(BNtoDecimal(res, 18, 2, 2))
  }, [amountAllTokenOut])

  React.useEffect(() => {
    if (userWalletAddress.length === 0 ||
      chainId.toString().length === 0 ||
      chainId !== pool.chain_id ||
      typeWithdraw === 'Best_Value'
    ) {
      return setbalanceAllTokenOut(Array(pool.underlying_assets.length).fill(new BigNumber(0)))
    }

    getUserBalanceAllToken()
    return

  }, [chainId, userWalletAddress, amountTokenIn, typeWithdraw])

  React.useEffect(() => {
    if (chainId !== pool.chain_id) {
      return
    }

    updateAllowance()
  }, [typeAction, userWalletAddress, chainId])

  React.useEffect(() => {
    if (!inputAmountInTokenRef?.current?.value) {
      setPriceImpact(Big(0))
      return
    }

    if (Big(amountTokenIn).gt(0) && parseFloat(amountTokenOut.toString()) > 0) {
      const usdAmountIn = Big(amountTokenIn)
        .mul(Big(data?.pool?.price_usd ?? 0))
        .div(Big(10).pow(Number(data?.pool?.decimals || 18)))

      const usdAmountOut = Big(amountTokenOut)
        .mul(Big(priceToken(tokenSelect.address.toLocaleLowerCase()) || 0))
        .div(Big(10).pow(Number(tokenSelect.decimals || 18)))


      const subValue = usdAmountIn.sub(usdAmountOut)

      if (usdAmountIn.gt(0)) {
        const valuePriceImpact = subValue.div(usdAmountIn).mul(100)
        valuePriceImpact.gt(0) ? setPriceImpact(valuePriceImpact) : setPriceImpact(Big(0))
      }
    } else {
      setPriceImpact(Big(0))
    }
  }, [tokenSelect, amountTokenOut])

  return (
    <S.Withdraw onSubmit={submitAction}>
      <TokenAssetIn
        amountTokenIn={amountTokenIn}
        setamountTokenIn={setamountTokenIn}
        selectedTokenInBalance={selectedTokenInBalance}
        inputAmountTokenRef={inputAmountInTokenRef}
        errorMsg={errorMsg}
        maxActive={maxActive}
        setMaxActive={setMaxActive}
        poolPriceUSD={data?.pool}
        disabled={
          userWalletAddress.length === 0
            ? "Please connect your wallet by clicking the button below"
            : chainId !== pool.chain_id
              ? `Please change to the ${pool.chain.chainName} by clicking the button below`
              : ""
        }
      />
      <img src="/assets/icons/arrow-down.svg" alt="" width={20} height={20} />

      {typeWithdraw === 'Best_value' ? (
        <ListOfAllAsset
          amountAllTokenOut={amountAllTokenOut}
          balanceAllTokenOut={balanceAllTokenOut}
        />
      ) : (
        <InputAndOutputValueToken
          typeAction={typeWithdraw}
          amountTokenIn={amountTokenOut}
          setAmountTokenIn={setAmountTokenOut}
          selectedTokenInBalance={selectedTokenOutBalance}
          setSelectedTokenInBalance={setSelectedTokenOutBalance}
          inputAmountTokenRef={inputAmountOutTokenRef}
          errorMsg=''
        />
      )}

      <S.TransactionSettingsContainer>
        {typeWithdraw === 'Single_asset' && (
          <S.ExchangeRate>
            <S.SpanLight>Price Impact:</S.SpanLight>
            <S.PriceImpactWrapper price={Number(BNtoDecimal(
              priceImpact,
              18,
              2,
              2
            ))}>
              {BNtoDecimal(
                priceImpact,
                18,
                2,
                2
              )}%
            </S.PriceImpactWrapper>
          </S.ExchangeRate>
        )}

        <S.ExchangeRate>
          <S.SpanLight>Withdraw fee:</S.SpanLight>
          <S.SpanLight>{Big(data?.pool?.fee_exit || '0').mul(100).toFixed(2)}%</S.SpanLight>
        </S.ExchangeRate>

        <S.TransactionSettingsOptions>
          <TransactionSettings slippage={slippage} setSlippage={setSlippage} />
        </S.TransactionSettingsOptions>
      </S.TransactionSettingsContainer>

      {userWalletAddress.length === 0 && walletConnect === null ? (
        <Button
          className="btn-submit"
          backgroundPrimary
          fullWidth
          type="button"
          onClick={() => dispatch(setModalWalletActive(true))}
          text="Connect Wallet"
        />
      ) : chainId === pool.chain_id ? (
        pool.is_private_pool && !privateInvestors.some(address => address === userWalletAddress) ? (
          <Tippy
            allowHTML={true}
            content={[
              <S.PrivatePoolTooltip key="poolPrivate">
                This is a <strong key="privatePool">Private Pool</strong>, the manager decided to limit the addresses that can invest in it
              </S.PrivatePoolTooltip>,
            ]}
          >
            <span style={{ width: '100%' }}>
              <Button
                className="btn-submit"
                backgroundPrimary
                fullWidth
                type="button"
                text="Private Pool"
                disabledNoEvent
                image='/assets/utilities/lock.svg'
                />
            </span>
          </Tippy>
        ) : (
          <Button
            className="btn-submit"
            backgroundPrimary
            disabledNoEvent={
              (approvals[typeAction].length === 0) ||
              (approvals[typeAction][0] > Approval.Approved) ||
              (approvals[typeAction][0] === Approval.Approved &&
                (amountTokenIn.toString() === '0' ||
                  (typeWithdraw === 'Single_asset' && amountTokenOut.toString() === '0') ||
                  (typeWithdraw === 'Best_value' && amountAllTokenOut.length === 0) ||
                  errorMsg.length > 0
                ))
            }
            fullWidth
            type="submit"
            text={
              approvals[typeAction][0] === Approval.Approved
                ? amountTokenIn.toString() !== '0' ||
                  inputAmountInTokenRef?.current?.value !== null
                  ?
                  typeWithdraw === "Best_value" ?
                    `${typeAction} ${'$' + priceInDollarOnWithdraw}`
                    :
                    `${typeAction} ${'$' +
                    BNtoDecimal(
                      (Big((amountTokenOut).toString()))
                        .mul(Big(priceToken(tokenSelect.address.toLocaleLowerCase()) || 0))
                        .div(Big(10).pow(Number(tokenSelect.decimals || 18))),
                      18,
                      2,
                      2
                    )
                    }`
                  : `${typeAction}`
                : approvals[typeAction][0] === Approval.WaitingTransaction
                  ? 'Approving...'
                  : approvals[typeAction][0] === undefined ||
                    approvals[typeAction][0] === Approval.Syncing
                    ? 'Syncing with Blockchain...'
                    : 'Approve'
            }
          />
        )
      ) : (
        <Button
          className="btn-submit"
          backgroundPrimary
          fullWidth
          type="button"
          onClick={() => changeChain({
            chainId: pool.chain.id,
            chainName: pool.chain.chainName,
            rpcUrls: pool.chain.rpcUrls,
            nativeCurrency: {
              decimals: pool.chain.nativeTokenDecimals,
              name: pool.chain.nativeTokenName,
              symbol: pool.chain.nativeTokenSymbol
            }
          })}
          disabled={walletConnect ? true : false}
          text={walletConnect ? `Change manually to ${pool.chain.chainName}` : `Change to ${pool.chain.chainName}`}
        />
      )}
    </S.Withdraw>
  )
}

export default Withdraw
