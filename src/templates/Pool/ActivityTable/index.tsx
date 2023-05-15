import React from 'react'
import Image from 'next/image'

import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { BNtoDecimal } from '../../../utils/numerals'
import { getDateDiff } from '../../../utils/date'
import substr from '../../../utils/substr'

import { useAppSelector } from '../../../store/hooks'
import useDate from '../../../hooks/useDate'

import { BACKEND_KASSANDRA } from '../../../constants/tokenAddresses'

import ExternalLink from '../../../components/ExternalLink'
import Pagination from '../../../components/Pagination'

import TokenIcons from '../TokenIcons'

import { GET_ACTIVITY } from './graphql'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

const invertSymbol: { [key: string]: string } = {
  WAVAX: 'AVAX'
}

const typeActivity = {
  join: 'Invest',
  exit: 'Withdraw',
  swap: 'Swap'
}

type ITokenInfoProps = {
  id: string
  balance_in_pool: string
  address: string
  name: string
  symbol: string
  allocation: number
  price: number
}

interface IPoolInfoProps {
  balance: string
  token: ITokenInfoProps
  weight_goal_normalized: string
  weight_normalized: string
}

interface IActivitiesProps {
  id: string
  address: string
  // eslint-disable-next-line prettier/prettier
  type: keyof typeof typeActivity
  txHash: string
  timestamp: number
  symbol: string[] | string
  amount: string[]
  price_usd: string[]
}

interface IPoolProps {
  pool: {
    underlying_assets: IPoolInfoProps[]
    num_activities: number
    activities: IActivitiesProps[]
    allActivities: []
  }
}

const ActivityTable = () => {
  const [skip, setSkip] = React.useState<number>(0)
  const [activities, setActivities] = React.useState<IActivitiesProps[]>([])

  const pool = useAppSelector(state => state.pool)
  const { date } = useDate()

  const take = 6

  const { data } = useSWR<IPoolProps>(
    [GET_ACTIVITY, skip, take, pool.id],
    (query, skip, take, productAddress) =>
      request(BACKEND_KASSANDRA, query, {
        skip,
        take,
        id: productAddress
      })
  )

  function handlePageClick(data: { selected: number }, take: any) {
    setSkip(data.selected * take)
  }

  function handleWithdrawAllAsset(amount: string[], price: string[]) {
    const allAssetTotal = price.slice(1).reduce(
      (accumulator, current, index) =>
        Big(amount[index + 1] || 0)
          .times(Big(current || 0))
          .add(accumulator),
      Big(0)
    )

    return BNtoDecimal(allAssetTotal, 18, 3)
  }

  React.useEffect(() => {
    if (data) {
      setActivities(data?.pool?.activities)
    }
  }, [data])

  return (
    <>
      <S.ActivityTable>
        <S.Title>
          <Image src={iconBar} alt="Bar Icon" width={18} height={18} />
          <h2>Activity</h2>
        </S.Title>
        <S.Line />
        <S.Table>
          <thead>
            <S.Tr>
              <S.Th>TX Type</S.Th>
              <S.Th>Out</S.Th>
              <S.Th>In</S.Th>
              <S.Th>Address/Time</S.Th>
            </S.Tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <S.Tr key={activity.id}>
                <S.TitleTransaction>
                  <span>
                    {typeActivity[activity.type]}
                    <a
                      href={`https://snowtrace.io/tx/${activity.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/assets/utilities/external-link.svg"
                        alt="External Link"
                        width={16}
                        height={16}
                      />
                    </a>
                  </span>
                  {activity.type === 'exit' ? (
                    activity.symbol.length > 2 ? (
                      <p>All assets</p>
                    ) : (
                      <p>Single asset</p>
                    )
                  ) : null}
                </S.TitleTransaction>
                <S.TransactionOutAndIn>
                  <span>
                    {pool.underlying_assets.map(element => {
                      if (
                        activity.type === 'join' &&
                        element.token.symbol === 'KACY'
                      )
                        return (
                          <Image
                            src={pool.logo}
                            alt=""
                            width={16}
                            height={16}
                          />
                        )

                      if (activity.type === 'exit') {
                        if (element.token.symbol === activity.symbol[0]) {
                          return (
                            <img
                              style={{ width: '1.6rem', borderRadius: '50%' }}
                              src={
                                element.token.logo || element.token?.wraps?.logo
                              }
                              alt=""
                            />
                          )
                        }
                        if (
                          activity.symbol.length < 3 &&
                          element.token.symbol ===
                            invertSymbol[activity.symbol[0]]
                        ) {
                          return (
                            <img
                              style={{ width: '1.6rem', borderRadius: '50%' }}
                              src={element.token.logo}
                              alt=""
                            />
                          )
                        }
                        if (
                          activity.symbol.length > 3 &&
                          element.token.symbol === 'KACY'
                        ) {
                          return (
                            <S.TokensSymbols>
                              <TokenIcons />
                              {pool.underlying_assets.length > 3 && (
                                <span>
                                  +{pool.underlying_assets.length - 3} MORE
                                </span>
                              )}
                            </S.TokensSymbols>
                          )
                        }
                      }

                      if (
                        activity.type === 'swap' &&
                        element.token.symbol === activity.symbol[1]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.logo}
                            alt=""
                          />
                        )
                      if (
                        activity.type === 'swap' &&
                        element.token.symbol ===
                          invertSymbol[activity.symbol[1]]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.logo}
                            alt=""
                          />
                        )
                    })}
                    {activity.symbol.length > 2
                      ? null
                      : BNtoDecimal(
                          Big(
                            activity.amount[activity.type === 'exit' ? 0 : 1] ||
                              '0'
                          ),
                          18,
                          3
                        )}
                  </span>
                  <p>
                    $
                    {activity.type === 'exit' && activity.symbol.length > 2
                      ? handleWithdrawAllAsset(
                          activity.amount,
                          activity.price_usd
                        )
                      : BNtoDecimal(
                          Big(activity.amount[1] || 0).times(
                            Big(activity?.price_usd[1] || 0)
                          ),
                          18,
                          5,
                          2
                        )}
                  </p>
                </S.TransactionOutAndIn>
                <S.TransactionOutAndIn>
                  <span>
                    {pool.underlying_assets.map(element => {
                      if (
                        activity.type === 'join' &&
                        element.token.symbol === activity.symbol[0]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.symbol}
                            alt=""
                          />
                        )
                      if (
                        activity.type === 'join' &&
                        element.token.symbol ===
                          invertSymbol[activity.symbol[0]]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.logo}
                            alt=""
                          />
                        )

                      if (activity.type === 'exit') {
                        if (element.token.symbol === 'KACY') {
                          return (
                            <Image
                              src={pool.logo}
                              alt=""
                              width={16}
                              height={16}
                            />
                          )
                        } else {
                          null
                        }
                      }

                      if (
                        activity.type === 'swap' &&
                        element.token.symbol === activity.symbol[0]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.logo}
                            alt=""
                          />
                        )
                      if (
                        activity.type === 'swap' &&
                        element.token.symbol ===
                          invertSymbol[activity.symbol[0]]
                      )
                        return (
                          <img
                            style={{ width: '1.6rem', borderRadius: '50%' }}
                            src={element.token.logo}
                            alt=""
                          />
                        )
                    })}
                    {BNtoDecimal(
                      Big(
                        activity.amount[
                          activity.type === 'exit'
                            ? activity.symbol.length > 2
                              ? 0
                              : 1
                            : 0
                        ] || '0'
                      ),
                      18,
                      3
                    )}
                  </span>
                  <p>
                    $
                    {BNtoDecimal(
                      Big(
                        activity.amount[
                          activity.type === 'exit'
                            ? activity.symbol.length > 2
                              ? 0
                              : 1
                            : 0
                        ] || 0
                      ).times(
                        Big(
                          activity?.price_usd[
                            activity.type === 'exit'
                              ? activity.symbol.length > 2
                                ? 0
                                : 1
                              : 0
                          ] || 0
                        )
                      ),
                      18,
                      5,
                      2
                    )}
                  </p>
                </S.TransactionOutAndIn>
                <S.TransactionInfo>
                  <p>{substr(activity?.address)}</p>
                  <span>
                    {getDateDiff(activity.timestamp * 1000)?.value}{' '}
                    {date(getDateDiff(activity.timestamp * 1000))} ago
                    {/* <ExternalLink hrefLink={`https://snowtrace.io/tx/${activity.txHash}`} text="" /> */}
                    <ExternalLink
                      hrefNext={`/profile/${activity.address}`}
                      text=""
                    />
                  </span>
                </S.TransactionInfo>
              </S.Tr>
            ))}
          </tbody>
        </S.Table>
      </S.ActivityTable>
      <Pagination
        take={take}
        skip={skip}
        totalItems={data?.pool?.num_activities || 0}
        handlePageClick={handlePageClick}
      />
    </>
  )
}

export default ActivityTable
