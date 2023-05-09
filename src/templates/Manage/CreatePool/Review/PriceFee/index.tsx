import React from 'react'
import BigNumber from 'bn.js'
import useSWR from 'swr'
import Web3 from 'web3'

import { COINGECKO_API } from '@/constants/tokenAddresses'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setTermsAndConditions } from '../../../../../store/reducers/poolCreationSlice'
import { networks } from '@/constants/tokenAddresses'

import Checkbox from '../../../../../components/Inputs/Checkbox'
import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'

const PriceFee = () => {
  const [isOpenTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false)
  const [estimateGas, setEstimateGas] = React.useState({
    price: 0,
    gas: ''
  })

  const dispatch = useAppDispatch()
  const termsAndConditions = useAppSelector(
    state => state.poolCreation.createPoolData.termsAndConditions
  )

  const networkId = useAppSelector(
    state => state.poolCreation.createPoolData.networkId
  )

  function handleClick() {
    dispatch(setTermsAndConditions())
  }

  const { data } = useSWR(
    `${COINGECKO_API}/simple/price?ids=wmatic&vs_currencies=usd`
  )

  React.useEffect(() => {
    const web3 = new Web3(networks[networkId ?? 137].rpc)
    const getGasFee = async () => {
      try {
        const estimateGasUsed = new BigNumber(7_805_975)
        const baseFee = (await web3.eth.getBlock('latest')).baseFeePerGas

        const gas = web3.utils
          .fromWei(
            estimateGasUsed.mul(
              new BigNumber(baseFee ?? 0)
                .mul(new BigNumber(13))
                .div(new BigNumber(10))
            ),
            'ether'
          )
          .slice(0, 5)
        setEstimateGas(old => ({ ...old, gas: gas.toString() }))
      } catch (error) {
        console.error('Error', error)
      }
    }

    getGasFee()
  }, [])

  return (
    <>
      <S.PriceFee>
        <S.PriceFeeTitle>Price to create your pool</S.PriceFeeTitle>
        <S.PriceFeeParagraph>
          You’ll need to pay {networks[networkId ?? 137].nativeCurrency.symbol}{' '}
          to cover the Smart contract creation costs. We do not charge fees to
          create Funds, these costs are Avalanche Network Fees.
        </S.PriceFeeParagraph>
        <S.PriceFeeBody>
          <S.NetworkFeesContainer>
            <p>network fees</p>
            <S.WrapperPrice>
              <span>
                ~{estimateGas.gas}{' '}
                {networks[networkId ?? 137].nativeCurrency.symbol}
              </span>
              {data && (
                <p>
                  ${(data?.wmatic?.usd * Number(estimateGas.gas)).toFixed(2)}{' '}
                  USD
                </p>
              )}
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
