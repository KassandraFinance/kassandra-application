import Button from '@/components/Button'
import * as S from './styles'
import { useState } from 'react'
import Image from 'next/image'
import Label from '@/components/Labels/Label'
import GradientLabel from '@/components/Labels/GradientLabel'
import arrowDownThin from '../../../../public/assets/utilities/arrow-down-thin.svg'
import { useSetChain } from '@web3-onboard/react'
import Link from 'next/link'

type PoolData = {
  logoUrl: string
  chainLogoUrl: string
  name: string
  votingPower: string
  withdrawDelay: string
  earned: number
  apr: number
  totalStaked: string
  stakedInUsd: string
  startDate: string
  rewardDate: string
  poolReward?: number
  poolRewardValue?: number
  contract: string
}

interface StaleListViewSectionProps {
  sectionName: string
  data: PoolData[]
}

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

export function StakeListViewSection({
  sectionName,
  data
}: StaleListViewSectionProps) {
  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    new Array(data.length).fill(false)
  )

  const [{ settingChain }, setChain] = useSetChain()

  function handleExpandToggle(index: number) {
    const newExpandedSections = [...expandedSections]
    newExpandedSections[index] = !newExpandedSections[index]
    setExpandedSections(newExpandedSections)
  }
  return (
    <S.Wrapper isPowerVotingSection={sectionName === 'Power Voting'}>
      <S.ContentWrapper>
        <S.TitleContent>
          <Image
            src="/assets/icons/pie.svg"
            width={20}
            height={20}
            alt="an icon of a chart pie"
          />{' '}
          {sectionName}
        </S.TitleContent>
        {data.map((pool, index) => (
          <S.Content key={pool.name}>
            <S.TopContent>
              <S.TopContentMobile>
                <S.PoolNameAndImage>
                  <S.Imagecontainer>
                    <S.ImageWrapper>
                      <Image src={pool.logoUrl} layout="fill" />
                    </S.ImageWrapper>

                    <S.ChainLogoWrapper>
                      <Image src={pool.chainLogoUrl} layout="fill" />
                    </S.ChainLogoWrapper>
                  </S.Imagecontainer>
                  <S.PoolText>
                    <S.PoolTitle>{pool.name}</S.PoolTitle>
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
                <S.IconWrapperMobile
                  isExpanded={expandedSections[index]}
                  onClick={() => handleExpandToggle(index)}
                >
                  <Image src={arrowDownThin} width={24} height={14} />
                </S.IconWrapperMobile>
              </S.TopContentMobile>
              <S.RegularContent>
                <S.RegularColumn>
                  <h3>Voting Power</h3>
                  <p>
                    {pool.votingPower}
                    <span>{pool.name}</span>
                  </p>
                </S.RegularColumn>
                <S.RegularColumn>
                  <h3>Withdraw Delay</h3>
                  <p>
                    {pool.withdrawDelay} <span>days</span>
                  </p>
                </S.RegularColumn>
                <S.RegularColumn>
                  <h3>Earned</h3>
                  <p>{pool.earned}</p>
                </S.RegularColumn>
                <S.BoldColumn>
                  <h3>APR</h3>
                  <p>{pool.apr}%</p>
                </S.BoldColumn>
              </S.RegularContent>
              <Button
                rightIcon
                text="Connect to Avalanche"
                background="secondary"
                size="large"
                icon={rightArrowIcon}
              />
              <S.IconWrapperDesktop
                isExpanded={expandedSections[index]}
                onClick={() => handleExpandToggle(index)}
              >
                <Image src={arrowDownThin} width={24} height={14} />
              </S.IconWrapperDesktop>
            </S.TopContent>

            {expandedSections[index] && (
              <S.ExpandedWrapper>
                <S.ExpandedContent>
                  <S.ExpandedTextContent>
                    <S.BlocksWrapper>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Total Staked:</span> {pool.totalStaked ?? 0}
                        </p>

                        <span>= {pool.stakedInUsd} USD</span>
                      </S.ExpandedContentBlock>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Pool Reward:</span> {pool.poolReward ?? 0}/Day
                        </p>

                        <span>{pool.poolRewardValue ?? 0} USD</span>
                      </S.ExpandedContentBlock>
                      <S.ExpandedContentBlock>
                        <p>
                          <span>Start Date:</span> {pool.startDate}
                        </p>
                        <p>
                          <span>Reward Update:</span> {pool.rewardDate}
                        </p>
                      </S.ExpandedContentBlock>
                    </S.BlocksWrapper>
                    <S.ExpandedFooter>
                      <p>
                        Buy {pool.name}{' '}
                        <Image
                          src={pool.logoUrl}
                          layout="fixed"
                          width={16}
                          height={16}
                        />
                      </p>
                      <a
                        target="_blank"
                        rel="nofollow"
                        href={'add contract here'}
                      >
                        See Contract {rightArrowIcon}
                      </a>
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
