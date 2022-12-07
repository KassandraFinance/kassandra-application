import React from 'react'
import Big from 'big.js'
import BigNumber from 'bn.js'

import {
  ProxyContract,
  URL_1INCH
} from '../../../../../constants/tokenAddresses'

import { useAppSelector } from '../../../../../store/hooks'

import useProxy from '../../../../../hooks/useProxy'
import useERC20Contract from '../../../../../hooks/useERC20Contract'
import usePoolContract from '../../../../../hooks/usePoolContract'
import useYieldYak from '../../../../../hooks/useYieldYak'
// import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce'

import { ToastWarning } from '../../../../../components/Toastify/toast'

import InputAndOutputValueToken from '../InputAndOutputValueToken'
import TokenAssetOut from '../TokenAssetOut'

import * as S from './styles'

interface IInvestProps {
  typeAction: string;
}

const Invest = ({ typeAction }: IInvestProps) => {
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const [amountTokenIn, setAmountTokenIn] = React.useState<Big | string>(Big(0))
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big>(Big(0))
  const [errorMsg, setErrorMsg] = React.useState('')
  // const [gasFee, setGasFee] = React.useState({
  //   error: false,
  //   feeNumber: 0,
  //   feeString: ''
  // })
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  // const { trackBuying, trackBought, trackCancelBuying } = useMatomoEcommerce()

  const proxy = useProxy(ProxyContract, pool.id, pool.core_pool)
  const crpPoolToken = useERC20Contract(pool.id)
  const corePool = usePoolContract(pool.core_pool)
  const yieldYak = useYieldYak()

  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)
  // function handleSubmit() {

  // }

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

      const data = await response.json()
      return data.toTokenAmount || 0
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

          // await generateEstimatedGas()

          setAmountTokenOut(Big(newSwapOutAmount))
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

    setErrorMsg('')
    setAmountTokenOut(Big(0))
    calc()
  }, [pool, tokenSelect, amountTokenIn])

  return (
    <S.Invest>
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
    </S.Invest>
  )
}

export default Invest
