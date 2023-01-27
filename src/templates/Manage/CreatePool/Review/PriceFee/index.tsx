import React from 'react'
import Web3 from 'web3'
import BigNumber from 'bn.js'
import Big from 'big.js'
import { AbiItem } from 'web3-utils'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setTermsAndConditions } from '../../../../../store/reducers/poolCreationSlice'
import KassandraManagedControllerFactoryAbi from '../../../../../constants/abi/KassandraManagedControllerFactory.json'

import Checkbox from '../../../../../components/Inputs/Checkbox'
import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'

import { mockTokensList } from '../../'
import { mockTokens } from '../../SelectAssets'
const WHITELIST_ADDRESS = '0xe119DE3b0FDab34e9CE490FDAa562e6457126A57'

const PriceFee = () => {
  const [isOpenTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false)

  const dispatch = useAppDispatch()
  const termsAndConditions = useAppSelector(
    state => state.poolCreation.createPoolData.termsAndConditions
  )
  const poolData = useAppSelector(state => state.poolCreation.createPoolData)
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  function handleClick() {
    dispatch(setTermsAndConditions())
  }

  // const getGasFee = async () => {
  //   const maxAmountsIn: string[] = []
  //   const tokens: string[] = []
  //   const normalizedWeights: string[] = []
  //   const tokensList = poolData.tokens ? poolData.tokens : []

  //   // for testnet
  //   const mockTokensListSorted = mockTokensList.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
  //   for (const mockToken of mockTokensListSorted) {
  //     if (mockTokens[mockToken]) {
  //       for (const token of tokensList) {
  //         if (token.address === mockTokens[mockToken].toLowerCase()) {
  //           maxAmountsIn.push((new BigNumber(token.amount.mul(Big(10).pow(token.decimals)).round().toString())).toString())
  //           normalizedWeights.push((new BigNumber(Big(token.allocation).div(100).mul(Big(10).pow(18)).round().toString())).toString())
  //           tokens.push(mockToken)
  //         }
  //       }
  //     }
  //   }

  //   // for production
  //   // const tokensArr = tokensList.sort((a, b) => a.address < b.address ? 1 : -1)
  //   // for (const token of tokensArr) {
  //   //   maxAmountsIn.push(new BigNumber(token.amount.mul(Big(10).pow(token.decimals)).round().toString()))
  //   //   tokens.push(token.address)
  //   //   normalizedWeights.push(new BigNumber(Big(token.allocation).div(100).mul(Big(10).pow(18)).round().toString()))
  //   // }

  //   const managementFeeRate = poolData.fees?.managementFee.feeRate ? poolData.fees.managementFee.feeRate : 0
  //   const depositFeeRate = poolData.fees?.depositFee.feeRate ? poolData.fees.depositFee.feeRate : 0
  //   const managerShare = poolData.fees?.refferalFee.managerShare ? poolData.fees.refferalFee.managerShare : 0
  //   const brokerCommision = poolData.fees?.refferalFee.brokerCommision ? poolData.fees.refferalFee.brokerCommision : 0

  //   const managementAumFeePercentage = poolData.fees?.managementFee?.feeRate ? managementFeeRate / 100 : 0 / 100
  //   const feesToManager = poolData.fees?.depositFee.isChecked ? poolData.fees.refferalFee.isChecked ? managerShare / 100 : depositFeeRate / 100 : 0 / 100
  //   const feesToReferral = poolData.fees?.refferalFee.brokerCommision ? brokerCommision / 100 : 0 / 100

  //   const pool = {
  //     name: poolData.poolName,
  //     symbol: poolData.strategy,
  //     isPrivatePool: poolData.privacy !== 'public',
  //     whitelist: WHITELIST_ADDRESS,
  //     maxAmountsIn: maxAmountsIn,
  //     settingsParams: {
  //       tokens: tokens,
  //       normalizedWeights: normalizedWeights,
  //       swapFeePercentage: Big(0.03).mul(Big(10).pow(18)).toString(),
  //       swapEnabledOnStart: true,
  //       mustAllowlistLPs: false,
  //       managementAumFeePercentage: poolData.fees?.managementFee.isChecked ? Big(managementAumFeePercentage).mul(Big(10).pow(18)).toString() : Big(0).mul(Big(10).pow(18)).toString(),
  //       aumFeeId: 3,
  //     },
  //     feesSettings: {
  //       feesToManager: poolData.fees?.managementFee.isChecked ? Big(feesToManager).mul(Big(10).pow(18)).toString() : Big(0).mul(Big(10).pow(18)).toString(),
  //       feesToReferral: poolData.fees?.refferalFee.isChecked ? Big(feesToReferral).mul(Big(10).pow(18)).toString() : Big(0).mul(Big(10).pow(18)).toString(),
  //     },
  //   }

  //   try {
  //     const web3 = new Web3("https://rpc.ankr.com/eth_goerli");
  //     const factoryContract = new web3.eth.Contract((KassandraManagedControllerFactoryAbi as unknown) as AbiItem, '0x0835F738dC4Ec96d2b22d314d77a383fC0d39612');
  //     const gasAmount = await factoryContract.methods.create(
  //         pool.name,
  //         pool.symbol,
  //         pool.isPrivatePool,
  //         pool.whitelist,
  //         pool.maxAmountsIn,
  //         pool.settingsParams,
  //         pool.feesSettings,
  //     ).estimateGas({
  //       from: userWalletAddress
  //     });

  //     console.log('gas', gasAmount)
  //   } catch (error) {
  //     console.error('Error', error)
  //   }
  // }

  // getGasFee()

  return (
    <>
      <S.PriceFee>
        <S.PriceFeeTitle>Price to create your pool</S.PriceFeeTitle>
        <S.PriceFeeParagraph>
          You’ll need to pay AVAX to cover the Smart contract creation costs. We
          do not charge fees to create Funds, these costs are Avalanche Network
          Fees.
        </S.PriceFeeParagraph>
        <S.PriceFeeBody>
          <S.NetworkFeesContainer>
            <p>network fees</p>
            <S.WrapperPrice>
              <span>0.30 AVAX</span>
              <p>1.35 USD</p>
            </S.WrapperPrice>
          </S.NetworkFeesContainer>
          <hr />
          <S.WrapperInput>
            <Checkbox
              form="poolCreationForm"
              checked={termsAndConditions ? termsAndConditions : false}
              name="inputChekbox"
              onChange={handleClick}
              label="I agree with"
              showLabel={true}
              required
            />
            <span onClick={() => setOpenTermsAndConditions(true)}>
              terms and conditions.
            </span>
          </S.WrapperInput>
        </S.PriceFeeBody>
      </S.PriceFee>

      {isOpenTermsAndConditions && (
        <TermsAndConditions
          modalOpen={isOpenTermsAndConditions}
          setModalOpen={setOpenTermsAndConditions}
        />
      )}
    </>
  )
}

export default PriceFee
