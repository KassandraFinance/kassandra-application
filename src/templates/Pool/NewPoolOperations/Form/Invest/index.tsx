import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'

import {
  ProxyContract,
  URL_1INCH
} from '../../../../../constants/tokenAddresses'

import { useAppSelector } from '../../../../../store/hooks'

import useProxy from '../../../../../hooks/useProxy'
import useERC20Contract, { ERC20 } from '../../../../../hooks/useERC20Contract'
import usePoolContract from '../../../../../hooks/usePoolContract'
import useYieldYak from '../../../../../hooks/useYieldYak'
// import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'


import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'

import * as S from './styles'

interface IInvestProps {
  typeAction: string;
}

const Invest = ({ typeAction }: IInvestProps) => {
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big>(Big(0))
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big>(Big(0))
  // const [gasFee, setGasFee] = React.useState({
  //   error: false,
  //   feeNumber: 0,
  //   feeString: ''
  // })

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  // const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const proxy = useProxy(ProxyContract, pool.id, pool.core_pool)
  const crpPoolToken = useERC20Contract(pool.id)
  const corePool = usePoolContract(pool.core_pool)
  const yieldYak = useYieldYak()

  // function handleSubmit() {

  // }

  //https://api.1inch.io/v5.0/43114/swap?fromTokenAddress=0xd586e7f844cea2f87f50152665bcbc2c279d8d70&toTokenAddress=0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7&amount=10000000000000000&fromAddress=0xFdFeC1cbc5A10FC8F69C08af8D91Ea3B5190b5e6&slippage=1&disableEstimate=true
  // console.log(tokenSelect.address)

  // async function tokens() {
  //   const tokens = await corePool.checkTokenWithHigherLiquidityPool()
  //   console.log(aa)
  // }
  // tokens()
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
      // setAmountTokenOut([new BigNumber(0)])
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

    async function handle1Inch() {
      const tokenWithHigherLiquidityPool =
        await corePool.checkTokenWithHigherLiquidityPool()

      const response = await fetch(
        `${URL_1INCH}${pool.chainId}/swap?fromTokenAddress=${
          tokenSelect.address
        }&toTokenAddress=${
          tokenWithHigherLiquidityPool.address
        }&amount=${amountTokenIn}&fromAddress=${
          userWalletAddress || '0x84f154A845784Ca37Ae962504250a618EB4859dc'
        }&slippage=1&disableEstimate=true`
      )

      // verificar o amountTokenIn
      const data = await response.json()
      return data.toTokenAmount
    }

    const calc = async () => {
      let newAmountTokenIn = amountTokenIn
      try {
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

        if (!tokensChecked) {
          newAmountTokenIn = await handle1Inch()
        }

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

          // swapInAddress
          // await generateEstimatedGas()

          // setSwapOutAmount([newSwapOutAmount])
          console.log(newSwapOutAmount)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          let investAmoutInCalc: BigNumber = new BigNumber(
            newAmountTokenIn.toString()
          )
          if (tokensChecked?.is_wraps) {
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
          // let investAmoutOutNormalized: BigNumber = newSwapOutPrice
          // if (tokensChecked?.is_wraps) {
          //   investAmoutOutNormalized = await yieldYak.convertBalanceYRTtoWrap(
          //     newSwapOutPrice,
          //     invertToken[swapOutAddress]
          //   )
          // }

          setAmountTokenOut(Big(newSwapOutPrice.toString()))
          // setSwapOutAmount([investAmoutOutNormalized])
          // if (userWalletAddress.length > 0) {
          //   const errorStr = error.toString()
          //   if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
          //     setErrorMsg('This amount is too low for the pool!')
          //     return
          //   }
          //   if (errorStr.search('ERR_MAX_IN_RATIO') > -1) {
          //     setErrorMsg(
          //       "The amount can't be more than half of what's in the pool!"
          //     )
          //     return
          //   }
          //   if (
          //     swapInAmount.gt(swapInBalance) &&
          //     Number(swapInAmount.toString()) > 0
          //   ) {
          //     setErrorMsg('This amount exceeds your balance!')
          //     return
          //   }
          // }
        }

        // let newSwapOutPrice
        // let pow = new BigNumber(0)

        // while (!newSwapOutPrice) {
        //   try {
        //     const multiplier = new BigNumber(10).pow(pow)
        //     newSwapOutPrice = await corePool.calcPoolOutGivenSingleIn(
        //       swapInTotalPoolBalance,
        //       swapInDenormalizedWeight,
        //       poolSupply,
        //       poolTotalDenormalizedWeight,
        //       wei.div(multiplier),
        //       poolSwapFee
        //     )
        //     newSwapOutPrice = newSwapOutPrice.mul(multiplier)
        //   } catch (e) {
        //     pow = pow.add(new BigNumber(1))
        //   }
        // }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // const errorStr = error.toString()
        // if (userWalletAddress.length > 0) {
        //   if (errorStr.search('ERR_BPOW_BASE_TOO_HIGH') > -1) {
        //     ToastWarning(
        //       "The amount can't be more than half of what's in the pool!"
        //     )
        //     return
        //   }
        //   ToastWarning(
        //     'Could not connect with the blockchain to calculate prices.'
        //   )
        // }
      }
    }

    calc()
    // setErrorMsg('')
    // setSwapOutAmount([new BigNumber(0)])
  }, [pool.chainId, amountTokenIn, tokenSelect.address])

  return (
    <S.Invest>
      <InputAndOutputValueToken
        amountTokenIn={amountTokenIn}
        setAmountTokenIn={setAmountTokenIn}
        maxActive={maxActive}
        setMaxActive={setMaxActive}
        inputAmountTokenRef={inputAmountTokenRef}
      />
      <img
        src="/assets/icons/arrow-down.svg"
        alt=""
        style={{ margin: '12px 0' }}
      />
      <TokenAssetOut
        amountTokenIn={amountTokenIn}
        setAmountTokenIn={setAmountTokenIn}
        amountTokenOut={amountTokenOut}
        setAmountTokenOut={setAmountTokenOut}
      />
    </S.Invest>
  )
}

export default Invest
