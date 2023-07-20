import React from 'react'

import useGasFee from '@/hooks/useGasFee'
import { useAppSelector } from '@/store/hooks'
import { networks } from '@/constants/tokenAddresses'
import { useTokensData } from '@/hooks/query/useTokensData'

import * as S from './styles'

const PriceFee = () => {
  const [estimateGas, setEstimateGas] = React.useState({
    price: 0,
    gas: ''
  })

  const networkId = useAppSelector(
    state => state.poolCreation.createPoolData.networkId
  )
  const { gasFee } = useGasFee(networkId || 137)

  const { data } = useTokensData({
    chainId: 137,
    tokenAddresses: ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270']
  })

  React.useEffect(() => {
    async function getGasFee() {
      const gas = await gasFee(7_805_975)
      setEstimateGas(old => ({ ...old, gas: Number(gas).toFixed(6) }))
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
                  $
                  {(
                    data['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'].usd *
                    Number(estimateGas.gas)
                  ).toFixed(6)}{' '}
                  USD
                </p>
              )}
            </S.WrapperPrice>
          </S.NetworkFeesContainer>
          {/* <hr />
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
          </S.WrapperInput> */}
        </S.PriceFeeBody>
      </S.PriceFee>

      {/* {isOpenTermsAndConditions && (
        <TermsAndConditions
          modalOpen={isOpenTermsAndConditions}
          setModalOpen={setOpenTermsAndConditions}
        />
      )} */}
    </>
  )
}

export default PriceFee
