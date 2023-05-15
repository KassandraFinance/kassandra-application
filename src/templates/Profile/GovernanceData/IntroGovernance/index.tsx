import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import BigNumber from 'bn.js'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { Staking } from '../../../../constants/tokenAddresses'

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setModalWalletActive } from '../../../../store/reducers/modalWalletActive'

import useStakingContract from '../../../../hooks/useStakingContract'

import { BNtoDecimal } from '../../../../utils/numerals'

import Button from '../../../../components/Button'
import ExternalLink from '../../../../components/ExternalLink'
import ModalManageVotingPower from '../../../../components/Governance/ModalManageVotingPower'

import tooltip from '../../../../../public/assets/utilities/tooltip.svg'

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
  // eslint-disable-next-line prettier/prettier
  const [isModalManageVotingPower, setIsModalManageVotingPower] =
    React.useState<boolean>(false)
  // eslint-disable-next-line prettier/prettier
  const [totalKacyStaked, setTotalKacyStaked] = React.useState<BigNumber>(
    new BigNumber(0)
  )

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { userInfo } = useStakingContract(Staking)
  const dispatch = useAppDispatch()

  const callUserInfo = async () => {
    let totalStaked = new BigNumber(0)

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

      totalStaked = new BigNumber(userInfoOne.amount)
        .add(new BigNumber(userInfoTwo.amount))
        .add(new BigNumber(userInfoThree.amount))
        .add(new BigNumber(investorOne.amount))
        .add(new BigNumber(investorTwo.amount))
    } else {
      const [userInfoOne, userInfoTwo, userInfoThree] = await Promise.all([
        userInfo(0, address),
        userInfo(1, address),
        userInfo(2, address)
      ])

      totalStaked = new BigNumber(userInfoOne.amount)
        .add(new BigNumber(userInfoTwo.amount))
        .add(new BigNumber(userInfoThree.amount))
    }

    setTotalKacyStaked(totalStaked)
  }

  React.useEffect(() => {
    callUserInfo()
  }, [address, userWalletAddress])

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
            {address || userWalletAddress ? (
              <span className="value-total-voting-power">
                {BNtoDecimal(new BigNumber(totalKacyStaked), 18, 2)}
              </span>
            ) : (
              <Button
                onClick={() => dispatch(setModalWalletActive(true))}
                size="large"
                text="Connect Wallet"
                backgroundSecondary
              />
            )}
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
                backgroundSecondary
                disabledNoEvent={
                  address !== userWalletAddress || !userWalletAddress
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
