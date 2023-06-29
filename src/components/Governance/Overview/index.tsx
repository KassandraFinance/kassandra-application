import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import { getAddress } from 'ethers'
import { request } from 'graphql-request'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'

import { SUBGRAPH_URL } from '@/constants/tokenAddresses'
import { GET_GOVERNANCES } from './graphql'

import Button from '@/components/Button'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

export const Overview = () => {
  const [{ wallet, connecting }, conect] = useConnectWallet()

  const userWalletAddress = wallet ? getAddress(wallet.accounts[0].address) : ''

  const { data } = useSWR(
    [GET_GOVERNANCES, userWalletAddress],
    (query, userWalletAddress) =>
      request(SUBGRAPH_URL, query, { id: userWalletAddress })
  )

  return (
    <>
      <S.Overview>
        <S.VotginCards>
          <S.VotingDataCard>
            <S.TextVoting>
              YOUR VOTING POWER
              <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            {wallet ? (
              <S.ValueVoting>
                {BNtoDecimal(Big(data?.user?.votingPower ?? 0), 0, 2)}
              </S.ValueVoting>
            ) : (
              <Button
                onClick={() => conect()}
                size="large"
                text="Connect Wallet"
                backgroundSecondary
                disabled={connecting}
              />
            )}
          </S.VotingDataCard>
          <S.VotingDataCard>
            <S.TextVoting>
              TOTAL VOTING POWER
              <Tippy content="This is the total voting power across all participants of the Kassandra Decentralized Autonomous Organization in this blockchain.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            <S.ValueVoting>
              {BNtoDecimal(
                Big(data?.governances[0]?.totalVotingPower ?? 0),
                0,
                2
              )}
            </S.ValueVoting>
          </S.VotingDataCard>
          <S.VotingDataCard>
            <S.TextVoting>
              VOTING ADDRESSES
              <Tippy content="Voting power allows you to create and vote on proposals. To obtain voting power you need to stake your $KACY tokens.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={14}
                    height={14}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextVoting>
            <S.ValueVoting>
              {data?.governances[0]?.votingAddresses ?? 0}
            </S.ValueVoting>
          </S.VotingDataCard>
        </S.VotginCards>
      </S.Overview>
    </>
  )
}

export default Overview
