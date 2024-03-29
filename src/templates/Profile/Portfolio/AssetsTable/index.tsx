import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Big from 'big.js'
import Blockies from 'react-blockies'

import { BNtoDecimal } from '@/utils/numerals'

import comingSoonIcon from '@assets/icons/coming-soon.svg'

import * as S from './styles'

export interface IChangeType {
  [key: string]: string
}

export interface IPriceType {
  [key: string]: string
}

export interface IBalanceType {
  [key: string]: Big
}

export interface IParamsType {
  id: string[]
  day: number
  month: number
}

interface IAssetsTableProps {
  pools: PoolProps[]
}

type PoolProps = {
  id: string
  address: string
  name: string
  symbol: string
  logo: string | null | undefined
  changeDay: string
  changeMonth: string
  price: any
  tvl: any
  balanceInUSD: Big
  balance: Big
  logoChain: string
}

export const AssetsTable = ({ pools }: IAssetsTableProps) => {
  const router = useRouter()

  const Trs = pools.map(pool => {
    return (
      <S.Tr
        key={pool.id}
        onClick={() => {
          router.push(`/pool/${pool.id.toLowerCase()}`)
        }}
      >
        <S.Td>
          <S.ProductWrapper>
            <S.Imagecontainer>
              <S.ImageWrapper>
                {pool.logo ? (
                  <img src={pool.logo} />
                ) : (
                  <Blockies size={8} scale={9} seed={pool.name ?? ''} />
                )}
              </S.ImageWrapper>

              <S.ChainLogoWrapper>
                <Image src={pool.logoChain || comingSoonIcon} layout="fill" />
              </S.ChainLogoWrapper>
            </S.Imagecontainer>
            <S.FundWrapper>
              <span>{pool.name}</span>
              <span>{pool.symbol}</span>
            </S.FundWrapper>
          </S.ProductWrapper>
        </S.Td>
        <S.Td>${parseFloat(pool.price).toFixed(2)}</S.Td>
        <S.Td>
          ${pool.tvl ? BNtoDecimal(Big(pool?.tvl ?? Big(0)), 2) : '0'}
        </S.Td>
        <S.Td>
          <S.Change change={parseFloat(pool.changeMonth)}>
            {pool.changeMonth}%
          </S.Change>
        </S.Td>
        <S.Td>
          <S.Change change={parseFloat(pool.changeDay)}>
            {pool.changeDay}%
          </S.Change>
        </S.Td>
        <S.Td>
          <S.FlexWrapper>
            <div>
              {pool.balance
                ? BNtoDecimal(Big(pool?.balance ?? Big(0)), 18, 2)
                : 0}{' '}
              <span>{pool.symbol}</span>
            </div>
            <span>
              $
              {pool.balance && pool.price
                ? BNtoDecimal(Big(pool?.balanceInUSD ?? Big(0)), 18, 2)
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
