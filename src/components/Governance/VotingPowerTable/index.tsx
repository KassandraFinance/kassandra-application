import React from 'react'
import Big from 'big.js'

import { useUsersInfo } from '@/hooks/query/useUsersInfo'

import { BNtoDecimal } from '@/utils/numerals'

import ImageProfile from '../ImageProfile'
import SectionTable, {
    IModalIconStyle,
  LeftAlignCell,
  RightAlignCell
} from '@/components/SectionTable'

interface IVotingPowerProps {
  skip?: number
  take: number
}

export const VotingPowerTable = ({ skip = 0, take }: IVotingPowerProps) => {
  const { data } = useUsersInfo({ skip, take })

  const dataMemo = React.useMemo(() => {
    return (
      data?.users.map((user, index) => ({
        key: user.id,
        href: `/profile/${user.id}?tab=governance-data`,
        modal: {
          title: {
            logo: '',
            name: user.id,
            address: user.id,
          },
          iconStyle: IModalIconStyle.Jazzicon
        },
        cells: [
          index + 1 + skip,

          <LeftAlignCell>
            <ImageProfile
              address={user.id}
              diameter={24}
              image={item.image}
              isNFT={!!item.is_nft}
              nickname={item.nickname}
              hasAddress={true}
              isLink={false}
            />
          </LeftAlignCell>,

          <RightAlignCell>
            {BNtoDecimal(Big(user.votingPower), 0, 0)}
          </RightAlignCell>,

          BNtoDecimal(
            Big(user.votingPower)
              .mul(100)
              .div(Big(data.governances[0].totalVotingPower)),
            18,
            2
          ) + '%',

          user.proposals.length,
          user.votes.length
        ]
      })) || []
    )
  }, [data?.users.map(user => user.id).toString()])

  return (
    <SectionTable
      gridTemplate="100px 1fr repeat(4, 120px)"
      headers={[
        { key: 'rank', content: 'Rank' },
        { key: 'user', content: <LeftAlignCell>User</LeftAlignCell> },
        {
          key: 'vote-power',
          content: <RightAlignCell>Vote Power</RightAlignCell>
        },
        { key: 'vote-weight', content: 'Vote Weight' },
        { key: 'proposals-created', content: 'Proposals Created' },
        { key: 'proposals-voted', content: 'Proposals Voted' }
      ]}
      rows={dataMemo}
    />
  )
}

export default VotingPowerTable
