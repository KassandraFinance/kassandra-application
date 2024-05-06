import Button from '@/components/Button'
import * as S from './styles'
import { useState } from 'react'
import Image from 'next/image'
import Label from '@/components/Labels/Label'
import GradientLabel from '@/components/Labels/GradientLabel'
import arrowDownThin from '../../../../public/assets/utilities/arrow-down-thin.svg'
import { useSetChain } from '@web3-onboard/react'

const poolMockData = [
  {
    logoUrl: '/assets/logos/kacy-stake.svg',
    chainLogoUrl: '/assets/logos/avalanche.svg',
    name: '$KACY',
    votingPower: '2/',
    withdrawDelay: '15',
    earned: 0,
    apr: 132.94,
    totalStaked: '702.5 LP-AVAX',
    stakedInUsd: '43.321 USD',
    startDate: '13 Nov, 2023',
    rewardDate: '11 Feb, 2024'
  },
  {
    logoUrl: '/assets/logos/kacy-stake.svg',
    chainLogoUrl: '/assets/logos/avalanche.svg',
    name: '$NOTKACY',
    votingPower: '2/',
    withdrawDelay: '23',
    earned: 12,
    apr: 72.94,
    totalStaked: '329.13 LP-AVAX',
    stakedInUsd: '11.891 USD',
    startDate: '11 Dec, 2023',
    rewardDate: '29 Mar, 2024'
  }
]

const rightArrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
      stroke="#FCFCFC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 10.8002L10.8 8.0002L8 5.2002"
      stroke="#FCFCFC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.2002 8H10.8002"
      stroke="#FCFCFC"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export function StakeListView() {
  const [isExpanded, setIsExpanded] = useState(false)

  const [{ settingChain }, setChain] = useSetChain()

  function handleExpandToggle() {
    setIsExpanded(!isExpanded)
  }
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.TitleContent>
          <Image
            src="/assets/icons/pie.svg"
            width={20}
            height={20}
            alt="an icon of a chart pie"
          />{' '}
          Power Voting
        </S.TitleContent>
        {poolMockData.map(mockData => (
          <S.Content>
            <S.TopContent>
              <S.PoolNameAndImage>
                <S.Imagecontainer>
                  <S.ImageWrapper>
                    <Image src={mockData.logoUrl} layout="fill" />
                  </S.ImageWrapper>

                  <S.ChainLogoWrapper>
                    <Image src={mockData.chainLogoUrl} layout="fill" />
                  </S.ChainLogoWrapper>
                </S.Imagecontainer>
                <S.PoolText>
                  <S.PoolTitle>{mockData.name}</S.PoolTitle>
                  <S.LabelsContainer>
                    <GradientLabel
                      img={{
                        url: '/assets/iconGradient/lightning.svg',
                        width: 12,
                        height: 12
                      }}
                      text="STAKE & EARN"
                    />
                    <Label text="0,25%" />
                  </S.LabelsContainer>
                </S.PoolText>
              </S.PoolNameAndImage>
              <S.RegularContent>
                <S.RegularColumn>
                  <h3>Voting Power</h3>
                  <p>
                    {mockData.votingPower}
                    <span>{mockData.name}</span>
                  </p>
                </S.RegularColumn>
                <S.RegularColumn>
                  <h3>Withdraw Delay</h3>
                  <p>
                    {mockData.withdrawDelay} <span>days</span>
                  </p>
                </S.RegularColumn>
                <S.RegularColumn>
                  <h3>Earned</h3>
                  <p>{mockData.earned}</p>
                </S.RegularColumn>
                <S.BoldColumn>
                  <h3>APR</h3>
                  <p>{mockData.apr}%</p>
                </S.BoldColumn>
              </S.RegularContent>
              <Button
                rightIcon
                text="Connect to Avalanche"
                background="secondary"
                size="large"
                icon={rightArrowIcon}
              />
              <S.IconWrapper
                isExpanded={isExpanded}
                onClick={handleExpandToggle}
              >
                <Image src={arrowDownThin} width={24} height={14} />
              </S.IconWrapper>
            </S.TopContent>

            {isExpanded && (
              <S.ExpandedWrapper>
                <S.ExpandedContent>
                  <S.ExpandedTextContent>
                    <S.BlocksWrapper>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Total Staked:</span> {mockData.totalStaked}
                        </p>

                        <span>= {mockData.stakedInUsd} USD</span>
                      </S.ExpandedContentBlock>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Pool Reward:</span> 0/Day
                        </p>

                        <span>0.00 USD</span>
                      </S.ExpandedContentBlock>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Start Date:</span> {mockData.startDate}
                        </p>
                        <p>
                          <span>Reward Update:</span> {mockData.rewardDate}
                        </p>
                      </S.ExpandedContentBlock>
                    </S.BlocksWrapper>
                    <S.ExpandedFooter>
                      <p>
                        Buy {mockData.name}{' '}
                        <Image
                          src={mockData.logoUrl}
                          layout="fixed"
                          width={16}
                          height={16}
                        />
                      </p>
                      <a>See Contract {rightArrowIcon}</a>
                    </S.ExpandedFooter>
                  </S.ExpandedTextContent>
                  <S.ExpandedContentButtons>
                    <Button size="large" text="Claim" background="secondary" />
                    <Button
                      size="large"
                      text="Request Withdraw"
                      background="secondary"
                    />
                  </S.ExpandedContentButtons>
                </S.ExpandedContent>
              </S.ExpandedWrapper>
            )}
          </S.Content>
        ))}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}
