import Image from 'next/image'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

interface IVotingPowerProps {
  totalVotingPower?: Big
  currentVotingPower?: Big
  minimalVotingPower?: Big
  yourVotingPowerInProposal?: Big
}

const VotingPower = ({
  currentVotingPower,
  minimalVotingPower,
  totalVotingPower,
  yourVotingPowerInProposal
}: IVotingPowerProps) => {
  return (
    <S.VotingPower>
      {currentVotingPower && !yourVotingPowerInProposal && (
        <S.YourVotingPower>
          <span>
            your voting power
            <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          </span>
          <span>{BNtoDecimal(currentVotingPower, 0, 2)}</span>
        </S.YourVotingPower>
      )}

      {yourVotingPowerInProposal && (
        <S.YourVotingPower>
          <span>
            Snapshot voting power
            <Tippy content="Amount of voting power snapshoted from your address to vote on this proposal. This voting power is relative to the block in which the proposal was published.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          </span>
          <span>
            {BNtoDecimal(yourVotingPowerInProposal.div(Big(10).pow(18)), 18, 2)}
          </span>
        </S.YourVotingPower>
      )}

      {totalVotingPower && (
        <S.TotalVotingPower>
          <span>
            total voting power
            <Tippy content="This is the total voting power across all participants of the Kassandra Decentralized Autonomous Organization in this blockchain.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          </span>
          <span>{BNtoDecimal(totalVotingPower, 0, 2)}</span>
        </S.TotalVotingPower>
      )}

      {yourVotingPowerInProposal && currentVotingPower && (
        <S.TotalVotingPower>
          <span>
            actual voting power
            <Tippy content="This is your actual voting power, it may differ from the snapshot voting power if you earned or lost voting power since the proposal was created.">
              <S.Tooltip tabIndex={0}>
                <Image src={tooltip} alt="Explanation" width={14} height={14} />
              </S.Tooltip>
            </Tippy>
          </span>
          <span>{BNtoDecimal(currentVotingPower, 0, 2)}</span>
        </S.TotalVotingPower>
      )}

      {minimalVotingPower && (
        <S.TotalVotingPower>
          <span>minimum for proposal</span>
          <span>{BNtoDecimal(minimalVotingPower, 0, 2)}</span>
        </S.TotalVotingPower>
      )}
    </S.VotingPower>
  )
}

export default VotingPower
