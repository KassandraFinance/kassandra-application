import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'

import {
  addressNativeToken1Inch,
  ProxyContract,
  URL_1INCH
} from '../../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'
import { setModalWalletActive } from '../../../../../store/reducers/modalWalletActive'

import useProxy from '../../../../../hooks/useProxy'
import useERC20Contract, { ERC20 } from '../../../../../hooks/useERC20Contract'
import usePoolContract from '../../../../../hooks/usePoolContract'
import useYieldYak from '../../../../../hooks/useYieldYak'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'
import useCoingecko from '../../../../../hooks/useCoingecko'

import waitTransaction, {
  MetamaskError,
  TransactionCallback
} from '../../../../../utils/txWait'
import changeChain from '../../../../../utils/changeChain'

import {
  ToastSuccess,
  ToastWarning
} from '../../../../../components/Toastify/toast'
import Button from '../../../../../components/Button'

import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'

import * as S from './styles'
import { BNtoDecimal } from '../../../../../utils/numerals'

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
  // const [priceImpact, setPriceImpact] = React.useState<Big>(Big(0))
  const [walletConnect, setWalletConnect] = React.useState<string | null>(null)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [approvals, setApprovals] = React.useState<Approvals>({
    Withdraw: [],
    Invest: []
  })

  // const [gasFee, setGasFee] = React.useState({
  //   error: false,
  //   feeNumber: 0,
  //   feeString: ''
  // })
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )

  const { pool, chainId, tokenSelect, tokenList1Inch, userWalletAddress } = useAppSelector(
    state => state
  )
  const dispatch = useAppDispatch()

  const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const proxy = useProxy(ProxyContract, pool.id, pool.core_pool)
  const crpPoolToken = useERC20Contract(pool.id)
  const corePool = usePoolContract(pool.core_pool)
  const yieldYak = useYieldYak()

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)
  // function handleSubmit() {

  // }
  const tokenAddresses = tokenList1Inch.map(token => token.address)

  const { priceToken } = useCoingecko(
    pool.chain.nativeTokenName.toLowerCase(),
    pool.chain.addressWrapped.toLowerCase(),
    tokenAddresses.toString()
  )

  async function handle1Inch() {
    const tokenWithHigherLiquidityPool =
      await corePool.checkTokenWithHigherLiquidityPool()

    const response = await fetch(
      `${URL_1INCH}${pool.chainId}/swap?fromTokenAddress=${
        tokenSelect.address
      }&toTokenAddress=${
        tokenWithHigherLiquidityPool.address
      }&amount=${amountTokenIn}&fromAddress=${
        ProxyContract || '0x84f154A845784Ca37Ae962504250a618EB4859dc'
      }&slippage=1&disableEstimate=true`
    )

    const data = await response.json()
    return data.toTokenAmount || 0
  }

  async function handleTokenSelected() {
    const tokensChecked = await corePool.checkTokenInThePool(
      tokenSelect.address
    )
    const tokenWithHigherLiquidityPool =
      await corePool.checkTokenWithHigherLiquidityPool()

    const tokenAddressOrYRT =
      tokensChecked?.is_wraps === 1
        ? tokensChecked?.yrt
        : tokensChecked?.address

    const tokenInAddress =
      tokensChecked && tokenAddressOrYRT
        ? tokenAddressOrYRT
        : tokenWithHigherLiquidityPool?.address
    
        
    let newAmountTokenIn = amountTokenIn
    if (!tokensChecked) {
      newAmountTokenIn = await handle1Inch()
    }

    return { tokenInAddress, newAmountTokenIn, isWrap: tokensChecked?.is_wraps  }
  }

  const approvalCallback = React.useCallback(
    (
      tokenSymbol: string,
      tokenAddress: string,
      tabTitle: Titles
    ): TransactionCallback => {
      console.log('entrou callback')
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

        // setApprovals((old: { [x: string]: Iterable<unknown> | ArrayLike<unknown> }) => {
        //   const approvals = Array.from(old[tabTitle])
        //   approvals[tokenAddress2Index[tokenAddress]] =
        //     Approval.WaitingTransaction

        //   return {
        //     ...old,
        //     [tabTitle]: approvals
        //   }
        // })
        ToastWarning(`Waiting approval of ${tokenSymbol}...`)
        const txReceipt = await waitTransaction(txHash)
        // setApprovals(old => {
        //   const approvals = Array.from(old[tabTitle])
        //   approvals[tokenAddress2Index[tokenAddress]] = Approval.Syncing

        //   return {
        //     ...old,
        //     [tabTitle]: approvals
        //   }
        // })

        if (txReceipt.status) {
          ToastSuccess(
            `Approval of ${tokenSymbol} confirmed, wait while we sync with the latest block of the blockchain.`
          )
          let approved = false

          while (!approved) {
            approved = await ERC20(tokenAddress).allowance(
              ProxyContract,
              userWalletAddress
            )
            await new Promise(r => setTimeout(r, 200)) // sleep
          }

          // setApprovals(old => {
          //   const approvals = Array.from(old[tabTitle])
          //   approvals[tokenAddress2Index[tokenAddress]] = Approval.Approved

          //   return {
          //     ...old,
          //     [tabTitle]: approvals
          //   }
          // })

          return
        }

        // setApprovals(old => {
        //   const approvals = Array.from(old[tabTitle])
        //   approvals[tokenAddress2Index[tokenAddress]] = Approval.Denied

        //   return {
        //     ...old,
        //     [tabTitle]: approvals
        //   }
        // })
      }
    },
    [approvals, setApprovals]
  )

  // const investCallback = React.useCallback(
  //   (tokenSymbol: string, amountInUSD: number): TransactionCallback => {
  //     return async (error: MetamaskError, txHash: string) => {
  //       if (error) {
  //         trackCancelBuying()

  //         if (error.code === 4001) {
  //           dispatch(setModalAlertText({ errorText: `Investment in ${tokenSymbol} cancelled` }))
  //           return
  //         }

  //         dispatch(setModalAlertText({ errorText: `Failed to invest in ${tokenSymbol}. Please try again later.` }))
  //         return
  //       }

  //       trackBought(txHash, amountInUSD, 0)
  //       ToastWarning(`Confirming investment in ${tokenSymbol}...`)
  //       const txReceipt = await waitTransaction(txHash)

  //       if (txReceipt.status) {
  //         ToastSuccess(`Investment in ${tokenSymbol} confirmed`)
  //         return
  //       }
  //     }
  //   },
  //   [poolTokensArray]
  // )

  // const withdrawCallback = React.useCallback(
  //   (tokenSymbol: string, amountInUSD: number): TransactionCallback => {
  //     return async (error: MetamaskError, txHash: string) => {
  //       if (error) {
  //         trackCancelBuying()

  //         if (error.code === 4001) {
  //           dispatch(setModalAlertText({ errorText: `Withdrawal of ${tokenSymbol} cancelled` }))
  //           return
  //         }

  //         dispatch(setModalAlertText({ errorText: `Failed to withdraw ${tokenSymbol}. Please try again later.` }))
  //         return
  //       }

  //       trackBought(txHash, amountInUSD, 0)
  //       ToastWarning(`Confirming withdrawal of ${tokenSymbol}...`)
  //       const txReceipt = await waitTransaction(txHash)

  //       if (txReceipt.status) {
  //         ToastSuccess(`Withdrawal of ${tokenSymbol} confirmed`)
  //         return
  //       }
  //     }
  //   },
  //   [crpPoolAddress, ProxyContract]
  // )

  const submitAction = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // const {
      //   approved,
      //   category,
      //   swapInAmountInput,
      //   swapOutAmountInput,
      //   swapInAddressInput,
      //   swapOutAddressInput,
      //   swapInSymbol,
      //   swapOutSymbol,
      //   walletAddress,
      //   amountUSD,
      //   slippageInput,
      //   tabTitleInput
      //   // eslint-disable-next-line prettier/prettier
      // } = e.target as HTMLFormElement & {
      //   approved: HTMLInputElement;
      //   category: HTMLInputElement;
      //   swapInAmountInput: HTMLInputElement;
      //   swapOutAmountInput: HTMLInputElement;
      //   swapInAddressInput: HTMLInputElement;
      //   swapOutAddressInput: HTMLInputElement;
      //   swapInSymbol: HTMLInputElement;
      //   swapOutSymbol: HTMLInputElement;
      //   walletAddress: HTMLInputElement;
      //   amountUSD: HTMLInputElement;
      //   slippageInput: HTMLInputElement;
      //   tabTitleInput: HTMLInputElement;
      // }
      // console.log('asdasdsadwe')
      // const tabTitle = tabTitleInput.value as Titles
      // const amountInUSD = parseFloat(amountUSD.value)
      // const swapInAmountVal = new BigNumber(swapInAmountInput.value)
      // const swapOutAmountVal = swapOutAmountInput.value.split(',').map(
      //   item => new BigNumber(item)
      // )
      // const swapInAddressVal = swapInAddressInput.value
      // const swapOutAddressVal = swapOutAddressInput.value
      // const slippageVal = slippageInput.value

      // const slippageExp = new BigNumber(10).pow(new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0)))
      // const slippageBase = slippageExp.sub(new BigNumber(slippageVal.replace('.', '')))

      try {
        switch (typeAction) {
          case 'Invest':
            if (approvals[typeAction][0] === Approval.Approved  && tokenSelect.address !== addressNativeToken1Inch) {
              ERC20(tokenSelect.address).approve(
                ProxyContract,
                userWalletAddress,
                approvalCallback(tokenSelect.symbol, tokenSelect.address, typeAction)
              )
              return
            }
            trackBuying(crpPoolAddress, poolSymbol, amountInUSD, productCategories)
            proxy.joinswapExternAmountIn(
              swapInAddressVal,
              swapInAmountVal,
              swapOutAmountVal[0].mul(slippageBase).div(slippageExp),
              walletAddress.value,
              investCallback(swapOutSymbol.value, amountInUSD)
            )
            console.log("aprovado")
            return

          // case 'Withdraw':
          //   trackBuying(crpPoolAddress, poolSymbol, -1 * amountInUSD, productCategories)
          //   if (approved.value === '0') {
          //     ERC20(crpPoolAddress).approve(
          //       ProxyContract,
          //       walletAddress.value,
          //       approvalCallback(swapInSymbol.value, swapInAddressVal, tabTitle)
          //     )
          //     return
          //   }
          //   if (swapOutAddressVal !== '') {
          //     proxy.exitswapPoolAmountIn(
          //       swapOutAddressVal,
          //       swapInAmountVal,
          //       swapOutAmountVal[0].mul(slippageBase).div(slippageExp),
          //       walletAddress.value,
          //       withdrawCallback(swapInSymbol.value, -1 * amountInUSD)
          //     )
          //     return
          //   }

          //   corePool.currentTokens()
          //     .then(async tokens => {
          //       const swapOutAmounts = []

          //       for (let i = 0; i < tokens.length; i++) {
          //         swapOutAmounts.push(
          //           swapOutAmountVal[tokenAddress2Index[invertToken[tokens[i]] ?? tokens[i]]]
          //             .mul(slippageBase)
          //             .div(slippageExp)
          //         )
          //       }

          //       const tokensInPool = await corePool.currentTokens()
          //       const tokensWithdraw = tokensInPool.map(token => invertToken[token] ?? token)
          //       proxy.exitPool(
          //         swapInAmountVal,
          //         tokensWithdraw,
          //         swapOutAmounts,
          //         walletAddress.value,
          //         withdrawCallback(swapInSymbol.value, -1 * amountInUSD)
          //       )
          //     })

          //   return

          default:
        }
      } catch (error) {
        dispatch(setModalAlertText({ errorText: 'Could not connect with the Blockchain!' }))
      }
    }, [])

  // get contract approval of tokens
  
  // verificar se o token está aprovado
  React.useEffect(() => {
    if (chainId !== pool.chainId) {
      return
    }

    const handleTokensApproved = async () => {
      const newApprovals: string[] = []

      if (newApprovals.includes(tokenSelect.address)) return

      if (tokenSelect.address === addressNativeToken1Inch) {
        newApprovals.push(addressNativeToken1Inch)
      } else {
        const isAllowance = await ERC20(tokenSelect.address).allowance(
            ProxyContract,
            userWalletAddress
          )

        if (isAllowance) {
          newApprovals.push(tokenSelect.address)
        }

      }

      setApprovals((old: any) => ({
          ...old,
        [typeAction]: newApprovals.map((item) => item ? Approval.Approved : Approval.Denied)
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
      pool.id.length === 0
      // swapInAddress === crpPoolAddress
    ) {
      return
    }

    if (chainId !== pool.chainId) {
      setAmountTokenOut(Big(0))
      return
    }

    // async function generateEstimatedGas() {
    //   const response = await proxy.estimatedGas(
    //     userWalletAddress,
    //     tokenSelect.address,
    //     new BigNumber('0')
    //   )

    //   if (response) {
    //     setGasFee(prevState => ({
    //       ...prevState,
    //       feeString: response.feeString,
    //       feeNumber: response.feeNumber
    //     }))
    //   }
    // }

    const calc = async () => {
      try {
        const { tokenInAddress, newAmountTokenIn, isWrap } = await handleTokenSelected()

        const [
          tokenInTotalPoolBalance,
          tokenInDenormalizedWeight,
          poolSupply,
          poolTotalDenormalizedWeight,
          poolSwapFee
        ] = await Promise.all([
          corePool.balance(tokenInAddress),
          corePool.denormalizedWeight(tokenInAddress),
          crpPoolToken.totalSupply(),
          corePool.totalDenormalizedWeight(),
          corePool.swapFee()
        ])
        
        try {
          const newSwapOutAmount = await proxy.tryJoinswapExternAmountIn(
            tokenInAddress,
            new BigNumber(newAmountTokenIn.toString()),
            new BigNumber('0'),
            userWalletAddress
          )

          // await generateEstimatedGas()
          setAmountTokenOut(Big(newSwapOutAmount))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

          let investAmoutInCalc: BigNumber = new BigNumber(
            newAmountTokenIn.toString()
          )

          if (isWrap) {
            investAmoutInCalc = await yieldYak.convertBalanceWrappedYRT(
              new BigNumber(newAmountTokenIn.toString()),
              tokenInAddress
            )
          }
          const newSwapOutPrice = await corePool.calcPoolOutGivenSingleIn(
            tokenInTotalPoolBalance,
            tokenInDenormalizedWeight,
            poolSupply,
            poolTotalDenormalizedWeight,
            investAmoutInCalc,
            poolSwapFee
          )

          setAmountTokenOut(Big(newSwapOutPrice.toString()))

          if (userWalletAddress.length > 0) {
            const errorStr = error.toString()
            if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
              setErrorMsg('This amount is too low for the pool!')
              return
            }
            if (errorStr.search('ERR_MAX_IN_RATIO') > -1) {
              setErrorMsg(
                "The amount can't be more than half of what's in the pool!"
              )
              return
            }
            if (
              Big(newAmountTokenIn).gt(selectedTokenInBalance) &&
              Number(newAmountTokenIn.toString()) > 0
            ) {
              setErrorMsg('This amount exceeds your balance!')
              return
            }
          }
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

  // Calc Price Impact
  // React.useEffect(() => {
  //   if (!inputTokenRef?.current?.value) {
  //     setPriceImpact(Big(0))
  //     return
  //   }
  //   const amountInput = Big(Number(inputTokenRef.current.value)).mul(
  //     Big(10).pow(
  //       poolTokensArray[tokenInIndex]
  //         ? poolTokensArray[tokenInIndex]?.decimals.toNumber()
  //         : 18
  //     )
  //   )
  //   if (amountInput.gt(0) && parseFloat(swapOutAmount[0].toString()) > 0) {
  //     const usdAmountIn = amountInput
  //       .mul(Big(priceDollar(swapInAddress, poolTokensArray)))
  //       .div(Big(10).pow(Number(poolTokensArray[tokenInIndex]?.decimals || 18)))
  //     const usdAmountOut = Big(swapOutAmount[0].toString())
  //       .mul(Big(priceDollar(swapOutAddress, poolTokensArray)))
  //       .div(
  //         Big(10).pow(
  //           Number(
  //             poolTokensArray[tokenAddress2Index[swapOutAddress]]?.decimals ||
  //               18
  //           )
  //         )
  //       )

  //     const subValue = usdAmountIn.sub(usdAmountOut)
  //     if (usdAmountIn.gt(0)) {
  //       const valuePriceImpact = subValue.div(usdAmountIn).mul(100)

  //       valuePriceImpact.gt(0)
  //         ? setPriceImpact(valuePriceImpact)
  //         : setPriceImpact(Big(0))
  //     }
  //   } else {
  //     setPriceImpact(Big(0))
  //   }
  // }, [inputTokenRef.current?.value, swapInAmount, swapOutAmount])

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
      />
      <img
        src="/assets/icons/arrow-down.svg"
        alt=""
        style={{ margin: '12px 0' }}
      />
      <TokenAssetOut typeAction={typeAction} amountTokenOut={amountTokenOut} />
      <S.ExchangeRate>
        <span>Price Impact:</span>
        <S.PriceImpactWrapper price={123}>
          {/* <S.PriceImpactWrapper price={BNtoDecimal(priceImpact, 18, 2, 2)}> */}
          {/* {BNtoDecimal(priceImpact, 18, 2, 2)}% */}
          1%
        </S.PriceImpactWrapper>
      </S.ExchangeRate>
      <S.ExchangeRate>
        {/* <S.SpanLight>{title} fee:</S.SpanLight>
        <S.SpanLight>{fees[title]}%</S.SpanLight> */}
      </S.ExchangeRate>
      <S.TransactionSettingsOptions>
        {/* <TransactionSettings slippage={slippage} setSlippage={setSlippage} /> */}
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
                errorMsg.length > 0))
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
          onClick={() => changeChain(pool.chain)}
          disabled={walletConnect ? true : false}
          text={walletConnect ? `Change manually to ${pool.chain.chainName}` : `Change to ${pool.chain.chainName}`}
        />
      )}
    </S.Invest>
  )
}

export default Invest
