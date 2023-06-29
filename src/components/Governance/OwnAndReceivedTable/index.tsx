import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { BNtoDecimal } from '@/utils/numerals'

import AnyCard from '../../AnyCard'
import ImageProfile from '../ImageProfile'

import avax from '@assets/logos/kacy-stake.svg'
import avaxLogo from '@assets/logos/avax.png'

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

interface IOwnAndReceivedTableProps {
  userAddressUrl: string | string[] | undefined
  userVotingPower: IUserVotingPowerProps[]
  isDelegationTable: boolean
}

export const OwnAndReceivedTable = ({
  userAddressUrl,
  userVotingPower,
  isDelegationTable
}: IOwnAndReceivedTableProps) => {
  const [kacyDolarPrice, setKacyDolarPrice] = React.useState(0)

  const [{ wallet }] = useConnectWallet()

  const { data } = useSWR('/api/overview')

  const isMasterBranch = process.env.NEXT_PUBLIC_MASTER === '1' ? true : false

  function handleCheckValuePool(pool: string) {
    if (isMasterBranch) {
      switch (pool) {
        case '2':
          return 'No withdraw delay'
        case '3':
          return '15 withdraw delay'
        case '4':
          return '45 withdraw delay'
        default:
          return 'Vesting Pool'
      }
    } else {
      switch (pool) {
        case '0':
          return 'No withdraw delay'
        case '1':
          return '15 withdraw delay'
        case '2':
          return '45 withdraw delay'
        default:
          break
      }
    }
  }

  function handleCheckValuePoolPerVP(pool: string) {
    if (isMasterBranch) {
      switch (pool) {
        case '2':
          return '1'
        case '3':
          return '2'
        case '4':
          return '3'
        default:
          return '1'
      }
    } else {
      switch (pool) {
        case '0':
          return '1'
        case '1':
          return '2'
        case '2':
          return '3'
        default:
          break
      }
    }
  }

  function handleKacyInDolar(value: Big) {
    if (kacyDolarPrice) {
      const valueNumber = value.mul(kacyDolarPrice)
      return BNtoDecimal(valueNumber, 0, 2)
    }
    return
  }

  React.useEffect(() => {
    if (data) {
      setKacyDolarPrice(data.kacyPrice)
    }
  }, [data])

  return (
    <>
      {userVotingPower.length ? (
        <S.OwnAndReceivedTable>
          <S.Table>
            <thead>
              <S.Tr className="headTable">
                <S.Th>Pool</S.Th>
                <S.Th className="delegating">
                  {isDelegationTable ? 'Delegating to' : 'Received from'}
                </S.Th>
                <S.Th>Staked</S.Th>
                <S.Th>
                  {isDelegationTable
                    ? 'Voting Power Allocated'
                    : 'Voting Power Received'}
                </S.Th>
              </S.Tr>
            </thead>
            <tbody>
              {userVotingPower &&
                userVotingPower.map((item, index) => (
                  <S.Tr key={index}>
                    <S.Td className="pool">
                      <S.Imagecontainer>
                        <Image src={avax} width={32} height={32} alt="" />

                        <S.ChainLogoWrapper>
                          <Image src={avaxLogo.src} layout="fill" />
                        </S.ChainLogoWrapper>
                      </S.Imagecontainer>

                      <div>
                        <p>KACY</p>
                        <span>{handleCheckValuePool(item.pool)}</span>
                      </div>
                    </S.Td>
                    <S.Td className="delegating-to">
                      {isDelegationTable ? (
                        item.to?.id === userAddressUrl ? (
                          ''
                        ) : (
                          <>
                            <ImageProfile
                              address={item.to.id}
                              diameter={24}
                              hasAddress={true}
                              isLink={true}
                              fontSize={14}
                              tab="?tab=governance-data"
                            />
                          </>
                        )
                      ) : (
                        <>
                          <ImageProfile
                            address={item.from.id}
                            diameter={24}
                            hasAddress={true}
                            isLink={true}
                            fontSize={14}
                            tab="?tab=governance-data"
                          />
                        </>
                      )}
                      {isDelegationTable && item.to.id === userAddressUrl && (
                        <span>self</span>
                      )}
                    </S.Td>
                    <S.Td className="staked">
                      <p>
                        {BNtoDecimal(item.kacy, 18, 2)}
                        <span> KACY</span>
                      </p>
                      <span>$ {handleKacyInDolar(item.kacy)}</span>
                    </S.Td>
                    <S.Td className="voting-power-allocated">
                      <p>{BNtoDecimal(Big(item.votingPower), 0, 2)}</p>
                      <span>
                        {handleCheckValuePoolPerVP(item.pool)} Voting power per
                        KACY{' '}
                      </span>
                    </S.Td>
                  </S.Tr>
                ))}
            </tbody>
          </S.Table>
        </S.OwnAndReceivedTable>
      ) : wallet &&
        getAddress(wallet.accounts[0].address) === userAddressUrl ? (
        <AnyCard
          text={
            isDelegationTable
              ? 'This address doesn’t have KACY staked.'
              : 'This address doesn’t seem to have received any voting power'
          }
          button={isDelegationTable}
          link="/farm"
          buttonText="Stake/Farm"
        />
      ) : (
        <AnyCard
          text={
            isDelegationTable
              ? 'This address doesn’t seem to have any KACY staked'
              : 'This address doesn’t seem to have received any voting power'
          }
          button={false}
        />
      )}
    </>
  )
}

export default OwnAndReceivedTable
