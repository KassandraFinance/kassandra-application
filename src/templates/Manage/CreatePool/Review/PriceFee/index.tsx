import React from 'react'
import useSWR from 'swr'

import useGasFee from '@/hooks/useGasFee'
import { useAppSelector } from '@/store/hooks'
import { COINGECKO_API, networks } from '@/constants/tokenAddresses'

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

  const { data } = useSWR(
    `${COINGECKO_API}/simple/price?ids=wmatic&vs_currencies=usd`
  )

  React.useEffect(() => {
    // const web3 = new Web3(networks[networkId || 137].rpc)
    // const getGasFee = async () => {
    //   try {
    //     const estimateGasUsed = new BigNumber(7_805_975)
    //     const baseFee = (await web3.eth.getBlock('latest')).baseFeePerGas
    //     console.log('baseFee', baseFee)

    //     const gas = web3.utils
    //       .fromWei(
    //         estimateGasUsed.mul(
    //           new BigNumber(baseFee ?? 0)
    //             .mul(new BigNumber(13))
    //             .div(new BigNumber(10))
    //         ),
    //         'ether'
    //       )
    //       .slice(0, 5)
    //     console.log('gas', gas)
    //     setEstimateGas(old => ({ ...old, gas: gas.toString() }))
    //   } catch (error) {
    //     console.error('Error', error)
    //   }
    // }

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
                  ${(data?.wmatic?.usd * Number(estimateGas.gas)).toFixed(6)}{' '}
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
