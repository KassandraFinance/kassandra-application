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
import arrowIcon from '@assets/utilities/arrow-left.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  THead,
  TR,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TD,
  ValueWrapper,
  Value,
  ViewButton,
  SecondaryTextValue,
  TRLink,
  TRHead,
  PaginationWrapper,
  LoadingContainer,
  TBodyWithHeight
} from '@/templates/Explore/CommunityPoolsTable/styles'

const invertSymbol: { [key: string]: string } = {
  WAVAX: 'AVAX'
}

const typeActivity = {
  join: 'Invest',
  exit: 'Withdraw',
  swap: 'Swap'
}

const explorer: Record<number, string> = {
  137: 'https://polygonscan.com/tx/',
  43114: 'https://snowtrace.io/tx/'
}

interface IActivitiesProps {
  address: string
  id: string
  timestamp: number
  txHash: string
  type: keyof typeof typeActivity

  amount: string[]
  price_usd: string[]
  symbol: string[] | string
}

interface IPoolProps {
  pool: {
    num_activities: number
    name: string
    symbol: string
    price_usd: string
    chain_id: number
    activities: IActivitiesProps[]
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
  console.log(data)

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

  // New code

  const [inViewCollum, setInViewCollum] = React.useState(1)

  function handleCurrentInView(n: number, columns: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return columns
      } else if (newPrev > columns) {
        return 1
      } else {
        return newPrev
      }
    })
  }

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

      <S.NewActivityTable>
        <THead>
          <TRHead>
            <TH>
              <ColumnTitle>TX Type</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 1}>
              <ColumnTitle align="right">Out</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 2}>
              <ColumnTitle align="right">In</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 3}>
              <ColumnTitle align="right">Address / Time</ColumnTitle>
            </TH>
            <TH>
              <TableViewButtonContainer>
                <TableViewButton onClick={() => handleCurrentInView(-1, 3)}>
                  <Image src={arrowIcon} width={7} height={12} />
                </TableViewButton>

                <TableViewButton onClick={() => handleCurrentInView(1, 3)}>
                  <Image src={arrowIcon} width={7} height={12} />
                </TableViewButton>
              </TableViewButtonContainer>
            </TH>
          </TRHead>
        </THead>

        <TBodyWithHeight tableRowsNumber={6} lineHeight={6}>
          {data
            ? data.pool.activities.map(activity => {
                return (
                  <TRHead key={activity.id}>
                    <TD>
                      <ValueWrapper>
                        <S.Wrapper>
                          <Value align="left">
                            {typeActivity[activity.type]}
                          </Value>

                          <S.Link
                            href={`${explorer[data.pool.chain_id]}${
                              activity.txHash
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src="/assets/utilities/external-link.svg"
                              alt="External Link"
                              layout="fill"
                            />
                          </S.Link>
                        </S.Wrapper>

                        {activity.type === 'exit' ? (
                          activity.symbol.length > 2 ? (
                            <SecondaryTextValue>All assets</SecondaryTextValue>
                          ) : (
                            <SecondaryTextValue>
                              Single asset
                            </SecondaryTextValue>
                          )
                        ) : null}
                      </ValueWrapper>
                    </TD>

                    <TD isView={inViewCollum === 1}>
                      <ValueWrapper>
                        <S.DataWrapper>
                          {pool.underlying_assets.map(element => {
                            if (
                              activity.type === 'join' &&
                              element.token.symbol === 'KACY'
                            )
                              return (
                                <S.ImageWrapper>
                                  <Image src={pool.logo} alt="" layout="fill" />
                                </S.ImageWrapper>
                              )

                            if (activity.type === 'exit') {
                              if (element.token.symbol === activity.symbol[0]) {
                                return (
                                  <S.ImageWrapper
                                    key={element.token.id + activity.timestamp}
                                  >
                                    <Image
                                      src={
                                        element.token?.logo ||
                                        element.token?.wraps?.logo ||
                                        ''
                                      }
                                      layout="fill"
                                    />
                                  </S.ImageWrapper>
                                )
                              }
                              if (
                                activity.symbol.length < 3 &&
                                element.token.symbol ===
                                  invertSymbol[activity.symbol[0]]
                              ) {
                                return (
                                  <S.ImageWrapper
                                    key={element.token.id + activity.timestamp}
                                  >
                                    <Image
                                      src={
                                        element.token?.logo ||
                                        element.token?.wraps?.logo ||
                                        ''
                                      }
                                      alt=""
                                      layout="fill"
                                    />
                                  </S.ImageWrapper>
                                )
                              }
                              if (
                                activity.symbol.length > 3 &&
                                element.token.symbol === 'KACY'
                              ) {
                                return (
                                  <S.TokensSymbols
                                    key={element.token.id + activity.timestamp}
                                  >
                                    <TokenIcons />
                                    {pool.underlying_assets.length > 3 && (
                                      <span>
                                        +{pool.underlying_assets.length - 3}{' '}
                                        MORE
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
                                <S.ImageWrapper
                                  key={element.token.id + activity.timestamp}
                                >
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token?.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )
                            if (
                              activity.type === 'swap' &&
                              element.token.symbol ===
                                invertSymbol[activity.symbol[1]]
                            )
                              return (
                                <S.ImageWrapper
                                  key={element.token.id + activity.timestamp}
                                >
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token?.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )
                          })}

                          <Value>
                            {activity.symbol.length > 2
                              ? null
                              : BNtoDecimal(
                                  Big(
                                    activity.amount[
                                      activity.type === 'exit' ? 0 : 1
                                    ] || '0'
                                  ),
                                  18,
                                  3
                                )}
                          </Value>
                        </S.DataWrapper>

                        <SecondaryTextValue align="right">
                          $
                          {activity.type === 'exit' &&
                          activity.symbol.length > 2
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
                        </SecondaryTextValue>
                      </ValueWrapper>
                    </TD>

                    <TD isView={inViewCollum === 2}>
                      <ValueWrapper>
                        <S.DataWrapper>
                          {pool.underlying_assets.map(element => {
                            if (
                              activity.type === 'join' &&
                              element.token.symbol === activity.symbol[0]
                            )
                              return (
                                <S.ImageWrapper>
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )
                            if (
                              activity.type === 'join' &&
                              element.token.symbol ===
                                invertSymbol[activity.symbol[0]]
                            )
                              return (
                                <S.ImageWrapper>
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token?.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )

                            if (activity.type === 'exit') {
                              if (element.token.symbol === 'KACY') {
                                return (
                                  <S.ImageWrapper key={pool.id}>
                                    <Image
                                      src={pool.logo}
                                      alt=""
                                      layout="fill"
                                    />
                                  </S.ImageWrapper>
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
                                <S.ImageWrapper>
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token?.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )
                            if (
                              activity.type === 'swap' &&
                              element.token.symbol ===
                                invertSymbol[activity.symbol[0]]
                            )
                              return (
                                <S.ImageWrapper>
                                  <Image
                                    src={
                                      element.token?.logo ||
                                      element.token?.wraps?.logo ||
                                      ''
                                    }
                                    alt=""
                                    layout="fill"
                                  />
                                </S.ImageWrapper>
                              )
                          })}

                          <Value>
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
                          </Value>
                        </S.DataWrapper>

                        <SecondaryTextValue align="right">
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
                        </SecondaryTextValue>
                      </ValueWrapper>
                    </TD>

                    <TD isView={inViewCollum === 3}>
                      <ValueWrapper>
                        <Value>{substr(activity?.address)}</Value>

                        <S.DataWrapper>
                          <SecondaryTextValue align="right">
                            {getDateDiff(activity.timestamp * 1000)?.value}{' '}
                            {date(getDateDiff(activity.timestamp * 1000))} ago
                          </SecondaryTextValue>

                          <ExternalLink
                            hrefNext={`/profile/${activity.address}`}
                            text=""
                          />
                        </S.DataWrapper>
                      </ValueWrapper>
                    </TD>

                    <TD
                      onClick={event => {
                        event.preventDefault()
                        console.log('click')
                        // handleView(manager)
                      }}
                    >
                      <ViewButton type="button">
                        <Image src={eyeShowIcon} />
                      </ViewButton>
                    </TD>
                  </TRHead>
                )
              })
            : null}
        </TBodyWithHeight>
      </S.NewActivityTable>
    </>
  )
}

export default ActivityTable
