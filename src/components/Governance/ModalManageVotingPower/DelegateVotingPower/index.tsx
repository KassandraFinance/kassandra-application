import React from 'react'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import { poolsKacy } from '@/constants/pools'
import { Staking } from '@/constants/tokenAddresses'

import useStakingContract from '@/hooks/useStaking'
import useVotingPower from '@/hooks/useVotings'
import { useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'

import { BNtoDecimal } from '@/utils/numerals'

import Button from '@/components/Button'
import ExternalLink from '@/components/ExternalLink'
import Options from '../Options'

import arrowSelect from '@assets/utilities/arrow-select-down.svg'
import logo from '@assets/logos/kacy-64.svg'

import * as S from '../styles'

export interface IDateProps {
  pid: number
  nameToken: string
  withdrawDelay: string
  votingPower: string
}

interface IDelegateVotingPowerProps {
  setCurrentModal: React.Dispatch<React.SetStateAction<string>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface PoolData {
  withdrawDelay: string
  votingPower: string
  pid: number
  nameToken: string
}

const DelegateVotingPower = ({
  setCurrentModal,
  setModalOpen
}: IDelegateVotingPowerProps) => {
  const dispatch = useAppDispatch()
  const [optionsOpen, setOptionsOpen] = React.useState<boolean>(false)
  const [receiverAddress, setReceiverAddress] = React.useState<string>('')
  const [delegateSelected, setDelegateSelected] = React.useState<IDateProps>({
    pid: 0,
    nameToken: '',
    withdrawDelay: '',
    votingPower: ''
  })
  const [poolData, setPoolData] = React.useState<PoolData[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [errorMsg, setErrorMsg] = React.useState<boolean>(false)

  const { poolInfo, balance } = useStakingContract(Staking)
  const { delegateVote, delegateAllVotes } = useVotingPower(Staking)
  const [{ wallet }] = useConnectWallet()

  const regex = /^0x[a-fA-F0-9]{40}$/g
  const walletRegex: RegExpExecArray | null = regex.exec(receiverAddress)

  const handlePoolInfo = async () => {
    if (!wallet) return

    const [poolInfoOne, poolInfoTwo, poolInfoThree] = await Promise.all(
      poolsKacy.map(item => poolInfo(item.pid))
    )

    const newArr = []
    const arr = [poolInfoOne, poolInfoTwo, poolInfoThree]

    for (let i = 0; i < poolsKacy.length; i++) {
      const poolInfo = arr[i]
      const votingPower = await balance(
        poolsKacy[i].pid,
        wallet.accounts[0].address
      )
      const votingPowerFormatted = Big(votingPower.toString()).div(
        Big(10).pow(18)
      )

      newArr.push({
        withdrawDelay: Math.round(
          Number(poolInfo.withdrawDelay) / 86400
        ).toString(),
        votingPower: BNtoDecimal(
          Big(poolInfo.votingMultiplier).mul(votingPowerFormatted),
          18,
          2
        ),
        pid: poolsKacy[i].pid ?? 0,
        nameToken: 'KACY'
      })
    }

    setPoolData(newArr)
    setLoading(false)
  }

  const handleDelegateVotes = async () => {
    await delegateVote(delegateSelected?.pid, receiverAddress)
  }

  const handleDelegateAllVoting = async () => {
    if (!walletRegex) {
      dispatch(setModalAlertText({ errorText: 'Invalid address' }))
      return
    }

    await delegateAllVotes(receiverAddress)
  }

  React.useEffect(() => {
    if (!walletRegex && receiverAddress !== '') {
      setErrorMsg(true)
      return
    }
    setErrorMsg(false)
  }, [receiverAddress])

  React.useEffect(() => {
    handlePoolInfo()
  }, [setModalOpen, setCurrentModal])

  // const delegateCallback = React.useCallback(
  //   (receiverAddress: string): TransactionCallback => {
  //     return async (error: MetamaskError, txHash: string) => {
  //       if (error) {
  //         if (error.code === 4001) {
  //           dispatch(setModalAlertText({ errorText: `Delegate cancelled` }))
  //           return
  //         }

  //         console.log(error)
  //         dispatch(setModalAlertText({ errorText: `Error` }))
  //         return
  //       }

  //       ToastWarning(`Confirming delegate to ${substr(receiverAddress)}...`)
  //       const txReceipt = await waitTransaction(txHash)

  //       if (txReceipt.status) {
  //         ToastSuccess(`Delegate confirmed to ${substr(receiverAddress)}`)
  //         setCurrentModal('manage')
  //         setModalOpen(false)
  //         return
  //       }
  //     }
  //   },
  //   []
  // )

  // const delegateAllCallback = React.useCallback(
  //   (receiverAddress: string): TransactionCallback => {
  //     return async (error: MetamaskError, txHash: string) => {
  //       if (error) {
  //         if (error.code === 4001) {
  //           dispatch(setModalAlertText({ errorText: `Delegate cancelled` }))
  //           return
  //         }

  //         dispatch(setModalAlertText({ errorText: `Error` }))
  //         return
  //       }

  //       ToastWarning(`Confirming delegate to ${substr(receiverAddress)}...`)
  //       const txReceipt = await waitTransaction(txHash)

  //       if (txReceipt.status) {
  //         ToastSuccess(`Delegate confirmed to ${substr(receiverAddress)}`)
  //         setCurrentModal('manage')
  //         setModalOpen(false)
  //         return
  //       }
  //     }
  //   },
  //   []
  // )

  return (
    <>
      <S.Content>
        <p>
          This option allows you to delegate your voting power to another
          Avalanche address. Your KACY tokens will not be sent, only your voting
          rights. This action can be undone at any time.
        </p>
        <span>Select the pool you wish to delegate its voting power from</span>
        {delegateSelected.nameToken !== '' && !optionsOpen ? (
          <S.Selected onClick={() => setOptionsOpen(!optionsOpen)}>
            <S.Option>
              <S.Name>
                <Image width={24} height={24} src={logo} alt="" />
                <S.WithdrawDelay>
                  <p>{delegateSelected.nameToken}</p>
                  <span>
                    {delegateSelected.withdrawDelay} days withdraw delay
                  </span>
                </S.WithdrawDelay>
              </S.Name>
              <S.VotingPower>
                <p>{delegateSelected.votingPower}</p>
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
              {' '}
              {loading ? 'Loading...' : 'Choose the KACY pool to delegate'}
            </span>
            <Image src={arrowSelect} alt="" />
          </S.Select>
        )}
        <span>Select the address you wish to delegate the voting power</span>
        <S.Input
          error={errorMsg}
          placeholder="Enter a 0x address"
          value={receiverAddress}
          onChange={event => setReceiverAddress(event.target.value)}
        />
        <S.Error error={errorMsg}>Invalid address</S.Error>
        <S.ButtonContainer>
          <Button
            size="large"
            fullWidth
            background="black"
            text="Back"
            onClick={() => setCurrentModal('manage')}
          />
          <Button
            size="large"
            fullWidth
            background="secondary"
            disabledNoEvent={walletRegex === null}
            text="Delegate Votes"
            onClick={handleDelegateVotes}
          />
        </S.ButtonContainer>
        <S.Link>
          <ExternalLink
            onClick={handleDelegateAllVoting}
            text="Delegate all voting power"
          />
        </S.Link>
      </S.Content>
      <Options
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        data={poolData}
        delegateSelected={delegateSelected}
        setDelegateSelected={setDelegateSelected}
      />
    </>
  )
}

export default DelegateVotingPower
