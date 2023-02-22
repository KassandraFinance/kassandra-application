import React from 'react'
import BigNumber from 'bn.js'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setTermsAndConditions } from '../../../../../store/reducers/poolCreationSlice'

import web3 from '../../../../../utils/web3'
import Checkbox from '../../../../../components/Inputs/Checkbox'
import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'
import useSWR from 'swr'

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

  function handleClick() {
    dispatch(setTermsAndConditions())
  }

  const { data } = useSWR(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  )

  React.useEffect(() => {
    const getGasFee = async () => {
      try {
        const estimateGasUsed = new BigNumber(7_805_975)
        const baseFee = (await web3.eth.getBlock('latest')).baseFeePerGas
        console.log(baseFee)
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
          You’ll need to pay ETH to cover the Smart contract creation costs. We
          do not charge fees to create Funds, these costs are Avalanche Network
          Fees.
        </S.PriceFeeParagraph>
        <S.PriceFeeBody>
          <S.NetworkFeesContainer>
            <p>network fees</p>
            <S.WrapperPrice>
              <span>~{estimateGas.gas} ETH</span>
              {data && (
                <p>
                  ${(data?.ethereum?.usd * Number(estimateGas.gas)).toFixed(2)}{' '}
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
