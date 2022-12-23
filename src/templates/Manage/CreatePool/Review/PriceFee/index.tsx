import React from 'react'
import Checkbox from '../../../../../components/Inputs/Checkbox'

import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'

const PriceFee = () => {
  const [isOpenTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false)
  const [isCheckbox, setIsCheckbox] = React.useState(false)

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
              checked={isCheckbox}
              name="inputChekbox"
              onChange={() => setIsCheckbox(!isCheckbox)}
              label="I agree with"
              showLabel={true}
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
