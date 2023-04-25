import Image from 'next/image'
import React from 'react'
import Blockies from 'react-blockies'

import { useAppSelector } from '../../../store/hooks'
import { underlyingAssetsInfo } from '@/store/reducers/pool'

// import substr from '../../../utils/substr'
import ChartProducts from './ChartProducts'
import {
  Background,
  IconBar,
  IconBirdKassandra,
  IconUnion,
  IconUnionKassandra
} from './Icons'

import * as S from './styles'

interface ISharedImageProps {
  crpPoolAddress: string;
  totalValueLocked: string;
  socialIndex: string;
  productName: string;
  poolLogo: string;
  tokens: underlyingAssetsInfo[];
}

const SharedImage = ({
  crpPoolAddress,
  totalValueLocked,
  socialIndex,
  productName,
  poolLogo,
  tokens
}: ISharedImageProps) => {
  const { performanceValues } = useAppSelector(state => state)

  return (
    <S.SharedImage className="bg-image-color">
      <Background />
      <S.Header>
        <S.Title>
          {poolLogo ? (
            <S.PoolLogoWrapper>
              <Image src={poolLogo} width={40} height={40} />
            </S.PoolLogoWrapper>
          ) : (
            <Blockies
              seed={productName}
              className="poolIcon"
              size={8}
              scale={5}
            />
          )}
          <h1>{productName}</h1>
          <S.Detail>${socialIndex}</S.Detail>
          {/* <S.HorizontalLine /> */}
        </S.Title>
        {/* <S.UserInfo>
          <h2>Manager</h2>
          <S.Profile>
            <S.ProfileImage />
            <S.ProfileAddress>
              {userWalletAddress
                ? substr(userWalletAddress)
                : substr('0x000000000')}
            </S.ProfileAddress>
          </S.Profile>
        </S.UserInfo> */}
      </S.Header>

      <S.Main>
        {performanceValues.allPerformancePeriod && (
          <S.InfoContainer>
            <S.Info>
              <S.InfoTitle>
                <IconBar />
                <span>{performanceValues.title}</span>
              </S.InfoTitle>
              {performanceValues.allPerformancePeriod[
                performanceValues.title
              ].startsWith('-') ? (
                <S.InfoValue color="red">
                  {
                    performanceValues.allPerformancePeriod[
                    performanceValues.title
                    ]
                  }
                  %
                </S.InfoValue>
              ) : (
                <S.InfoValue color="green">
                  +
                  {
                    performanceValues.allPerformancePeriod[
                    performanceValues.title
                    ]
                  }
                  %
                </S.InfoValue>
              )}
            </S.Info>
            <S.Info>
              <S.InfoTitle>
                <IconBar />
                <span>Total Value Locked</span>
              </S.InfoTitle>
              <S.InfoValue color="white">${totalValueLocked}</S.InfoValue>
            </S.Info>
            <S.Assets>
              <S.InfoTitle>
                <IconUnion />
                <span>Assets</span>
              </S.InfoTitle>
              <S.AssetsContainer>
                {tokens?.map((item, index) => (
                  <Image
                    key={index}
                    src={item.token?.logo ?? item.token.wraps.logo ?? ''}
                    width={25}
                    height={25}
                  />
                ))}
              </S.AssetsContainer>
            </S.Assets>
          </S.InfoContainer>
        )}
        <S.ChartContainer>
          <ChartProducts crpPoolAddress={crpPoolAddress} height={296} />
        </S.ChartContainer>
      </S.Main>

      <S.Footer>
        <S.SocialMedia>
          <IconBirdKassandra />
          dao_kassandra
        </S.SocialMedia>
        <S.SocialMedia>
          <IconUnionKassandra />
          kassandra.finance
        </S.SocialMedia>
      </S.Footer>
    </S.SharedImage>
  )
}

export default SharedImage
