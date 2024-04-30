import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Big from 'big.js'
import Blockies from 'react-blockies'
import Tippy from '@tippyjs/react'

import { calcChange } from '@/utils/numerals'

import notFoundIcon from '@assets/icons/coming-soon.svg'
import arrowIcon from '@assets/utilities/arrow-left.svg'
import comingSoonIcon from '@assets/icons/coming-soon.svg'
import Loading from '@/components/Loading'

import * as S from './styles'

type UnderlyingAssets = {
  token: {
    logo?: string | null
    wraps?: {
      logo?: string | null
    } | null
  }
}

interface IPoolsInfosProps {
  id: string
  name: string
  symbol: string
  logo?: string | null
  address: string
  price_usd: string
  total_value_locked_usd: string
  is_private_pool: boolean
  chain?: {
    logo?: string | null
  } | null
  volumes: {
    volume_usd: string
  }[]
  now: {
    timestamp: number
    close: string
  }[]
  day: {
    timestamp: number
    close: string
  }[]
  month: {
    timestamp: number
    close: string
  }[]
  underlying_assets: UnderlyingAssets[]
}

export enum poolSorting {
  DESC = 'desc',
  ASC = 'asc'
}

interface StakePoolTableProps {
  pools?: IPoolsInfosProps[]
}

const StakePoolTable = ({ pools }: StakePoolTableProps) => {
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [pool, setPool] = React.useState({
    logo: '',
    name: ''
  })
  const [viewPool, setViewPool] = React.useState<{
    voting_power: string
    withdraw_delay: string
    earned: string
    APR: string
  }>({
    voting_power: '',
    withdraw_delay: '',
    earned: '',
    APR: ''
  })

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 4
      } else if (newPrev > 4) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  return (
    <S.CommunityPoolsTable>
      <S.THead>
        <S.TRHead>
          <S.TH>{/* <S.ColumnTitle>Pool Name</S.ColumnTitle> */}</S.TH>

          <S.TH isView={inViewCollum === 1}>
            <S.ColumnTitle align="right">Voting Power</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 2}>Withdraw Delay</S.TH>
          <S.TH isView={inViewCollum === 3}>
            <S.ColumnTitle align="right">Earned</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 4}>
            <S.ColumnTitle align="right">APR</S.ColumnTitle>
          </S.TH>

          <S.TH>
            <S.TableViewButtonContainer>
              <S.TableViewButton onClick={() => handleCurrentInView(-1)}>
                <Image src={arrowIcon} width={7} height={12} />
              </S.TableViewButton>

              <S.TableViewButton onClick={() => handleCurrentInView(1)}>
                <Image src={arrowIcon} width={7} height={12} />
              </S.TableViewButton>
            </S.TableViewButtonContainer>
          </S.TH>
        </S.TRHead>
      </S.THead>

      <S.TBodyWithHeight tableRowsNumber={pools?.length ?? 8} lineHeight={8.6}>
        {pools ? (
          pools.map(pool => {
            return (
              <S.TR key={pool.address}>
                <Link href={`/pool/${pool.id}`} passHref>
                  <S.TRLink>
                    <S.TD>
                      <S.ValueContainer>
                        <S.Imagecontainer>
                          <S.ImageWrapper>
                            {pool.logo ? (
                              <Image src={pool.logo} layout="fill" />
                            ) : (
                              <Blockies seed={pool.name} size={8} scale={3} />
                            )}
                          </S.ImageWrapper>

                          <S.ChainLogoWrapper>
                            <Image
                              src={pool.chain?.logo || comingSoonIcon}
                              layout="fill"
                            />
                          </S.ChainLogoWrapper>
                        </S.Imagecontainer>

                        <S.ValueWrapper>
                          <S.TextValue id="privatePool">
                            {pool.is_private_pool && (
                              <Tippy
                                content={[
                                  <S.PrivatePoolTooltip key="PrivatePool">
                                    Private Pool
                                  </S.PrivatePoolTooltip>
                                ]}
                              >
                                <img
                                  src="/assets/utilities/lock.svg"
                                  width={14}
                                  height={13}
                                />
                              </Tippy>
                            )}
                            {pool.name}
                          </S.TextValue>

                          <S.SecondaryTextValue>
                            {pool.symbol}
                          </S.SecondaryTextValue>
                        </S.ValueWrapper>
                      </S.ValueContainer>
                    </S.TD>
                    <S.TD isView={inViewCollum === 1}>
                      <S.Value>${Big(pool?.price_usd || 0).toFixed(2)}</S.Value>
                    </S.TD>
                    <S.TD isView={inViewCollum === 2}>
                      <S.Value>
                        ${Big(pool?.total_value_locked_usd || 0).toFixed(2)}
                      </S.Value>
                    </S.TD>
                    <S.TD isView={inViewCollum === 3}>
                      <S.Container>
                        <S.CoinImageContainer>
                          {pool.underlying_assets
                            .slice(0, 8)
                            .map((coin, index) => {
                              return (
                                <S.CoinImageWrapper
                                  key={
                                    coin?.token?.wraps?.logo ??
                                    coin?.token?.logo
                                  }
                                  position={index}
                                >
                                  <Image
                                    src={
                                      coin?.token?.logo ??
                                      coin?.token?.wraps?.logo ??
                                      notFoundIcon
                                    }
                                    layout="fill"
                                  />
                                </S.CoinImageWrapper>
                              )
                            })}
                        </S.CoinImageContainer>
                        <S.MoreTokenText>
                          {pool.underlying_assets.length > 7 &&
                            '+' + (pool.underlying_assets.length - 7)}
                        </S.MoreTokenText>
                      </S.Container>
                    </S.TD>
                    <S.TD isView={inViewCollum === 4}>
                      <S.Value>
                        ${Big(pool.volumes[0]?.volume_usd || 0).toFixed(2)}
                      </S.Value>
                    </S.TD>
                    <S.TD isView={inViewCollum === 5}>
                      <S.Value
                        value={
                          pool.month[0]?.close
                            ? Number(
                                calcChange(
                                  Number(pool.now[0]?.close || 0),
                                  Number(pool.month[0]?.close)
                                )
                              )
                            : 0
                        }
                      >
                        {pool.month[0]?.close
                          ? calcChange(
                              Number(pool.now[0]?.close || 0),
                              Number(pool.month[0]?.close)
                            )
                          : 0}
                        %
                      </S.Value>
                    </S.TD>
                    <S.TD isView={inViewCollum === 6}>
                      <S.Value
                        value={
                          pool.day[0]?.close
                            ? Number(
                                calcChange(
                                  Number(pool.now[0]?.close || 0),
                                  Number(pool.day[0]?.close)
                                )
                              )
                            : 0
                        }
                      >
                        {pool.day[0]?.close
                          ? calcChange(
                              Number(pool.now[0]?.close || 0),
                              Number(pool.day[0]?.close)
                            )
                          : 0}
                        %
                      </S.Value>
                    </S.TD>
                  </S.TRLink>
                </Link>
              </S.TR>
            )
          })
        ) : (
          <S.LoadingContainer>
            <Loading marginTop={0} />
          </S.LoadingContainer>
        )}
      </S.TBodyWithHeight>
    </S.CommunityPoolsTable>
  )
}

export default StakePoolTable
