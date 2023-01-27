import React from 'react'
import Big from 'big.js'
import { AbiItem } from 'web3-utils'
import web3 from '../../../utils/web3'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import {
  setBackStepNumber,
  setNextStepNumber,
  setClear,
  setToFirstStep
} from '../../../store/reducers/poolCreationSlice'
import { ERC20 } from '../../../hooks/useERC20Contract'

import KassandraManagedControllerFactoryAbi from '../../../constants/abi/KassandraManagedControllerFactory.json'
import KassandraControlerAbi from '../../../constants/abi/KassandraController.json'

import ContainerButton from '../../../components/ContainerButton'
import ModalFullWindow from '../../../components/Modals/ModalFullWindow'
import StepGuide from './StepGuide'
import SetDetails from './SetDetails'
import SelectAssets from './SelectAssets'
import AddLiquidity from './AddLiquidity'
import ConfigureFee from './ConfigureFee'
import Review from './Review'
import PoolCreated from './PoolCreated'

import * as S from './styles'

import { mockTokens } from './SelectAssets'

const WHITELIST_ADDRESS = '0xe119DE3b0FDab34e9CE490FDAa562e6457126A57'
const FACTORY_ADDRESS = '0xca36a7f25e8b0a2b3fc7a9baf3b2f22d80e03788'

export const mockTokensList: string[] = [
  '0x841a91e3De1202b7b750f464680068aAa0d0EA35',
  '0xDcfcef36F438ec310d8a699e3D3729398547b2BF',
  '0xca813266889e0FD141dF48B85294855616015fA4',
  '0xb22ED6ED220506E4757Bc90cbB05d41b6257b590',
  '0x2f52C8ce1e5A064B4202762aD34E075E8826C252',
  '0x874a7CE88d933e6Edc24f4867923F1d09568b08B',
  '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d',
  '0x07Fb45533CC34Cd88D69C57739ceFb77202733E9',
]

interface ICreatePoolProps {
  setIsCreatePool: React.Dispatch<React.SetStateAction<boolean>>
}

Big.RM = 0

const CreatePool = ({ setIsCreatePool }: ICreatePoolProps) => {
  const dispatch = useAppDispatch()
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const poolCreationSteps = [
    <StepGuide key="stepGuide" />,
    <SetDetails key="setDetails" />,
    <SelectAssets key="selecAssets" />,
    <AddLiquidity key="addLiquidity" />,
    <ConfigureFee key="configureFee" />,
    <Review key="review" />,
    <PoolCreated key="poolCreated" />
  ]

  function handleNextButton() {
    dispatch(setNextStepNumber())
  }

  async function getIsAproved(tokens: string[]) {
    const tokensNotAproved: string[] = []
    for (const token of tokens) {
      const { allowance } = ERC20(token)
      const isAproved = await allowance(FACTORY_ADDRESS, userWalletAddress)
      if (isAproved === false) {
        tokensNotAproved.push(token)
      }
    }

    return tokensNotAproved
  }

  async function handleAproveTokens(notAprovedTokens: string[]) {
    function callBack() {
      console.log('Aprroved')
    }

    for (const token of notAprovedTokens) {
      const { approve } = ERC20(token)
      await approve(FACTORY_ADDRESS, userWalletAddress, callBack)
    }
  }

  async function handlePrivateInvestors(poolControler: string, investorsList: { address: string }[]) {
    const controller = new web3.eth.Contract((KassandraControlerAbi as unknown) as AbiItem, poolControler)

    for (const address of investorsList) {
      await controller.methods.addAllowedAddress(address.address).send({
        from: userWalletAddress
      })
    }
  }

  async function deployPool() {
    const maxAmountsIn: string[] = []
    const tokens: string[] = []
    const normalizedWeights: string[] = []
    const tokensList = poolData.tokens ? poolData.tokens : []

    // for testnet Goerli
    const mockTokensListSorted = mockTokensList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
    let sum = Big(0)
    for (const mockToken of mockTokensListSorted) {
      if (mockTokens[mockToken]) {
        for (const token of tokensList) {
          if (token.address === mockTokens[mockToken].toLowerCase()) {
            sum = sum.plus(token.allocation)
            maxAmountsIn.push(token.amount.mul(Big(10).pow(token.decimals)).round().toString())
            normalizedWeights.push(Big(token.allocation).div(100).mul(Big(10).pow(18)).round().toString())
            tokens.push(mockToken)
          }
        }
      }
    }

    const notAprovedTokens = await getIsAproved(tokens)

    if (notAprovedTokens.length > 0) {
      await handleAproveTokens(notAprovedTokens)
    }
    // for production
    // const tokensArr = tokensList.sort((a, b) => a.address < b.address ? 1 : -1)
    // for (const token of tokensArr) {
    //   maxAmountsIn.push(new BigNumber(token.amount.mul(Big(10).pow(token.decimals)).round().toString()))
    //   tokens.push(token.address)
    //   normalizedWeights.push(new BigNumber(Big(token.allocation).div(100).mul(Big(10).pow(18)).round().toString()))
    // }

    const managementFeeRate = poolData.fees?.managementFee.feeRate ? poolData.fees.managementFee.feeRate : 0
    const depositFeeRate = poolData.fees?.depositFee.feeRate ? poolData.fees.depositFee.feeRate : 0
    const managerShare = poolData.fees?.refferalFee.managerShare ? poolData.fees.refferalFee.managerShare : 0
    const brokerCommision = poolData.fees?.refferalFee.brokerCommision ? poolData.fees.refferalFee.brokerCommision : 0

    const managementAumFeePercentage = poolData.fees?.managementFee?.feeRate ? managementFeeRate / 100 : 0 / 100
    const feesToManager = poolData.fees?.depositFee.isChecked ? poolData.fees.refferalFee.isChecked ? managerShare / 100 : depositFeeRate / 100 : 0 / 100
    const feesToReferral = poolData.fees?.refferalFee.brokerCommision ? brokerCommision / 100 : 0 / 100

    const pool = {
      name: poolData.poolName,
      symbol: poolData.poolSymbol,
      isPrivatePool: poolData.privacy !== 'public',
      whitelist: WHITELIST_ADDRESS,
      maxAmountsIn: maxAmountsIn,
      settingsParams: {
        tokens: tokens,
        normalizedWeights: normalizedWeights,
        swapFeePercentage: Big(0.03).mul(Big(10).pow(18)).toString(),
        swapEnabledOnStart: true,
        mustAllowlistLPs: false,
        managementAumFeePercentage: poolData.fees?.managementFee.isChecked ? Big(managementAumFeePercentage).mul(Big(10).pow(18)).round().toString() : Big(0).mul(Big(10).pow(18)).toString(),
        aumFeeId: 3,
      },
      feesSettings: {
        feesToManager: poolData.fees?.managementFee.isChecked ? Big(feesToManager).mul(Big(10).pow(18)).round().toString() : Big(0).mul(Big(10).pow(18)).toString(),
        feesToReferral: poolData.fees?.refferalFee.isChecked ? Big(feesToReferral).mul(Big(10).pow(18)).round().toString() : Big(0).mul(Big(10).pow(18)).toString(),
      },
    }

    try {
      const factoryContract = new web3.eth.Contract((KassandraManagedControllerFactoryAbi as unknown) as AbiItem, FACTORY_ADDRESS);

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
      console.log(response)

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
      })

      console.log(tx)
      if (pool.isPrivatePool) {
        const addressList = poolData?.privateAddressList ? poolData.privateAddressList : []
        await handlePrivateInvestors(response.poolController, addressList)
      }

      dispatch(setClear())
    } catch (error) {
      console.error('It was not possible to create pool', error)        
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (stepNumber === 5) {
      deployPool()
    }
    handleNextButton()
  }

  return (
    <S.CreatePool>
      <ModalFullWindow handleCloseModal={() => {
          if (stepNumber === 6) {
            dispatch(setToFirstStep())
          }
          setIsCreatePool(false)
        } 
      }>
        <form id="poolCreationForm" onSubmit={handleSubmit}>
          {poolCreationSteps[stepNumber]}

          {stepNumber < 6 && (
            <ContainerButton
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
