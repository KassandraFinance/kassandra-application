import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Big from 'big.js'
import web3 from '../../../utils/web3'
import { AbiItem } from 'web3-utils'
import { useRouter } from 'next/router'

import { ERC20 } from '../../../hooks/useERC20Contract'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'
import usePoolAssets from '@/hooks/usePoolAssets'
import usePoolInfo from '@/hooks/usePoolInfo'
import { mockTokensReverse } from '../../../constants/tokenAddresses'
import Kacupe from '@/constants/abi/KassandraController.json'

import { BNtoDecimal } from '../../../utils/numerals'
import waitTransaction, { MetamaskError } from '../../../utils/txWait'

import {
  COINGECKO_API,
  networks
} from '../../../constants/tokenAddresses'

import TokenRemoval from './TokenRemoval'
import RemoveReview from './RemoveReview'
import AssetRemovelCard from './AssetRemovelCard'
import SelectAssets from './SelectAssets'
import ChooseAction, { chooseActionStep } from './ChooseAction'
import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import AddLiquidity from './AddLiquidity'
import ReviewAddAsset from './ReviewAddAsset'
import ModalTransactions, {
  TransactionsListType,
  TransactionStatus
} from '../../../components/Modals/ModalTransactions'
import TransactionFinalized from './TransactionFinalized'
import SetNewWeights from './SetNewWeights'
import RebalanceReview from './RebalanceReview'
import RebalanceSuccess from './RebalanceSuccess'

import { CoinGeckoAssetsResponseType } from './AddLiquidity/AddLiquidityOperation'

import addIcon from '../../../../public/assets/iconGradient/add.svg'

import {
  FlexContainer,
  ContentTitle,
  ValueContainer,
  ValueWrapper,
  Value,
  SecondaryValue,
  ImageWrapper
} from './ReviewAddAsset/TransactionSummary/styles'

import * as S from './styles'

Big.RM = 0

interface IManageAssetsProps {
  setIsOpenManageAssets: React.Dispatch<React.SetStateAction<boolean>>
}

const ManageAssets = ({ setIsOpenManageAssets }: IManageAssetsProps) => {
  const [step, setStep] = React.useState(0)
  const [actionSelected, setActionSelected] = React.useState(chooseActionStep.Default)
  const [transactions, setTransactions] = React.useState<
    TransactionsListType[]
  >([])
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false)
  const [transactionButtonStatus, setTransactionButtonStatus] = React.useState(
    TransactionStatus.START
  )

  const dispatch = useAppDispatch()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const token = useAppSelector(state => state.addAsset.token)
  const tokenLiquidity = useAppSelector(state => state.addAsset.liquidit)

  const { tokenSelection } = useAppSelector(
    state => state.removeAsset
  )
  const { periodSelect, poolTokensList, newTokensWights } = useAppSelector(
    state => state.rebalanceAssets
  )

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''


  const { poolAssets } = usePoolAssets(poolId)
  const { poolInfo } = usePoolInfo(
    userWalletAddress,
    poolId
  )

  const { data: priceData } = useSWR<CoinGeckoAssetsResponseType>(
    `${COINGECKO_API}/simple/token_price/${networks[poolInfo?.chainId ?? 137].coingecko}?contract_addresses=${token.id}&vs_currencies=usd`
  )

  const buttonTextActionAdd = {
    [TransactionStatus.START]: `Start ${token.symbol} Addition`,
    [TransactionStatus.CONTINUE]: `Continue ${token.symbol} Addition`,
    [TransactionStatus.WAITING]: 'Waiting transaction',
    [TransactionStatus.COMPLETED]: `${token.symbol} added`
  }

  const buttonTextActionRemove = {
    [TransactionStatus.START]: `Start ${tokenSelection.symbol} Removal`,
    [TransactionStatus.CONTINUE]: `Continue ${token.symbol} Removal`,
    [TransactionStatus.WAITING]: 'Waiting transaction',
    [TransactionStatus.COMPLETED]: `${token.symbol} removed`
  }

  const buttonTextActionRebalance = {
    [TransactionStatus.START]: `Start Rebalance`,
    [TransactionStatus.CONTINUE]: `Continue Rebalance`,
    [TransactionStatus.WAITING]: 'Waiting transaction',
    [TransactionStatus.COMPLETED]: `Rebalance`
  }

  const addNewAsset = [
    null,
    <SelectAssets key="selectAssets" />,
    <AddLiquidity key="addLiquidity" />,
    <ReviewAddAsset key="reviewAddAsset" />,
    <ModalTransactions
      key="modalTransactions"
      title="To finish the process of adding the asset to the pool do the following:"
      transactionButtonStatus={transactionButtonStatus}
      buttonText={buttonTextActionAdd}
      isCompleted={isCompleted}
      transactions={transactions}
      onStart={handleAddToken}
      onCancel={() => setStep(prev => prev - 1)}
      onComfirm={() => setStep(prev => prev + 1)}
    />,
    <TransactionFinalized
      key="transactionFinalized"
      title="Asset addition has been approved"
      image={addIcon}
    >
      <S.Container>
        <FlexContainer>
          <ContentTitle>token added</ContentTitle>

          <ValueContainer>
            <ValueWrapper>
              <Value>{BNtoDecimal(Big(tokenLiquidity?.amount || 0), 2)}</Value>

              <SecondaryValue>
                ~$
                {priceData &&
                  tokenLiquidity.amount &&
                  BNtoDecimal(
                    Big(tokenLiquidity?.amount || 0).mul(
                      priceData[token.id.toLowerCase()]?.usd ?? 0
                    ),
                    2
                  )}
              </SecondaryValue>
            </ValueWrapper>

            <ImageWrapper>
              <Image src={token.image} layout="fill" />
            </ImageWrapper>
          </ValueContainer>
        </FlexContainer>

        <FlexContainer>
          <ContentTitle>LP received</ContentTitle>

          {poolInfo && priceData && tokenLiquidity.amount && (
            <ValueContainer>
              <ValueWrapper>
                <Value>
                  {BNtoDecimal(
                    Big(tokenLiquidity.amount || 0)
                      .mul(priceData[token.id.toLowerCase()]?.usd ?? 0)
                      .div(poolInfo.price_usd),
                    2
                  )}
                </Value>

                <SecondaryValue>
                  ~$
                  {BNtoDecimal(
                    Big(tokenLiquidity.amount || 0).mul(
                      priceData[token.id.toLowerCase()]?.usd ?? 0
                    ),
                    2
                  )}
                </SecondaryValue>
              </ValueWrapper>

              <ImageWrapper>
                <Image src={poolInfo.logo} layout="fill" />
              </ImageWrapper>
            </ValueContainer>
          )}
        </FlexContainer>
      </S.Container>
    </TransactionFinalized>
  ]

  const RemoveAsset = [
    null,
    <TokenRemoval key="TokenRemoval" />,
    <RemoveReview key="RemoveReview" />,
    <ModalTransactions
      key="modalTransactions"
      title="To finish the process of removing a token from the pool you must complete the following"
      transactionButtonStatus={transactionButtonStatus}
      buttonText={buttonTextActionRemove}
      isCompleted={isCompleted}
      transactions={transactions}
      onStart={handleRemoveToken}
      onCancel={() => setStep(prev => prev - 1)}
      onComfirm={() => setStep(prev => prev + 1)}
    />,
    <AssetRemovelCard
      key="AssetRemovelCard"
      poolInfo={{ name: poolInfo?.name ?? '', chainLogo: poolInfo?.chain.logo ?? '', logo: poolInfo?.logo ?? '' }}
      setIsOpenManageAssets={setIsOpenManageAssets}
    />
  ]

  const RebalanceAssets = [
    null,
    <SetNewWeights key="SetNewWeights" />,
    <RebalanceReview key="RebalanceReview" />,
    <ModalTransactions
      key="modalTransactions"
      title="Asset rebalance has been approved"
      transactionButtonStatus={transactionButtonStatus}
      buttonText={buttonTextActionRebalance}
      isCompleted={isCompleted}
      transactions={transactions}
      onStart={async () => handleRebalancesPool()}
      onCancel={() => setStep(prev => prev - 1)}
      onComfirm={() => setStep(prev => prev + 1)}
    />,
    <RebalanceSuccess key="RebalanceSuccess" time={periodSelect} setIsOpenManageAssets={setIsOpenManageAssets} />
  ]

  const chosenAction = {
    [chooseActionStep.Default]: null,
    [chooseActionStep.Add]: addNewAsset[step],
    [chooseActionStep.Remove]: RemoveAsset[step],
    [chooseActionStep.Rebalance]: RebalanceAssets[step]
  }

  async function getTransactionsList(
    tokenId: string,
    controller: string,
    transactionAction: string,
    keyAction: string,
    tokenSymbol: string,
    poolSymbol?: string
  ) {
    const transactionsList: TransactionsListType[] = []

    const { allowance } = ERC20(tokenId)
    const isAproved = await allowance(controller, userWalletAddress)

    if (isAproved) {
      transactionsList.push({
        key: tokenId,
        transaction: `Approve ${poolSymbol ? poolSymbol : tokenSymbol}`,
        status: 'APPROVED'
      })

      transactionsList.push({
        key: keyAction,
        transaction: `${transactionAction} ${tokenSymbol}`,
        status: 'NEXT'
      })
    } else {
      transactionsList.push({
        key: tokenId,
        transaction: `Approve ${poolSymbol ? poolSymbol : tokenSymbol}`,
        status: 'NEXT'
      })

      transactionsList.push({
        key: keyAction,
        transaction: `${transactionAction} ${tokenSymbol}`,
        status: 'WAITING'
      })
    }

    setTransactions(transactionsList)
  }

  async function handleRebalancesPool() {
    if (!poolAssets || !poolInfo) return
    setTransactionButtonStatus(TransactionStatus.WAITING)

    setTransactions([{
      key: 'Rebalance',
      transaction: 'Rebalance Pool',
      status: 'APPROVING'
    }])

    const poolWeightsArray = poolTokensList.map(item => {
      return newTokensWights[item.token.address].newWeight.mul(Big(10).pow(18)).toFixed(0)
    })

    try {
      const currentDate = new Date().getTime()
      const threeMinutesInTimestamp = 180000
      const oneHourInTimestamp = 3600000

      const currentDateAdded = currentDate + threeMinutesInTimestamp
      const periodSelectedFormatted = new Date(currentDateAdded + (oneHourInTimestamp * periodSelect)).getTime()

      // eslint-disable-next-line prettier/prettier
      const poolController = new web3.eth.Contract((Kacupe as unknown) as AbiItem, poolInfo.controller);
      await poolController.methods.updateWeightsGradually(
        Math.floor(currentDateAdded / 1000),
        Math.floor(periodSelectedFormatted / 1000),
        poolInfo.underlying_assets_addresses,
        poolWeightsArray
      ).send(
        {
          from: userWalletAddress
        },
        callBack
      )

    } catch (error) {
      console.log(error)
    }

  }

  async function handleRemoveToken() {
    if (!poolInfo) return

    setTransactionButtonStatus(TransactionStatus.WAITING)

    if (
      transactions[0].status === 'NEXT' ||
      transactions[0].status === 'ERROR'
    ) {
      setTransactions(prev =>
        prev.map((item, index) => {
          if (index === 0) {
            item.status = 'APPROVING'
            return item
          } else {
            item.status = 'NEXT'
            return item
          }
        })
      )

      const { approve } = ERC20(poolInfo.address)
      await approve(poolInfo.controller, userWalletAddress, callBack)
    } else {
      setTransactions(prev =>
        prev.map((item, index) => {
          if (index === 1) {
            item.status = 'APPROVING'
            return item
          } else {
            return item
          }
        })
      )
    }

    if (transactions[0].status === 'ERROR') {
      return
    }

    try {
      // eslint-disable-next-line prettier/prettier
      const poolController = new web3.eth.Contract((Kacupe as unknown) as AbiItem, poolInfo.controller);
      await poolController.methods
        .removeToken(
          tokenSelection.address,
          userWalletAddress,
          userWalletAddress
        )
        .send(
          {
            from: userWalletAddress
          },
          callBack
        )
    } catch (error) {
      console.log(error)
    }
  }

  async function callBack(error: MetamaskError, txHash: string) {
    if (error) {
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

      if (error.code === 4001) {
        dispatch(setModalAlertText({ errorText: `Approval cancelled` }))
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
      setTransactions(prev =>
        prev.map((item, index) => {
          if (item.status === 'APPROVING') {
            if (item.key === 'addToken' || item.key === 'removeToken' || item.key === 'Rebalance') {
              setIsCompleted(true)
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
      dispatch(
        setModalAlertText({
          errorText: 'Transaction reverted'
        })
      )

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
    }
  }

  async function handleAproveTokens(notAprovedToken: string) {
    if (!poolInfo) return
    const { approve } = ERC20(notAprovedToken)
    await approve(poolInfo?.controller, userWalletAddress, callBack)
  }

  async function handleAddToken() {
    if (!poolInfo) return

    setTransactionButtonStatus(TransactionStatus.WAITING)

    if (
      transactions[0].status === 'NEXT' ||
      transactions[0].status === 'ERROR'
    ) {
      setTransactions(prev =>
        prev.map((item, index) => {
          if (index === 0) {
            item.status = 'APPROVING'
            return item
          } else {
            item.status = 'NEXT'
            return item
          }
        })
      )

      await handleAproveTokens(mockTokensReverse[token.id.toLowerCase()])
    } else {
      setTransactions(prev =>
        prev.map((item, index) => {
          if (index === 1) {
            item.status = 'APPROVING'
            return item
          } else {
            return item
          }
        })
      )
    }

    if (transactions[0].status === 'ERROR') {
      return
    }

    try {
      const allocation = Big(tokenLiquidity.allocation)
        .div(100)
        .mul(Big(10).pow(18))
        .toFixed(0)
      const tokenToAddBalance = Big(tokenLiquidity.amount)
        .mul(Big(10).pow(token.decimals))
        .toFixed(0)

      // eslint-disable-next-line prettier/prettier
      const poolController = new web3.eth.Contract((Kacupe as unknown) as AbiItem, poolInfo.controller);
      const response = await poolController.methods
        .addToken(
          mockTokensReverse[token.id.toLowerCase()],
          allocation,
          tokenToAddBalance,
          userWalletAddress,
          userWalletAddress
        )
        .send(
          {
            from: userWalletAddress
          },
          callBack
        )
    } catch (error) {
      console.log('Error', error)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!poolInfo) return
    event.preventDefault()

    if (actionSelected === chooseActionStep.Rebalance && step === 2) {
      setTransactions([{
        key: 'Rebalance',
        transaction: 'Rebalance Pool',
        status: 'NEXT'
      }])
    }
    if (actionSelected === chooseActionStep.Remove && step === 1) {
      if (!poolInfo) return

      getTransactionsList(
        poolInfo.address,
        poolInfo.controller,
        'Remove',
        'RemoveToken',
        tokenSelection.symbol,
        poolInfo.symbol
      )
    }
    if (actionSelected === chooseActionStep.Add && step === 2) {
      getTransactionsList(
        mockTokensReverse[token.id.toLowerCase()],
        poolInfo.controller,
        'Add',
        'addToken',
        token.symbol
      )
      // getTransactionsList(mockTokensReverse[token.id.toLowerCase()])
    }

    if (actionSelected > 0 && step < 4 || (actionSelected === chooseActionStep.Add && step < 5)) {
      setStep(prev => prev + 1)
    }
  }

  return (
    <S.ManageAssets>
      <ModalFullWindow
        handleCloseModal={() => setIsOpenManageAssets(false)}
      >
        <form id="manageAssetsForm" onSubmit={handleSubmit}>
          {step === 0 ? (
            <ChooseAction
              poolId={poolId}
              actionSelected={actionSelected}
              setActionSelected={setActionSelected}
            />
          ) : (
            chosenAction[actionSelected]
          )}
          {((step < 4 && actionSelected === chooseActionStep.Add) || step < 3) && (
            <ContainerButton
              form="manageAssetsForm"
              backButtonDisabled={step < 1}
              onBack={() => setStep(prev => prev - 1)}
              onNext={() => {
                return
              }}
            />
          )}
        </form>
      </ModalFullWindow>
    </S.ManageAssets>
  )
}

export default ManageAssets
