/* eslint-disable prettier/prettier */
import React from 'react'
import Image from 'next/image'

import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { BNtoDecimal } from '../../../utils/numerals'
import { getDateDiff } from '../../../utils/date'
import substr from '../../../utils/substr'

import { usePoolTokens } from '../../../context/PoolTokensContext'

import ExternalLink from '../../../components/ExternalLink'
import Pagination from '../../../components/Pagination'

import { GET_ACTIVITY } from './graphql'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'
import kacyLogo from '../../../../public/assets/logos/kacy-stake.svg'

import * as S from './styles'
import useDate from '../../../hooks/useDate'

const typeActivity = {
  join: 'Invest',
  exit: 'Withdraw',
  swap: 'Swap'
}

interface IActivityProps {
  pool: {
    activities: {
      id: string,
      address: string,
      type: keyof typeof typeActivity,
      txHash: string,
      timestamp: number,
      symbol: string[],
      amount: string[],
      price_usd: string[]
    }[]
  };
}

const ActivityTable = ({ product }: any) => {
  const [skip, setSkip] = React.useState<number>(0)
  const { poolTokens: poolTokensArray } = usePoolTokens()
  const { date } = useDate()

  const take = 10

  function handlePageClick(data: { selected: number }, take: any) {
    setSkip(data.selected / take)
  }

  const { data } = useSWR<IActivityProps>(
    [GET_ACTIVITY, skip, take],
    (query, skip, take) =>
      request('http://localhost/subgraphs/name/KassandraAvalanche', query, {
        skip,
        take,
        id: product
      })
  )
  console.log(typeof data?.pool.activities[0].timestamp)
  console.log(data)
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
            {data?.pool.activities.map(activity => (
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
                  <p>{activity.symbol.length > 1 && activity.type === "exit" ? "All assets" : "Single asset"}</p>
                </S.TitleTransaction>
                <S.TransactionOutAndIn>
                  <span>
                    {poolTokensArray.map((element: any) => {
                      if(activity.type === "swap" && element.symbol === activity.symbol[1]) {
                        return <img style={{ width: "1.6rem", borderRadius: "50%" }} src={element.image || element.src} alt="" />
                      } else if (element.symbol === activity.symbol[1]) {
                        return <Image src={kacyLogo} alt="asd" width={16} height={16} />
                      }
                    })}
                    {BNtoDecimal(
                        Big(activity.amount[1] || '0'),
                        18,
                        3
                      )}
                  </span>
                  <p>
                    {BNtoDecimal(
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
                  <span>10</span>
                  <p>$ 700,00</p>
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
        totalItems={500}
        // page={parseInt(page) - 1}
        handlePageClick={handlePageClick}
      />
    </>
  )
}

export default ActivityTable
