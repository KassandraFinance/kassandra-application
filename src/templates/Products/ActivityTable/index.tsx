/* eslint-disable prettier/prettier */
import React from 'react'
import Image from 'next/image'

import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { BNtoDecimal } from '../../../utils/numerals'
import { getDateDiff } from '../../../utils/date'
import substr from '../../../utils/substr'

import { ITokenImages } from '../../../store/reducers/poolImages'
import { useAppSelector } from '../../../store/hooks'
import useDate from '../../../hooks/useDate'

import { ITokenDetails, usePoolTokens } from '../../../context/PoolTokensContext'
import { ProductDetails } from '../../../constants/tokenAddresses'

import ExternalLink from '../../../components/ExternalLink'
import Pagination from '../../../components/Pagination'

import TokenIcons from '../TokenIcons'

import { GET_ACTIVITY } from './graphql'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'


const invertSymbol: { [key: string]: string } = {
  "WAVAX": "AVAX"
}

const typeActivity = {
  join: 'Invest',
  exit: 'Withdraw',
  swap: 'Swap'
}

interface IActivityTableProps {
  product: ProductDetails;
}

type ITokenInfoProps = {
  id: string,
  balance_in_pool: string,
  address: string,
  name: string,
  symbol: string,
  allocation: number,
  price: number
}

interface IPoolInfoProps {
  balance: string;
  token: ITokenInfoProps;
  weight_goal_normalized: string;
  weight_normalized: string;
}

interface IActivitiesProps {
  id: string,
  address: string,
  type: keyof typeof typeActivity,
  txHash: string,
  timestamp: number,
  symbol: string[] | string,
  amount: string[],
  price_usd: string[]
}

interface IPoolProps {
  pool: {
    underlying_assets: IPoolInfoProps[]
    num_activities: number,
    activities: IActivitiesProps[]
    allActivities: []
  };
}

const ActivityTable = ({ product }: IActivityTableProps) => {
  const [skip, setSkip] = React.useState<number>(0)
  const [poolInfo, setPoolInfo] = React.useState<IPoolInfoProps[]>([])
  const [activities, setActivities] = React.useState<IActivitiesProps[]>([])

  const { poolImages }: { poolImages: ITokenImages } = useAppSelector(
    state => state
  )

  const { poolTokens: poolTokensArray } = usePoolTokens()
  const { date } = useDate()

  const take = 4

  const { data } = useSWR<IPoolProps>(
    [GET_ACTIVITY, skip, take, product.sipAddress],
    (query, skip, take, productAddress) =>
      request('http://localhost/subgraphs/name/KassandraAvalanche', query, {
        skip,
        take,
        id: productAddress
      })
  )

  function handlePageClick(data: { selected: number }, take: any) {
    setSkip(data.selected * take)
  }

  React.useEffect(() => {
    if (data) {
      setPoolInfo(data?.pool?.underlying_assets)
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
                  {activity.type === "exit" ? activity.symbol.length > 2 ? <p>All assets</p> : <p>Single asset</p> : null}
                </S.TitleTransaction>
                <S.TransactionOutAndIn>
                  <span>
                    {poolTokensArray.map((element: ITokenDetails) => {
                      if (activity.type === "join" && element.symbol === "KACY")
                        return <Image src={product.fundIcon} alt="" width={16} height={16} />

                      if (activity.type === "exit") {
                        if (element.symbol === activity.symbol[0]) {
                          return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                        }
                        if (activity.symbol.length < 3 && element.symbol === invertSymbol[activity.symbol[0]]) {
                          return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                        } 
                        if (activity.symbol.length > 3 && element.symbol === "KACY") {
                          return (
                            <S.TokensSymbols>
                              <TokenIcons poolInfo={poolInfo} images={poolImages} />
                              {poolInfo.length > 3 && <span>+{poolInfo.length - 3} MORE</span>}
                            </S.TokensSymbols>
                          )
                        }
                      }

                      if (activity.type === "swap" && element.symbol === activity.symbol[1])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                      if (activity.type === "swap" && element.symbol === invertSymbol[activity.symbol[1]])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                    })}
                    {activity.symbol.length > 2 ? null : BNtoDecimal(
                      Big(activity.amount[activity.type === "exit" ? 0 : 1] || '0'),
                      18,
                      3
                    )}
                  </span>
                <p>
                  ${BNtoDecimal(
                    Big(activity.amount[activity.type === "exit" ? 0 : 1] || 0).times(
                      Big(activity?.price_usd[activity.type === "exit" ? 0 : 1] || 0)
                    ),
                    18,
                    5,
                    2
                  )}
                </p>
                </S.TransactionOutAndIn>
                <S.TransactionOutAndIn>
                  <span>
                    {poolTokensArray.map((element: ITokenDetails) => {
                      if (activity.type === "join" && element.symbol === activity.symbol[0])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                      if (activity.type === "join" && element.symbol === invertSymbol[activity.symbol[0]])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />


                      if (activity.type === "exit") {
                        if (element.symbol === "KACY") {
                          return <Image src={product.fundIcon} alt="" width={16} height={16} />
                        } else {
                          null
                        }
                      }

                      if (activity.type === "swap" && element.symbol === activity.symbol[0])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                      if (activity.type === "swap" && element.symbol === invertSymbol[activity.symbol[0]])
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image} alt="" />
                    })}
                    {BNtoDecimal(
                      Big(activity.amount[activity.type === "exit" ? 1 : 0] || '0'),
                      18,
                      3
                    )}
                  </span>
                  <p>
                    ${BNtoDecimal(
                      Big(activity.amount[activity.type === "exit" ? 1 : 0] || 0).times(
                        Big(activity?.price_usd[activity.type === "exit" ? 1 : 0] || 0)
                      ),
                      18,
                      5,
                      2
                    )}
                </p>
                </S.TransactionOutAndIn>
                <S.TransactionInfo>
                  <p>{substr(activity?.txHash)}</p>
                  <span>
                    {getDateDiff(activity.timestamp * 1000)?.value} {date(getDateDiff(activity.timestamp * 1000))} ago
                    <ExternalLink hrefLink={`https://snowtrace.io/tx/${activity.txHash}`} text="" />
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
