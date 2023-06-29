import Big from 'big.js'
import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Tippy from '@tippyjs/react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import useBatchRequests from '@/hooks/useBatchRequests'

import {
  BACKEND_KASSANDRA,
  networks
} from '../../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'

import { ERC20 } from '../../../../../hooks/useERC20'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'
import useTransaction from '@/hooks/useTransaction'

import { BNtoDecimal } from '../../../../../utils/numerals'
import { getBalanceToken, decimalToBN } from '../../../../../utils/poolUtils'

import PoolOperationContext from '../PoolOperationContext'

import Button from '../../../../../components/Button'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import TokenAssetIn from '../TokenAssetIn'
import TransactionSettings from '../TransactionSettings'

import { GET_POOL } from './graphql'

import * as S from './styles'

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages
interface IWithdrawProps {
  typeWithdraw: string
  typeAction: Titles
  privateInvestors: string[]
}

enum Approval {
  Denied,
  Approved,
  WaitingTransaction,
  Syncing
}

type Approvals = { [key in Titles]: Approval[] }

const Withdraw = ({
  typeWithdraw,
  typeAction,
  privateInvestors
}: IWithdrawProps) => {
  const [amountTokenIn, setamountTokenIn] = React.useState<Big | string>(Big(0))
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
  const [amountAllTokenOut, setamountAllTokenOut] = React.useState<
    Record<string, Big>
  >({})
  const [balanceAllTokenOut, setbalanceAllTokenOut] = React.useState<
    Record<string, Big>
  >({})
  const [priceImpact, setPriceImpact] = React.useState<Big>(Big(0))
  const [priceInDollarOnWithdraw, setPriceInDollarOnWithdraw] =
    React.useState<string>('')
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
  const { pool, tokenSelect } = useAppSelector(state => state)
  const [{ wallet, connecting }, connect] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { txNotification, transactionErrors } = useTransaction()
  const { balances } = useBatchRequests(pool.chain_id)

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const { data } = useSWR([GET_POOL], query =>
    request(BACKEND_KASSANDRA, query, { id: pool.id })
  )

  async function handleApproveFail() {
    setApprovals(old => {
      return {
        ...old,
        [typeAction]: [Approval.Denied]
      }
    })
  }

  async function handleApproveSuccess() {
    if (!wallet) return

    let approved = false
    while (!approved) {
      await new Promise(r => setTimeout(r, 1000)) // sleep
      const { allowance } = await ERC20(pool.address, networks[chainId].rpc)
      const allowanceValue = await allowance(
        operation.withdrawContract,
        wallet.accounts[0].address
      )

      if (
        amountApproved.toFixed() !== Big(allowanceValue).toFixed() ||
        amountApproved.gte(amountTokenIn)
      ) {
        await updateAllowance()
        approved = true
      }
    }
  }

  async function handleTransactionSuccess() {
    if (!wallet) return

    let amountPool = Big(0)
    for (let index = 0; index < 100; index++) {
      await new Promise(r => setTimeout(r, 500))
      amountPool = await getBalanceToken(
        pool.address,
        wallet.accounts[0].address,
        chainId
      )
      if (
        amountPool.toFixed() !== selectedTokenInBalance.toFixed() &&
        amountPool.gt(0)
      )
        break
    }
    if (inputAmountInTokenRef && inputAmountInTokenRef.current !== null) {
      inputAmountInTokenRef.current.value = ''
    }
    if (typeWithdraw === 'Single_asset') {
      const amountToken = await getBalanceToken(
        tokenSelect.address,
        wallet.accounts[0].address,
        chainId,
        pool.pool_version === 1 ? pool.chain.addressWrapped : undefined
      )

      setSelectedTokenInBalance(amountPool)
      setSelectedTokenOutBalance(amountToken)

      setAmountTokenOut(Big(0))
      setamountTokenIn(Big(0))
    } else {
      getUserBalanceAllToken()
    }
    return
  }

  async function handleTransactionFail() {
    trackCancelBuying()

    dispatch(
      setModalAlertText({
        errorText: `Failed to withdraw ${pool.symbol}. Please try again later.`
      })
    )
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!wallet?.provider) return

    const slippageVal = slippage.value

    const slippageExpInBig = Big(10).pow(
      Big(2 + (slippageVal.split('.')[1]?.length || 0)).toNumber()
    )
    const slippageBaseInBig = slippageExpInBig.sub(
      Big(slippageVal.replace('.', ''))
    )

    try {
      trackBuying(
        pool.id,
        pool.symbol,
        -1 * data?.pool?.price_usd,
        pool.chain.chainName
      )

      if (approvals[typeAction][0] === 0) {
        const { approve } = await ERC20(pool.address, networks[chainId].rpc, {
          wallet: wallet,
          txNotification: txNotification,
          transactionErrors: transactionErrors
        })

        approve(
          operation.withdrawContract,
          {
            error: `Failed to approve ${pool.symbol}`,
            pending: `Waiting approval of ${pool.symbol}...`,
            sucess: `Approval of ${pool.symbol} confirmed, wait while we sync with the latest block of the blockchain.`
          },
          { onFail: handleApproveFail, onSuccess: handleApproveSuccess }
        )

        setApprovals(old => {
          return {
            ...old,
            [typeAction]: [Approval.WaitingTransaction]
          }
        })

        return
      }
      if (typeWithdraw === 'Single_asset') {
        try {
          const response = await operation.exitswapPoolAmountIn({
            tokenOutAddress: tokenSelect.address,
            tokenAmountIn: Big(amountTokenIn).toFixed(0),
            minPoolAmountOut: Big(amountTokenOut)
              .mul(slippageBaseInBig)
              .div(slippageExpInBig)
              .toFixed(0),
            userWalletAddress: wallet.accounts[0].address
          })

          trackBought(
            response?.hash ?? '0x',
            Number(Big(amountTokenIn).toFixed(0)),
            0
          )
          await txNotification(
            response,
            {
              error: `Failed to withdraw ${pool.symbol}. Please try again later.`,
              pending: `Confirming withdrawal of ${pool.symbol}...`,
              sucess: `Withdrawal of ${pool.symbol} confirmed`
            },
            {
              onFail: handleTransactionFail,
              onSuccess: handleTransactionSuccess
            }
          )
        } catch (error) {
          transactionErrors(error)
        }
        return
      }

      try {
        const response = await operation.exitswapPoolAllTokenAmountIn({
          tokenAmountIn: Big(amountTokenIn).toFixed(),
          amountAllTokenOut,
          slippageBase: slippageBaseInBig,
          slippageExp: slippageExpInBig,
          userWalletAddress: wallet.accounts[0].address
        })

        await txNotification(
          response,
          {
            error: `Failed to withdraw ${pool.symbol}. Please try again later.`,
            pending: `Confirming withdrawal of ${pool.symbol}...`,
            sucess: `Withdrawal of ${pool.symbol} confirmed`
          },
          {
            onFail: handleTransactionFail,
            onSuccess: handleTransactionSuccess
          }
        )
      } catch (error) {
        transactionErrors(error)
      }
      return
    } catch (error) {
      dispatch(
        setModalAlertText({
          errorText: 'Could not connect with the Blockchain!'
        })
      )
    }
  }

  const getUserBalanceAllToken = async () => {
    if (!wallet) return

    const amounts = await balances(
      wallet.accounts[0].address,
      pool.underlying_assets_addresses
    )

    const balanceList: Record<string, Big> = {}
    for (const [i, token] of pool.underlying_assets_addresses.entries()) {
      balanceList[token] = amounts[i]?.toString() ?? '0'
    }

    setbalanceAllTokenOut(balanceList)
  }

  async function updateAllowance() {
    if (!wallet) return

    const { allowance } = await ERC20(pool.address, networks[pool.chain_id].rpc)
    const allowanceValue = await allowance(
      operation.withdrawContract,
      wallet.accounts[0].address
    )

    setAmountApproved(Big(allowanceValue))
    setApprovals(old => ({
      ...old,
      [typeAction]: Big(allowanceValue).gte(amountTokenIn)
        ? [Approval.Approved]
        : [Approval.Denied]
    }))
  }

  React.useEffect(() => {
    if (typeAction !== 'Withdraw' || tokenSelect.address === pool.id) {
      return
    }

    if (chainId !== pool.chain_id || Big(amountTokenIn).lte(0)) {
      setamountAllTokenOut({})
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
      if (!(inputAmountInTokenRef && inputAmountInTokenRef.current !== null)) {
        return
      }

      const tokenAddress = pool.underlying_assets.find(
        item =>
          (item.token.wraps ? item.token.wraps.id : item.token.id) ===
          tokenSelect.address
      )

      if (typeWithdraw === 'Best_value') {
        if (wallet && Big(amountTokenIn).gt(Big('0'))) {
          const { transactionError, withdrawAllAmoutOut } =
            await operation.calcAllOutGivenPoolIn({
              poolAmountIn: Big(amountTokenIn),
              userWalletAddress: wallet.accounts[0].address,
              selectedTokenInBalance
            })

          const valueFormatted = decimalToBN(
            inputAmountInTokenRef.current.value,
            data?.pool?.decimals ?? 18
          )

          if (!Big(amountTokenIn).eq(valueFormatted)) return

          setamountAllTokenOut(withdrawAllAmoutOut ?? {})
          transactionError && setErrorMsg(transactionError)

          return
        }
      }

      try {
        if (!tokenAddress || !wallet) return

        const { withdrawAmoutOut, transactionError } =
          await operation.calcSingleOutGivenPoolIn({
            tokenInAddress: tokenAddress.token.id,
            tokenSelectAddress: tokenSelect.address,
            poolAmountIn: Big(amountTokenIn).toFixed(0),
            isWrap: tokenAddress.token.wraps ? true : false,
            userWalletAddress: wallet.accounts[0].address,
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
      !wallet ||
      pool.id.length === 0 ||
      chainId.toString().length === 0 ||
      chainId !== pool.chain_id
    ) {
      return setSelectedTokenInBalance(Big(0))
    }

    ;(async () => {
      const balance = await getBalanceToken(
        pool.address,
        wallet.accounts[0].address,
        chainId
      )

      setSelectedTokenInBalance(balance)
    })()
  }, [wallet, pool, typeAction, typeWithdraw])

  React.useEffect(() => {
    const res: Big = pool.underlying_assets.reduce((accumulator, current) => {
      const decimals = current.token.wraps?.decimals ?? current.token.decimals
      const tokenAmount = Big(amountAllTokenOut[current.token.id] ?? 0).div(
        Big(10).pow(decimals)
      )
      const priceUSD = priceToken(
        current.token.wraps
          ? current.token.wraps.id.toLocaleLowerCase()
          : current.token.id.toLocaleLowerCase()
      )

      return tokenAmount.mul(Big(priceUSD || 0)).add(accumulator)
    }, Big(0))

    setPriceInDollarOnWithdraw(BNtoDecimal(res, 3, 2))
  }, [amountAllTokenOut])

  React.useEffect(() => {
    if (
      !wallet ||
      chainId.toString().length === 0 ||
      chainId !== pool.chain_id ||
      typeWithdraw === 'Best_Value'
    ) {
      return setbalanceAllTokenOut({})
    }

    getUserBalanceAllToken()
    return
  }, [chainId, wallet, amountTokenIn, typeWithdraw])

  React.useEffect(() => {
    if (chainId !== pool.chain_id) {
      return
    }

    updateAllowance()
  }, [typeAction, wallet, chainId])

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
        valuePriceImpact.gt(0)
          ? setPriceImpact(valuePriceImpact)
          : setPriceImpact(Big(0))
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
          !wallet
            ? 'Please connect your wallet by clicking the button below'
            : chainId !== pool.chain_id
            ? `Please change to the ${pool.chain.chainName} by clicking the button below`
            : ''
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
          errorMsg=""
        />
      )}

      <S.TransactionSettingsContainer>
        {typeWithdraw === 'Single_asset' && (
          <S.ExchangeRate>
            <S.SpanLight>Price Impact:</S.SpanLight>
            <S.PriceImpactWrapper
              price={Number(BNtoDecimal(priceImpact, 18, 2, 2))}
            >
              {BNtoDecimal(priceImpact, 18, 2, 2)}%
            </S.PriceImpactWrapper>
          </S.ExchangeRate>
        )}

        <S.ExchangeRate>
          <S.SpanLight>Withdraw fee:</S.SpanLight>
          <S.SpanLight>
            {Big(data?.pool?.fee_exit || '0')
              .mul(100)
              .toFixed(2)}
            %
          </S.SpanLight>
        </S.ExchangeRate>

        <S.TransactionSettingsOptions>
          <TransactionSettings slippage={slippage} setSlippage={setSlippage} />
        </S.TransactionSettingsOptions>
      </S.TransactionSettingsContainer>

      {!wallet ? (
        <Button
          className="btn-submit"
          backgroundPrimary
          fullWidth
          type="button"
          disabled={connecting}
          onClick={() => connect()}
          text="Connect Wallet"
        />
      ) : chainId === pool.chain_id ? (
        pool.is_private_pool &&
        !privateInvestors.some(
          address => address === wallet?.accounts[0].address
        ) ? (
          <Tippy
            allowHTML={true}
            content={[
              <S.PrivatePoolTooltip key="poolPrivate">
                This is a <strong key="privatePool">Private Pool</strong>, the
                manager decided to limit the addresses that can invest in it
              </S.PrivatePoolTooltip>
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
                image="/assets/utilities/lock.svg"
              />
            </span>
          </Tippy>
        ) : (
          <Button
            className="btn-submit"
            backgroundPrimary
            disabledNoEvent={
              approvals[typeAction].length === 0 ||
              approvals[typeAction][0] > Approval.Approved ||
              (approvals[typeAction][0] === Approval.Approved &&
                (amountTokenIn.toString() === '0' ||
                  (typeWithdraw === 'Single_asset' &&
                    amountTokenOut.toString() === '0') ||
                  (typeWithdraw === 'Best_value' &&
                    Object.values(amountAllTokenOut).length === 0) ||
                  errorMsg.length > 0))
            }
            fullWidth
            type="submit"
            text={
              approvals[typeAction][0] === Approval.Approved
                ? amountTokenIn.toString() !== '0' ||
                  inputAmountInTokenRef?.current?.value !== null
                  ? typeWithdraw === 'Best_value'
                    ? `${typeAction} ${'$' + priceInDollarOnWithdraw}`
                    : `${typeAction} ${
                        '$' +
                        BNtoDecimal(
                          Big(amountTokenOut.toString())
                            .mul(
                              Big(
                                priceToken(
                                  tokenSelect.address.toLocaleLowerCase()
                                ) || 0
                              )
                            )
                            .div(
                              Big(10).pow(Number(tokenSelect.decimals || 18))
                            ),
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
          onClick={() =>
            setChain({ chainId: `0x${pool.chain_id.toString(16)}` })
          }
          text={`Change to ${pool.chain.chainName}`}
        />
      )}
    </S.Withdraw>
  )
}

export default Withdraw
