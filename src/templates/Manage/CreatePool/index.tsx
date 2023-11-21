import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { keccak256, toUtf8Bytes, ZeroAddress } from 'ethers'

import useSignMessage from '@/hooks/useSignMessage'
import useCreatePool from '@/hooks/useCreatePool'
import useTransaction from '@/hooks/useTransaction'
import { managePoolController } from '@/hooks/useManagePoolController'
import { ERC20 } from '@/hooks/useERC20'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber,
  setToFirstStep,
  setClear
} from '@/store/reducers/poolCreationSlice'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import { ParaSwap } from '@/services/ParaSwap'

import { BACKEND_KASSANDRA, networks } from '@/constants/tokenAddresses'
import { SAVE_POOL } from './graphql'

import ContainerButton from '@/components/ContainerButton'
import ModalFullWindow from '@/components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'
import AddLiquidity from './AddLiquidity'
import ConfigureFee from './ConfigureFee'
import Review from './Review'
import PoolCreated from './PoolCreated'
import ModalTransactions, {
  TransactionStatus,
  TransactionsListType
} from '@/components/Modals/ModalTransactions'

import * as S from './styles'

import { mockTokens, mockTokensReverse } from '@/constants/tokenAddresses'

export const mockTokensList: string[] = [
  '0x841a91e3De1202b7b750f464680068aAa0d0EA35',
  '0xDcfcef36F438ec310d8a699e3D3729398547b2BF',
  '0xca813266889e0FD141dF48B85294855616015fA4',
  '0xf22f05168508749fa42eDBddE10CB323D87c201d',
  '0x2f52C8ce1e5A064B4202762aD34E075E8826C252',
  '0x874a7CE88d933e6Edc24f4867923F1d09568b08B',
  '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d',
  '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF'
]

interface ICreatePoolProps {
  setIsCreatePool: React.Dispatch<React.SetStateAction<boolean>>
}

type Token = {
  address: string
  amount: string
  normalizedAmount: string
  symbol: string
}

Big.RM = 0

const CreatePool = ({ setIsCreatePool }: ICreatePoolProps) => {
  const [transactions, setTransactions] = React.useState<
    TransactionsListType[]
  >([])
  const [isPoolCreated, setIsPoolCreated] = React.useState<boolean>(false)
  const [transactionButtonStatus, setTransactionButtonStatus] = React.useState(
    TransactionStatus.START
  )
  const [completedData, setCompletedData] = React.useState({
    id: '',
    networkId: 0,
    txHash: ''
  })

  const [{ wallet }] = useConnectWallet()
  const { txNotification, transactionErrors } = useTransaction()

  const dispatch = useAppDispatch()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)

  const { create } = useCreatePool(networks[poolData.networkId || 137].factory)
  const { signMessage } = useSignMessage()

  const buttonText = {
    [TransactionStatus.START]: 'Start pool creation',
    [TransactionStatus.CONTINUE]: 'Continue pool creation',
    [TransactionStatus.WAITING]: 'Waiting transaction',
    [TransactionStatus.COMPLETED]: 'Pool created'
  }

  const poolCreationSteps = [
    <StepGuide key="stepGuide" />,
    <SetDetails key="setDetails" />,
    <SelectAssets key="selecAssets" />,
    <AddLiquidity key="addLiquidity" />,
    <ConfigureFee key="configureFee" />,
    <Review key="review" />,
    <ModalTransactions
      title="To finish the creation of your pool you need to approve the following:"
      key="modalTransactions"
      transactionButtonStatus={transactionButtonStatus}
      buttonText={buttonText}
      isCompleted={isPoolCreated}
      transactions={transactions}
      onStart={deployPool}
      onCancel={() => {
        dispatch(setBackStepNumber())
      }}
      onComfirm={() => {
        dispatch(setNextStepNumber())
      }}
      networkId={poolData.networkId}
    />,
    <PoolCreated key="poolCreated" data={completedData} />
  ]

  function handleNextButton() {
    dispatch(setNextStepNumber())
  }

  async function getIsAproved(tokens: Array<Token>) {
    if (!wallet?.provider) {
      return []
    }

    const tokensNotAproved: Array<Token> = []
    for (const token of tokens) {
      const { allowance } = await ERC20(
        token.address,
        networks[poolData.networkId ?? 137].rpc,
        {
          wallet: null,
          txNotification: txNotification,
          transactionErrors: transactionErrors
        }
      )
      const amountApproved = await allowance(
        networks[poolData.networkId ?? 137].factory,
        wallet?.accounts[0].address
      )
      if (Big(amountApproved).lt(token.amount)) {
        tokensNotAproved.push(token)
      }
    }

    return tokensNotAproved
  }

  function handleSuccess() {
    let transactionIndex = -100
    setTransactions(prev =>
      prev.map((item, index) => {
        if (item.status === 'APPROVING') {
          if (item.key === 'createPool') {
            setIsPoolCreated(true)
          }
          transactionIndex = index

          return {
            ...item,
            status: 'APPROVED'
          }
        } else if (index === transactionIndex + 1) {
          return {
            ...item,
            status: 'APPROVING'
          }
        } else if (index === transactionIndex + 2) {
          return {
            ...item,
            status: 'NEXT'
          }
        } else {
          return item
        }
      })
    )

    return
  }

  function handleFail() {
    setTransactionButtonStatus(TransactionStatus.CONTINUE)

    setTransactions(prev =>
      prev.map(item => {
        if (item.status === 'APPROVING') {
          item.status = 'ERROR'
        } else if (item.status === 'NEXT') {
          item.status = 'WAITING'
        }
        return item
      })
    )

    return
  }

  async function handleApproveSuccess(approve: {
    token: { amount: string; normalizedAmount: string; symbol: string }
    contractApprove: string
    oldAllowance: string
    allowance: (_to: string, _from: string) => Promise<string>
  }) {
    if (!wallet?.provider) {
      return false
    }

    for (let index = 0; index < 100; index++) {
      await new Promise(r => setTimeout(r, 500))

      const amountApproved = await approve.allowance(
        approve.contractApprove,
        wallet.accounts[0].address
      )
      if (amountApproved !== approve.oldAllowance && amountApproved !== '0') {
        if (Big(amountApproved).lt(approve.token.amount)) {
          setTransactions(prev =>
            prev.map(item => {
              if (item.status === 'APPROVING') {
                item.status = 'ERROR'
              } else if (item.status === 'NEXT') {
                item.status = 'WAITING'
              }
              return item
            })
          )

          setTransactionButtonStatus(TransactionStatus.CONTINUE)

          dispatch(
            setModalAlertText({
              errorText: `You have approved less ${approve.token.symbol} than the amount necessary to continue creating the pool`,
              solutionText: `Please retry and increase your spend limit to at least ${approve.token.normalizedAmount}`
            })
          )

          return false
        }

        break
      } else if (index === 99) {
        setTransactions(prev =>
          prev.map(item => {
            if (item.status === 'APPROVING') {
              item.status = 'ERROR'
            } else if (item.status === 'NEXT') {
              item.status = 'WAITING'
            }
            return item
          })
        )
        setTransactionButtonStatus(TransactionStatus.CONTINUE)
        dispatch(
          setModalAlertText({
            errorText: `You have approved less ${approve.token.symbol} than the amount necessary to continue creating the pool`,
            solutionText: `Please retry and increase your spend limit to at least ${approve.token.normalizedAmount}`
          })
        )

        return false
      }
    }

    handleSuccess()
    return true
  }

  async function handleApproveTokens(notAprovedTokens: Array<Token>) {
    if (!wallet?.provider) {
      return
    }

    let status = false
    for (const token of notAprovedTokens) {
      const { approve, allowance } = await ERC20(
        token.address,
        networks[poolData.networkId ?? 137].rpc,
        {
          wallet: wallet,
          txNotification: txNotification,
          transactionErrors: transactionErrors
        }
      )

      const factory = networks[poolData.networkId ?? 137].factory
      const oldAllowance = await allowance(factory, wallet?.accounts[0].address)

      const receipt = await approve(
        factory,
        {},
        {
          onFail: handleFail
        }
      )

      if (receipt?.status === 1) {
        status = await handleApproveSuccess({
          token,
          contractApprove: factory,
          oldAllowance,
          allowance
        })
      }

      if (!status) {
        break
      }
    }

    return status
  }

  async function handlePrivateInvestors(
    poolControler: string,
    investorsList: { address: string }[]
  ) {
    if (!wallet?.provider) {
      return false
    }

    const { addAllowedAddresses } = await managePoolController(
      poolControler,
      undefined,
      {
        wallet: wallet,
        txNotification: txNotification,
        transactionErrors: transactionErrors
      }
    )

    await addAllowedAddresses(
      investorsList.map(investor => investor.address),
      handleSuccess,
      () => {
        handleFail
        setTransactionButtonStatus(TransactionStatus.COMPLETED)

        dispatch(setClear())

        setTimeout(() => {
          handleNextButton()
        }, 500)
        return
      },
      {
        error:
          'Could not add private investors, but the pool was created sucessfully'
      }
    )
  }

  async function getTransactionsList() {
    const tokens: Array<Token> = []
    const tokensList = poolData.tokens ? [...poolData.tokens] : []
    const transactionsList: TransactionsListType[] = []

    if (poolData.networkId === 5) {
      const mockTokensListSorted = mockTokensList.sort((a, b) =>
        a.toLowerCase() > b.toLowerCase() ? 1 : -1
      )
      for (const mockToken of mockTokensListSorted) {
        if (mockTokens[mockToken]) {
          for (const token of tokensList) {
            if (token.address === mockTokens[mockToken].toLowerCase()) {
              tokens.push({
                address: mockToken,
                amount: Big(token.amount)
                  .mul(Big(10).pow(token.decimals))
                  .toFixed(0),
                normalizedAmount: token.amount,
                symbol: token.amount
              })
            }
          }
        }
      }
    } else {
      const tokensArr = tokensList.sort((a, b) =>
        a.address > b.address ? 1 : -1
      )
      for (const token of tokensArr) {
        tokens.push({
          address: token.address,
          amount: Big(token.amount).mul(Big(10).pow(token.decimals)).toFixed(0),
          normalizedAmount: token.amount,
          symbol: token.symbol
        })
      }
    }

    let tokensForVerifyIsApproved: Token[]
    if (poolData.methodCreate === 'any-asset') {
      const { address, symbol } = poolData.tokenIn

      tokensForVerifyIsApproved = [
        {
          address,
          amount: poolData.tokenInAmount,
          normalizedAmount: poolData.tokenInAmount,
          symbol: symbol || ''
        }
      ]
    } else {
      tokensForVerifyIsApproved = tokens
    }

    const notAprovedTokens = await getIsAproved(tokensForVerifyIsApproved)

    const notApprovedList: TransactionsListType[] = []
    const approvedList: TransactionsListType[] = []

    if (poolData.methodCreate === 'pool-assets') {
      for (const token of tokensList) {
        if (poolData.networkId === 5) {
          const notApprovedToken = notAprovedTokens.find(
            _token =>
              _token.address === mockTokensReverse[token.address] ??
              token.address
          )
          if (notApprovedToken) {
            notApprovedList.push({
              key: mockTokensReverse[token.address] ?? token.address,
              transaction: `Approve ${token.symbol}`,
              status: 'WAITING'
            })
          } else {
            approvedList.push({
              key: token.address,
              transaction: `Approve ${token.symbol}`,
              status: 'APPROVED'
            })
          }
        } else {
          const notApprovedToken = notAprovedTokens.find(
            _token => _token.address === token.address
          )
          if (notApprovedToken) {
            notApprovedList.push({
              key: token.address,
              transaction: `Approve ${token.symbol}`,
              status: 'WAITING'
            })
          } else {
            approvedList.push({
              key: token.address,
              transaction: `Approve ${token.symbol}`,
              status: 'APPROVED'
            })
          }
        }
      }
    } else {
      if (notAprovedTokens.length > 0) {
        notApprovedList.push({
          key: poolData.tokenIn.address,
          transaction: `Approve ${poolData.tokenIn.symbol}`,
          status: 'WAITING'
        })
      } else {
        approvedList.push({
          key: poolData.tokenIn.address,
          transaction: `Approve ${poolData.tokenIn.symbol}`,
          status: 'APPROVED'
        })
      }
    }

    transactionsList.push(...approvedList, ...notApprovedList)

    transactionsList.push({
      key: 'createPool',
      transaction: 'Create pool and controller',
      status: 'WAITING'
    })

    if (poolData.privacy && poolData.privateAddressList?.length) {
      transactionsList.push({
        key: 'setPrivateInvestors',
        transaction: `Add addresses to whitelist`,
        status: 'WAITING'
      })
    }

    if (poolData.strategy || poolData.icon?.image_preview) {
      transactionsList.push({
        key: 'sendToBackEnd',
        transaction: 'Save metadata',
        status: 'WAITING'
      })
    }

    transactionsList[approvedList.length] = {
      ...transactionsList[approvedList.length],
      status: 'NEXT'
    }

    setTransactions(transactionsList)
  }

  async function sendPoolData(
    controller: string,
    logo: string,
    shortSummary: string,
    summary: string,
    chainId: number
  ) {
    try {
      if (!wallet?.provider) {
        return
      }

      const logoToSign = logo ? keccak256(toUtf8Bytes(logo)) : ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nshortSummary: ${shortSummary}\nsummary: ${summary}`
      const signature = await signMessage(message)

      const body = {
        controller,
        logo: logo ? logo : undefined,
        shortSummary,
        summary,
        chainId,
        signature
      }

      const response = await fetch(BACKEND_KASSANDRA, {
        body: JSON.stringify({
          query: SAVE_POOL,
          variables: body
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST'
      })

      if (response.status === 200) {
        const { data } = await response.json()
        if (data?.savePool?.ok) {
          setTransactions(prev => {
            prev[prev.length - 1].status = 'APPROVED'
            return prev
          })
          return
        }
      } else {
        setTransactions(prev => {
          prev[prev.length - 1].status = 'ERROR'
          return prev
        })
        return
      }
    } catch (error) {
      setTransactions(prev => {
        prev[prev.length - 1].status = 'ERROR'
        return prev
      })

      console.error(error)
    }
    setTransactions(prev => {
      prev[prev.length - 1].status = 'ERROR'
      return prev
    })

    dispatch(
      setModalAlertText({
        errorText:
          'Could not save strategy and image, but the pool was created sucessfully',
        solutionText: 'Please try adding them in the dashboard later'
      })
    )
  }

  async function deployPool() {
    setTransactionButtonStatus(TransactionStatus.WAITING)
    const maxAmountsIn: string[] = []
    const tokens: Array<Token> = []
    const normalizedWeights: string[] = []
    const tokensList = poolData.tokens ? [...poolData.tokens] : []

    // for testnet Goerli
    if (poolData.networkId === 5) {
      const mockTokensListSorted = mockTokensList.sort((a, b) =>
        a.toLowerCase() > b.toLowerCase() ? 1 : -1
      )
      for (const mockToken of mockTokensListSorted) {
        if (mockTokens[mockToken]) {
          for (const token of tokensList) {
            if (token.address === mockTokens[mockToken].toLowerCase()) {
              const maxAmountIn = Big(token.amount)
                .mul(Big(10).pow(token.decimals))
                .toFixed(0)
              maxAmountsIn.push(maxAmountIn)
              normalizedWeights.push(
                Big(token.allocation).div(100).mul(Big(10).pow(18)).toFixed(0)
              )
              tokens.push({
                address: mockToken,
                amount: maxAmountIn,
                normalizedAmount: token.amount,
                symbol: token.symbol
              })
            }
          }
        }
      }
    } else {
      // for production
      const tokensArr = tokensList.sort((a, b) =>
        a.address > b.address ? 1 : -1
      )
      for (const token of tokensArr) {
        const maxAmountIn = Big(token.amount)
          .mul(Big(10).pow(token.decimals))
          .toFixed(0)
        maxAmountsIn.push(maxAmountIn)
        normalizedWeights.push(
          Big(token.allocation).div(100).mul(Big(10).pow(18)).toFixed(0)
        )
        tokens.push({
          address: token.address,
          amount: maxAmountIn,
          normalizedAmount: token.amount,
          symbol: token.symbol
        })
      }
    }

    let tokensForVerifyIsApproved: Token[]
    if (poolData.methodCreate === 'any-asset') {
      const { address, symbol } = poolData.tokenIn
      tokensForVerifyIsApproved = [
        {
          address,
          amount: poolData.tokenInAmount,
          normalizedAmount: poolData.tokenInAmount,
          symbol: symbol || ''
        }
      ]
    } else {
      tokensForVerifyIsApproved = tokens
    }

    const notAprovedTokens = await getIsAproved(tokensForVerifyIsApproved)
    setTransactions(prev =>
      prev.map((item, index) => {
        const operationIndex =
          poolData.methodCreate === 'any-asset'
            ? notAprovedTokens.length - 1
            : tokens.length - notAprovedTokens.length
        if (index === operationIndex) {
          return {
            ...item,
            status: 'APPROVING'
          }
        } else if (index === tokens.length - notAprovedTokens.length + 1) {
          return {
            ...item,
            status: 'NEXT'
          }
        } else {
          return item
        }
      })
    )

    if (notAprovedTokens.length > 0) {
      const arr: Array<Token> = []
      for (const token of transactions) {
        const notApprovedToken = notAprovedTokens.find(
          _token => _token.address === token.key
        )
        if (notApprovedToken) {
          arr.push(notApprovedToken)
        }
      }

      const status = await handleApproveTokens(arr)
      if (!status) {
        return
      }
    }

    const managementFeeRate = poolData.fees?.managementFee.feeRate
      ? poolData.fees.managementFee.feeRate
      : 0
    const depositFeeRate = poolData.fees?.depositFee.feeRate
      ? poolData.fees.depositFee.feeRate
      : 0
    const managerShare = poolData.fees?.refferalFee.managerShare
      ? poolData.fees.refferalFee.managerShare
      : 0
    const brokerCommision = poolData.fees?.refferalFee.brokerCommision
      ? poolData.fees.refferalFee.brokerCommision
      : 0

    const managementAumFeePercentage = poolData.fees?.managementFee?.feeRate
      ? Number(managementFeeRate) / 100
      : 0 / 100
    const feesToManager = poolData.fees?.depositFee.isChecked
      ? poolData.fees.refferalFee.isChecked
        ? managerShare / 100
        : Number(depositFeeRate) / 100
      : 0 / 100
    const feesToReferral = poolData.fees?.refferalFee.brokerCommision
      ? brokerCommision / 100
      : 0 / 100

    let datas: Array<string> = []
    if (poolData.methodCreate === 'any-asset') {
      const slippageInPercentage = '1'
      const chainId = poolData.networkId?.toString() ?? '137'
      const swapProvider = new ParaSwap()
      const { transactionsDataTx } = await swapProvider.getAmountsOut({
        amount: poolData.tokenInAmount,
        chainId,
        destTokens:
          poolData.tokens?.map(token => ({
            token: { decimals: token.decimals, id: token.address },
            weight_normalized: Big(token.allocation).div(100).toString()
          })) ?? [],
        srcDecimals: poolData.tokenIn?.decimals?.toString() || '',
        srcToken: poolData.tokenIn.address
      })
      datas = await swapProvider.getDatasTx(
        chainId,
        networks[Number(chainId)].factory,
        slippageInPercentage,
        transactionsDataTx
      )
    }
    const pool = {
      poolParams: {
        name: poolData.poolName,
        symbol: poolData.poolSymbol,
        isPrivatePool: poolData.privacy !== 'public',
        whitelist: networks[poolData.networkId ?? 137].whiteList,
        amountsIn: maxAmountsIn
      },
      settingsParams: {
        tokens: tokens.map(token => token.address),
        normalizedWeights: normalizedWeights,
        swapFeePercentage: Big(0.003).mul(Big(10).pow(18)).toFixed(0),
        swapEnabledOnStart: true,
        mustAllowlistLPs: false,
        managementAumFeePercentage: Big(managementAumFeePercentage).gt(0)
          ? Big(managementAumFeePercentage).mul(Big(10).pow(18)).toFixed(0)
          : Big(0).mul(Big(10).pow(18)).toFixed(0),
        aumFeeId: 3
      },
      feesSettings: {
        feesToManager: poolData.fees?.depositFee?.isChecked
          ? Big(feesToManager).mul(Big(10).pow(18)).toFixed(0)
          : Big(0).mul(Big(10).pow(18)).toFixed(0),
        feesToReferral: poolData.fees?.refferalFee?.isChecked
          ? Big(feesToReferral).mul(Big(10).pow(18)).toFixed(0)
          : Big(0).mul(Big(10).pow(18)).toFixed(0)
      },
      joinParams: {
        tokenIn:
          poolData.methodCreate === 'any-asset'
            ? poolData.tokenIn.address
            : ZeroAddress,
        amountIn:
          poolData.methodCreate === 'any-asset' ? poolData.tokenInAmount : '0',
        datas
      }
    }

    const { response, receipt } = await create(
      pool,
      {},
      { onFail: handleFail, onSuccess: handleSuccess }
    )

    if (receipt?.status === 1) {
      setCompletedData({
        id: `${poolData.networkId}${response.pool}`,
        txHash: receipt?.hash || '',
        networkId: poolData.networkId ?? 137
      })

      if (pool.poolParams.isPrivatePool) {
        const addressList = poolData?.privateAddressList
          ? poolData.privateAddressList
          : []
        await handlePrivateInvestors(response.poolController, addressList)
      }

      if (poolData.strategy || poolData.icon?.image_preview) {
        await sendPoolData(
          response.poolController,
          poolData.icon?.image_preview || '',
          poolData.shortSummary || '',
          poolData.strategy || '',
          poolData.networkId || 137
        )
      }

      setTransactionButtonStatus(TransactionStatus.COMPLETED)

      dispatch(setClear())

      setTimeout(() => {
        handleNextButton()
      }, 300)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (stepNumber === 5) {
      await getTransactionsList()
    }

    handleNextButton()
  }

  return (
    <S.CreatePool>
      <ModalFullWindow
        handleCloseModal={() => {
          if (stepNumber === 6) {
            dispatch(setBackStepNumber())
          }

          if (stepNumber === 7) {
            dispatch(setToFirstStep())
          }
          setIsCreatePool(false)
        }}
      >
        <form id="poolCreationForm" onSubmit={handleSubmit}>
          {poolCreationSteps[stepNumber]}

          {stepNumber < 6 && (
            <ContainerButton
              form="poolCreationForm"
              backButtonDisabled={stepNumber < 1}
              onBack={() => dispatch(setBackStepNumber())}
              onNext={() => {
                return
              }}
            />
          )}
        </form>
      </ModalFullWindow>
    </S.CreatePool>
  )
}

export default CreatePool
