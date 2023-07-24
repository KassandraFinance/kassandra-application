import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { Staking } from '../../../constants/tokenAddresses'

import useStakingContract from '@/hooks/useStaking'
import { useDelegations } from '@/hooks/query/useDelegations'

import TitleSection from '../../../components/TitleSection'
import IntroGovernance from './IntroGovernance'
import OwnAndReceivedTable from '../../../components/Governance/OwnAndReceivedTable'
import UserTableVotingHistory from '../../../components/Governance/UserTableVotingHistory'

import proposals from '../../../../public/assets/iconGradient/details.svg'
import votingPoweRrank from '../../../../public/assets/iconGradient/voting-power-rank.svg'
import ownedPower from '../../../../public/assets/iconGradient/owned-power.svg'

import externalLink from '../../../../public/assets/utilities/external-link.svg'

import * as S from './styles'

type UserVotingPowerType = {
  pool: string
  votingPower: Big
  kacy: Big | undefined
  from?: {
    id: string
  }
  to: {
    id: string
  }
}

interface IGovernanceDataProps {
  address: string | string[] | undefined
}

const GovernanceData = ({ address }: IGovernanceDataProps) => {
  const [totalUserReceived, setUserReceived] = React.useState(Big(0))
  const [totalUserDelegating, setUserDelegating] = React.useState(Big(0))
  const [userReceivedFromVP, setUserReceivedFromVP] = React.useState<
    UserVotingPowerType[]
  >([])
  const [userDelegatingToVP, setUserDelegatingToVP] = React.useState<
    UserVotingPowerType[]
  >([])

  const router = useRouter()
  const [{ wallet }] = useConnectWallet()
  const { userInfo } = useStakingContract(Staking)

  const { data } = useDelegations({
    id: Array.isArray(address) ? '' : address || ''
  })

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
        data.received.map(async prop => {
          receivedTotal = receivedTotal.add(prop.votingPower)

          return {
            pool: prop.pool,
            votingPower: Big(prop.votingPower),
            kacy: await getAmountKacy(prop.pool, prop.from?.id),
            from: {
              id: prop.from?.id
            },
            to: {
              id: prop.to.id
            }
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
        data.delegations.map(async prop => {
          delegatingToTotal = delegatingToTotal.add(prop.votingPower)

          return {
            pool: prop.pool,
            votingPower: Big(prop.votingPower),
            kacy: await getAmountKacy(prop.pool, prop.from?.id),
            to: {
              id: prop.to.id
            }
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
