import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import BigNumber from 'bn.js'
import Big from 'big.js'

import { request } from 'graphql-request'

import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'
import { GET_CHART } from './graphql'

import { BNtoDecimal } from '../../../../utils/numerals'

import * as S from './styles'

export interface IChangeType {
  [key: string]: string;
}

export interface IPriceType {
  [key: string]: string;
}

export interface IBalanceType {
  [key: string]: BigNumber;
}

export interface IParamsType {
  id: string[];
  day: number;
  month: number;
}

interface IAssetsTableProps {
  assets: string[];
  balanceFunds: IBalanceType;
}

type Response = {
  pools: {
    id: string,
    now: { close: number }[],
    day: { close: number }[],
    month: { close: number }[],
    price_usd: string,
    total_value_locked_usd: string,
    address: string,
    name: string,
    symbol: string,
    logo: string
  }[]
}

export const AssetsTable = ({ assets, balanceFunds }: IAssetsTableProps) => {
  const router = useRouter()

  const [changeDay, setChangeDay] = React.useState<IChangeType>({})
  const [changeMonth, setChangeMonth] = React.useState<IChangeType>({})
  const [price, setPrice] = React.useState<IPriceType>({})
  const [tvl, setTvl] = React.useState<IPriceType>({})

  const { data } = useSWR<Response>([GET_CHART, assets], (query, assets) =>
    request(BACKEND_KASSANDRA, query, {
      id: assets,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
      month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30)
    })
  )

  function calcChange(newPrice: number, oldPrice: number) {
    const calc = ((newPrice - oldPrice) / oldPrice) * 100
    return calc ? calc.toFixed(2) : '0'
  }

  React.useEffect(() => {
    if (typeof data === undefined) {
      return
    }

    data?.pools?.forEach(element => {
      const changeDay = calcChange(element.now[0]?.close, element.day[0]?.close)

      const changeMonth = calcChange(
        element.now[0]?.close,
        element.month[0]?.close
      )

      setChangeDay(prevState => ({
        ...prevState,
        [element.id]: changeDay
      }))

      setChangeMonth(prevState => ({
        ...prevState,
        [element.id]: changeMonth
      }))

      setPrice(prevState => ({
        ...prevState,
        [element.id]: element.price_usd
      }))

      setTvl(prevState => ({
        ...prevState,
        [element.id]: element.total_value_locked_usd
      }))
    })
  }, [data])

  const Trs = data?.pools.map(pool => {
    return (
      <S.Tr
        key={pool.id}
        onClick={() => {
          router.push(`/pool/${pool.id.toLowerCase()}`)
        }}
      >
        <S.Td>
          <S.ProductWrapper>
            <S.ImageWrapper>
              {pool.logo && <img src={pool.logo} />}
            </S.ImageWrapper>
            <S.FundWrapper>
              <span>{pool.name}</span>
              <span>{pool.symbol}</span>
            </S.FundWrapper>
          </S.ProductWrapper>
        </S.Td>
        <S.Td>
          <S.NetworkWrapper>
            <Image src="/assets/logos/avalanche.svg" width={16} height={16} />
          </S.NetworkWrapper>
        </S.Td>
        <S.Td>${parseFloat(price[pool.address]).toFixed(2)}</S.Td>
        <S.Td>
          ${tvl[pool.address] ? BNtoDecimal(Big(tvl[pool.address]), 2) : '0'}
        </S.Td>
        <S.Td>
          <S.Change change={parseFloat(changeMonth[pool.address])}>
            {changeMonth[pool.address]}%
          </S.Change>
        </S.Td>
        <S.Td>
          <S.Change change={parseFloat(changeDay[pool.address])}>
            {changeDay[pool.address]}%
          </S.Change>
        </S.Td>
        <S.Td>
          <S.FlexWrapper>
            <div>
              {balanceFunds[pool.address]
                ? BNtoDecimal(
                    Big(balanceFunds[pool.address].toString()).div(
                      Big(10).pow(18)
                    ),
                    2
                  )
                : 0}{' '}
              <span>{pool.symbol}</span>
            </div>
            <span>
              $
              {balanceFunds[pool.address] && price[pool.address]
                ? BNtoDecimal(
                    Big(balanceFunds[pool.address].toString())
                      .div(Big(10).pow(18))
                      .mul(Big(price[pool.address])),
                    2
                  )
                : 0}
            </span>
          </S.FlexWrapper>
        </S.Td>
      </S.Tr>
    )
  })

  return (
    <S.TableWrapper>
      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th>Product Name</S.Th>
            <S.Th>Network</S.Th>
            <S.Th>Price</S.Th>
            <S.Th>TVL</S.Th>
            <S.Th>This Month</S.Th>
            <S.Th>24h</S.Th>
            <S.Th>balance</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>{Trs}</S.TBody>
      </S.Table>
    </S.TableWrapper>
  )
}

export default AssetsTable
