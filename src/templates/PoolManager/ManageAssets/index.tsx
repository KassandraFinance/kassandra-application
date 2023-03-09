import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
import web3 from '../../../utils/web3'
import { AbiItem } from 'web3-utils'

import { ERC20 } from '../../../hooks/useERC20Contract'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setModalAlertText } from '../../../store/reducers/modalAlertText'
import { mockTokensReverse } from '../../../constants/tokenAddresses'
import Kacupe from '../../../constants/abi/Kacupe.json'

import { BNtoDecimal } from '../../../utils/numerals'
import waitTransaction, { MetamaskError } from '../../../utils/txWait'

import {
  BACKEND_KASSANDRA,
  COINGECKO_API,
  networks
} from '../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from './AddLiquidity/graphql'

import TokenRemoval from './TokenRemoval'
import RemoveReview from './RemoveReview'
import AssetRemovelCard from './AssetRemovelCard'
import SelectAssets from './SelectAssets'
import ChooseAction from './ChooseAction'
import RebalanceAssets from './RebalanceAssets'
import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import AddLiquidity from './AddLiquidity'
import ReviewAddAsset from './ReviewAddAsset'
import ModalTransactions, {
  TransactionsListType,
  TransactionStatus
} from '../../../components/Modals/ModalTransactions'
import TransactionFinalized from './TransactionFinalized'

import {
  GetPoolTokensType,
  CoinGeckoAssetsResponseType
} from './AddLiquidity/AddLiquidityOperation'

import addIcon from '../../../../public/assets/iconGradient/add.svg'

import * as S from './styles'
import {
  FlexContainer,
  ContentTitle,
  ValueContainer,
  ValueWrapper,
  Value,
  SecondaryValue,
  ImageWrapper
} from './ReviewAddAsset/TransactionSummary/styles'
import { useRouter } from 'next/router'

Big.RM = 0

const ManageAssets = () => {
  const [step, setStep] = React.useState(0)
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
  const controller = useAppSelector(state => state.addAsset.controller)
  const tokenLiquidity = useAppSelector(state => state.addAsset.liquidit)
  const poolAddId = useAppSelector(state => state.addAsset.poolId)
  const chainId = useAppSelector(state => state.addAsset.chainId)

  const { poolInfo, tokenSelection } = useAppSelector(
    state => state.removeAsset
  )

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
  ? router.query.pool[0]
  : router.query.pool ?? ''


  const params = {
    id: poolId
  }

  const { data } = useSWR<GetPoolTokensType>(
    [GET_POOL_TOKENS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )

  const { data: priceData } = useSWR<CoinGeckoAssetsResponseType>(
    `${COINGECKO_API}/simple/token_price/${networks[chainId].coingecko}?contract_addresses=${token.id}&vs_currencies=usd`
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

  const addNewAsset = [
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
                      priceData[token.id.toLowerCase()]?.usd
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

          {data && priceData && tokenLiquidity.amount && (
            <ValueContainer>
              <ValueWrapper>
                <Value>
                  {BNtoDecimal(
                    Big(tokenLiquidity.amount || 0)
                      .mul(priceData[token.id.toLowerCase()].usd)
                      .div(data.pool.price_usd),
                    2
                  )}
                </Value>

                <SecondaryValue>
                  ~$
                  {BNtoDecimal(
                    Big(tokenLiquidity.amount || 0).mul(
                      priceData[token.id.toLowerCase()].usd
                    ),
                    2
                  )}
                </SecondaryValue>
              </ValueWrapper>

              <ImageWrapper>
                <Image src={data.pool.logo} layout="fill" />
              </ImageWrapper>
            </ValueContainer>
          )}
        </FlexContainer>
      </S.Container>
    </TransactionFinalized>
  ]

  const RemoveAsset = [
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
    <AssetRemovelCard key="AssetRemovelCard" />
  ]

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

  async function handleRemoveToken() {
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
            if (item.key === 'addToken' || item.key === 'removeToken') {
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
    const { approve } = ERC20(notAprovedToken)
    await approve(controller, userWalletAddress, callBack)
  }

  async function handleAddToken() {
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
      const poolController = new web3.eth.Contract((Kacupe as unknown) as AbiItem, controller);
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
    event.preventDefault()
    if (step === 1) {
      getTransactionsList(
        poolInfo.address,
        poolInfo.controller,
        'Remove',
        'RemoveToken',
        tokenSelection.symbol,
        poolInfo.symbol
      )
      // getTransactionsList(
      //   mockTokensReverse[token.id.toLowerCase()],
      //   controller,
      //   'Add',
      //   'addToken',
      //   token.symbol
      // )
      // getTransactionsList(mockTokensReverse[token.id.toLowerCase()])
    }

    setStep(prev => prev + 1)
  }

  return (
    <S.ManageAssets>
      <ModalFullWindow
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handleCloseModal={() => {}}
      >
        <form id="manageAssetsForm" onSubmit={handleSubmit}>
          {
            // <ChooseAction />
          }
          {/* <RebalanceAssets /> */}
          {RemoveAsset[step]}
          {/* {addNewAsset[step]} */}

          <ContainerButton
            form="manageAssetsForm"
            backButtonDisabled={step < 1}
            onBack={() => setStep(prev => prev - 1)}
            onNext={() => {
              return
            }}
          />
        </form>
      </ModalFullWindow>
    </S.ManageAssets>
  )
}

export default ManageAssets
