import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { SUBGRAPH_URL, Staking } from '../../../constants/tokenAddresses'
import { GET_USER } from './graphql'

import useStakingContract from '@/hooks/useStaking'

import TitleSection from '../../../components/TitleSection'
import IntroGovernance from './IntroGovernance'
import OwnAndReceivedTable from '../../../components/Governance/OwnAndReceivedTable'
import UserTableVotingHistory from '../../../components/Governance/UserTableVotingHistory'

import proposals from '../../../../public/assets/iconGradient/details.svg'
import votingPoweRrank from '../../../../public/assets/iconGradient/voting-power-rank.svg'
import ownedPower from '../../../../public/assets/iconGradient/owned-power.svg'

import externalLink from '../../../../public/assets/utilities/external-link.svg'

import * as S from './styles'

interface IUserVotingPowerProps {
  pool: string
  votingPower: Big
  kacy: Big
  from: {
    id: string
  }
  to: {
    id: string
  }
  image: string
  name: string
  isNFT: boolean
}

interface IGovernanceDataProps {
  address: string | string[] | undefined
}

const GovernanceData = ({ address }: IGovernanceDataProps) => {
  const [totalUserReceived, setUserReceived] = React.useState(Big(0))
  const [totalUserDelegating, setUserDelegating] = React.useState(Big(0))
  const [userReceivedFromVP, setUserReceivedFromVP] = React.useState<
    IUserVotingPowerProps[]
  >([])
  const [userDelegatingToVP, setUserDelegatingToVP] = React.useState<
    IUserVotingPowerProps[]
  >([])

  const router = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { userInfo } = useStakingContract(Staking)

  const { data } = useSWR([GET_USER], query =>
    request(SUBGRAPH_URL, query, {
      id: address
    })
  )

  async function getAmountKacy(pool: string, addressUrl: string | undefined) {
    const poolNumber = Number(pool)

    if (address) {
      const value = await userInfo(poolNumber, addressUrl)
      return Big(value.amount).div(Big(10).pow(18))
    }
    return
  }

  async function handleFromDelegated() {
    if (data) {
      let receivedTotal = Big(0)

      const receivedToVP = await Promise.all(
        data.received.map(async (prop: IUserVotingPowerProps) => {
          receivedTotal = receivedTotal.add(prop.votingPower)

          // const userProfile = await fetchUserProfile({ address: prop.from.id })

          return {
            pool: prop.pool,
            votingPower: prop.votingPower,
            kacy: await getAmountKacy(prop.pool, prop.from?.id),
            from: {
              id: prop.from?.id
            },
            to: {
              id: prop.to.id
            }
            // image: userProfile.image || '',
            // name: userProfile.nickname || '',
            // isNFT: userProfile?.isNFT || false
          }
        })
      )
      setUserReceived(receivedTotal)
      setUserReceivedFromVP(receivedToVP)
    }
  }

  async function handleRereceived() {
    if (data) {
      let delegatingToTotal = Big(0)

      const delegatingToVP = await Promise.all(
        data.delegations.map(async (prop: IUserVotingPowerProps) => {
          delegatingToTotal = delegatingToTotal.add(prop.votingPower)

          // const userProfile = await fetchUserProfile({ address: prop.from.id })

          return {
            pool: prop.pool,
            votingPower: prop.votingPower,
            kacy: await getAmountKacy(prop.pool, prop.from?.id),
            to: {
              id: prop.to.id
            }
            // image: userProfile.image || '',
            // name: userProfile.nickname || '',
            // isNFT: userProfile?.isNFT || false
          }
        })
      )
      setUserDelegating(delegatingToTotal)
      setUserDelegatingToVP(delegatingToVP)
    }
  }

  React.useEffect(() => {
    if (data) {
      handleFromDelegated()
      handleRereceived()
    }
  }, [data, wallet?.accounts[0].address, address, router])

  return (
    <>
      <S.VoteContent>
        <IntroGovernance
          address={address}
          userDelegatingTotal={totalUserDelegating}
          userReceivedTotal={totalUserReceived}
        />

        {/* Owned Voting Power */}
        <TitleSection
          image={ownedPower}
          title="Owned Voting Power"
          marginTop={64}
        />

        <OwnAndReceivedTable
          userAddressUrl={address}
          userVotingPower={userDelegatingToVP}
          isDelegationTable={true}
        />

        {/* Received Voting Power */}
        <TitleSection
          image={votingPoweRrank}
          title="Received Voting Power"
          marginTop={64}
        />

        <OwnAndReceivedTable
          userAddressUrl={address}
          userVotingPower={userReceivedFromVP}
          isDelegationTable={false}
        />

        {/* Voting History */}
        <S.TitleAndLinkContent>
          <TitleSection image={proposals} title="Voting History" />
          <S.LinkForum
            href="https://gov.kassandra.finance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Discuss the proposals at the Forum</span>
            <Image src={externalLink} alt="" />
          </S.LinkForum>
        </S.TitleAndLinkContent>

        <UserTableVotingHistory
          userAddressUrl={address}
          userWalletAddress={wallet?.accounts[0].address}
        />
      </S.VoteContent>
    </>
  )
}

export default GovernanceData
