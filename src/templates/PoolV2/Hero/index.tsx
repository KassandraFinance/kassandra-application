import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import substr from '@/utils/substr'

import { usePoolData } from '@/hooks/query/usePoolData'
import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { useRouter } from 'next/router'

import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'
import ShareImageModal from './ShareImageModal'
import Loading from '@/components/Loading'
import SharedImage from './SharedImage'
import Operation from './Operation'
import MyAsset from './MyAsset'

import * as S from './styles'

const chainStyle: Record<string, { network: string; color: string }> = {
  '43114': {
    network: 'Avalanche',
    color: '#E84142'
  },
  '137': {
    network: 'Polygon',
    color: '#7B3FE4'
  },
  '42161': {
    network: 'Arbitrum',
    color: '#2A638D'
  }
}

interface IHeroProps {
  handleClickStakeButton: (scrollToValue: number) => void
}

const Hero = ({ handleClickStakeButton }: IHeroProps) => {
  const [openModal, setOpenModal] = React.useState(false)

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const { trackEventFunction } = useMatomoEcommerce()

  return (
    <S.Hero>
      {pool ? (
        <>
          <ShareImageModal
            poolId={pool.id}
            setOpenModal={setOpenModal}
            openModal={openModal}
            productName={pool.symbol}
          >
            <SharedImage
              poolId={pool.id}
              crpPoolAddress={pool.id}
              totalValueLocked={BNtoDecimal(
                Big(pool.total_value_locked_usd),
                2,
                2,
                2
              )}
              socialIndex={pool.symbol}
              productName={pool.name}
              poolLogo={pool.logo || ''}
              tokens={pool.underlying_assets}
            />
          </ShareImageModal>
          <S.TitleConteiner>
            <S.LogoAndPoolName>
              <TokenWithNetworkImage
                tokenImage={{
                  url: pool?.logo || '',
                  height: 56,
                  width: 56,
                  withoutBorder: true
                }}
                networkImage={{
                  url: pool?.chain?.logo || '',
                  height: 16,
                  width: 16
                }}
                blockies={{
                  size: 8,
                  scale: 9,
                  seedName: pool?.name || ''
                }}
              />
              <S.PoolName>{pool?.name}</S.PoolName>
            </S.LogoAndPoolName>
            <S.SharedButton
              onClick={() => {
                setOpenModal(true)
                trackEventFunction(
                  'click',
                  `social-share-${pool?.name}`,
                  'pool'
                )
              }}
              className="circle"
            >
              <Image src="/assets/icons/share.svg" width={36} height={36} />
            </S.SharedButton>
          </S.TitleConteiner>
          <S.SubTitleConteiner>
            <S.Symbol>${pool?.symbol}</S.Symbol>
            <S.Chain chainColor={chainStyle[pool?.chain_id ?? 137].color}>
              Live on {chainStyle[pool?.chain_id ?? 137].network}
            </S.Chain>
            <S.SymbolAndMade>
              {pool?.manager?.id && (
                <Link
                  href={`/profile/${pool?.manager.id}?tab=managed-pools`}
                  passHref
                >
                  <a>
                    managed by{' '}
                    {pool.manager.nickname
                      ? pool.manager.nickname
                      : substr(pool?.manager?.id)}
                  </a>
                </Link>
              )}
            </S.SymbolAndMade>
          </S.SubTitleConteiner>
          <S.Summary>{pool.short_summary}</S.Summary>
          <MyAsset
            chainId={pool.chain_id}
            poolAddress={pool.address}
            price={pool.price_usd}
            decimals={pool.decimals}
            pid={pool.pool_id ?? undefined}
          />
          <Operation
            handleClickStakeButton={handleClickStakeButton}
            hasStake={!!pool.pool_id}
          />
        </>
      ) : (
        <Loading marginTop={0} />
      )}
    </S.Hero>
  )
}

export default Hero
