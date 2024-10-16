import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { ERC20 } from '../../../hooks/useERC20'
import useManagePoolController from '@/hooks/useManagePoolController'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import useTransaction from '@/hooks/useTransaction'
import { useTokensData } from '@/hooks/query/useTokensData'

import { mockTokensReverse } from '../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../utils/numerals'

import { networks } from '../../../constants/tokenAddresses'

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
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

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
  const [actionSelected, setActionSelected] = React.useState(
    chooseActionStep.Default
  )
  const [transactions, setTransactions] = React.useState<
    TransactionsListType[]
  >([])
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false)
  const [transactionButtonStatus, setTransactionButtonStatus] = React.useState(
    TransactionStatus.START
  )

  const dispatch = useAppDispatch()

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()
  const { txNotification, transactionErrors } = useTransaction()
  const token = useAppSelector(state => state.addAsset.token)
  const tokenLiquidity = useAppSelector(state => state.addAsset.liquidit)

  const { tokenSelection } = useAppSelector(state => state.removeAsset)
  const lpNeeded = useAppSelector(state => state.removeAsset.lpNeeded)
  const { periodSelect, newTokensWights } = useAppSelector(
    state => state.rebalanceAssets
  )
  const chainId = Number(connectedChain?.id ?? '0x89')

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: poolAssets } = usePoolAssets({ id: poolId })
  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })
  const managePool = useManagePoolController(
    (poolInfo && poolInfo[0]?.controller) ?? '',
    networks[(poolInfo && poolInfo[0]?.chain_id) ?? 137].rpc
  )

  const { data: priceData } = useTokensData({
    chainId: (poolInfo && poolInfo[0]?.chain_id) || 137,
    tokenAddresses: [token.id]
  })

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
      title="To finish the process of adding the asset to the portfolio do the following:"
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
      onCLick={() => setIsOpenManageAssets(false)}
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
                      .div(poolInfo[0].price_usd),
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
                <TokenWithNetworkImage
                  tokenImage={{
                    url: poolInfo[0]?.logo ?? '',
                    height: 20,
                    width: 20,
                    withoutBorder: true
                  }}
                  networkImage={{
                    url: poolInfo[0]?.chain?.logo ?? '',
                    height: 10,
                    width: 10
                  }}
                  blockies={{
                    size: 4,
                    scale: 7,
                    seedName: poolInfo[0]?.name ?? ''
                  }}
                />
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
      title="To finish the process of removing a token from the portfolio you must complete the following"
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
      poolInfo={{
        name: (poolInfo && poolInfo[0]?.name) ?? '',
        chainLogo: (poolInfo && poolInfo[0]?.chain?.logo) ?? '',
        logo: (poolInfo && poolInfo[0]?.logo) ?? ''
      }}
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
    <RebalanceSuccess
      key="RebalanceSuccess"
      time={periodSelect}
      setIsOpenManageAssets={setIsOpenManageAssets}
    />
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
    amountToAprove: string,
    poolSymbol?: string
  ) {
    if (!wallet) return

    const transactionsList: TransactionsListType[] = []

    const { allowance } = await ERC20(
      tokenId,
      (poolInfo && poolInfo[0]?.chain_id) ?? 137,
      {
        wallet: null,
        txNotification: txNotification,
        transactionErrors: transactionErrors
      }
    )
    const amountApproved = await allowance(
      controller,
      wallet.accounts[0].address
    )

    if (Big(amountApproved).gte(amountToAprove)) {
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

    setTransactions([
      {
        key: 'Rebalance',
        transaction: 'Rebalance Pool',
        status: 'APPROVING'
      }
    ])

    const weightsArray: string[] = []
    poolInfo[0].underlying_assets_addresses.forEach(item => {
      weightsArray.push(
        newTokensWights[item].newWeight.mul(Big(10).pow(16)).toFixed()
      )
    })

    function handleSuccess() {
      setIsCompleted(true)

      setTransactions([
        {
          key: 'Rebalance',
          transaction: 'Rebalance Pool',
          status: 'APPROVED'
        }
      ])
    }

    function handleFail() {
      setTransactionButtonStatus(TransactionStatus.CONTINUE)

      setTransactions([
        {
          key: 'Rebalance',
          transaction: 'Rebalance Pool',
          status: 'ERROR'
        }
      ])
    }

    try {
      const currentDate = new Date().getTime()
      const threeMinutesInTimestamp = 180000
      const oneHourInTimestamp = 3600000

      const currentDateAdded = currentDate + threeMinutesInTimestamp
      const periodSelectedFormatted = new Date(
        currentDateAdded + oneHourInTimestamp * periodSelect
      ).getTime()

      await managePool.rebalancePool(
        Math.floor(currentDateAdded / 1000),
        Math.floor(periodSelectedFormatted / 1000),
        poolInfo[0].underlying_assets_addresses,
        weightsArray,
        handleSuccess,
        handleFail
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveToken() {
    if (!poolInfo || !wallet) return

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

      let amount = BNtoDecimal(lpNeeded.value, 4)
      amount = `${amount.slice(0, amount.length - 1)}${
        Number(amount[amount.length - 1]) + 1
      }`
      const status = await handleApproveToken({
        address: poolInfo[0].address,
        amount: lpNeeded.value.mul(Big(10).pow(18)).toFixed(0),
        normalizedAmount: amount,
        symbol: poolInfo[0].symbol
      })

      if (!status) return
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

    await managePool.removeToken(
      tokenSelection.address,
      wallet?.accounts[0].address,
      handleSuccess,
      handleFail
    )
  }

  function handleSuccess() {
    let transactionIndex = -100
    setTransactions(prev =>
      prev.map((item, index) => {
        if (item.status === 'APPROVING') {
          if (
            item.key === 'addToken' ||
            item.key === 'RemoveToken' ||
            item.key === 'Rebalance'
          ) {
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

    return true
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
              errorText: `You have approved less ${approve.token.symbol} than the amount necessary to continue manage pool`,
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
            errorText: `You have approved less ${approve.token.symbol} than the amount necessary to continue manage pool`,
            solutionText: `Please retry and increase your spend limit to at least ${approve.token.normalizedAmount}`
          })
        )

        return false
      }
    }

    handleSuccess()
    return true
  }

  async function handleApproveToken(token: {
    address: string
    amount: string
    symbol: string
    normalizedAmount: string
  }) {
    if (!poolInfo || !wallet) return false

    const { approve, allowance } = await ERC20(
      token.address,
      poolInfo[0]?.chain_id ?? 137,
      {
        wallet: wallet,
        txNotification: txNotification,
        transactionErrors: transactionErrors
      }
    )
    const oldAllowance = await allowance(
      poolInfo[0]?.controller,
      wallet.accounts[0].address
    )
    const receipt = await approve(
      poolInfo[0]?.controller,
      BigInt(token.amount),
      {},
      {
        onFail: handleFail
      }
    )

    if (receipt?.status === 1) {
      const status = await handleApproveSuccess({
        allowance,
        contractApprove: poolInfo[0]?.controller,
        oldAllowance,
        token
      })

      return status
    }

    return false
  }

  async function handleAddToken() {
    if (!poolInfo || !wallet) return

    const tokenAdd =
      chainId === 5 ? mockTokensReverse[token.id.toLowerCase()] : token.id

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

      const status = await handleApproveToken({
        address: tokenAdd,
        amount: Big(tokenLiquidity.amount)
          .mul(Big(10).pow(token.decimals))
          .toFixed(0),
        normalizedAmount: tokenLiquidity.amount,
        symbol: token.symbol
      })

      if (!status) return
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

      await managePool.addToken(
        tokenAdd,
        allocation,
        tokenToAddBalance,
        wallet.accounts[0].address,
        handleSuccess,
        handleFail
      )
    } catch (error) {
      console.log('Error', error)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!poolInfo) return
    event.preventDefault()

    if (actionSelected === chooseActionStep.Rebalance && step === 2) {
      setTransactions([
        {
          key: 'Rebalance',
          transaction: 'Rebalance Pool',
          status: 'NEXT'
        }
      ])
    }
    if (actionSelected === chooseActionStep.Remove && step === 1) {
      if (!poolInfo) return

      getTransactionsList(
        poolInfo[0].address,
        poolInfo[0].controller,
        'Remove',
        'RemoveToken',
        tokenSelection.symbol,
        lpNeeded.value.mul(Big(10).pow(18)).toFixed(0),
        poolInfo[0].symbol
      )
    }
    if (actionSelected === chooseActionStep.Add && step === 2) {
      getTransactionsList(
        chainId === 5 ? mockTokensReverse[token.id.toLowerCase()] : token.id,
        poolInfo[0].controller,
        'Add',
        'addToken',
        token.symbol,
        Big(tokenLiquidity.amount).mul(Big(10).pow(token.decimals)).toFixed(0)
      )
    }

    if (
      (actionSelected > 0 && step < 4) ||
      (actionSelected === chooseActionStep.Add && step < 5)
    ) {
      setStep(prev => prev + 1)
    }
  }

  return (
    <S.ManageAssets>
      <ModalFullWindow handleCloseModal={() => setIsOpenManageAssets(false)}>
        <form id="manageAssetsForm" onSubmit={handleSubmit}>
          {step === 0 ? (
            <ChooseAction
              poolId={poolId}
              actionSelected={actionSelected}
              setActionSelected={setActionSelected}
              amountTokenInPool={
                (poolInfo && poolInfo[0]?.underlying_assets_addresses.length) ??
                0
              }
            />
          ) : (
            chosenAction[actionSelected]
          )}
          {((step < 4 && actionSelected === chooseActionStep.Add) ||
            step < 3) && (
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
