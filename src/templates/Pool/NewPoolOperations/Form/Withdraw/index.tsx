import Big from 'big.js'
import React from 'react'
import BigNumber from 'bn.js'
import web3 from '../../../../../utils/web3'
import useSWR from 'swr';
import { request } from 'graphql-request';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setModalAlertText } from '../../../../../store/reducers/modalAlertText'
import { setModalWalletActive } from '../../../../../store/reducers/modalWalletActive'

import useERC20Contract, { ERC20 } from '../../../../../hooks/useERC20Contract'
import useProxy from '../../../../../hooks/useProxy'
import useCoingecko from '../../../../../hooks/useCoingecko'
import useYieldYak from '../../../../../hooks/useYieldYak'
import usePoolContract from '../../../../../hooks/usePoolContract'
import useMatomoEcommerce from '../../../../../hooks/useMatomoEcommerce';

import waitTransaction, { MetamaskError, TransactionCallback } from '../../../../../utils/txWait'
import changeChain from '../../../../../utils/changeChain'
import { BNtoDecimal } from '../../../../../utils/numerals'


import { ToastSuccess, ToastWarning } from '../../../../../components/Toastify/toast'
import Button from '../../../../../components/Button'
import InputAndOutputValueToken from '../InputAndOutputValueToken'
import ListOfAllAsset from '../ListOfAllAsset'
import TokenAssetIn from '../TokenAssetIn'
import TransactionSettings from '../TransactionSettings'

import { GET_POOL } from './graphql'
import { ProxyContract, SUBGRAPH_URL } from '../../../../../constants/tokenAddresses'

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
  const [selectedTokenOutBalance, setSelectedTokenOutBalance] = React.useState(
    new Big(-1)
  )
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

  const proxy = useProxy(ProxyContract, pool.id, pool.vault)
  const crpPoolToken = useERC20Contract(pool.id)
  const corePool = usePoolContract(pool.vault)
  const yieldYak = useYieldYak()

  const tokenAddresses = pool.underlying_assets.map(item => item.token.wraps ? item.token.wraps.id : item.token.id)
  const { priceToken } = useCoingecko(
    pool.chain.nativeTokenName.toLowerCase(),
    pool.chain.addressWrapped.toLowerCase(),
    tokenAddresses.toString()
  )

  const { data } = useSWR([GET_POOL], query =>
    request(SUBGRAPH_URL, query, { id: pool.id })
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
            approved = await ERC20(tokenAddress).allowance(
              ProxyContract,
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
          return
        }
      }
    },
    [ProxyContract]
  )

  const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const slippageVal = slippage.value
    const slippageExp = new BigNumber(10).pow(new BigNumber(2 + (slippageVal.split('.')[1]?.length || 0)))
    const slippageBase = slippageExp.sub(new BigNumber(slippageVal.replace('.', '')))

    try {
      trackBuying(pool.id, pool.symbol, -1 * data?.pool?.price_usd, pool.chain.chainName)

      if (approvals[typeAction][0] === 0) {
        ERC20(pool.id).approve(
          ProxyContract,
          userWalletAddress,
          approvalCallback(pool.symbol, pool.id, typeAction)
        )
        return
      }
      if (typeWithdraw === 'Single_asset') {
        proxy.exitswapPoolAmountIn(
          tokenSelect.address,
          new BigNumber(amountTokenIn.toString()),
          new BigNumber(amountTokenOut.toString()).mul(slippageBase).div(slippageExp),
          userWalletAddress,
          withdrawCallback(pool.symbol, -1 * 0)
        )
        return
      }

      corePool.currentTokens()
        .then(async tokens => {
          const swapOutAmounts = []

          for (let i = 0; i < tokens.length; i++) {
            swapOutAmounts.push(
              amountAllTokenOut[i]
                .mul(slippageBase)
                .div(slippageExp)
            )
          }

          const tokensWithdraw = pool.underlying_assets.map(token =>
            token.token.wraps ?
            token.token.wraps.id :
            token.token.id
          )

          proxy.exitPool(
            new BigNumber(amountTokenIn.toString()),
            tokensWithdraw,
            swapOutAmounts,
            userWalletAddress,
            withdrawCallback(pool.symbol, -1 * 0)
          )
        })

      // return
    } catch (error) {
      // console.log(error)
      dispatch(setModalAlertText({ errorText: 'Could not connect with the Blockchain!' }))
    }
  }

  const getWithdrawAmount = (
    supplyPoolToken: BigNumber,
    amountPoolToken: BigNumber,
    balanceOut: BigNumber,
    exitFee: BigNumber
  ): BigNumber => {
    if (supplyPoolToken.toString(10) === '0') {
      return new BigNumber(0)
    }

    // 10^18
    const one = new BigNumber('1')
    const two = new BigNumber('2')
    const bigOne = new BigNumber('10').pow(new BigNumber('18'))
    const halfBigOne = bigOne.div(two)
    // calculated fee (bmul)
    const fee = amountPoolToken
      .mul(exitFee)
      .add(halfBigOne)
      .div(bigOne);
    const pAiAfterExitFee = amountPoolToken.sub(fee);
    const supply = supplyPoolToken.add(one)
    // ratio of the token (bdiv)
    const ratio = pAiAfterExitFee
      .mul(bigOne)
      .add(supply.div(two))
      .div(supply);
    // amount of tokens (bmul)
    const tokenAmountOut = ratio
      .mul(balanceOut.sub(one))
      .add(halfBigOne)
      .div(bigOne);

    return tokenAmountOut
  }


  React.useEffect(() => {
    if (typeAction !== 'Withdraw' || tokenSelect.address === pool.id) {
      return
    }

    if (chainId !== pool.chain_id) {
      if (tokenSelect.address === '') {
        setAmountTokenOut(new Big(0))
        return
      }

      setAmountTokenOut(new Big(0))
      return
    }

    const calc = async () => {
      const [poolSupply, poolExitFee] = await Promise.all([
        crpPoolToken.totalSupply(),
        corePool.exitFee()
      ])

      const tokenAddress = pool.underlying_assets.find(item =>
        (item.token.wraps ? item.token.wraps.id : item.token.id) === tokenSelect.address
      )

      if (typeWithdraw === 'Best_value') {
        const newSwapOutAmount = await Promise.all(
          pool.underlying_assets.map(async (item) => {
            const swapOutTotalPoolBalance = await corePool.balance(item.token.id)

            const withdrawAmout = getWithdrawAmount(
              poolSupply,
              new BigNumber(amountTokenIn.toString()),
              swapOutTotalPoolBalance,
              poolExitFee
            )
            if (item.token.wraps) {
              return await yieldYak.convertBalanceYRTtoWrap(withdrawAmout, item.token.id)
            }
            return withdrawAmout
          })
        )
        setamountAllTokenOut(newSwapOutAmount)

        try {
          if (userWalletAddress.length > 0 && new BigNumber(amountTokenIn.toString()).gt(new BigNumber('0'))) {
            const tokensInPool = pool.underlying_assets.map(item => item.token.id)

            await proxy.tryExitPool(
              new BigNumber(amountTokenIn.toString()),
              tokensInPool,
              Array(newSwapOutAmount.length).fill(new BigNumber('0')),
              userWalletAddress
            )
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const errorStr = error.toString()

          if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
            setErrorMsg('This amount is too low for the pool!')
            return
          }

          if (errorStr.search('below minimum') > -1) {
            setErrorMsg("This amount is below minimum withdraw!")
            return
          }

          if (new BigNumber(amountTokenIn.toString()).gt(new BigNumber(selectedTokenInBalance.toString()))) {
            setErrorMsg('This amount exceeds your balance!')
            return;
          }
        }
        return
      }

      try {
        if (!tokenAddress) return

        const [
          swapOutTotalPoolBalance,
          swapOutDenormalizedWeight,
          poolTotalDenormalizedWeight,
          poolSwapFee
        ] = await Promise.all([
          corePool.balance(tokenAddress.token.id),
          corePool.denormalizedWeight(tokenAddress.token.id),
          corePool.totalDenormalizedWeight(),
          corePool.swapFee()
        ])

        const [SingleSwapOutAmount] = await Promise.all([
          corePool.calcSingleOutGivenPoolIn(
            swapOutTotalPoolBalance,
            swapOutDenormalizedWeight,
            poolSupply,
            poolTotalDenormalizedWeight,
            new BigNumber(amountTokenIn.toString()),
            poolSwapFee,
            poolExitFee
          ),
        ])

        let withdrawAmoutOut: BigNumber = SingleSwapOutAmount
        if (tokenAddress?.token.wraps) {
          withdrawAmoutOut = await yieldYak.convertBalanceYRTtoWrap(withdrawAmoutOut, tokenAddress.token.id)
        }
        setAmountTokenOut(new Big(withdrawAmoutOut.toString()))
      }
      catch (e) {
        if (userWalletAddress.length > 0) {
          ToastWarning('Could not connect with the blockchain to calculate prices.')
        }
      }

      try {
        if (userWalletAddress.length > 0 && Big(amountTokenIn).gt(Big('0'))) {
          await proxy.tryExitswapPoolAmountIn(
            tokenSelect.address,
            new BigNumber(amountTokenIn.toString()),
            new BigNumber('0'),
            userWalletAddress
          )
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorStr = error.toString()

        if (errorStr.search(/ERR_(BPOW_BASE_TOO_|MATH_APPROX)/) > -1) {
          setErrorMsg('This amount is too low for the pool!')
          return
        }

        if (errorStr.search('ERR_MAX_OUT_RATIO') > -1) {
          setErrorMsg("The amount you are trying to obtain can't be more than a third of what's in the pool!")
          return
        }

        if (errorStr.search('below minimum') > -1) {
          setErrorMsg("This amount is below minimum withdraw!")
          return
        }

        if (Big(amountTokenIn).gt(selectedTokenInBalance)) {
          setErrorMsg('This amount exceeds your balance!')
          return;
        }
      }
    }

    calc()
    setErrorMsg('')
    setAmountTokenOut(new Big(0))
  }, [typeAction, chainId, amountTokenIn, tokenSelect])

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
        .mul(Big( priceUSD || 0))
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
      return
    }

    const getUserBalanceAllToken = async () => {
      const newSwapOutBalance = await Promise.all(
        pool.underlying_assets.map(async (item) => {

          if (item.token.id === pool.chain.addressWrapped) {
            const balance = await web3.eth.getBalance(userWalletAddress)
            return new BigNumber(balance)
          }
          const token = ERC20(item.token.id)
          return token.balance(userWalletAddress)
        })
      )

      setbalanceAllTokenOut(newSwapOutBalance)
    }

    getUserBalanceAllToken()
    return

  }, [chainId, userWalletAddress, amountTokenIn])

  React.useEffect(() => {
    if (chainId !== pool.chain_id) {
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
        [typeAction]: newApprovals.length > 0 ? [Approval.Approved] : [Approval.Denied]
      }))
    }
    handleTokensApproved()
  }, [typeAction, userWalletAddress])

  React.useEffect(() => {
    if (!inputAmountInTokenRef?.current?.value) {
      setPriceImpact(Big(0))
      return
    }

    if (Big(amountTokenIn).gt(0) && parseFloat(amountTokenOut.toString()) > 0) {
      const usdAmountIn = Big(amountTokenIn)
        .mul(Big(data?.pool?.price_usd))
        .div(Big(10).pow(Number(data?.pool?.decimals || 18)))

      const usdAmountOut = Big(amountTokenOut)
        .mul(Big(priceToken(tokenSelect.address.toLocaleLowerCase())  || 0))
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
        setSelectedTokenInBalance={setSelectedTokenInBalance}
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
        )}

        <S.ExchangeRate>
          <S.SpanLight>Withdraw fee:</S.SpanLight>
          <S.SpanLight>3.00%</S.SpanLight>
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
        <Button
          className="btn-submit"
          backgroundPrimary
          disabledNoEvent={
           (approvals[typeAction].length === 0) ||
            (approvals[typeAction][0] > Approval.Approved) ||
            (approvals[typeAction][0] === Approval.Approved &&
              (amountTokenIn.toString() === '0' ||
                amountTokenOut.toString() === '0' ||
                amountAllTokenOut.length > 0 ||
                errorMsg.length > 0))
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
    </S.Withdraw>
  )
}

export default Withdraw
