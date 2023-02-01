import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import { request } from 'graphql-request'

import { addressNativeToken1Inch, URL_1INCH } from '../../../../../constants/tokenAddresses'

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
import { checkTokenInThePool, checkTokenWithHigherLiquidityPool, getTokenWrapped } from '../../../../../utils/poolUtils'

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
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
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
  typeAction: Titles;
}

const Invest = ({ typeAction }: IInvestProps) => {
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  // const [isReload, setIsReload] = React.useState<boolean>(false)
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big | string>(Big(0))
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big>(Big(0))
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
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  const { operation, priceToken } = React.useContext(PoolOperationContext)

  const dispatch = useAppDispatch()

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const { data } = useSWR([GET_INFO_POOL], query =>
    request('https://backend.kassandra.finance', query, {
      id: pool.id
    })
  )

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)

  async function handle1Inch() {
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(pool.underlying_assets)
    const tokenWrappedAddress = getTokenWrapped(pool.underlying_assets, tokenWithHigherLiquidityPool.address)

    const response = await fetch(
      `${URL_1INCH}${pool.chainId}/swap?fromTokenAddress=${
        tokenSelect.address
      }&toTokenAddress=${
        tokenWrappedAddress
      }&amount=${amountTokenIn.toString()}&fromAddress=${
        operation.contractAddress || '0x84f154A845784Ca37Ae962504250a618EB4859dc'
      }&slippage=1&disableEstimate=true`
    )
    const data = await response.json()

    setTrasactionData(data?.tx?.data)
    return { amountTokenIn: data.toTokenAmount || 0, transactionDataTx: data?.tx?.data }
  }

  async function handleTokenSelected() {
    const tokensChecked = checkTokenInThePool(pool.underlying_assets, tokenSelect.address)
    const tokenWithHigherLiquidityPool = checkTokenWithHigherLiquidityPool(pool.underlying_assets)

    const tokenAddressOrYRT =
      tokensChecked?.is_wraps === 1
        ? tokensChecked?.yrt
        : tokensChecked?.address

    const tokenInAddress =
      tokensChecked && tokenAddressOrYRT
        ? tokenAddressOrYRT
        : tokenWithHigherLiquidityPool?.address


    let data1Inch = { amountTokenIn, transactionDataTx: ''}
    if (!tokensChecked) {
      data1Inch = await handle1Inch()
    }

    return {
      tokenInAddress,
      newAmountTokenIn: data1Inch.amountTokenIn,
      transactionDataTx: data1Inch.transactionDataTx,
      isWrap: tokensChecked?.is_wraps
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
            approved = await ERC20(tokenAddress).allowance(
              operation.contractAddress,
              userWalletAddress
            )
            await new Promise(r => setTimeout(r, 200)) // sleep
          }

          setApprovals(old => {
            return {
              ...old,
              [tabTitle]: [Approval.Approved]
            }
          })

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
            dispatch(setModalAlertText({ errorText: `Investment in ${tokenSymbol} cancelled` }))
            return
          }

          dispatch(setModalAlertText({ errorText: `Failed to invest in ${tokenSymbol}. Please try again later.` }))
          return
        }

        trackBought(txHash, amountInUSD, 0)
        ToastWarning(`Confirming investment in ${tokenSymbol}...`)
        const txReceipt = await waitTransaction(txHash)

        if (txReceipt.status) {
          ToastSuccess(`Investment in ${tokenSymbol} confirmed`)
          return
        }
      }
    },
    []
  )

  const submitAction =
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const slippageVal = slippage.value

      const slippageExp = new BigNumber(10).pow(new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0)))
      const slippageBase = slippageExp.sub(new BigNumber(slippageVal.replace('.', '')))

      try {
        if (approvals[typeAction][0] === 0 && tokenSelect.address !== addressNativeToken1Inch) {
          ERC20(tokenSelect.address).approve(
            operation.contractAddress,
            userWalletAddress,
            approvalCallback(tokenSelect.symbol, tokenSelect.address, typeAction)
          )
          return
        }

        trackBuying(pool.id, pool.symbol, data?.pool?.price_usd, pool.chain.chainName)

        operation.joinswapExternAmountIn({
          tokenInAddress: tokenSelect.address,
          tokenAmountIn: new BigNumber(amountTokenIn.toString()),
          minPoolAmountOut: new BigNumber(amountTokenOut.toString()).mul(slippageBase).div(slippageExp),
          userWalletAddress,
          data: trasactionData,
          hasTokenInPool: !!checkTokenInThePool(pool.underlying_assets, tokenSelect.address),
          transactionCallback: investCallback(
            pool.symbol,
            Number(BNtoDecimal(
              Big(amountTokenOut.toString())
                .mul(Big(data?.pool?.price_usd || 0))
                .div(Big(10).pow(data?.pool?.decimals)),
              18,
              2,
              2
            ))
          )
        })
        return
      } catch (error) {
        dispatch(setModalAlertText({ errorText: 'Could not connect with the Blockchain!' }))
      }
    }
  // get contract approval of tokens

  // verificar se o token está aprovado
  React.useEffect(() => {
    if (chainId !== pool.chainId) {
      return
    }

    const handleTokensApproved = async () => {
      const newApprovals: string[] = []

      // if (newApprovals.includes(tokenSelect.address)) return

      if (tokenSelect.address === addressNativeToken1Inch) {
        newApprovals.push(addressNativeToken1Inch)
      } else {
        const isAllowance = await ERC20(tokenSelect.address).allowance(
            operation.contractAddress,
            userWalletAddress
          )

        if (isAllowance) {
          newApprovals.push(tokenSelect.address)
        }
      }

      setApprovals(old => ({
          ...old,
        [typeAction]: newApprovals.length > 0 ?
          [Approval.Approved] :
          [Approval.Denied]
        // [typeAction]: newApprovals.map((item) => item ? Approval.Approved : Approval.Denied)
      }))
    }
    handleTokensApproved()
    // setIsReload(!isReload)
  }, [typeAction, tokenSelect.address, userWalletAddress])

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
      new BigNumber(amountTokenIn.toString()).isZero()
      // swapInAddress === crpPoolAddress
    ) {
      setAmountTokenOut(Big(0))
      return
    }

    if (chainId !== pool.chainId) {
      setAmountTokenOut(Big(0))
      return
    }

    async function generateEstimatedGas(transactionDataTx: any) {
      const response = await operation.estimatedGas({
        userWalletAddress,
        tokenInAddress: tokenSelect.address,
        minPoolAmountOut: new BigNumber('0'),
        amountTokenIn:  new BigNumber(amountTokenIn.toString() || '0'),
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
      try {
        const tokenSelected = await handleTokenSelected()

        const { investAmountOut, transactionError } = await operation.calcInvestAmountOut({
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
        if (tokenSelect.address === addressNativeToken1Inch) {
          await generateEstimatedGas(tokenSelected.transactionDataTx)
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
      .mul(Big(priceToken(tokenSelect.address.toLocaleLowerCase())  || 0))
      .div(Big(10).pow(Number(tokenSelect.decimals || 18)))

      const usdAmountOut = Big(amountTokenOut)
      .mul(Big(data?.pool?.price_usd))
      .div(Big(10).pow(Number(data?.pool?.decimals || 18)))


      const subValue = usdAmountIn.sub(usdAmountOut)

      if (usdAmountIn.gt(0)) {
        const valuePriceImpact = subValue.div(usdAmountIn).mul(100)
        valuePriceImpact.gt(0) ? setPriceImpact(valuePriceImpact) : setPriceImpact(Big(0))
      }
    } else {
      setPriceImpact(Big(0))
    }
  }, [tokenSelect, amountTokenOut])

  React.useEffect(() => {
    if (typeAction === 'Withdraw') return

    const amountInBalanceBN = new BigNumber(selectedTokenInBalance.toString() || 0)
    const amountTokenInBN = new BigNumber(amountTokenIn.toString() || 0)
    const gasFeeBN = new BigNumber(String(gasFee?.feeNumber) || '0')

    const balanceMinusFee = amountInBalanceBN.sub(gasFeeBN)

    if (tokenSelect.address === addressNativeToken1Inch &&
      amountTokenInBN.gt(new BigNumber(0)) &&
      amountTokenInBN.lte(amountInBalanceBN) &&
      amountTokenInBN.gte(balanceMinusFee)
    ){
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
      <TokenAssetOut typeAction={typeAction} amountTokenOut={amountTokenOut} />
      <S.ExchangeRate>
        <S.SpanLight>Price Impact:</S.SpanLight>
        <S.PriceImpactWrapper price={BNtoDecimal(
          priceImpact,
          18,
          2,
          2
        )}>
          {BNtoDecimal(
            priceImpact,
            18,
            2,
            2
          )}%
        </S.PriceImpactWrapper>
      </S.ExchangeRate>
      <S.ExchangeRate>
        {/* <S.SpanLight>{title} fee:</S.SpanLight>
        <S.SpanLight>{fees[title]}%</S.SpanLight> */}
        <S.SpanLight>Invest fee:</S.SpanLight>
        <S.SpanLight>0%</S.SpanLight>
      </S.ExchangeRate>
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
      ) : chainId === pool.chainId ? (
        <Button
          className="btn-submit"
          backgroundPrimary
          disabledNoEvent={
           (approvals[typeAction].length === 0) ||
            (approvals[typeAction][0] > Approval.Approved) ||
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
                ?
                  `${typeAction} ${
                    '$' +
                      BNtoDecimal(
                        Big(amountTokenIn.toString())
                          .mul(
                            Big(priceToken(tokenSelect.address) || 0)

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
      ) : (
        <Button
          className="btn-submit"
          backgroundPrimary
          fullWidth
          type="button"
          onClick={() => changeChain({
            chainId: pool.chain.id, 
            blockExplorerUrl: pool.chain.blockExplorerUrl, 
            chainName: pool.chain.chainName, 
            nativeCurrency: {
              decimals: pool.chain.nativeTokenDecimals,
              symbol: pool.chain.nativeTokenSymbol,
              name: pool.chain.chainName
            },
          rpcUrls: pool.chain.rpcUrls,
          wrapped: pool.chain.addressWrapped})}
          disabled={walletConnect ? true : false}
          text={walletConnect ? `Change manually to ${pool.chain.chainName}` : `Change to ${pool.chain.chainName}`}
        />
      )}
    </S.Invest>
  )
}

export default Invest
