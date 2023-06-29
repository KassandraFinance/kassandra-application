import Image from 'next/image'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import { useVotingPower } from '@/hooks/query/useVotingPower'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

interface IVotingPowerProps {
  userWalletAddress: string
  yourVotingPowerInProposal?: Big
  isMobile?: boolean
}

const VotingPower = ({
  userWalletAddress,
  yourVotingPowerInProposal,
  isMobile
}: IVotingPowerProps) => {
  const { data } = useVotingPower({ id: userWalletAddress })

  return (
    <S.VotingPower isMobile={isMobile}>
      <S.YourVotingPower>
        <span>
          {yourVotingPowerInProposal === undefined
            ? 'your voting power'
            : 'Snapshot voting power'}
          {yourVotingPowerInProposal === undefined ? (
            <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          ) : (
            <Tippy content="Amount of voting power snapshoted from your address to vote on this proposal. This voting power is relative to the block in which the proposal was published.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          )}
        </span>
        <span>
          {yourVotingPowerInProposal === undefined
            ? BNtoDecimal(Big(data?.user?.votingPower ?? Big(0)), 0, 2)
            : BNtoDecimal(
                yourVotingPowerInProposal.div(Big(10).pow(18)),
                18,
                2
              )}
        </span>
      </S.YourVotingPower>
      <S.TotalVotingPower>
        <span>
          {yourVotingPowerInProposal === undefined
            ? 'total voting power'
            : 'actual voting power'}

          {yourVotingPowerInProposal === undefined ? (
            <Tippy content="This is the total voting power across all participants of the Kassandra Decentralized Autonomous Organization in this blockchain.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          ) : (
            <Tippy content="This is your actual voting power, it may differ from the snapshot voting power if you earned or lost voting power since the proposal was created.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          )}
        </span>
        <span>
          {yourVotingPowerInProposal === undefined
            ? BNtoDecimal(
                Big(data?.governances[0]?.totalVotingPower ?? Big(0)),
                0,
                2
              )
            : BNtoDecimal(Big(data?.user?.votingPower ?? Big(0)), 0, 2)}
        </span>
      </S.TotalVotingPower>
    </S.VotingPower>
  )
}

export default VotingPower
