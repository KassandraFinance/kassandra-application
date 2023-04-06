import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { GET_MANAGERS_POOLS, GET_USERS_VOTEWEIGHTS } from './graphql'
import { BACKEND_KASSANDRA, SUBGRAPH_URL } from '@/constants/tokenAddresses'

import { calcChange } from '@/utils/numerals'

import Loading from '@/components/Loading'
import ManagerInfo from './ManagerInfo'

import arrowLeftBoldIcon from '@assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '@assets/utilities/arrow-right-bold.svg'

import * as S from './styles'
import {
  THead,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TBody,
  TRHead,
  Value
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'

type ITvlProps = {
  close: string
}

type IManagerAddress = {
  managers: {
    id: string,
    pool_count: number,
    unique_investors: number,
    total_value_locked_usd: string,
    TVLDay: ITvlProps[],
    TVLMonthly: ITvlProps[]
  }[]
}

type IVoteWeightsProps = {
  governances: {
    totalVotingPower: string
  }[],
  users: {
    id: string,
    votingPower: string
  }[]
}

type IManagerListProps = {
  rank: number,
  address: string,
  poolCount: number,
  valueManaged: string,
  changeMonthly: string,
  changeDay: string,
  voteWeight: string
}

const ManagersPoolTable = () => {
  const [ManagersList, setManagersList] = React.useState<IManagerListProps[]>(
    []
  )
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [managerData, setManagerData] = React.useState({
    logo: '',
    name: '',
    address: ''
  })
  const [managerMobile, setManagerMobile] = React.useState({
    rank: 0,
    address: '',
    poolCount: 0,
    valueManaged: '',
    changeMonthly: '',
    changeDay: '',
    voteWeight: ''
  })

  const params = {
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30)
  }

  const { data } = useSWR<IManagerAddress>(
    [GET_MANAGERS_POOLS, params],
    (query, { day, month }) =>
      request(BACKEND_KASSANDRA, query, {
        day,
        month
      })
  )

  const usersWalletAddresses = data && data.managers.map(manager => manager.id)

  const { data: voteWeights } = useSWR<IVoteWeightsProps>(
    [GET_USERS_VOTEWEIGHTS, usersWalletAddresses],
    (query, usersWalletAddresses) =>
      request(SUBGRAPH_URL, query, {
        id_in: usersWalletAddresses
      })
  )

  function handleGetManagers(data: IManagerAddress | undefined) {
    if (!data || !voteWeights) return

    const voteWeightsList: Record<string, string> = {}
    voteWeights &&
      voteWeights.users.forEach(user =>
        Object.assign(voteWeightsList, { [user.id]: user.votingPower })
      )

    const managerList = data.managers.map((manage, index) => {
      console.log(manage.TVLDay[0]?.close)
      return {
        rank: index + 1,
        address: manage.id,
        poolCount: manage.pool_count,
        valueManaged: Big(manage.total_value_locked_usd).toFixed(2, 2),
        changeMonthly: manage.TVLMonthly[0]?.close
          ? calcChange(
              Number(manage.total_value_locked_usd || 0),
              Number(manage.TVLMonthly[0].close)
            )
          : '0',
        changeDay: manage.TVLDay[0]?.close
          ? calcChange(
              Number(manage.total_value_locked_usd || 0),
              Number(manage.TVLDay[0].close)
            )
          : '0',
        voteWeight: Big(voteWeightsList[manage.id] ?? 0)
          .mul(100)
          .div(Big(voteWeights.governances[0].totalVotingPower ?? 0))
          .toFixed(2, 2)
      }
    })

    setManagersList(managerList)
  }

  function handleView(managerInfo: IManagerListProps) {
    setManagerData({
      logo: '',
      name: managerInfo.address,
      address: managerInfo.address
    })
    setManagerMobile(managerInfo)
    setIsOpen(true)
  }

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 5
      } else if (newPrev > 5) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  React.useEffect(() => {
    handleGetManagers(data)
  }, [data, voteWeights])

  return (
    <S.ManagersPoolTable>
      <THead>
        <TRHead>
          <TH>
            <ColumnTitle>#</ColumnTitle>
          </TH>
          <TH>
            <ColumnTitle align="left" id="manager">
              Manager
            </ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 1}>
            <ColumnTitle align="right">Value Managed</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 2}>
            <ColumnTitle align="right">Pools Managed</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 3}>
            <ColumnTitle align="right">Monthly</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 4}>
            <ColumnTitle align="right">24h</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 5}>
            <ColumnTitle align="right">Vote Weight</ColumnTitle>
          </TH>

          <TH>
            <TableViewButtonContainer>
              <TableViewButton onClick={() => handleCurrentInView(-1)}>
                <Image src={arrowLeftBoldIcon} width={16} height={16} />
              </TableViewButton>

              <TableViewButton onClick={() => handleCurrentInView(1)}>
                <Image src={arrowRightBoldIcon} width={16} height={16} />
              </TableViewButton>
            </TableViewButtonContainer>
          </TH>
        </TRHead>
      </THead>

      <TBody>
        {ManagersList.length > 0 ? (
          ManagersList.map(manager => {
            return (
              <S.ManagerInfoConainer key={manager.address}>
                <Link
                  href={`/profile/${manager.address}?tab=managed-funds`}
                  passHref
                >
                  <S.ManagerInfoDesktop>
                    <ManagerInfo
                      managerInfo={manager}
                      inViewCollum={inViewCollum}
                      handleView={handleView}
                    />
                  </S.ManagerInfoDesktop>
                </Link>
                <S.ManagerInfoMobile>
                  <ManagerInfo
                    managerInfo={manager}
                    inViewCollum={inViewCollum}
                    isLinkAddress={true}
                    handleView={handleView}
                  />
                </S.ManagerInfoMobile>
              </S.ManagerInfoConainer>
            )
          })
        ) : (
          <S.LoadingContainer>
            <Loading marginTop={0} />
          </S.LoadingContainer>
        )}
      </TBody>

      <ModalViewCoin
        isOpen={isOpen}
        title={managerData}
        isJazzicon
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Rank</TableLineTitle>

          <ValueContainer>
            <V>{managerMobile.rank}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Value Managed</TableLineTitle>
          <ValueContainer>
            <V>${managerMobile.valueManaged}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Pools Managed</TableLineTitle>
          <ValueContainer>
            <V>{managerMobile.poolCount}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Monthly</TableLineTitle>
          <ValueContainer>
            <Value value={Number(managerMobile.changeMonthly)}>
              {managerMobile.changeMonthly}%
            </Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>24h</TableLineTitle>
          <ValueContainer>
            <Value value={Number(managerMobile.changeDay)}>
              {managerMobile.changeDay}%
            </Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Vote Weight</TableLineTitle>
          <ValueContainer>
            <V>{managerMobile.voteWeight}%</V>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </S.ManagersPoolTable>
  )
}

export default ManagersPoolTable
