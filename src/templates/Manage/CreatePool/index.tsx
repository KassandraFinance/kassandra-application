import React from 'react'
import Big from 'big.js'
import { AbiItem, keccak256 } from 'web3-utils'
import web3 from '../../../utils/web3'
import crypto from 'crypto'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber,
  setClear,
  setToFirstStep
} from '../../../store/reducers/poolCreationSlice'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'
import { ERC20 } from '../../../hooks/useERC20Contract'
import substr from '../../../utils/substr'
import waitTransaction, {
  MetamaskError
} from '../../../utils/txWait'

import KassandraManagedControllerFactoryAbi from '../../../constants/abi/KassandraManagedControllerFactory.json'
import KassandraControlerAbi from '../../../constants/abi/KassandraController.json'
import { BACKEND_KASSANDRA, networks } from '../../../constants/tokenAddresses'
import { SAVE_POOL } from './graphql'

import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'
import AddLiquidity from './AddLiquidity'
import ConfigureFee from './ConfigureFee'
import Review from './Review'
import PoolCreated from './PoolCreated'
import ModalTransactions, { TransactionStatus, TransactionsListType } from '../../../components/Modals/ModalTransactions'

import * as S from './styles'

import { mockTokens, mockTokensReverse } from '../../../constants/tokenAddresses'

export const mockTokensList: string[] = [
  '0x841a91e3De1202b7b750f464680068aAa0d0EA35',
  '0xDcfcef36F438ec310d8a699e3D3729398547b2BF',
  '0xca813266889e0FD141dF48B85294855616015fA4',
  '0xf22f05168508749fa42eDBddE10CB323D87c201d',
  '0x2f52C8ce1e5A064B4202762aD34E075E8826C252',
  '0x874a7CE88d933e6Edc24f4867923F1d09568b08B',
  '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d',
  '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF',
]

interface ICreatePoolProps {
  setIsCreatePool: React.Dispatch<React.SetStateAction<boolean>>
}

Big.RM = 0

const CreatePool = ({ setIsCreatePool }: ICreatePoolProps) => {
  const [transactions, setTransactions] = React.useState<TransactionsListType[]>([])
  const [isPoolCreated, setIsPoolCreated] = React.useState<boolean>(false)
  const [transactionButtonStatus, setTransactionButtonStatus] = React.useState(TransactionStatus.START)

  const dispatch = useAppDispatch()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

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
      title='To finish the creation of your pool you need to approve the following:'
      key="modalTransactions"
      transactionButtonStatus={transactionButtonStatus}
      buttonText={buttonText}
      isCompleted={isPoolCreated}
      transactions={transactions}
      onStart={deployPool}
      onCancel={() => {dispatch(setBackStepNumber())}}
      onComfirm={() => {dispatch(setNextStepNumber())}}
    />,
    <PoolCreated key="poolCreated" />
  ]

  function handleNextButton() {
    dispatch(setNextStepNumber())
  }

  async function getIsAproved(tokens: string[]) {
    const tokensNotAproved: string[] = []
    for (const token of tokens) {
      const { allowance } = ERC20(token)
      const isAproved = await allowance(networks[poolData.networkId ?? 137].factory, userWalletAddress)
      if (isAproved === false) {
        tokensNotAproved.push(token)
      }
    }

    return tokensNotAproved
  }

  async function callBack(error: MetamaskError, txHash: string) {
    if (error) {
      setTransactions(prev => prev.map(item => {
        if (item.status === 'APPROVING') {
          item.status = 'ERROR'
        } else if (item.status === 'NEXT') {
          item.status = 'WAITING'
        }
        return item
      }))

      setTransactionButtonStatus(TransactionStatus.CONTINUE)

      if (error.code === 4001) {
        dispatch(
          setModalAlertText({ errorText: `Approval cancelled` })
        )

        return
      }

      dispatch(
        setModalAlertText({
          errorText: error.message
        })
      )
      return
    }

    const txReceipt = await waitTransaction(txHash)

    if (txReceipt.status) {
      let transactionIndex = -100
      setTransactions(prev => prev.map((item, index) => {

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
    } else {
      dispatch(setModalAlertText({
        errorText: 'Transaction reverted'
      }))

      setTransactions(prev => prev.map(item => {
        if (item.status === 'APPROVING') {
          item.status = 'ERROR'
        } else if (item.status === 'NEXT') {
          item.status = 'WAITING'
        }

        return item
      }))
      setTransactionButtonStatus(TransactionStatus.CONTINUE)

    }
  }

  async function handleAproveTokens(notAprovedTokens: string[]) {
    for (const token of notAprovedTokens) {
      const { approve } = ERC20(token)
      await approve(networks[poolData.networkId ?? 137].factory, userWalletAddress, callBack)
    }
  }

  async function handlePrivateInvestors(poolControler: string, investorsList: { address: string }[]) {
    // eslint-disable-next-line prettier/prettier
    const controller = new web3.eth.Contract((KassandraControlerAbi as unknown) as AbiItem, poolControler)

    for (const address of investorsList) {
      await controller.methods.addAllowedAddress(address.address).send({
        from: userWalletAddress
      }, callBack)
    }
  }

  async function getTransactionsList() {
    const tokens: string[] = []
    const tokensList = poolData.tokens ? poolData.tokens : []
    const transactionsList: TransactionsListType[] = []

    if (poolData.networkId === 5) {
      const mockTokensListSorted = mockTokensList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
      for (const mockToken of mockTokensListSorted) {
        if (mockTokens[mockToken]) {
          for (const token of tokensList) {
            if (token.address === mockTokens[mockToken].toLowerCase()) {
              tokens.push(mockToken)
            }
          }
        }
      }
    } else {
      const tokensArr = tokensList.sort((a, b) => a.address > b.address ? 1 : -1)
      for (const token of tokensArr) {
        tokens.push(token.address)
      }
    }

    const notAprovedTokens = await getIsAproved(tokens)

    const notApprovedList: TransactionsListType[]  = []
    const approvedList: TransactionsListType[] = []

    for (const token of tokensList) {
      if (notAprovedTokens.includes(mockTokensReverse[token.address] ?? token.address)) {
        notApprovedList.push({
          key: token.address,
          transaction: `Aprove ${token.symbol}`,
          status: 'WAITING'
        })
      } else {
        approvedList.push({
          key: token.address,
          transaction: `Aprove ${token.symbol}`,
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

    if (poolData.privacy) {
      poolData.privateAddressList?.forEach(privateAddress => {
        transactionsList.push({
          key: privateAddress.address,
          transaction: `Add address to whitelist: ${substr(privateAddress.address)}`,
          status: 'WAITING'
        })
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

  async function sendPoolData(controller: string, logo: string, summary: string, chainId: number) {
    try {
      const nonce = crypto.randomBytes(12).toString('base64')
      const logoToSign = logo ? keccak256(logo) : ''
      const message = `controller: ${controller}\nchainId: ${chainId}\nlogo: ${logoToSign}\nsummary: ${summary}`
      const signature = await web3.eth.personal.sign(
        message,
        userWalletAddress,
        nonce
      )

      const body = {
        controller,
        logo: logo ? logo : undefined,
        summary,
        chainId,
        signature,
      }

      const response = await fetch(BACKEND_KASSANDRA, {
        body: JSON.stringify({
          query: SAVE_POOL,
          variables: body
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST'
      })

      if(response.status === 200) {
        const { data } = await response.json()
        if (data?.savePool?.ok) {
          setTransactions(prev => {
            prev[prev.length - 1].status = 'APPROVED'
            return prev
          })
          return
        }
      }
    } catch (error) {
      console.error(error)
    }

    dispatch(setModalAlertText({
      errorText: "Could not save strategy and image, but the pool was created sucessfully",
      solutionText: "Please try adding them in the dashboard later"
    }))
  }

  async function deployPool() {
    setTransactionButtonStatus(TransactionStatus.WAITING)
    const maxAmountsIn: string[] = []
    const tokens: string[] = []
    const normalizedWeights: string[] = []
    const tokensList = poolData.tokens ? poolData.tokens : []

    // for testnet Goerli
    if (poolData.networkId === 5) {
      const mockTokensListSorted = mockTokensList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
      for (const mockToken of mockTokensListSorted) {
        if (mockTokens[mockToken]) {
          for (const token of tokensList) {
            if (token.address === mockTokens[mockToken].toLowerCase()) {
              maxAmountsIn.push(Big(token.amount).mul(Big(10).pow(token.decimals)).toFixed(0))
              normalizedWeights.push(Big(token.allocation).div(100).mul(Big(10).pow(18)).toFixed(0))
              tokens.push(mockToken)
            }
          }
        }
      }
    } else {

      // for production
      const tokensArr = tokensList.sort((a, b) => a.address > b.address ? 1 : -1)
      for (const token of tokensArr) {
        maxAmountsIn.push(Big(token.amount).mul(Big(10).pow(token.decimals)).toFixed(0))
        normalizedWeights.push(Big(token.allocation).div(100).mul(Big(10).pow(18)).toFixed(0))
        tokens.push(token.address)
      }
    }


    const notAprovedTokens = await getIsAproved(tokens)

    setTransactions(prev => prev.map((item, index) => {
      if (index === tokens.length - notAprovedTokens.length) {
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
    }))

    if (notAprovedTokens.length > 0) {
      await handleAproveTokens(notAprovedTokens)
    }

    const managementFeeRate = poolData.fees?.managementFee.feeRate ? poolData.fees.managementFee.feeRate : 0
    const depositFeeRate = poolData.fees?.depositFee.feeRate ? poolData.fees.depositFee.feeRate : 0
    const managerShare = poolData.fees?.refferalFee.managerShare ? poolData.fees.refferalFee.managerShare : 0
    const brokerCommision = poolData.fees?.refferalFee.brokerCommision ? poolData.fees.refferalFee.brokerCommision : 0

    const managementAumFeePercentage = poolData.fees?.managementFee?.feeRate ? Number(managementFeeRate) / 100 : 0 / 100
    const feesToManager = poolData.fees?.depositFee.isChecked ? poolData.fees.refferalFee.isChecked ? managerShare / 100 : Number(depositFeeRate) / 100 : 0 / 100
    const feesToReferral = poolData.fees?.refferalFee.brokerCommision ? brokerCommision / 100 : 0 / 100

    const pool = {
      name: poolData.poolName,
      symbol: poolData.poolSymbol,
      isPrivatePool: poolData.privacy !== 'public',
      whitelist: networks[poolData.networkId ?? 137].whiteList,
      maxAmountsIn: maxAmountsIn,
      settingsParams: {
        tokens: tokens,
        normalizedWeights: normalizedWeights,
        swapFeePercentage: Big(0.03).mul(Big(10).pow(18)).toFixed(0),
        swapEnabledOnStart: true,
        mustAllowlistLPs: false,
        managementAumFeePercentage: poolData.fees?.managementFee.isChecked ? Big(managementAumFeePercentage).mul(Big(10).pow(18)).toFixed(0) : Big(0).mul(Big(10).pow(18)).toFixed(0),
        aumFeeId: 3,
      },
      feesSettings: {
        feesToManager: poolData.fees?.managementFee.isChecked ? Big(feesToManager).mul(Big(10).pow(18)).toFixed(0) : Big(0).mul(Big(10).pow(18)).toFixed(0),
        feesToReferral: poolData.fees?.refferalFee.isChecked ? Big(feesToReferral).mul(Big(10).pow(18)).toFixed(0) : Big(0).mul(Big(10).pow(18)).toFixed(0),
      },
    }

    try {
      const factoryContract = new web3.eth.Contract((KassandraManagedControllerFactoryAbi as unknown) as AbiItem, networks[poolData.networkId ?? 137].factory);

      const response = await factoryContract.methods.create(
          pool.name,
          pool.symbol,
          pool.isPrivatePool,
          pool.whitelist,
          pool.maxAmountsIn,
          pool.settingsParams,
          pool.feesSettings,
      ).call({
        from: userWalletAddress
      })

      const tx = await factoryContract.methods.create(
          pool.name,
          pool.symbol,
          pool.isPrivatePool,
          pool.whitelist,
          pool.maxAmountsIn,
          pool.settingsParams,
          pool.feesSettings,
      ).send({
          from: userWalletAddress
      }, callBack)

      if (pool.isPrivatePool) {
        const addressList = poolData?.privateAddressList ? poolData.privateAddressList : []
        await handlePrivateInvestors(response.poolController, addressList)
      }
      if (poolData.strategy || poolData.icon?.image_preview) {
        await sendPoolData(response.poolController, poolData.icon?.image_preview || '', poolData.strategy || '', chainId)
      }

      dispatch(setClear())
      setTransactionButtonStatus(TransactionStatus.COMPLETED)
    } catch (error) {
      console.error('It was not possible to create pool', error)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (stepNumber === 5) {
      getTransactionsList()
    }

    handleNextButton()
  }

  return (
    <S.CreatePool>
      <ModalFullWindow handleCloseModal={() => {
          if (stepNumber === 7) {
            dispatch(setToFirstStep())
          }
          setIsCreatePool(false)
        }
      }>
        <form id="poolCreationForm" onSubmit={handleSubmit}>
          {poolCreationSteps[stepNumber]}

          {stepNumber < 6 && (
            <ContainerButton
              form='poolCreationForm'
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
