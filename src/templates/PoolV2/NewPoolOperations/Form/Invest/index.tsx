import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import Tippy from '@tippyjs/react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import { ZeroAddress, isAddress } from 'ethers'

import { usePoolInfo } from '@/hooks/query/usePoolInfo'
import { NATIVE_ADDRESS, networks } from '@/constants/tokenAddresses'
import { usePoolData } from '@/hooks/query/usePoolData'
import { useReferralDecrypt } from '@/hooks/query/useReferralDecrypt'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { ERC20 } from '@/hooks/useERC20'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import useTransaction from '@/hooks/useTransaction'

import { BNtoDecimal } from '@/utils/numerals'
import {
  checkTokenInThePool,
  checkTokenWithHigherLiquidityPool,
  getBalanceToken,
  getTokenWrapped,
  decimalToBN,
  getPoolPrice
} from '@/utils/poolUtils'

import { ToastWarning } from '@/components/Toastify/toast'
import Button from '@/components/Button'

import PoolOperationContext from '../PoolOperationContext'

import TokenAssetOut from '../TokenAssetOut'
import WarningCard from '@/components/WarningCard'
import TransactionSettings from '../TransactionSettings'
import SkeletonLoading from '@/components/SkeletonLoading'
import InputAndOutputValueToken from '../InputAndOutputValueToken'

import * as S from './styles'

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

type SwapProvider = {
  amountsTokenIn: string[]
  transactionsDataTx: string[]
  transactionError?: string
}

type Approvals = { [key in Titles]: Approval[] }

type Asset = {
  balance: string
  weight_normalized: string
  weight_goal_normalized: string
  token: {
    id: string
    name: string
    logo?: string | null | undefined
    symbol: string
    decimals: number
    is_wrap_token: number
    wraps?:
      | {
          id: string
          decimals: number
          symbol: string
          name: string
          logo?: string | null | undefined
        }
      | null
      | undefined
  }
}

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
  const [isLoading, setIsLoading] = React.useState(false)

  const [{ wallet, connecting }, connect] = useConnectWallet()
  const { tokenSelect } = useAppSelector(state => state)
  const [{ connectedChain }, setChain] = useSetChain()
  const { txNotification, transactionErrors } = useTransaction()
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router?.query.address as string })
  const { data } = usePoolInfo({
    id: pool?.id || '',
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
  })
  const { data: referralData } = useReferralDecrypt({
    enabled: !!wallet && !!router.query.referral,
    hash:
      typeof router.query.referral === 'string'
        ? router.query.referral
        : undefined
  })

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const dispatch = useAppDispatch()

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  async function handleSwapProviderV2(): Promise<SwapProvider> {
    const { fromAddress, fromDecimals } =
      tokenSelect.address === NATIVE_ADDRESS && pool
        ? {
            fromAddress: pool.chain?.address_wrapped,
            fromDecimals: pool.chain?.token_decimals
          }
        : {
            fromAddress: tokenSelect.address,
            fromDecimals: tokenSelect.decimals
          }

    let sortAddresses: Asset[] = []
    if (pool) {
      const underlying_assets: Record<string, Asset> = {}
      for (const asset of pool.underlying_assets) {
        Object.assign(underlying_assets, {
          [asset.token.id]: asset
        })
      }
      sortAddresses = pool.underlying_assets_addresses.map(
        address => underlying_assets[address]
      )
    }
    const destTokens = sortAddresses.map(token => {
      return {
        id: token.token.id,
        decimals: token.token.decimals,
        amount: Big(amountTokenIn.toString())
          .mul(token.weight_normalized)
          .toFixed(0)
      }
    })
    const { tokenAmounts, transactionError, transactionsDataTx } =
      await operation.getAmountsOut({
        chainId: pool?.chain_id?.toString() || '',
        destToken: destTokens,
        srcToken: [
          {
            id: fromAddress || '',
            decimals: fromDecimals || 18
          }
        ]
      })

    setTrasactionData(transactionsDataTx)
    return {
      amountsTokenIn: tokenAmounts,
      transactionsDataTx,
      transactionError
    }
  }

  async function handleSwapProviderV1(): Promise<SwapProvider> {
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(
      pool?.underlying_assets || []
    )
    const tokenWrappedAddress = getTokenWrapped(
      pool?.underlying_assets || [],
      tokenWithHigherLiquidityPool.address
    )

    if (!tokenWrappedAddress) {
      return {
        amountsTokenIn: ['0'],
        transactionsDataTx: ['0x']
      }
    }

    const srcToken = [
      {
        id: tokenSelect.address,
        decimals: tokenSelect.decimals || 18,
        amount: amountTokenIn.toString()
      }
    ]
    const { tokenAmounts, transactionsDataTx } = await operation.getAmountsOut({
      chainId: pool?.chain_id?.toString() || '',
      destToken: [
        {
          id: tokenWrappedAddress.token.id,
          decimals: tokenWrappedAddress.token.decimals
        }
      ],
      srcToken
    })

    const datas = await operation.getDatasTx(slippage.value, transactionsDataTx)
    setTrasactionData(datas[0])
    return {
      amountsTokenIn: tokenAmounts,
      transactionsDataTx: datas
    }
  }

  async function handleTokenSelected() {
    const tokensChecked = checkTokenInThePool(
      pool?.underlying_assets || [],
      tokenSelect.address
    )
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(
      pool?.underlying_assets || []
    )

    const tokenAddressOrYRT =
      tokensChecked?.is_wraps === 1
        ? tokensChecked?.yrt
        : tokensChecked?.address

    const tokenInAddress =
      tokensChecked && tokenAddressOrYRT
        ? tokenAddressOrYRT
        : tokenWithHigherLiquidityPool?.address

    let data1Inch: SwapProvider = {
      amountsTokenIn: [Big(amountTokenIn).toFixed()],
      transactionsDataTx: ['']
    }
    if (pool?.pool_version === 2) {
      data1Inch = await handleSwapProviderV2()
    } else if (!tokensChecked) {
      data1Inch = await handleSwapProviderV1()
    }

    return {
      tokenInAddress,
      newAmountsTokenIn: data1Inch.amountsTokenIn,
      transactionsDataTx: data1Inch.transactionsDataTx,
      transactionError: data1Inch?.transactionError,
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
        pool?.address || '',
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
      pool?.pool_version === 1
        ? pool?.chain?.address_wrapped || undefined
        : undefined
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
        errorText: `Failed to invest in ${pool?.symbol}. Please try again later.`
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

    let referrerAddress = ZeroAddress
    if (referralData) {
      referrerAddress = isAddress(referralData.value)
        ? referralData.value
        : ZeroAddress
    }

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
        pool?.id || '',
        pool?.symbol || '',
        Number(data?.price_usd),
        pool?.chain?.name || ''
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
          referrerAddress,
          data: trasactionData,
          hasTokenInPool: !!checkTokenInThePool(
            pool?.underlying_assets || [],
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
            error: `Failed to invest in ${pool?.symbol}. Please try again later.`,
            pending: `Confirming investment in ${pool?.symbol}...`,
            sucess: `Investment in ${pool?.symbol} confirmed`
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

  // verificar se o token está aprovado
  React.useEffect(() => {
    if (chainId !== pool?.chain_id) {
      return
    }
    updateAllowance()
  }, [typeAction, tokenSelect.address, wallet, chainId])

  // calculate investment
  React.useEffect(() => {
    if (
      typeAction !== 'Invest' ||
      tokenSelect.address.length === 0 ||
      pool?.id?.length === 0 ||
      Big(amountTokenIn).lte(0)
      // swapInAddress === crpPoolAddress
    ) {
      updateAllowance()
      setAmountTokenOut(Big(0))
      setAmountTokenOuttWithoutFees(Big(0))
      setErrorMsg('')
      setIsLoading(false)
      return
    }

    if (!(inputAmountTokenRef && inputAmountTokenRef.current !== null)) return
    setIsLoading(true)

    const valueFormatted = decimalToBN(
      inputAmountTokenRef.current.value,
      tokenSelect?.decimals || 18
    )
    if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

    if (chainId !== pool?.chain_id) {
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
          tokenSelect?.decimals || 18
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
        if (tokenSelected.transactionError) {
          setErrorMsg(tokenSelected.transactionError)
        }

        if (tokenSelect.address === NATIVE_ADDRESS) {
          await generateEstimatedGas(tokenSelected.transactionsDataTx[0])
        }
        setIsLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoading(false)
        const errorStr = error.toString()
        if (wallet?.provider) {
          if (errorStr.search('ERR_BPOW_BASE_TOO_HIGH') > -1) {
            ToastWarning(
              "The amount can't be more than half of what's in the pool!"
            )
            return
          }
          // ToastWarning(
          //   'Could not connect with the blockchain to calculate prices.'
          // )
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
        assets: pool?.underlying_assets || [],
        poolSupply: pool?.supply ?? '',
        priceToken
      })

      const usdAmountOut = Big(amountTokenOutWithoutFees)
        .mul(Big(poolPrice))
        .div(Big(10).pow(Number(data?.decimals || 18)))

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
        gasFee={gasFee}
        setIsLoading={setIsLoading}
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
        isLoading={isLoading}
      />

      <S.TransactionSettingsContainer>
        <S.WarningCardContainer>
          <WarningCard showCard={!!errorMsg}>
            <p>{errorMsg}</p>
          </WarningCard>
        </S.WarningCardContainer>

        <S.ExchangeRate>
          <S.SpanLight>Price Impact:</S.SpanLight>
          <S.PriceImpactWrapper
            price={Number(BNtoDecimal(priceImpact, 18, 2, 2)) ?? 0}
          >
            {isLoading ? (
              <SkeletonLoading height={1.8} width={5} />
            ) : (
              BNtoDecimal(priceImpact, 18, 2, 2)
            )}
          </S.PriceImpactWrapper>
        </S.ExchangeRate>
        <S.ExchangeRate>
          {/* <S.SpanLight>{title} fee:</S.SpanLight>
          <S.SpanLight>{fees[title]}%</S.SpanLight> */}
          <S.SpanLight>Invest fee:</S.SpanLight>
          <S.SpanLight>
            {Big(data?.fee_join_manager || '0')
              .add(data?.fee_join_broker || '0')
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
          background="primary"
          fullWidth
          type="button"
          disabled={connecting}
          onClick={() => connect()}
          text="Connect Wallet"
        />
      ) : chainId === pool?.chain_id ? (
        pool.is_private_pool &&
        !privateInvestors.some(
          address =>
            address.toLowerCase() === wallet?.accounts[0].address.toLowerCase()
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
                background="primary"
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
            background="primary"
            disabledNoEvent={
              approvals[typeAction].length === 0 ||
              approvals[typeAction][0] > Approval.Approved ||
              (approvals[typeAction][0] === Approval.Approved &&
                (amountTokenIn.toString() === '0' ||
                  amountTokenOut.toString() === '0' ||
                  errorMsg?.length > 0)) ||
              isLoading ||
              Big(amountTokenIn).gt(selectedTokenInBalance) ||
              errorMsg.length > 0
            }
            fullWidth
            type="submit"
            text={
              isLoading
                ? 'Looking for best route'
                : approvals[typeAction][0] === Approval.Approved
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
          background="primary"
          fullWidth
          type="button"
          onClick={() =>
            setChain({ chainId: `0x${pool?.chain_id?.toString(16)}` })
          }
          text={`Change to ${pool?.chain?.name}`}
        />
      )}
    </S.Invest>
  )
}

export default Invest
