import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Blockies from 'react-blockies'
import Big from 'big.js'

import { BNtoDecimal } from '../../../utils/numerals'
import { getDateDiff } from '../../../utils/date'
import substr from '../../../utils/substr'

import { usePoolData } from '@/hooks/query/usePoolData'
import useDate from '../../../hooks/useDate'
import { useActivities } from '@/hooks/query/useActivities'

import ExternalLink from '../../../components/ExternalLink'
import Pagination from '../../../components/Pagination'

import TokenIcons from '../TokenIcons'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'
import arrowIcon from '@assets/utilities/arrow-left.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  THead,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TD,
  ValueWrapper,
  Value,
  ViewButton,
  SecondaryTextValue,
  TRHead,
  PaginationWrapper,
  TBodyWithHeight
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V,
  SecondaryValue
} from '@ui/Modals/ModalViewCoin/styles'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'

const invertSymbol: { [key: string]: string } = {
  WAVAX: 'AVAX',
  WMATIC: 'MATIC'
}

type ActivityType = 'join' | 'exit' | 'swap'

const typeActivity: Record<ActivityType, string> = {
  join: 'Invest',
  exit: 'Withdraw',
  swap: 'Swap'
}

const explorer: Record<number, string> = {
  137: 'https://polygonscan.com/tx/',
  43114: 'https://snowtrace.io/tx/',
  42161: 'https://arbiscan.io/tx/'
}

type HistoryMobileType = {
  type: keyof typeof typeActivity
  txHash: string
  address: string
  time: string
  amount: string[]
  symbol: string[] | string
  price_usd: string[]
}

interface IActivitiesProps {
  __typename?: 'Activity' | undefined
  id: string
  address: string
  type: string
  txHash: string
  timestamp: number
  symbol: string[]
  amount: any[]
  price_usd: any[]
}

const ActivityTable = () => {
  const [skip, setSkip] = React.useState<number>(0)

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })
  const { date } = useDate()

  const take = 6

  const { data } = useActivities({ id: pool?.id || '', skip, take })

  function handlePageClick(data: { selected: number }, take: number) {
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

  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)

  const [historyTitle, setHistoryTitle] = React.useState({
    logo: '',
    name: ''
  })
  const [historyMobile, setHistoryMobile] = React.useState<HistoryMobileType>()

  function handleView(history: IActivitiesProps) {
    let type = typeActivity[history.type as ActivityType]
    if (history.type === 'exit') {
      type =
        history.symbol.length > 2
          ? `${typeActivity[history.type]} all assets`
          : `${typeActivity[history.type]} single asset`
    }
    setHistoryTitle({
      name: type,
      logo: ''
    })

    const time = `${getDateDiff(history.timestamp * 1000)?.value} ${date(
      getDateDiff(history.timestamp * 1000)
    )} ago`
    setHistoryMobile({
      symbol: history.symbol,
      amount: history.amount,
      txHash: history.txHash,
      type: history.type as ActivityType,
      price_usd: history.price_usd,
      address: history.address,
      time: time
    })
    setIsOpen(true)
  }

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

  function getInvestPrice(amountsList: string[], pricesList: string[]) {
    let sumPriceIn = Big(0)
    for (const [i, amount] of amountsList.entries()) {
      if (i < amountsList.length - 1) {
        sumPriceIn = sumPriceIn.add(Big(amount).times(Big(pricesList[i])))
      }
    }

    return BNtoDecimal(sumPriceIn, 6, 2, 2)
  }

  return (
    <>
      <S.Title>
        <Image src={iconBar} alt="Bar Icon" width={18} height={18} />
        <h2>Activity</h2>
      </S.Title>
      <S.Line />

      <S.NewActivityTable>
        <THead>
          <TRHead>
            <TH>
              <ColumnTitle>TX Type</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 1}>
              <ColumnTitle align="right">In</ColumnTitle>
            </TH>
            <TH isView={inViewCollum === 2}>
              <ColumnTitle align="right">Out</ColumnTitle>
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
            ? data.activities.map(activity => {
                return (
                  <TRHead key={activity.id}>
                    <TD>
                      <ValueWrapper>
                        <S.Wrapper>
                          <Value align="left">
                            {typeActivity[activity.type as ActivityType]}
                          </Value>

                          <S.Link
                            href={`${explorer[data.chain_id]}${
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

                    {/* in */}
                    <TD isView={inViewCollum === 1}>
                      <ValueWrapper>
                        <S.DataWrapper>
                          {pool?.underlying_assets &&
                            activity.type === 'join' && (
                              <S.TokensSymbols key={activity.timestamp}>
                                <TokenIcons />
                                {pool.underlying_assets.length > 3 && (
                                  <span>
                                    +{pool.underlying_assets.length - 3} MORE
                                  </span>
                                )}
                              </S.TokensSymbols>
                            )}

                          {pool && activity.type === 'exit' && (
                            <S.ImageWrapper key={pool.id}>
                              {pool.logo ? (
                                <Image src={pool.logo} alt="" layout="fill" />
                              ) : (
                                <Blockies
                                  seed={pool?.name || ''}
                                  className="poolIcon"
                                  size={4}
                                  scale={4}
                                />
                              )}
                            </S.ImageWrapper>
                          )}

                          {activity.type === 'swap' &&
                            pool?.underlying_assets?.flatMap(element =>
                              element.token.symbol.toUpperCase() ===
                              activity.symbol[0].toUpperCase() ? (
                                <S.ImageWrapper
                                  key={`swap-${element.token.id}`}
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
                              ) : (
                                []
                              )
                            )}

                          {activity.type !== 'join' ? (
                            <Value>
                              {BNtoDecimal(
                                Big(activity.amount[0] || '0'),
                                6,
                                2,
                                2
                              )}
                            </Value>
                          ) : null}
                        </S.DataWrapper>

                        <SecondaryTextValue align="right">
                          $
                          {activity.type !== 'join'
                            ? BNtoDecimal(
                                Big(activity.amount[0] || 0).times(
                                  Big(activity?.price_usd[0] || 0)
                                ),
                                6,
                                2,
                                2
                              )
                            : getInvestPrice(
                                activity.amount,
                                activity.price_usd
                              )}
                        </SecondaryTextValue>
                      </ValueWrapper>
                    </TD>

                    {/* out */}
                    <TD isView={inViewCollum === 2}>
                      <ValueWrapper>
                        <S.DataWrapper>
                          {pool && activity.type === 'join' && (
                            <S.ImageWrapper>
                              {pool.logo ? (
                                <Image src={pool.logo} alt="" layout="fill" />
                              ) : (
                                <Blockies
                                  seed={pool?.name || ''}
                                  className="poolIcon"
                                  size={4}
                                  scale={4}
                                />
                              )}
                            </S.ImageWrapper>
                          )}

                          {activity.type !== 'join' &&
                            pool?.underlying_assets?.map((element, i) => {
                              if (activity.type === 'exit') {
                                if (
                                  activity.symbol.length < 3 &&
                                  element.token.symbol === activity.symbol[1]
                                ) {
                                  return (
                                    <S.ImageWrapper
                                      key={`exit-${element.token.id}`}
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

                                if (i === 0 && activity.symbol.length > 2) {
                                  return (
                                    <S.TokensSymbols
                                      key={`exit-${element.token.id}`}
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
                                element.token.symbol.toUpperCase() ===
                                  activity.symbol[1].toUpperCase()
                              )
                                return (
                                  <S.ImageWrapper
                                    key={`swap-${element.token.id}`}
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
                                    5
                                  </S.ImageWrapper>
                                )
                            })}

                          {activity.type !== 'exit' ? (
                            <Value>
                              {BNtoDecimal(
                                Big(
                                  activity.amount[activity.amount.length - 1] ||
                                    '0'
                                ),
                                6,
                                4,
                                2
                              )}
                            </Value>
                          ) : null}
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
                                Big(
                                  activity.amount[activity.amount.length - 1] ||
                                    0
                                ).times(
                                  Big(
                                    activity?.price_usd[
                                      activity.price_usd.length - 1
                                    ] || 0
                                  )
                                ),
                                6,
                                2,
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
                        handleView(activity)
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

        <PaginationWrapper>
          <Pagination
            take={take}
            skip={skip}
            totalItems={data?.num_activities || 0}
            handlePageClick={handlePageClick}
          />
        </PaginationWrapper>

        {data && pool && historyMobile && (
          <ModalViewCoin
            isOpen={isOpen}
            title={historyTitle}
            onClick={() => setIsOpen(false)}
          >
            <TableLine>
              <TableLineTitle>TX Type</TableLineTitle>

              <ValueContainer>
                <S.DataWrapper>
                  <V>{typeActivity[historyMobile.type]}</V>
                  <S.Link
                    href={`${explorer[data?.chain_id]}${historyMobile.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/assets/utilities/external-link.svg"
                      alt="External Link"
                      layout="fill"
                    />
                  </S.Link>
                </S.DataWrapper>

                {historyMobile.type === 'exit' ? (
                  <SecondaryValue>
                    {historyMobile.symbol.length > 2
                      ? 'All Assets'
                      : 'Single asset'}
                  </SecondaryValue>
                ) : null}
              </ValueContainer>
            </TableLine>

            <TableLine>
              <TableLineTitle>In</TableLineTitle>

              <ValueContainer>
                <S.DataWrapper>
                  {pool?.underlying_assets && historyMobile.type === 'join' && (
                    <S.TokensSymbols>
                      <TokenIcons />
                      {pool.underlying_assets.length > 3 && (
                        <span>+{pool.underlying_assets.length - 3} MORE</span>
                      )}
                    </S.TokensSymbols>
                  )}

                  {historyMobile.type === 'exit' && (
                    <S.ImageWrapper key={pool?.id}>
                      {pool?.logo ? (
                        <Image src={pool.logo} alt="" layout="fill" />
                      ) : (
                        <Blockies
                          seed={pool?.name || ''}
                          className="poolIcon"
                          size={4}
                          scale={4}
                        />
                      )}
                    </S.ImageWrapper>
                  )}

                  {historyMobile.type === 'swap'
                    ? pool.underlying_assets?.flatMap(element => {
                        if (
                          element.token.symbol.toUpperCase() ===
                          historyMobile.symbol[0].toUpperCase()
                        ) {
                          return (
                            <S.ImageWrapper key={element.token.id}>
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
                        } else {
                          return []
                        }
                      })
                    : null}

                  {historyMobile.type !== 'join' ? (
                    <V>
                      {BNtoDecimal(Big(historyMobile.amount[0] || '0'), 18, 3)}
                    </V>
                  ) : null}
                </S.DataWrapper>

                <SecondaryValue>
                  $
                  {historyMobile.type !== 'join'
                    ? BNtoDecimal(
                        Big(historyMobile.amount[0] || 0).times(
                          Big(historyMobile?.price_usd[0] || 0)
                        ),
                        6,
                        2,
                        2
                      )
                    : getInvestPrice(
                        historyMobile.amount,
                        historyMobile.price_usd
                      )}
                </SecondaryValue>
              </ValueContainer>
            </TableLine>

            <TableLine>
              <TableLineTitle>Out</TableLineTitle>

              <ValueContainer>
                <S.DataWrapper>
                  {historyMobile.type === 'join' ? (
                    <S.ImageWrapper>
                      {pool?.logo ? (
                        <Image src={pool.logo} alt="" layout="fill" />
                      ) : (
                        <Blockies
                          seed={pool?.name || ''}
                          className="poolIcon"
                          size={4}
                          scale={4}
                        />
                      )}
                    </S.ImageWrapper>
                  ) : null}

                  {historyMobile.type !== 'join' &&
                    pool?.underlying_assets?.map((element, i) => {
                      if (historyMobile.type === 'exit') {
                        if (
                          historyMobile.symbol.length < 3 &&
                          element.token.symbol === historyMobile.symbol[1]
                        ) {
                          return (
                            <S.ImageWrapper key={`exit-${element.token.id}`}>
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

                        if (i === 0 && historyMobile.symbol.length > 2) {
                          return (
                            <S.TokensSymbols key={`exit-${element.token.id}`}>
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
                        historyMobile.type === 'swap' &&
                        element.token.symbol.toUpperCase() ===
                          historyMobile.symbol[1].toUpperCase()
                      )
                        return (
                          <S.ImageWrapper key={`swap-${element.token.id}`}>
                            <Image
                              src={
                                element.token?.logo ||
                                element.token?.wraps?.logo ||
                                ''
                              }
                              alt=""
                              layout="fill"
                            />
                            5
                          </S.ImageWrapper>
                        )
                    })}

                  {historyMobile.type !== 'exit' ? (
                    <V>
                      {BNtoDecimal(
                        Big(
                          historyMobile.amount[
                            historyMobile.amount.length - 1
                          ] || '0'
                        ),
                        18,
                        3
                      )}
                    </V>
                  ) : null}
                </S.DataWrapper>

                <SecondaryValue>
                  $
                  {historyMobile.type === 'exit' &&
                  historyMobile.symbol.length > 2
                    ? handleWithdrawAllAsset(
                        historyMobile.amount,
                        historyMobile.price_usd
                      )
                    : BNtoDecimal(
                        Big(
                          historyMobile.amount[
                            historyMobile.amount.length - 1
                          ] || 0
                        ).times(
                          Big(
                            historyMobile?.price_usd[
                              historyMobile.price_usd.length - 1
                            ] || 0
                          )
                        ),
                        6,
                        2,
                        2
                      )}
                </SecondaryValue>
              </ValueContainer>
            </TableLine>

            <TableLine>
              <TableLineTitle>Address</TableLineTitle>

              <ValueContainer>
                <V className="Link">
                  <ExternalLink
                    hrefNext={`/profile/${historyMobile.address}`}
                    text={substr(historyMobile.address)}
                  />
                </V>
              </ValueContainer>
            </TableLine>

            <TableLine>
              <TableLineTitle>Time</TableLineTitle>

              <ValueContainer>
                <V>{historyMobile.time}</V>
              </ValueContainer>
            </TableLine>
          </ModalViewCoin>
        )}
      </S.NewActivityTable>
    </>
  )
}

export default ActivityTable
