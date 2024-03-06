import Image from 'next/image'

import substr from '@/utils/substr'

import { IDateProps } from '../DelegateVotingPower'

import ImageProfileWithQuery from '@/components/Governance/ImageProfileWithQuery'

import logo from '@assets/logos/kacy-stake.svg'

import * as S from '../styles'

interface IOptionsProps {
  optionsOpen: boolean
  setOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: Array<{
    msg?: string
    pid: number
    nameToken: string
    withdrawDelay: string
    votingPower: string
  }>
  delegateSelected: IDateProps
  setDelegateSelected: React.Dispatch<React.SetStateAction<IDateProps>>
  undelegate?: boolean
}

const Options = ({
  optionsOpen,
  setOptionsOpen,
  data,
  delegateSelected,
  setDelegateSelected,
  undelegate
}: IOptionsProps) => {
  return (
    <>
      <S.BackdropSelect
        onClick={() => {
          if (delegateSelected.nameToken !== '') {
            setDelegateSelected({
              pid: 0,
              nameToken: '',
              withdrawDelay: '',
              votingPower: ''
            })
            setOptionsOpen(false)
          }
          setOptionsOpen(false)
        }}
        style={{ display: optionsOpen ? 'block' : 'none' }}
      />
      <S.Modal isOpenOption={optionsOpen} undelegate={undelegate}>
        {data.map(item =>
          item.msg ? null : (
            <S.Option
              key={item.pid}
              onClick={() => {
                setDelegateSelected(item)
                setOptionsOpen(false)
              }}
            >
              <S.Name>
                {undelegate ? (
                  <ImageProfileWithQuery
                    address={item.nameToken}
                    diameter={24}
                    hasAddress={false}
                    isLink={false}
                  />
                ) : (
                  <Image src={logo} width={28} height={28} alt="kacy logo" />
                )}
                <S.WithdrawDelay>
                  {undelegate ? (
                    <p>{substr(item.nameToken)}</p>
                  ) : (
                    <p>{item.nameToken}</p>
                  )}
                  <span>{item.withdrawDelay} days withdraw delay</span>
                </S.WithdrawDelay>
              </S.Name>
              <S.VotingPower>
                <p>{item.votingPower}</p>
                <span>Voting power</span>
              </S.VotingPower>
            </S.Option>
          )
        )}
      </S.Modal>
    </>
  )
}

export default Options
