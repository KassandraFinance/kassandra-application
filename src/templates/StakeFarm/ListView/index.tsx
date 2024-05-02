import Button from '@/components/Button'
import * as S from './styles'
import { useState } from 'react'
import Image from 'next/image'
import Label from '@/components/Labels/Label'
import GradientLabel from '@/components/Labels/GradientLabel'
import arrowDownThin from '../../../../public/assets/utilities/arrow-down-thin.svg'

export function StakeListView() {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.TitleContent>Icon Title</S.TitleContent>
        <S.Content>
          <S.PoolNameAndImage>
            <S.Imagecontainer>
              <S.ImageWrapper>
                <Image src="/assets/logos/kacy-stake.svg" layout="fill" />
              </S.ImageWrapper>

              <S.ChainLogoWrapper>
                <Image src="/assets/logos/avalanche.svg" layout="fill" />
              </S.ChainLogoWrapper>
            </S.Imagecontainer>
            <S.PoolText>
              <S.PoolTitle>$KACY</S.PoolTitle>
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
                2/<span>$KACY</span>
              </p>
            </S.RegularColumn>
            <S.RegularColumn>
              <h3>Withdraw Delay</h3>
              <p>
                15 <span>Days</span>
              </p>
            </S.RegularColumn>
            <S.RegularColumn>
              <h3>Earned</h3>
              <p>0</p>
            </S.RegularColumn>
            <S.BoldColumn>
              <h3>APR</h3>
              <p>132,94%</p>
            </S.BoldColumn>
          </S.RegularContent>
          <S.IconWrapper>
            <Image src={arrowDownThin} width={14} height={24} />
          </S.IconWrapper>
        </S.Content>
      </S.ContentWrapper>

      {isExpanded && (
        <S.ExpandedContent>
          <S.ExpandedTextContent>
            <S.ExpandedContentBlock></S.ExpandedContentBlock>
            <S.ExpandedContentBlock></S.ExpandedContentBlock>
            <S.ExpandedContentBlock></S.ExpandedContentBlock>
            <S.ExpandedFooter>
              <p>Buy NAME ICON</p>
              <a>See Contract ICON</a>
            </S.ExpandedFooter>
          </S.ExpandedTextContent>
          <S.ExpandedContentButtons>
            <Button text="Claim" />
            <Button text="Request Withdraw" />
          </S.ExpandedContentButtons>
        </S.ExpandedContent>
      )}
    </S.Wrapper>
  )
}
