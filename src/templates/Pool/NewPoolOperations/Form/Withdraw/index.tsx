import Big from 'big.js'
import React from 'react'

import { ProxyContract } from '../../../../../constants/tokenAddresses'
import { ERC20 } from '../../../../../hooks/useERC20Contract'
import useProxy from '../../../../../hooks/useProxy'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'

import waitTransaction, { MetamaskError, TransactionCallback } from '../../../../../utils/txWait'

import { ToastSuccess, ToastWarning } from '../../../../../components/Toastify/toast'
import Button from '../../../../../components/Button'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import TokenAssetIn from '../TokenAssetIn'

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
}

enum Approval {
  Denied,
  Approved,
  WaitingTransaction,
  Syncing
}

type Approvals = { [key in Titles]: Approval[] }

const Withdraw = ({ typeWithdraw, typeAction }: IWithdrawProps) => {
  const [amountTokenIn, setamountTokenIn] = React.useState<Big | string>(
    Big(0)
  )
  const [amountTokenOut, setAmountTokenOut] = React.useState<Big | string>(
    Big(0)
  )
  const [selectedTokenInBalance, setSelectedTokenInBalance] = React.useState(
    new Big(-1)
  )
  const [selectedTokenInBalanceTest, setSelectedTokenInBalanceTest] = React.useState(
    new Big(-1)
  )
  const [errorMsg, setErrorMsg] = React.useState('')
  const [maxActive, setMaxActive] = React.useState<boolean>(false)
  const inputAmountTokenRef = React.useRef<HTMLInputElement>(null)
  const inputAmountInTokenRef = React.useRef<HTMLInputElement>(null)
  const [approvals, setApprovals] = React.useState<Approvals>({
    Withdraw: [],
    Invest: []
  })

  const { pool, chainId, tokenSelect, userWalletAddress } = useAppSelector(
    state => state
  )

  const proxy = useProxy(ProxyContract, pool.id, pool.core_pool)

  const dispatch = useAppDispatch()

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
    [approvals]
  )

  const submitAction = (e: React.FormEvent<HTMLFormElement>) => {
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

    // const slippageVal = slippage.value

    // const slippageExp = new BigNumber(10).pow(new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0)))
    // const slippageBase = slippageExp.sub(new BigNumber(slippageVal.replace('.', '')))

    try {
      // trackBuying(crpPoolAddress, poolSymbol, -1 * amountInUSD, productCategories)

      if (approvals[typeAction][0] === 0) {
        ERC20(pool.id).approve(
          ProxyContract,
          userWalletAddress,
          approvalCallback(pool.symbol, pool.id, typeAction)
        )
        return
      }
      // if (swapOutAddressVal !== '') {
      //   proxy.exitswapPoolAmountIn(
      //     swapOutAddressVal,
      //     swapInAmountVal,
      //     swapOutAmountVal[0].mul(slippageBase).div(slippageExp),
      //     walletAddress.value,
      //     withdrawCallback(swapInSymbol.value, -1 * amountInUSD)
      //   )
      //   return
      // }

      // corePool.currentTokens()
      //   .then(async tokens => {
      //     const swapOutAmounts = []

      //     for (let i = 0; i < tokens.length; i++) {
      //       swapOutAmounts.push(
      //         swapOutAmountVal[tokenAddress2Index[invertToken[tokens[i]] ?? tokens[i]]]
      //           .mul(slippageBase)
      //           .div(slippageExp)
      //       )
      //     }

      //     const tokensInPool = await corePool.currentTokens()
      //     const tokensWithdraw = tokensInPool.map(token => invertToken[token] ?? token)
      //     proxy.exitPool(
      //       swapInAmountVal,
      //       tokensWithdraw,
      //       swapOutAmounts,
      //       walletAddress.value,
      //       withdrawCallback(swapInSymbol.value, -1 * amountInUSD)
      //     )
      //   })

      // return
    } catch (error) {
      console.log(error)
      // dispatch(setModalAlertText({ errorText: 'Could not connect with the Blockchain!' }))
    }
  }

  React.useEffect(() => {
    if (chainId !== pool.chainId) {
      return
    }

    const handleTokensApproved = async () => {
      const newApprovals: string[] = []

      // if (newApprovals.includes(tokenSelect.address)) return
      const isAllowance = await ERC20(pool.id).allowance(
        ProxyContract,
        userWalletAddress
      )

      if (isAllowance) {
        newApprovals.push(pool.id)
      }


      setApprovals((old: any) => ({
        ...old,
        [typeAction]: newApprovals.length > 0 ? [1] : [0]
        // [typeAction]: newApprovals.map((item) => item ? Approval.Approved : Approval.Denied)
      }))
    }
    handleTokensApproved()
    // setIsReload(!isReload)
  }, [typeAction, userWalletAddress])

  return (
    <S.Withdraw onSubmit={submitAction}>
      <TokenAssetIn
        amountTokenIn={amountTokenIn}
        setamountTokenIn={setamountTokenIn}
        selectedTokenInBalance={selectedTokenInBalance}
        setSelectedTokenInBalance={setSelectedTokenInBalance}
        inputAmountTokenRef={inputAmountInTokenRef}
        errorMsg=""
        maxActive={maxActive}
        setMaxActive={setMaxActive}
      />
      <img src="/assets/icons/arrow-down.svg" alt="" width={20} height={20} />

      {typeWithdraw === 'Best_value' ? (
        <ListOfAllAsset />
      ) : (
        <InputAndOutputValueToken
          typeAction={typeWithdraw}
          amountTokenIn={amountTokenOut}
          setAmountTokenIn={setAmountTokenOut}
          selectedTokenInBalance={selectedTokenInBalanceTest}
          setSelectedTokenInBalance={setSelectedTokenInBalanceTest}
          inputAmountTokenRef={inputAmountTokenRef}
          errorMsg={errorMsg}
        />
      )}

      <Button
        className="btn-submit"
        backgroundPrimary
        fullWidth
        type="submit"
        // onClick={() => changeChain(pool.chain)}
        // disabled={walletConnect ? true : false}
        // text={walletConnect ? `Change manually to ${pool.chain.chainName}` : `Change to ${pool.chain.chainName}`}
        text="withdraw"
      />
    </S.Withdraw>
  )
}

export default Withdraw
