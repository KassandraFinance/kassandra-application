/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'

import changeChain, { ChainDetails } from '../../../utils/changeChain'
import { useAppSelector } from '../../../store/hooks'

import { GET_PROFILE } from './graphql'
import { SUBGRAPH_URL } from '../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../utils/numerals'

import Button from '../../../components/Button'
import ExternalLink from '../../../components/ExternalLink'
import ModalWalletConnect from '../../../components/Modals/ModalWalletConnect'

import CreatePool from '../CreatePool'

import kacyLogoShadow from '../../../../public/assets/images/kacy-logo-shadow.png'

import * as S from './styles'

type UserResponse = {
  user: {
    votingPower: string
  }
}
const goerliNetwork: ChainDetails = {
  chainId: 5,
  chainIdHex: '0x5',
  chainName: 'Goerli test network',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'GoerliETH',
    decimals: 18
  },
  rpcUrls: ['https://goerli.infura.io/v3/'],
  blockExplorerUrls: ['https://goerli.etherscan.io'],
  secondsPerBlock: 2,
  wrapped: ''
}

const GetStarted = () => {
  const [isModalWallet, setIsModalWallet] = React.useState<boolean>(false)
  const [isCreatePool, setIsCreatePool] = React.useState(false)

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const { data } = useSWR<UserResponse>([GET_PROFILE], query =>
    request(SUBGRAPH_URL, query, {
      userVP: userWalletAddress
    })
  )

  return (
    <S.GetStarted>
      <Image src={kacyLogoShadow} />

      <S.Content>
        <S.Title>Ready to create your first pool?</S.Title>

        <S.Text>
          It looks like you don't have any pools to manage. Click on the button
          below to combine tokens to create your first pool to start the journey
          as a manager.
        </S.Text>

        <S.Help>
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
        )}
        <S.ButtonWrapper>
          {userWalletAddress.length !== 42 ? (
            <Button
              text="Connect Wallet"
              backgroundSecondary
              fullWidth
              onClick={() => setIsModalWallet(true)}
            />
          ) : chainId !== 5 ? (
            <Button
              text="Connect to GoerliETH"
              backgroundSecondary
              fullWidth
              onClick={() => changeChain(goerliNetwork)}
            />
          ) : (
            <Button
              text="Create New Pool"
              backgroundSecondary
              fullWidth
              onClick={() => setIsCreatePool(true)}
            />
          )}
        </S.ButtonWrapper>
      </S.Content>

      {isCreatePool && <CreatePool setIsCreatePool={setIsCreatePool} />}
      {isModalWallet && <ModalWalletConnect setModalOpen={setIsModalWallet} />}
    </S.GetStarted>
  )
}

export default GetStarted
