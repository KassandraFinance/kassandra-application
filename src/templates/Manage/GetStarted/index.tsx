/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
// import useSWR from 'swr'
// import request from 'graphql-request'
// import Big from 'big.js'

import changeChain, { ChainDetails } from '../../../utils/changeChain'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalWalletActive } from '@/store/reducers/modalWalletActive'
import { setToFirstStep } from '@/store/reducers/poolCreationSlice'

// import { GET_PROFILE } from './graphql'
// import { SUBGRAPH_URL } from '../../../constants/tokenAddresses'

// import { BNtoDecimal } from '../../../utils/numerals'

import Button from '../../../components/Button'
import CreatePool from '../CreatePool'
// import ExternalLink from '../../../components/ExternalLink'

import kacyLogoShadow from '../../../../public/assets/images/kacy-logo-shadow.png'

import * as S from './styles'

// type UserResponse = {
//   user: {
//     votingPower: string
//   }
// }
const goerliNetwork = {
  chainId: 5,
  chainName: 'Goerli test network',
  rpcUrls: ['https://goerli.infura.io/v3/']
}

const GetStarted = () => {
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const dispatch = useAppDispatch()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)
  const stepNumber = useAppSelector(state => state.poolCreation.stepNumber)
  const poolCreattionChainId = useAppSelector(
    state => state.poolCreation.createPoolData.networkId
  )

  function handleCreatePool() {
    if (poolCreattionChainId === 0 && stepNumber > 0) {
      dispatch(setToFirstStep())
    }
    setIsCreatePool(true)
  }
  // const { data } = useSWR<UserResponse>([GET_PROFILE], query =>
  //   request(SUBGRAPH_URL, query, {
  //     userVP: userWalletAddress
  //   })
  // )

  return (
    <S.GetStarted>
      <Image src={kacyLogoShadow} width={435} height={400} />

      <S.Content>
        <S.Title>Ready to create your first pool?</S.Title>

        <S.Text>
          It looks like you don't have any pools to manage. Click on the button
          below to combine tokens to create your first pool to start the journey
          as a manager.
        </S.Text>

        {/* <S.Help>
          To be able to create a fund you need to have at least 10k Voting
          Power.
        </S.Help>

        {data?.user && (
          <S.VotingPowerContainer>
            <S.VotingPowerWrapper>
              YOUR VOTING POWER{' '}
              <span>{BNtoDecimal(Big(data.user.votingPower), 2)}</span>
            </S.VotingPowerWrapper>

            <ExternalLink
              text="Obtain more Voting Power"
              hrefNext="/farm?tab=stake"
            />
          </S.VotingPowerContainer>
        )} */}

        <S.ButtonWrapper>
          {userWalletAddress.length !== 42 ? (
            <Button
              text="Connect Wallet"
              backgroundSecondary
              fullWidth
              onClick={() => dispatch(setModalWalletActive(true))}
            />
          ) : (
            <Button
              text="Create New Pool"
              backgroundSecondary
              fullWidth
              onClick={handleCreatePool}
            />
          )}
        </S.ButtonWrapper>
      </S.Content>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
    </S.GetStarted>
  )
}

export default GetStarted
