import React from 'react'
import Link from 'next/link'

import Button from '../Button'

import createFundSucess from '../../../public/assets/iconGradient/sucess.svg'

import * as S from './styles'

const FundCreatedCard = () => {
  return (
    <S.FundCreatedCardContainer>
      <S.fundCreateCard>
        <img src={createFundSucess.src} alt="" width={80} height={80} />
        <S.FundCreatedTitle>Your Pool has been created!</S.FundCreatedTitle>
        <S.FundCreatedParagraph>
          Your smart contracts have been deploysed in the following transacion:
        </S.FundCreatedParagraph>
        <Link href="#" passHref>
          <Button
            as="a"
            backgroundBlack
            text="View Transaction"
            className="viewTransaction"
          />
        </Link>
        <Link href="#" passHref>
          <Button
            as="a"
            fullWidth
            backgroundPrimary
            text="Check Your Fund"
            className="checkYourFund"
          />
        </Link>
      </S.fundCreateCard>
    </S.FundCreatedCardContainer>
  )
}

export default FundCreatedCard
