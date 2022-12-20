import React from 'react'

import TermsAndConditions from '../../../../../components/Modals/TermsAndConditions'

import * as S from './styles'

const PriceFee = () => {
  const [isOpenTermsAndConditions, setOpenTermsAndConditions] =
    React.useState(false)

  return (
    <>
      <S.PriceFee>
        <S.PriceFeeTitle>Price to create your pool</S.PriceFeeTitle>
        <S.PriceFeeParagraph>
          You’ll need to pay AVAX to cover the Smart contract creation costs. We
          do not charge fees to create Funds, these costs are Avalanche Network
          Fees.
        </S.PriceFeeParagraph>
        <S.NetworkFeesContainer>
          <p>network fees</p>
          <S.WrapperPrice>
            <span>0.30 AVAX</span>
            <p>1.35 USD</p>
          </S.WrapperPrice>
        </S.NetworkFeesContainer>
        <hr />
        <S.WrapperInput>
          <input type="checkbox" />
          <label>I agree with</label>
          <span onClick={() => setOpenTermsAndConditions(true)}>
            terms and conditions.
          </span>
        </S.WrapperInput>
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
