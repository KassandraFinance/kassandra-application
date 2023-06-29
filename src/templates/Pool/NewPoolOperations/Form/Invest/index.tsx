import React from 'react'
import Big from 'big.js'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Tippy from '@tippyjs/react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import {
  NATIVE_ADDRESS,
  BACKEND_KASSANDRA,
  networks
} from '../../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'

import { ERC20 } from '../../../../../hooks/useERC20'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'
import useTransaction from '@/hooks/useTransaction'

import { BNtoDecimal } from '../../../../../utils/numerals'
import {
  checkTokenInThePool,
  checkTokenWithHigherLiquidityPool,
  getBalanceToken,
  getTokenWrapped,
  decimalToBN,
  getPoolPrice
} from '@/utils/poolUtils'

import { ToastWarning } from '../../../../../components/Toastify/toast'
import Button from '../../../../../components/Button'

import PoolOperationContext from '../PoolOperationContext'

import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'
import TransactionSettings from '../TransactionSettings'

import { GET_INFO_POOL } from '../graphql'

import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

enum Approval {
  Denied,
  Approved,
  WaitingTransaction,
  Syncing
}

type Approvals = { [key in Titles]: Approval[] }

interface IInvestProps {
  typeAction: Titles
  privateInvestors: string[]
}

const Invest = ({ typeAction, privateInvestors }: IInvestProps) => {
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big | string>(Big(0))
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big>(Big(0))
  const [amountTokenOutWithoutFees, setAmountTokenOuttWithoutFees] =
    React.useState<Big>(Big(0))
  const [amountApproved, setAmountApproved] = React.useState(Big(0))
  const [priceImpact, setPriceImpact] = React.useState<Big>(Big(0))
  const [trasactionData, setTrasactionData] = React.useState<any>()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [slippage, setSlippage] = React.useState({
    value: '0.5',
    custom: '2.0',
    isCustom: false
  })
  const [approvals, setApprovals] = React.useState<Approvals>({
    Withdraw: [],
    Invest: []
  })

  const [gasFee, setGasFee] = React.useState({
    error: false,
    feeNumber: 0,
    feeString: ''
  })
  const [outAssetBalance, setOutAssetBalance] = React.useState(Big(-1))
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    Big(-1)
  )

  const [{ wallet, connecting }, connect] = useConnectWallet()
  const { pool, tokenSelect } = useAppSelector(state => state)
  const [{ connectedChain }, setChain] = useSetChain()
  const { txNotification, transactionErrors } = useTransaction()

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const dispatch = useAppDispatch()

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const { data } = useSWR([GET_INFO_POOL], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id
    })
  )

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  async function handleSwapProviderV2(): Promise<{
    amountsTokenIn: string[]
    transactionsDataTx: string[]
  }> {
    const { fromAddress, fromDecimals } =
      tokenSelect.address === NATIVE_ADDRESS && pool.chain_id === 137
        ? {
            fromAddress: pool.chain.addressWrapped,
            fromDecimals: pool.chain.nativeTokenDecimals
          }
        : {
            fromAddress: tokenSelect.address,
            fromDecimals: tokenSelect.decimals
          }

    const sortAddresses = [...pool.underlying_assets].sort((a, b) =>
      a.token.id.toLowerCase() > b.token.id.toLowerCase() ? 1 : -1
    )
    const { amountsTokenIn, transactionsDataTx } =
      await operation.getAmountsOut({
        destTokens: sortAddresses,
        srcToken: fromAddress,
        srcDecimals: fromDecimals.toString(),
        amount: amountTokenIn.toString(),
        chainId: pool.chain_id.toString()
      })

    setTrasactionData(transactionsDataTx)

    return {
      amountsTokenIn,
      transactionsDataTx
    }
  }

  async function handleSwapProviderV1(): Promise<{
    amountsTokenIn: string[]
    transactionsDataTx: string[]
  }> {
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(
      pool.underlying_assets
    )
    const tokenWrappedAddress = getTokenWrapped(
      pool.underlying_assets,
      tokenWithHigherLiquidityPool.address
    )

    if (!tokenWrappedAddress) {
      return {
        amountsTokenIn: ['0'],
        transactionsDataTx: ['0x']
      }
    }

    const { amountsTokenIn, transactionsDataTx } =
      await operation.getAmountsOut({
        destTokens: [{ ...tokenWrappedAddress, weight_normalized: '1' }],
        srcToken: tokenSelect.address,
        srcDecimals: tokenSelect.decimals.toString(),
        amount: amountTokenIn.toString(),
        chainId: pool.chain_id.toString()
      })

    const datas = await operation.getDatasTx(slippage.value, transactionsDataTx)
    setTrasactionData(datas[0])
    return {
      amountsTokenIn,
      transactionsDataTx: datas
    }
  }

  async function handleTokenSelected() {
    const tokensChecked = checkTokenInThePool(
      pool.underlying_assets,
      tokenSelect.address
    )
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(
      pool.underlying_assets
    )

    const tokenAddressOrYRT =
      tokensChecked?.is_wraps === 1
        ? tokensChecked?.yrt
        : tokensChecked?.address

    const tokenInAddress =
      tokensChecked && tokenAddressOrYRT
        ? tokenAddressOrYRT
        : tokenWithHigherLiquidityPool?.address

    let data1Inch = {
      amountsTokenIn: [Big(amountTokenIn).toFixed()],
      transactionsDataTx: ['']
    }
    if (pool.pool_version === 2) {
      data1Inch = await handleSwapProviderV2()
    } else if (!tokensChecked) {
      data1Inch = await handleSwapProviderV1()
    }

    return {
      tokenInAddress,
      newAmountsTokenIn: data1Inch.amountsTokenIn,
      transactionsDataTx: data1Inch.transactionsDataTx,
      isWrap: tokensChecked
        ? tokensChecked.is_wraps
        : tokenWithHigherLiquidityPool.isWrap
    }
  }

  async function updateAllowance() {
    if (!wallet?.provider || !tokenSelect.address) return
    let value: string
    try {
      const { allowance } = await ERC20(
        tokenSelect.address,
        networks[chainId].rpc
      )

      const allowanceValue = await allowance(
        operation.contractAddress,
        wallet.accounts[0].address
      )
      value = allowanceValue
    } catch (error) {
      value = '0'
    }

    setAmountApproved(Big(value))
    if (NATIVE_ADDRESS !== tokenSelect.address) {
      setApprovals(old => ({
        ...old,
        [typeAction]: Big(value).gte(amountTokenIn)
          ? [Approval.Approved]
          : [Approval.Denied]
      }))
    } else {
      setApprovals(old => ({
        ...old,
        [typeAction]: [Approval.Approved]
      }))
    }
  }

  async function handleApproveSuccess() {
    if (!wallet) return

    const { allowance } = await ERC20(
      tokenSelect.address,
      networks[chainId].rpc
    )

    let approved = false
    while (!approved) {
      await new Promise(r => setTimeout(r, 1000)) // sleep
      const allowanceValue = await allowance(
        operation.contractAddress,
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

  async function handleApproveFail() {
    setApprovals(old => {
      return {
        ...old,
        [typeAction]: [Approval.Denied]
      }
    })

    dispatch(
      setModalAlertText({
        errorText: `Failed to approve ${tokenSelect.symbol}. Please try again later.`
      })
    )
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
        amountPool.toFixed() !== outAssetBalance.toFixed() &&
        amountPool.gt(0)
      )
        break
    }

    const amountToken = await getBalanceToken(
      tokenSelect.address,
      wallet.accounts[0].address,
      chainId,
      pool.pool_version === 1 ? pool.chain.addressWrapped : undefined
    )

    const { allowance } = await ERC20(
      tokenSelect.address,
      networks[chainId].rpc
    )
    const allowanceValue = await allowance(
      operation.contractAddress,
      wallet.accounts[0].address
    )

    setAmountApproved(Big(allowanceValue))
    setSelectedTokenInBalance(amountToken)
    setOutAssetBalance(amountPool)
    setAmountTokenOut(Big(0))
    setAmountTokenOuttWithoutFees(Big(0))
    setAmountTokenIn(Big(0))
    if (inputAmountTokenRef && inputAmountTokenRef.current !== null) {
      inputAmountTokenRef.current.value = ''
    }
  }

  async function handleTransactionFail() {
    trackCancelBuying()

    dispatch(
      setModalAlertText({
        errorText: `Failed to invest in ${pool.symbol}. Please try again later.`
      })
    )
  }

  const submitAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!wallet?.provider) return

    const slippageVal = slippage.value
    const slippageExpInBig = Big(10).pow(
      Big(2 + (slippageVal.split('.')[1]?.length || 0)).toNumber()
    )
    const slippageBaseInBig = slippageExpInBig.sub(
      Big(slippageVal.replace('.', ''))
    )

    try {
      if (
        approvals[typeAction][0] === 0 &&
        tokenSelect.address !== NATIVE_ADDRESS
      ) {
        const { approve } = await ERC20(
          tokenSelect.address,
          networks[chainId].rpc,
          {
            wallet: wallet,
            txNotification: txNotification,
            transactionErrors: transactionErrors
          }
        )
        approve(
          operation.contractAddress,
          {
            error: `Failed to approve ${tokenSelect.symbol}`,
            pending: `Waiting approval of ${tokenSelect.symbol}...`,
            sucess: `Approval of ${tokenSelect.symbol} confirmed, wait while we sync with the latest block of the blockchain.`
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

      trackBuying(
        pool.id,
        pool.symbol,
        data?.pool?.price_usd,
        pool.chain.chainName
      )

      try {
        const response: any = await operation.joinswapExternAmountIn({
          tokenInAddress: tokenSelect.address,
          tokenAmountIn: Big(amountTokenIn).toFixed(0),
          minPoolAmountOut: amountTokenOut
            .mul(slippageBaseInBig)
            .div(slippageExpInBig)
            .toFixed(0),
          userWalletAddress: wallet.accounts[0].address,
          data: trasactionData,
          hasTokenInPool: !!checkTokenInThePool(
            pool.underlying_assets,
            tokenSelect.address
          ),
          slippage: slippageVal
        })

        trackBought(
          response?.hash ?? '0x',
          Number(Big(amountTokenIn).toFixed(0)),
          0
        )

        await txNotification(
          response,
          {
            error: `Failed to invest in ${pool.symbol}. Please try again later.`,
            pending: `Confirming investment in ${pool.symbol}...`,
            sucess: `Investment in ${pool.symbol} confirmed`
          },
          { onFail: handleTransactionFail, onSuccess: handleTransactionSuccess }
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
  // get contract approval of tokens

  // verificar se o token está aprovado
  React.useEffect(() => {
    if (chainId !== pool.chain_id) {
      return
    }
    updateAllowance()
  }, [typeAction, tokenSelect.address, wallet, chainId])

  // calculate investment
  React.useEffect(() => {
    if (
      typeAction !== 'Invest' ||
      tokenSelect.address.length === 0 ||
      pool.id.length === 0 ||
      Big(amountTokenIn).lte(0)
      // swapInAddress === crpPoolAddress
    ) {
      updateAllowance()
      setAmountTokenOut(Big(0))
      setAmountTokenOuttWithoutFees(Big(0))
      setErrorMsg('')
      return
    }

    if (!(inputAmountTokenRef && inputAmountTokenRef.current !== null)) return

    const valueFormatted = decimalToBN(
      inputAmountTokenRef.current.value,
      tokenSelect.decimals
    )
    if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

    if (chainId !== pool.chain_id) {
      setAmountTokenOut(Big(0))
      setAmountTokenOuttWithoutFees(Big(0))
      return
    }

    async function generateEstimatedGas(transactionDataTx: any) {
      if (!wallet?.provider) return

      const response = await operation.estimatedGas({
        userWalletAddress: wallet.accounts[0].address,
        tokenInAddress: tokenSelect.address,
        minPoolAmountOut: '0',
        amountTokenIn: Big(amountTokenIn).toFixed(0),
        data: transactionDataTx
      })

      if (response) {
        setGasFee(prevState => ({
          ...prevState,
          feeString: response.feeString,
          feeNumber: response.feeNumber
        }))
      }
    }

    const calc = async () => {
      if (
        !(inputAmountTokenRef && inputAmountTokenRef.current !== null) ||
        !wallet?.provider
      )
        return

      try {
        const valueFormatted = decimalToBN(
          inputAmountTokenRef.current.value,
          tokenSelect.decimals
        )
        if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

        const tokenSelected = await handleTokenSelected()

        const {
          investAmountOut,
          investAmountOutWithoutFees,
          transactionError
        } = await operation.calcInvestAmountOut({
          tokenSelected,
          tokenInAddress: tokenSelect.address,
          userWalletAddress: wallet.accounts[0].address,
          minAmountOut: BigInt(0),
          selectedTokenInBalance,
          amountTokenIn: Big(amountTokenIn)
        })

        setAmountTokenOut(Big(investAmountOut.toString()))
        setAmountTokenOuttWithoutFees(
          Big(
            investAmountOutWithoutFees
              ? investAmountOutWithoutFees.toString()
              : investAmountOut.toString()
          )
        )
        if (transactionError) {
          setErrorMsg(transactionError)
        }

        if (tokenSelect.address === NATIVE_ADDRESS) {
          await generateEstimatedGas(tokenSelected.transactionsDataTx[0])
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorStr = error.toString()
        if (wallet?.provider) {
          if (errorStr.search('ERR_BPOW_BASE_TOO_HIGH') > -1) {
            ToastWarning(
              "The amount can't be more than half of what's in the pool!"
            )
            return
          }
          ToastWarning(
            'Could not connect with the blockchain to calculate prices.'
          )
        }
      }
    }

    const verifyIsApproved = () => {
      if (
        amountApproved.lt(amountTokenIn) &&
        NATIVE_ADDRESS !== tokenSelect.address
      ) {
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
    setAmountTokenOut(Big(0))
    setAmountTokenOuttWithoutFees(Big(0))
  }, [pool, tokenSelect, amountTokenIn])

  React.useEffect(() => {
    if (!inputAmountTokenRef?.current?.value) {
      setPriceImpact(Big(0))
      return
    }

    if (Big(amountTokenIn).gt(0) && parseFloat(amountTokenOut.toString()) > 0) {
      const usdAmountIn = Big(amountTokenIn)
        .mul(Big(priceToken(tokenSelect.address.toLowerCase()) || 0))
        .div(Big(10).pow(tokenSelect.decimals || 18))

      const poolPrice = getPoolPrice({
        assets: pool.underlying_assets,
        poolSupply: pool.supply,
        priceToken
      })

      const usdAmountOut = Big(amountTokenOutWithoutFees)
        .mul(Big(poolPrice))
        .div(Big(10).pow(Number(data?.pool?.decimals || 18)))

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
  }, [tokenSelect, amountTokenOutWithoutFees])

  React.useEffect(() => {
    if (tokenSelect.address !== NATIVE_ADDRESS || Big(amountTokenIn).lte(0))
      return

    const gasFeeBig = Big(String(gasFee?.feeNumber) || '0')

    const balanceMinusFee = Big(amountTokenIn).sub(gasFeeBig)

    if (
      tokenSelect.address === NATIVE_ADDRESS &&
      Big(amountTokenIn).lte(selectedTokenInBalance) &&
      Big(amountTokenIn).gte(balanceMinusFee)
    ) {
      setGasFee({ ...gasFee, error: true })
      return
    }

    setGasFee({ ...gasFee, error: false })
  }, [tokenSelect, amountTokenOut])

  return (
    <S.Invest onSubmit={submitAction}>
      <InputAndOutputValueToken
        typeAction={typeAction}
        amountTokenIn={amountTokenIn}
        setAmountTokenIn={setAmountTokenIn}
        selectedTokenInBalance={selectedTokenInBalance}
        setSelectedTokenInBalance={setSelectedTokenInBalance}
        maxActive={maxActive}
        setMaxActive={setMaxActive}
        inputAmountTokenRef={inputAmountTokenRef}
        errorMsg={errorMsg}
        gasFee={gasFee}
      />
      <img
        src="/assets/icons/arrow-down.svg"
        alt=""
        style={{ margin: '12px 0' }}
      />
      <TokenAssetOut
        typeAction={typeAction}
        amountTokenOut={amountTokenOut}
        outAssetBalance={outAssetBalance}
        setOutAssetBalance={setOutAssetBalance}
      />

      <S.TransactionSettingsContainer>
        <S.ExchangeRate>
          <S.SpanLight>Price Impact:</S.SpanLight>
          <S.PriceImpactWrapper
            price={Number(BNtoDecimal(priceImpact, 18, 2, 2)) ?? 0}
          >
            {BNtoDecimal(priceImpact, 18, 2, 2)}%
          </S.PriceImpactWrapper>
        </S.ExchangeRate>
        <S.ExchangeRate>
          {/* <S.SpanLight>{title} fee:</S.SpanLight>
          <S.SpanLight>{fees[title]}%</S.SpanLight> */}
          <S.SpanLight>Invest fee:</S.SpanLight>
          <S.SpanLight>
            {Big(data?.pool?.fee_join_manager || '0')
              .add(data?.pool?.fee_join_broker || '0')
              .mul(100)
              .toFixed(2)}
            %
          </S.SpanLight>
        </S.ExchangeRate>
      </S.TransactionSettingsContainer>
      <S.TransactionSettingsOptions>
        <TransactionSettings slippage={slippage} setSlippage={setSlippage} />
      </S.TransactionSettingsOptions>
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
                  amountTokenOut.toString() === '0' ||
                  errorMsg?.length > 0))
            }
            fullWidth
            type="submit"
            text={
              approvals[typeAction][0] === Approval.Approved
                ? amountTokenIn.toString() !== '0' ||
                  inputAmountTokenRef?.current?.value !== null
                  ? `${typeAction} ${
                      '$' +
                      BNtoDecimal(
                        Big(amountTokenIn.toString())
                          .mul(
                            Big(
                              priceToken(tokenSelect.address.toLowerCase()) || 0
                            )
                          )
                          .div(Big(10).pow(Number(tokenSelect.decimals))),
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
    </S.Invest>
  )
}

export default Invest
