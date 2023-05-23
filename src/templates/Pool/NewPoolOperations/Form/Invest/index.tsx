import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Tippy from '@tippyjs/react'

import {
  addressNativeToken1Inch,
  BACKEND_KASSANDRA,
  URL_1INCH
} from '../../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'
import { setModalWalletActive } from '../../../../../store/reducers/modalWalletActive'

import { ERC20 } from '../../../../../hooks/useERC20Contract'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'

import waitTransaction, {
  MetamaskError,
  TransactionCallback
} from '../../../../../utils/txWait'
import changeChain from '../../../../../utils/changeChain'
import { BNtoDecimal } from '../../../../../utils/numerals'
import {
  checkTokenInThePool,
  checkTokenWithHigherLiquidityPool,
  getBalanceToken,
  getTokenWrapped,
  decimalToBN
} from '../../../../../utils/poolUtils'

import {
  ToastSuccess,
  ToastWarning
} from '../../../../../components/Toastify/toast'
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

// eslint-disable-next-line prettier/prettier
type Approvals = { [key in Titles]: Approval[] }

interface IInvestProps {
  typeAction: Titles
  privateInvestors: string[]
}

const Invest = ({ typeAction, privateInvestors }: IInvestProps) => {
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  // const [isReload, setIsReload] = React.useState<boolean>(false)
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big | string>(Big(0))
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big>(Big(0))
  const [amountApproved, setAmountApproved] = React.useState(Big(0))
  const [priceImpact, setPriceImpact] = React.useState<Big>(Big(0))
  const [walletConnect, setWalletConnect] = React.useState<string | null>(null)
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

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const dispatch = useAppDispatch()

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const { data } = useSWR([GET_INFO_POOL], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id
    })
  )

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  async function handleParaswap(): Promise<{
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

    const { fromAddress, fromDecimals } =
      tokenSelect.address === addressNativeToken1Inch && pool.chain_id === 137
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
        destTokens:
          pool.chain_id === 43114 && tokenWrappedAddress
            ? [{ ...tokenWrappedAddress, weight_normalized: '1' }]
            : sortAddresses,
        srcToken: fromAddress,
        srcDecimals: fromDecimals.toString(),
        amount: amountTokenIn.toString(),
        chainId: pool.chain_id.toString()
      })

    setTrasactionData(['0x'])

    return {
      amountsTokenIn,
      transactionsDataTx
    }
  }

  async function handle1Inch(): Promise<{
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

    const response = await fetch(
      `${URL_1INCH}${pool.chain_id}/swap?fromTokenAddress=${
        tokenSelect.address
      }&toTokenAddress=${tokenWrappedAddress?.token.id}&amount=${Big(
        amountTokenIn
      ).toFixed(0)}&fromAddress=${
        operation.contractAddress ||
        '0x84f154A845784Ca37Ae962504250a618EB4859dc'
      }&slippage=1&disableEstimate=true`
    )
    const data = await response.json()

    setTrasactionData(data?.tx?.data)
    return {
      amountsTokenIn: [data.toTokenAmount || 0],
      transactionsDataTx: [data?.tx?.data]
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
    if (!tokensChecked || pool.pool_version === 2) {
      data1Inch = await handleParaswap()
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
    const allowance = await ERC20(tokenSelect.address).allowance(
      operation.contractAddress,
      userWalletAddress
    )

    setAmountApproved(Big(allowance))
    if (addressNativeToken1Inch !== tokenSelect.address) {
      setApprovals(old => ({
        ...old,
        [typeAction]: Big(allowance).gte(amountTokenIn)
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
            const allowance = await ERC20(tokenAddress).allowance(
              operation.contractAddress,
              userWalletAddress
            )
            if (
              amountApproved.toFixed() !== Big(allowance).toFixed() ||
              amountApproved.gte(amountTokenIn)
            ) {
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

  const investCallback = React.useCallback(
    (tokenSymbol: string, amountInUSD: number): TransactionCallback => {
      return async (error: MetamaskError, txHash: string) => {
        if (error) {
          trackCancelBuying()

          if (error.code === 4001) {
            dispatch(
              setModalAlertText({
                errorText: `Investment in ${tokenSymbol} cancelled`
              })
            )
            return
          }

          dispatch(
            setModalAlertText({
              errorText: `Failed to invest in ${tokenSymbol}. Please try again later.`
            })
          )
          return
        }

        trackBought(txHash, amountInUSD, 0)
        ToastWarning(`Confirming investment in ${tokenSymbol}...`)
        const txReceipt = await waitTransaction(txHash)

        if (txReceipt.status) {
          ToastSuccess(`Investment in ${tokenSymbol} confirmed`)
          let amountPool = Big(0)
          for (let index = 0; index < 100; index++) {
            await new Promise(r => setTimeout(r, 500))
            amountPool = await getBalanceToken(pool.address, userWalletAddress)
            if (
              amountPool.toFixed() !== outAssetBalance.toFixed() &&
              amountPool.gt(0)
            )
              break
          }

          const amountToken = await getBalanceToken(
            tokenSelect.address,
            userWalletAddress,
            pool.pool_version === 1 ? pool.chain.addressWrapped : undefined
          )
          const allowance = await ERC20(tokenSelect.address).allowance(
            operation.contractAddress,
            userWalletAddress
          )

          setAmountApproved(Big(allowance))
          setSelectedTokenInBalance(amountToken)
          setOutAssetBalance(amountPool)
          setAmountTokenOut(Big(0))
          setAmountTokenIn(Big(0))
          if (inputAmountTokenRef && inputAmountTokenRef.current !== null) {
            inputAmountTokenRef.current.value = ''
          }

          return
        }
      }
    },
    []
  )

  const submitAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const slippageVal = slippage.value

    const slippageExp = new BigNumber(10).pow(
      new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0))
    )
    const slippageBase = slippageExp.sub(
      new BigNumber(slippageVal.replace('.', ''))
    )

    try {
      if (
        approvals[typeAction][0] === 0 &&
        tokenSelect.address !== addressNativeToken1Inch
      ) {
        ERC20(tokenSelect.address).approve(
          operation.contractAddress,
          userWalletAddress,
          approvalCallback(tokenSelect.symbol, tokenSelect.address, typeAction)
        )
        return
      }

      trackBuying(
        pool.id,
        pool.symbol,
        data?.pool?.price_usd,
        pool.chain.chainName
      )

      operation.joinswapExternAmountIn({
        tokenInAddress: tokenSelect.address,
        tokenAmountIn: new BigNumber(Big(amountTokenIn).toFixed()),
        minPoolAmountOut: new BigNumber(amountTokenOut.toFixed(0))
          .mul(slippageBase)
          .div(slippageExp),
        userWalletAddress,
        data: trasactionData,
        hasTokenInPool: !!checkTokenInThePool(
          pool.underlying_assets,
          tokenSelect.address
        ),
        transactionCallback: investCallback(
          pool.symbol,
          Number(
            BNtoDecimal(
              Big(amountTokenOut.toFixed())
                .mul(data?.pool?.price_usd || 0)
                .div(Big(10).pow(data?.pool?.decimals)),
              18,
              2,
              2
            )
          )
        )
      })
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
  }, [typeAction, tokenSelect.address, userWalletAddress, chainId])

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
      return
    }

    async function generateEstimatedGas(transactionDataTx: any) {
      const response = await operation.estimatedGas({
        userWalletAddress,
        tokenInAddress: tokenSelect.address,
        minPoolAmountOut: new BigNumber('0'),
        amountTokenIn: new BigNumber(Big(amountTokenIn).toFixed() || '0'),
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
      if (!(inputAmountTokenRef && inputAmountTokenRef.current !== null)) return

      try {
        const valueFormatted = decimalToBN(
          inputAmountTokenRef.current.value,
          tokenSelect.decimals
        )
        if (Big(amountTokenIn).cmp(Big(valueFormatted)) !== 0) return

        const tokenSelected = await handleTokenSelected()

        const { investAmountOut, transactionError } =
          await operation.calcInvestAmountOut({
            tokenSelected,
            tokenInAddress: tokenSelect.address,
            userWalletAddress,
            minAmountOut: new BigNumber('0'),
            selectedTokenInBalance,
            amountTokenIn: Big(amountTokenIn)
          })

        setAmountTokenOut(Big(investAmountOut.toString()))
        if (transactionError) {
          setErrorMsg(transactionError)
        }

        if (tokenSelect.name === pool.chain.nativeTokenName) {
          await generateEstimatedGas(tokenSelected.transactionsDataTx[0])
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorStr = error.toString()
        if (userWalletAddress.length > 0) {
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
        addressNativeToken1Inch !== tokenSelect.address
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
  }, [pool, tokenSelect, amountTokenIn])

  React.useEffect(() => {
    if (!inputAmountTokenRef?.current?.value) {
      setPriceImpact(Big(0))
      return
    }

    if (Big(amountTokenIn).gt(0) && parseFloat(amountTokenOut.toString()) > 0) {
      const usdAmountIn = Big(amountTokenIn)
        .mul(Big(priceToken(tokenSelect.address.toLocaleLowerCase()) || 0))
        .div(Big(10).pow(tokenSelect.decimals || 18))

      const usdAmountOut = Big(amountTokenOut)
        .mul(Big(data?.pool?.price_usd || 0))
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
  }, [tokenSelect, amountTokenOut])

  React.useEffect(() => {
    if (
      tokenSelect.name !== pool.chain.nativeTokenName ||
      Big(amountTokenIn).lte(0)
    )
      return

    const gasFeeBig = Big(String(gasFee?.feeNumber) || '0')

    const balanceMinusFee = Big(amountTokenIn).sub(gasFeeBig)

    if (
      tokenSelect.name === pool.chain.nativeTokenName &&
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
        pool.is_private_pool &&
        !privateInvestors.some(address => address === userWalletAddress) ? (
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
                          .mul(Big(priceToken(tokenSelect.address) || 0))
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
            changeChain({
              chainId: pool.chain.id,
              chainName: pool.chain.chainName,
              rpcUrls: pool.chain.rpcUrls,
              nativeCurrency: {
                decimals: pool.chain.nativeTokenDecimals,
                name: pool.chain.nativeTokenName,
                symbol: pool.chain.nativeTokenSymbol
              }
            })
          }
          disabled={walletConnect ? true : false}
          text={
            walletConnect
              ? `Change manually to ${pool.chain.chainName}`
              : `Change to ${pool.chain.chainName}`
          }
        />
      )}
    </S.Invest>
  )
}

export default Invest
