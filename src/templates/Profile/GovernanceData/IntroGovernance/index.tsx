import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { BNtoDecimal } from '@/utils/numerals'

import { Staking } from '@/constants/tokenAddresses'

import useStakingContract from '@/hooks/useStaking'

import Button from '@/components/Button'
import ExternalLink from '@/components/ExternalLink'
import ModalManageVotingPower from '@/components/Governance/ModalManageVotingPower'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

type IIntroWalletAddressProps = {
  address: string | string[] | undefined
  userReceivedTotal: Big
  userDelegatingTotal: Big
}

const IntroGovernance = ({
  address,
  userReceivedTotal,
  userDelegatingTotal
}: IIntroWalletAddressProps) => {
  const [isModalManageVotingPower, setIsModalManageVotingPower] =
    React.useState<boolean>(false)
  const [totalKacyStaked, setTotalKacyStaked] = React.useState<Big>(Big(0))

  const [{ wallet }] = useConnectWallet()
  const { userInfo } = useStakingContract(Staking)

  const callUserInfo = async () => {
    let totalStaked = Big(0)

    if (process.env.NEXT_PUBLIC_MASTER === '1') {
      const [
        investorOne,
        investorTwo,
        userInfoOne,
        userInfoTwo,
        userInfoThree
      ] = await Promise.all([
        userInfo(0, address),
        userInfo(1, address),
        userInfo(2, address),
        userInfo(3, address),
        userInfo(4, address)
      ])

      totalStaked = Big(userInfoOne.amount.toString())
        .add(Big(userInfoTwo.amount.toString()))
        .add(Big(userInfoThree.amount.toString()))
        .add(Big(investorOne.amount.toString()))
        .add(Big(investorTwo.amount.toString()))
    } else {
      const [userInfoOne, userInfoTwo, userInfoThree] = await Promise.all([
        userInfo(0, address),
        userInfo(1, address),
        userInfo(2, address)
      ])

      totalStaked = Big(userInfoOne.amount.toString())
        .add(Big(userInfoTwo.amount.toString()))
        .add(Big(userInfoThree.amount.toString()))
    }

    setTotalKacyStaked(totalStaked)
  }

  React.useEffect(() => {
    callUserInfo()
  }, [address])

  return (
    <>
      <S.IntroWalletAddress>
        <S.VotingPowerContent>
          <S.AddressTotalVotingPower>
            <S.TextAndTooltip>
              <span className="address-total-voting-power">
                TOTAL KACY STAKED
              </span>
              <Tippy content="The amount of KACY that this address has staked.">
                <S.Tooltip>
                  <Image
                    src={tooltip}
                    alt="Explanation"
                    width={16}
                    height={16}
                  />
                </S.Tooltip>
              </Tippy>
            </S.TextAndTooltip>
            <span className="value-total-voting-power">
              {BNtoDecimal(totalKacyStaked.div(Big(10).pow(18)), 18, 2)}
            </span>
          </S.AddressTotalVotingPower>

          <S.AllVotingPowerCard>
            <S.ReceivedAndOwnedVotingPower>
              <S.OwnedVotingPower>
                <S.TextAndTooltip>
                  <span className="gray-color">Owned Voting Power</span>
                  <Tippy content="Self delegated voting power">
                    <S.Tooltip>
                      <Image
                        src={tooltip}
                        alt="Explanation"
                        width={16}
                        height={16}
                      />
                    </S.Tooltip>
                  </Tippy>
                </S.TextAndTooltip>
                <span className="bold">
                  {userDelegatingTotal
                    ? BNtoDecimal(userDelegatingTotal, 18, 2)
                    : 0}
                </span>
              </S.OwnedVotingPower>
              <S.ReceivedVotingPower>
                <span className="gray-color">Received Voting Power</span>
                <span className="bold">
                  {userReceivedTotal
                    ? BNtoDecimal(userReceivedTotal, 18, 2)
                    : 0}
                </span>
              </S.ReceivedVotingPower>
            </S.ReceivedAndOwnedVotingPower>
            <S.HorizontalLine none={true} />
            <S.VerticalLine />
            <S.ManageDelegation>
              <Button
                size="large"
                text="Manage Delegation"
                background="secondary"
                disabledNoEvent={
                  !wallet || getAddress(wallet.accounts[0].address) !== address
                }
                onClick={() => setIsModalManageVotingPower(true)}
              />
              <ExternalLink
                text="Obtain Voting Power"
                hrefNext="/farm?tab=stake"
              />
            </S.ManageDelegation>
          </S.AllVotingPowerCard>
        </S.VotingPowerContent>
      </S.IntroWalletAddress>
      {isModalManageVotingPower && (
        <ModalManageVotingPower
          modalOpen={isModalManageVotingPower}
          setModalOpen={setIsModalManageVotingPower}
        />
      )}
    </>
  )
}

export default IntroGovernance
