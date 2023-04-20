import React from 'react'
import Link from 'next/link'

import Button from '../../../../components/Button'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setClear } from '@/store/reducers/poolCreationSlice'

import { networks } from '@/constants/tokenAddresses'

import createFundSucess from '../../../../../public/assets/iconGradient/sucess.svg'

import * as S from './styles'

const PoolCreated = () => {
  const [blockExplorer, setBlockExplorer] = React.useState('')
  const [poolId, setPoolId] = React.useState('')

  const dispatch = useAppDispatch()
  const { networkId, id, txHash } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

  React.useEffect(() => {
    if (networkId && id && txHash) {
      setBlockExplorer(
        `${networks[networkId ?? 137]?.blockExplorer}/tx/${txHash}`
      )
      setPoolId(id)
    }

    dispatch(setClear())
  }, [])

  return (
    <S.PoolCreated>
      <S.fundCreateCard>
        <img src={createFundSucess.src} alt="" width={80} height={80} />
        <S.FundCreatedTitle>Your Pool has been created!</S.FundCreatedTitle>
        <S.FundCreatedParagraph>
          Your smart contracts have been deploysed in the following transacion:
        </S.FundCreatedParagraph>
        <Link href={blockExplorer} passHref>
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
