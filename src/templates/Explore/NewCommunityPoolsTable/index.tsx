import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Big from 'big.js'
import Blockies from 'react-blockies'
import Tippy from '@tippyjs/react'

import { calcChange } from '@/utils/numerals'

import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import notFoundIcon from '@assets/icons/coming-soon.svg'
import arrowIcon from '@assets/utilities/arrow-left.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'
import comingSoonIcon from '@assets/icons/coming-soon.svg'

import * as S from './styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer as ValueContainerMobile,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'
import { Pool_OrderBy } from '@/gql/generated/kassandraApi'
import SkeletonLoading from '@/components/SkeletonLoading'

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
  unique_investors: number
  underlying_assets: UnderlyingAssets[]
}

export enum communityPoolSorting {
  DESC = 'desc',
  ASC = 'asc'
}

interface ICommunityPoolsTableProps {
  pools?: IPoolsInfosProps[]
  communityPoolSorted: communityPoolSorting
  setCommunityPoolSorted: React.Dispatch<
    React.SetStateAction<communityPoolSorting>
  >
  orderedBy: Pool_OrderBy
  setOrderedBy: React.Dispatch<React.SetStateAction<Pool_OrderBy>>
}

const NewCommunityPoolsTable = ({
  pools,
  communityPoolSorted,
  setCommunityPoolSorted,
  orderedBy,
  setOrderedBy
}: ICommunityPoolsTableProps) => {
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [pool, setPool] = React.useState({
    logo: '',
    name: ''
  })
  const [viewPool, setViewPool] = React.useState<{
    price: string
    tvl: string
    underlying_assets: UnderlyingAssets[]
    volume: string
    monthly: string
    '24h': string
  }>({
    price: '',
    tvl: '',
    underlying_assets: [],
    volume: '',
    monthly: '',
    '24h': ''
  })

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

  function handleViewMobile(
    token: string,
    logo: string | null,
    price: string,
    tvl: string,
    underlying_assets: UnderlyingAssets[],
    volume: string,
    monthly: string,
    day: string
  ) {
    setPool({
      logo: logo || '',
      name: token
    })
    setViewPool({
      price,
      tvl,
      underlying_assets,
      volume,
      monthly,
      ['24h']: day
    })
    setIsOpen(true)
  }

  function handleClickChangeTvlSorting(currentValue: string) {
    switch (currentValue) {
      case communityPoolSorting.DESC:
        setCommunityPoolSorted(communityPoolSorting.ASC)
        setOrderedBy('total_value_locked_usd')
        break

      case communityPoolSorting.ASC:
        setCommunityPoolSorted(communityPoolSorting.DESC)
        setOrderedBy('total_value_locked_usd')
        break

      default:
        break
    }
  }

  function handleClickChangeInvestorSorting(currentValue: string) {
    switch (currentValue) {
      case communityPoolSorting.DESC:
        setCommunityPoolSorted(communityPoolSorting.ASC)
        setOrderedBy('unique_investors')
        break

      case communityPoolSorting.ASC:
        setCommunityPoolSorted(communityPoolSorting.DESC)
        setOrderedBy('unique_investors')
        break

      default:
        break
    }
  }

  return (
    <S.CommunityPoolsTable>
      <S.THead>
        <S.TRHead>
          <S.TH>
            <S.ColumnTitle>Pool Name</S.ColumnTitle>
          </S.TH>

          <S.TH isView={inViewCollum === 1}>
            <S.ColumnTitle align="right">Composition</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 2}>
            <S.ColumnTitle align="right">Price</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 3}>
            <S.THButtonSorting
              onClick={() =>
                handleClickChangeInvestorSorting(communityPoolSorted)
              }
              isRotateArrow={
                orderedBy === 'unique_investors' &&
                communityPoolSorted === communityPoolSorting.ASC
              }
              orderedBy={orderedBy === 'unique_investors'}
            >
              Investors{' '}
              <img
                src="/assets/utilities/arrow-select-down.svg"
                alt=""
                width={10}
                height={10}
              />
            </S.THButtonSorting>
          </S.TH>
          <S.TH isView={inViewCollum === 4}>
            <S.THButtonSorting
              onClick={() => handleClickChangeTvlSorting(communityPoolSorted)}
              isRotateArrow={
                orderedBy === 'total_value_locked_usd' &&
                communityPoolSorted === communityPoolSorting.ASC
              }
              orderedBy={orderedBy === 'total_value_locked_usd'}
            >
              TVL{' '}
              <img
                src="/assets/utilities/arrow-select-down.svg"
                alt=""
                width={10}
                height={10}
              />
            </S.THButtonSorting>
          </S.TH>

          <S.TH isView={inViewCollum === 5}>
            <S.ColumnTitle align="right">24h</S.ColumnTitle>
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
        {pools
          ? pools.map(pool => {
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
                                <Blockies
                                  seed={pool.name}
                                  size={10.95}
                                  scale={3}
                                />
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
                        <S.Container>
                          <S.CoinImageContainer>
                            {pool.underlying_assets
                              .slice(0, 3)
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
                            {pool.underlying_assets.length > 3 &&
                              '+' + (pool.underlying_assets.length - 3)}
                          </S.MoreTokenText>
                        </S.Container>
                      </S.TD>
                      <S.TD isView={inViewCollum === 2}>
                        <S.Value>
                          ${Big(pool?.price_usd || 0).toFixed(2)}
                        </S.Value>
                      </S.TD>
                      <S.TD isView={inViewCollum === 3}>
                        <S.Value>{pool.unique_investors}</S.Value>
                      </S.TD>
                      <S.TD isView={inViewCollum === 4}>
                        <S.Value>
                          ${Big(pool?.total_value_locked_usd || 0).toFixed(2)}
                        </S.Value>
                      </S.TD>

                      <S.TD isView={inViewCollum === 5}>
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

                      <S.TD
                        onClick={event => {
                          event.preventDefault()
                          handleViewMobile(
                            pool.name,
                            pool?.logo || '',
                            pool.price_usd,
                            pool.total_value_locked_usd,
                            pool.underlying_assets,
                            pool.volumes[0]?.volume_usd,
                            pool.month[0]?.close
                              ? calcChange(
                                  Number(pool.now[0].close || 0),
                                  Number(pool.month[0].close)
                                )
                              : '0',
                            pool.day[0]?.close
                              ? calcChange(
                                  Number(pool.now[0].close || 0),
                                  Number(pool.day[0].close)
                                )
                              : '0'
                          )
                        }}
                      >
                        <S.ViewButton type="button">
                          <Image src={eyeShowIcon} />
                        </S.ViewButton>
                      </S.TD>
                    </S.TRLink>
                  </Link>
                </S.TR>
              )
            })
          : Array.from({ length: 8 }, (_, index) => (
              <S.TR id="skeleton">
                <S.SkeletonTR>
                  <S.TD>
                    <S.ValueContainer>
                      <SkeletonLoading
                        borderRadios={5000}
                        width={4}
                        height={4}
                      />

                      <S.ValueWrapper>
                        <S.TextValue id="privatePool">
                          <SkeletonLoading />
                        </S.TextValue>

                        <S.SecondaryTextValue>
                          <SkeletonLoading width={4} />
                        </S.SecondaryTextValue>
                      </S.ValueWrapper>
                    </S.ValueContainer>
                  </S.TD>
                  <S.TD isView={inViewCollum === 1}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>
                  <S.TD isView={inViewCollum === 2}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>
                  <S.TD isView={inViewCollum === 3}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>
                  <S.TD isView={inViewCollum === 4}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>

                  <S.TD isView={inViewCollum === 5}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>

                  <S.TD isView={inViewCollum === 6}>
                    <S.SkeletonContainer>
                      <SkeletonLoading />
                    </S.SkeletonContainer>
                  </S.TD>
                </S.SkeletonTR>
              </S.TR>
            ))}
      </S.TBodyWithHeight>

      <ModalViewCoin
        isOpen={isOpen}
        title={pool}
        isBlockies
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Composition</TableLineTitle>
          <ValueContainerMobile>
            <S.CoinModalContainer>
              <S.CoinImageContainer>
                {viewPool.underlying_assets.map((coin, index) => {
                  return (
                    <S.CoinImageWrapper
                      key={
                        coin?.token?.wraps?.logo ?? coin?.token?.logo ?? index
                      }
                      position={index}
                    >
                      <Image
                        src={
                          coin?.token?.logo ??
                          coin?.token?.wraps?.logo ??
                          notFoundIcon
                        }
                        width={18}
                        height={18}
                      />
                    </S.CoinImageWrapper>
                  )
                })}
              </S.CoinImageContainer>
            </S.CoinModalContainer>
          </ValueContainerMobile>
        </TableLine>
        <TableLine>
          <TableLineTitle>Price</TableLineTitle>

          <ValueContainerMobile>
            <V>{Big(viewPool?.price || 0).toFixed(2)}</V>
          </ValueContainerMobile>
        </TableLine>
        <TableLine>
          <TableLineTitle>TVL</TableLineTitle>
          <ValueContainerMobile>
            <V>{Big(viewPool?.tvl || 0).toFixed(2)}</V>
          </ValueContainerMobile>
        </TableLine>

        <TableLine>
          <TableLineTitle>Investors</TableLineTitle>
          <ValueContainerMobile>
            <V>Investors Data Here</V>
          </ValueContainerMobile>
        </TableLine>
        <TableLine>
          <TableLineTitle>24h</TableLineTitle>
          <ValueContainerMobile>
            <V>{viewPool['24h']}%</V>
          </ValueContainerMobile>
        </TableLine>
      </ModalViewCoin>
    </S.CommunityPoolsTable>
  )
}

export default NewCommunityPoolsTable
