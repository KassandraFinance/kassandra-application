import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Big from 'big.js'
import Blockies from 'react-blockies'

import { calcChange } from '@/utils/numerals'

import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import notFoundIcon from '../../../../public/assets/icons/coming-soon.svg'
import arrowLeftBoldIcon from '../../../../public/assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '../../../../public/assets/utilities/arrow-right-bold.svg'

import eyeShowIcon from '../../../../public/assets/utilities/eye-show.svg'
import comingSoonIcon from '../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer as ValueContainerMobile,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'

interface ICommunityPoolsTableProps {
  pools: {
    id: string,
    address: string,
    chainId: number,
    logo: string | null,
    name: string,
    price_usd: string,
    symbol: string,
    total_value_locked_usd: string,
    chain: {
      logo: string
    },
    now: {
      close: string,
      timestamp: number
    }[],
    day: {
      close: string,
      timestamp: number
    }[],
    month: {
      close: string,
      timestamp: number
    }[],
    volumes: {
      volume_usd: string
    }[],
    weight_goals: {
      weights: {
        asset: {
          token: {
            logo: string
          }
        }
      }[]
    }[]
  }[];
}

const CommunityPoolsTable = ({ pools }: ICommunityPoolsTableProps) => {
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [pool, setPool] = React.useState({
    logo: '',
    name: ''
  })
  const [viewPool, setViewPool] = React.useState<{
    price: string,
    tvl: string,
    assets: {
      asset: {
        token: {
          logo: string | null
        }
      }
    }[],
    volume: string,
    monthly: string,
    '24h': string
  }>({
    price: '',
    tvl: '',
    assets: [
      {
        asset: {
          token: {
            logo: ''
          }
        }
      }
    ],
    volume: '',
    monthly: '',
    '24h': ''
  })

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 6
      } else if (newPrev > 6) {
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
    assets: {
      asset: {
        token: {
          logo: string | null
        }
      }
    }[],
    volume: string,
    monthly: string,
    day: string
  ) {
    setPool({
      logo: logo || '',
      name: token
    })
    setViewPool({
      price: price,
      tvl: tvl,
      assets: assets,
      volume: volume,
      monthly: monthly,
      ['24h']: day
    })
    setIsOpen(true)
  }

  return (
    <S.CommunityPoolsTable>
      <S.THead>
        <S.TRHead>
          <S.TH>
            <S.ColumnTitle>Pool Name</S.ColumnTitle>
          </S.TH>

          <S.TH isView={inViewCollum === 1}>
            <S.ColumnTitle align="right">Price</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 2}>
            <S.ColumnTitle align="right">TVL</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 3}>
            <S.ColumnTitle align="center">Asset</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 4}>
            <S.ColumnTitle align="right">Volume (24h)</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 5}>
            <S.ColumnTitle align="right">Monthly</S.ColumnTitle>
          </S.TH>
          <S.TH isView={inViewCollum === 6}>
            <S.ColumnTitle align="right">24h</S.ColumnTitle>
          </S.TH>

          <S.TH>
            <S.TableViewButtonContainer>
              <S.TableViewButton onClick={() => handleCurrentInView(-1)}>
                <Image src={arrowLeftBoldIcon} width={16} height={16} />
              </S.TableViewButton>

              <S.TableViewButton onClick={() => handleCurrentInView(1)}>
                <Image src={arrowRightBoldIcon} width={16} height={16} />
              </S.TableViewButton>
            </S.TableViewButtonContainer>
          </S.TH>
        </S.TRHead>
      </S.THead>

      <S.TBody>
        {pools?.map(pool => {
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
                        <S.TextValue>{pool.name}</S.TextValue>

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
                        {pool.weight_goals[0].weights.map((coin, index) => {
                          return (
                            <S.CoinImageWrapper
                              key={coin.asset?.token?.logo}
                              position={index}
                            >
                              <Image
                                src={coin.asset?.token?.logo || notFoundIcon}
                                layout="fill"
                              />
                            </S.CoinImageWrapper>
                          )
                        })}
                      </S.CoinImageContainer>
                    </S.Container>
                  </S.TD>
                  <S.TD isView={inViewCollum === 4}>
                    <S.Value>
                      ${Big(pool.volumes[0]?.volume_usd || 0).toFixed(2)}
                    </S.Value>
                  </S.TD>
                  <S.TD isView={inViewCollum === 5}>
                    <S.Value
                      value={Number(
                        calcChange(
                          Number(pool.now[0]?.close || 0),
                          Number(pool.month[0]?.close || 0)
                        )
                      )}
                    >
                      {calcChange(
                        Number(pool.now[0]?.close || 0),
                        Number(pool.month[0]?.close || 0)
                      )}
                      %
                    </S.Value>
                  </S.TD>
                  <S.TD isView={inViewCollum === 6}>
                    <S.Value
                      value={Number(
                        calcChange(
                          Number(pool.now[0]?.close || 0),
                          Number(pool.month[0]?.close || 0)
                        )
                      )}
                    >
                      {calcChange(
                        Number(pool.now[0]?.close || 0),
                        Number(pool.month[0]?.close || 0)
                      )}
                      %
                    </S.Value>
                  </S.TD>

                  <S.TD
                    onClick={event => {
                      event.preventDefault()
                      handleViewMobile(
                        pool.name,
                        pool.logo,
                        pool.price_usd,
                        pool.total_value_locked_usd,
                        pool.weight_goals[0].weights,
                        pool.volumes[0].volume_usd,
                        calcChange(
                          Number(pool.now[0].close),
                          Number(pool.month[0].close)
                        ),
                        calcChange(
                          Number(pool.now[0].close),
                          Number(pool.month[0].close)
                        )
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
        })}
      </S.TBody>

      <ModalViewCoin
        isOpen={isOpen}
        title={pool}
        isBlockies
        onClick={() => setIsOpen(false)}
      >
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
          <TableLineTitle>Assets</TableLineTitle>
          <ValueContainerMobile>
            <S.CoinModalContainer>
              <S.CoinImageContainer>
                {viewPool.assets.map((coin, index) => {
                  return (
                    <S.CoinImageWrapper
                      key={coin.asset?.token?.logo || index}
                      position={index}
                    >
                      <Image
                        src={coin.asset?.token?.logo || notFoundIcon}
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
          <TableLineTitle>Volume (24h)</TableLineTitle>
          <ValueContainerMobile>
            <V>{Big(viewPool?.volume || 0).toFixed(2)}</V>
          </ValueContainerMobile>
        </TableLine>
        <TableLine>
          <TableLineTitle>Monthly</TableLineTitle>
          <ValueContainerMobile>
            <V>{viewPool.monthly}%</V>
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

export default CommunityPoolsTable
