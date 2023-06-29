import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import { useConnectWallet } from '@web3-onboard/react'

import { Staking } from '@/constants/tokenAddresses'

import substr from '@/utils/substr'
import { BNtoDecimal } from '@/utils/numerals'

import useStakingContract from '@/hooks/useStaking'
import useVotingPower from '@/hooks/useVotings'

import ExternalLink from '@/components/ExternalLink'
import ImageProfile from '@/components/Governance/ImageProfile'
import Button from '@/components/Button'
import Options from '../Options'

import arrowSelect from '@assets/utilities/arrow-select-down.svg'

import * as S from '../styles'
export interface IDateProps {
  pid: number
  nameToken: string
  withdrawDelay: string
  votingPower: string
}

type UserInfo = {
  pid: number
  nameToken: string
  withdrawDelay: string
  votingPower: string
  msg?: string
}

interface IUndelegateVotingPowerProps {
  setCurrentModal: React.Dispatch<React.SetStateAction<string>>
}

const UndelegateVotingPower = ({
  setCurrentModal
}: IUndelegateVotingPowerProps) => {
  const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false)
  const [undelegateSelected, setUndelegateSelected] =
    React.useState<IDateProps>({
      pid: 0,
      nameToken: '',
      withdrawDelay: '',
      votingPower: ''
    })
  const [userInfoData, setUserInfoData] = React.useState<Array<UserInfo>>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const [{ wallet }] = useConnectWallet()
  const { userInfo, poolInfo } = useStakingContract(Staking)
  const { delegateVote, delegateAllVotes } = useVotingPower(Staking)

  const callUserInfo = async () => {
    if (!wallet) return

    const [
      poolInfoOne,
      poolInfoTwo,
      poolInfoThree,
      userInfoOne,
      userInfoTwo,
      userInfoThree
    ] = await Promise.all([
      poolInfo(process.env.NEXT_PUBLIC_MASTER === '1' ? 2 : 0),
      poolInfo(process.env.NEXT_PUBLIC_MASTER === '1' ? 3 : 1),
      poolInfo(process.env.NEXT_PUBLIC_MASTER === '1' ? 4 : 2),
      userInfo(
        process.env.NEXT_PUBLIC_MASTER === '1' ? 2 : 0,
        wallet.accounts[0].address
      ),
      userInfo(
        process.env.NEXT_PUBLIC_MASTER === '1' ? 3 : 1,
        wallet.accounts[0].address
      ),
      userInfo(
        process.env.NEXT_PUBLIC_MASTER === '1' ? 4 : 2,
        wallet.accounts[0].address
      )
    ])

    const poolInfoArr = [poolInfoOne, poolInfoTwo, poolInfoThree]

    const userInfoArr = [userInfoOne, userInfoTwo, userInfoThree].map(
      (userInfo, index) => {
        const poolInfo = poolInfoArr[index]
        const votingPowerWithoutMultiplier = new BigNumber(userInfo.amount)

        const votingPower = BNtoDecimal(
          new BigNumber(poolInfo?.votingMultiplier ?? 0).mul(
            votingPowerWithoutMultiplier
          ),
          18,
          2
        )

        if (
          userInfo.delegatee.toLowerCase() ===
          wallet.accounts[0].address.toLowerCase()
        ) {
          return {
            msg: "Can't undelegate to your own wallet",
            votingPower: '',
            withdrawDelay: '',
            nameToken: '',
            pid: 0
          }
        } else {
          return {
            votingPower,
            withdrawDelay: Math.round(
              Number(poolInfo.withdrawDelay) / 86400
            ).toString(),
            nameToken: String(userInfo.delegatee),
            pid: Number(userInfo.pid)
          }
        }
      }
    )

    setUserInfoData(userInfoArr)
    setLoading(false)
  }

  const handleUndelegateVotes = async () => {
    if (!wallet) return

    await delegateVote(undelegateSelected?.pid, wallet.accounts[0].address)
  }

  const handleUndelegateAllVotes = async () => {
    if (!wallet) return

    await delegateAllVotes(wallet.accounts[0].address)
  }

  React.useEffect(() => {
    callUserInfo()
  }, [wallet])

  return (
    <>
      <S.Content>
        <p>
          This option allows you to undelegate the voting power you have sent to
          another Avalanche address.
        </p>
        <span>
          Select the pool you wish to undelegate its voting power from
        </span>
        {undelegateSelected.nameToken !== '' && !optionsOpen ? (
          <S.Selected onClick={() => setOptionsOpen(!optionsOpen)}>
            <S.Option>
              <S.Name>
                <ImageProfile
                  address={undelegateSelected.nameToken}
                  diameter={24}
                  hasAddress={false}
                  isLink={false}
                />
                <S.WithdrawDelay>
                  <p>{substr(undelegateSelected.nameToken)}</p>
                  <span>
                    {undelegateSelected.withdrawDelay} days withdraw delay
                  </span>
                </S.WithdrawDelay>
              </S.Name>
              <S.VotingPower>
                <p>{undelegateSelected.votingPower}</p>
                <span>Voting power</span>
              </S.VotingPower>
            </S.Option>
          </S.Selected>
        ) : (
          <S.Select
            onClick={() => setOptionsOpen(true)}
            optionsOpen={optionsOpen}
          >
            <span>
              {loading
                ? 'Loading...'
                : 'Choose the address you wish to undelegate'}
            </span>
            <Image src={arrowSelect} alt="" />
          </S.Select>
        )}
        <S.ButtonContainer>
          <Button
            size="large"
            fullWidth
            backgroundBlack
            text="Back"
            onClick={() => setCurrentModal('manage')}
          />
          <Button
            size="large"
            fullWidth
            backgroundSecondary
            disabledNoEvent={undelegateSelected.nameToken === ''}
            text="Undelegate Votes"
            onClick={handleUndelegateVotes}
          />
        </S.ButtonContainer>
        <S.Link>
          <ExternalLink
            text="Retrieve all delegated voting power"
            onClick={handleUndelegateAllVotes}
          />
        </S.Link>
      </S.Content>
      <Options
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        data={userInfoData}
        delegateSelected={undelegateSelected}
        setDelegateSelected={setUndelegateSelected}
        undelegate={true}
      />
    </>
  )
}

export default UndelegateVotingPower
