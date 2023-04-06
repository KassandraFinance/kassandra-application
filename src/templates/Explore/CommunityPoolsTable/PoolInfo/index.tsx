import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import Blockies from 'react-blockies'

import { calcChange } from '@/utils/numerals'

import notFoundIcon from '../../../../../public/assets/icons/coming-soon.svg'
import eyeShowIcon from '../../../../../public/assets/utilities/eye-show.svg'
import comingSoonIcon from '../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'
import { ValueContainer } from '@ui/Modals/ModalViewCoin/styles'
import {
  TR,
  TD,
  Value,
  ViewButton,
  ChainLogoWrapper,
  CoinImageContainer,
  CoinImageWrapper,
  Container,
  ImageWrapper,
  Imagecontainer,
  SecondaryTextValue,
  ValueWrapper,
  TextValue
} from '@/templates/Explore/CommunityPoolsTable/styles'

interface IPoolInfoProps {
  handleViewMobile: any;
  inViewCollum: number;
  pool: {
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
  };
}

const PoolInfo = ({ inViewCollum, pool, handleViewMobile }: IPoolInfoProps) => {
  return (
    <S.PoolInfo>
      <TR key={pool.address}>
        <TD>
          <ValueContainer id="ImagePool">
            <Imagecontainer>
              <ImageWrapper>
                {pool.logo ? (
                  <Image src={pool.logo} layout="fill" />
                ) : (
                  <Blockies seed={pool.name} size={8} scale={3} />
                )}
              </ImageWrapper>

              <ChainLogoWrapper>
                <Image src={pool.chain?.logo || comingSoonIcon} layout="fill" />
              </ChainLogoWrapper>
            </Imagecontainer>

            <ValueWrapper>
              <TextValue>{pool.name}</TextValue>

              <SecondaryTextValue>{pool.symbol}</SecondaryTextValue>
            </ValueWrapper>
          </ValueContainer>
        </TD>
        <TD isView={inViewCollum === 1}>
          <Value>${Big(pool?.price_usd || 0).toFixed(2)}</Value>
        </TD>
        <TD isView={inViewCollum === 2}>
          <Value>${Big(pool?.total_value_locked_usd || 0).toFixed(2)}</Value>
        </TD>
        <TD isView={inViewCollum === 3}>
          <Container>
            <CoinImageContainer>
              {pool.weight_goals[0].weights.map((coin, index) => {
                return (
                  <CoinImageWrapper
                    key={coin.asset?.token?.logo}
                    position={index}
                  >
                    <Image
                      src={coin.asset?.token?.logo || notFoundIcon}
                      layout="fill"
                    />
                  </CoinImageWrapper>
                )
              })}
            </CoinImageContainer>
          </Container>
        </TD>
        <TD isView={inViewCollum === 4}>
          <Value>${Big(pool.volumes[0]?.volume_usd || 0).toFixed(2)}</Value>
        </TD>
        <TD isView={inViewCollum === 5}>
          <Value
            value={Number(
              pool.month[0]?.close
                ? calcChange(
                    Number(pool.now[0]?.close || 0),
                    Number(pool.month[0]?.close || 0)
                  )
                : 0
            )}
          >
            {pool.month[0]?.close
              ? calcChange(
                  Number(pool.now[0]?.close || 0),
                  Number(pool.month[0]?.close || 0)
                )
              : '0'}
            %
          </Value>
        </TD>
        <TD isView={inViewCollum === 6}>
          <Value
            value={Number(
              pool.day[0]?.close
                ? calcChange(
                    Number(pool.now[0]?.close || 0),
                    Number(pool.day[0]?.close || 0)
                  )
                : 0
            )}
          >
            {pool.day[0]?.close
              ? calcChange(
                  Number(pool.now[0]?.close || 0),
                  Number(pool.day[0]?.close || 0)
                )
              : '0'}
            %
          </Value>
        </TD>

        <TD>
          <ViewButton
            type="button"
            onClick={() =>
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
            }
            id="eyeIcon"
          >
            <Image src={eyeShowIcon} />
          </ViewButton>
        </TD>
      </TR>
    </S.PoolInfo>
  )
}

export default PoolInfo
