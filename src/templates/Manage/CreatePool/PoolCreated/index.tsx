import React from 'react'
import Link from 'next/link'

import Button from '@/components/Button'

import { networks } from '@/constants/tokenAddresses'

import createFundSucess from '@assets/iconGradient/sucess.svg'

import * as S from './styles'

interface IPoolCreatedProps {
  data: { id: string; networkId: number; txHash: string }
}

const PoolCreated = ({ data }: IPoolCreatedProps) => {
  return (
    <S.PoolCreated>
      <S.fundCreateCard>
        <img src={createFundSucess.src} alt="" width={80} height={80} />
        <S.FundCreatedTitle>Your Pool has been created!</S.FundCreatedTitle>
        <S.FundCreatedParagraph>
          Your smart contracts have been deploysed in the following transacion:
        </S.FundCreatedParagraph>
        <Link
          href={`${networks[data.networkId].blockExplorer}/tx/${data?.txHash}`}
          passHref
        >
          <Button
            target="_blank"
            as="a"
            backgroundBlack
            text="View Transaction"
            className="viewTransaction"
          />
        </Link>
        {/* <Link href={`/manage/${poolId}`} passHref>
          <Button
            as="a"
            fullWidth
            backgroundPrimary
            text="Check Your Fund"
            className="checkYourFund"
          />
        </Link> */}
      </S.fundCreateCard>
    </S.PoolCreated>
  )
}

export default PoolCreated
