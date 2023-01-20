import React from 'react'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setTermsAndConditions } from '../../../../../store/reducers/poolCreationSlice'

import Checkbox from '../../../../../components/Inputs/Checkbox'

import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'

const PriceFee = () => {
  const dispatch = useAppDispatch()
  const termsAndConditions = useAppSelector(
    state => state.poolCreation.createPoolData.termsAndConditions
  )
  const [isOpenTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false)

  function handleClick() {
    dispatch(setTermsAndConditions())
  }

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
