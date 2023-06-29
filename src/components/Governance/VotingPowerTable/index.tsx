import React from 'react'
import Link from 'next/link'
import Big from 'big.js'

import { useUsersInfo } from '@/hooks/query/useUsersInfo'

import { BNtoDecimal } from '@/utils/numerals'

import Loading from '@/components/Loading'
import ImageProfile from '@/components/Governance/ImageProfile'

import * as S from './styles'

interface IVotingPowerProps {
  skip?: number
  take: number
}

export const VotingPowerTable = ({ skip = 0, take }: IVotingPowerProps) => {
  const { data } = useUsersInfo({ skip, take })

  return (
    <S.VotingPowerTable>
      <S.Table>
        <thead>
          <S.Tr>
            <S.Th className="rank">Rank</S.Th>
            <S.Th className="user">User</S.Th>
            <S.Th className="vote-power">Vote Power</S.Th>
            <S.Th className="vote-weight">Vote Weight</S.Th>
            <S.Th className="proposals-created">Proposals Created</S.Th>
            <S.Th className="proposals-voted">Proposals Voted</S.Th>
          </S.Tr>
        </thead>
        <tbody>
          {data ? (
            data?.users?.map((item, index) => (
              <Link
                key={item.id}
                href={`/profile/${item.id}?tab=governance-data`}
              >
                <S.Tr>
                  <S.Td className="rank">{index + 1 + skip}</S.Td>
                  <S.Td className="user">
                    <ImageProfile
                      address={item.id}
                      diameter={24}
                      hasAddress={true}
                      isLink={false}
                    />
                  </S.Td>
                  <S.Td className="vote-power">
                    {BNtoDecimal(item.votingPower, 0, 2)}
                  </S.Td>
                  <S.Td className="vote-weight">
                    {BNtoDecimal(
                      Big(item.votingPower)
                        .mul(100)
                        .div(Big(data.governances[0].totalVotingPower)),
                      18,
                      2
                    ) + '%'}
                  </S.Td>
                  <S.Td className="proposals-created">
                    {item.proposals.length}
                  </S.Td>
                  <S.Td className="proposals-voted">{item.votes.length}</S.Td>
                </S.Tr>
              </Link>
            ))
          ) : (
            <S.LoadingContainer>
              <td>
                <Loading marginTop={0} />
              </td>
            </S.LoadingContainer>
          )}
        </tbody>
      </S.Table>
    </S.VotingPowerTable>
  )
}

export default VotingPowerTable
