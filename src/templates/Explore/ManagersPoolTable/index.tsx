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
import ModalViewCoin from '@/components/Modals/ModalViewCoin'
import ImageProfile from '@/components/Governance/ImageProfile'

import eyeShowIcon from '@assets/utilities/eye-show.svg'
import arrowLeftBoldIcon from '@assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '@assets/utilities/arrow-right-bold.svg'

import * as S from './styles'
import {
  THead,
  TH,
  TR,
  TD,
  TRLink,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TRHead,
  Value,
  ViewButton,
  THButtonSorting,
  PaginationWrapper,
  TBodyWithHeight,
  LoadingContainer
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'
import Pagination from '@/components/Pagination'

type ITvlProps = {
  close: string
}

type IManagerAddress = {
  totalManagers: string[],
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

export enum managersPoolTableSorting {
  DESC = 'desc',
  ASC = 'asc'
}

const ManagersPoolTable = () => {
  const [skip, setSkip] = React.useState(0)
  const [totalManagers, setTotalManagers] = React.useState(0)
  const [managersPoolSorting, setManagersPoolSorting] =
    React.useState<managersPoolTableSorting>(managersPoolTableSorting.DESC)

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

  const take = 8

  const params = {
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    orderDirection: managersPoolSorting,
    first: take,
    skip
  }

  const { data } = useSWR<IManagerAddress>(
    [GET_MANAGERS_POOLS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
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
      return {
        rank: skip + index + 1,
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

    setTotalManagers(data.totalManagers.length)
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

  function handleClickChangeTvlSorting(currentValue: string) {
    switch (currentValue) {
      case managersPoolTableSorting.DESC:
        setManagersPoolSorting(managersPoolTableSorting.ASC)
        break

      case managersPoolTableSorting.ASC:
        setManagersPoolSorting(managersPoolTableSorting.DESC)
        break

      default:
        break
    }
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
            <THButtonSorting
              onClick={() => handleClickChangeTvlSorting(managersPoolSorting)}
              isRotateArrow={
                managersPoolSorting === managersPoolTableSorting.ASC
              }
            >
              Value Managed{' '}
              <img
                src="/assets/utilities/arrow-select-down.svg"
                alt=""
                width={10}
                height={10}
              />
            </THButtonSorting>
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

      <TBodyWithHeight
        tableRowsNumber={ManagersList?.length > 0 ? ManagersList?.length : take}
        lineHeight={8.5}
      >
        {ManagersList.length > 0 ? (
          ManagersList.map(manager => {
            return (
              <TR key={manager.address}>
                <Link
                  href={`/profile/${manager.address}?tab=managed-pools`}
                  passHref
                >
                  <TRLink>
                    <TD>
                      <Value align="left">{manager.rank}</Value>
                    </TD>
                    <TD>
                      <ImageProfile
                        address={manager.address}
                        diameter={24}
                        hasAddress={true}
                        isLink={false}
                        tab="?tab=managed-pools"
                      />
                    </TD>
                    <TD isView={inViewCollum === 1}>
                      <Value>${manager.valueManaged}</Value>
                    </TD>
                    <TD isView={inViewCollum === 2}>
                      <Value>{manager.poolCount}</Value>
                    </TD>
                    <TD isView={inViewCollum === 3}>
                      <Value value={Number(manager.changeMonthly)}>
                        {manager.changeMonthly}%
                      </Value>
                    </TD>
                    <TD isView={inViewCollum === 4}>
                      <Value value={Number(manager.changeDay)}>
                        {manager.changeDay}%
                      </Value>
                    </TD>
                    <TD isView={inViewCollum === 5}>
                      <Value>{manager.voteWeight}%</Value>
                    </TD>

                    <TD
                      onClick={event => {
                        event.preventDefault()
                        handleView(manager)
                      }}
                    >
                      <ViewButton type="button">
                        <Image src={eyeShowIcon} />
                      </ViewButton>
                    </TD>
                  </TRLink>
                </Link>
              </TR>
            )
          })
        ) : (
          <LoadingContainer>
            <Loading marginTop={0} />
          </LoadingContainer>
        )}
      </TBodyWithHeight>

      <PaginationWrapper>
        <Pagination
          skip={skip}
          take={take}
          totalItems={totalManagers}
          handlePageClick={({ selected }) => {
            setSkip(selected * take)
          }}
        />
      </PaginationWrapper>

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
