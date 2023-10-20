import React from 'react'
import Image from 'next/image'

import Button from '@/components/Button'

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton
} from 'react-share'

import * as S from './styles'

interface IShareAndEarnProps {
  feeJoinBroker: string
  poolId: string
}

const ShareAndEarnCard = ({ feeJoinBroker, poolId }: IShareAndEarnProps) => {

  return (
    <S.ShareAndEarnCard>
      <S.ShareAndEarnContainer>
        <S.CardHeader>
          <img
            src="/assets/iconGradient/products-gift.svg"
            alt=""
            width={42}
            height={42}
          />
          <S.CardTitle>Share and earn</S.CardTitle>
        </S.CardHeader>

        <S.ReferralParagraph>
          Referral Commission {(parseFloat(feeJoinBroker) * 100).toFixed(2)}%
        </S.ReferralParagraph>

        <S.CardDescription>
          Share your referral link with friends, family, and colleagues, and
          earn commissions every time they sign up and make a deposit using your
          link. It&apos;s a simple and lucrative opportunity to boost your
          income. Start earning extra money today!
        </S.CardDescription>
      </S.ShareAndEarnContainer>

      <S.ShareLinkContainer>
        <S.ShareLinkContent>
          <S.ShareLinkTitle>Share your referral link</S.ShareLinkTitle>

          <S.ShareLinkWrapper>
            {/* <Input /> */}
            <S.ShareLink>
              <span>
                http://kassandra.finance/linkShareLinkasdasdasdasdasdasdasdasdasdasd
              </span>
              <Button
                className="small-button"
                size="medium"
                text="Copy"
                background="secondary"
              />
            </S.ShareLink>
            <S.ButtonWrapper>
              <Button
                className="medium-button"
                size="medium"
                text="Copy"
                background="secondary"
                fullWidth
              />
            </S.ButtonWrapper>
          </S.ShareLinkWrapper>
        </S.ShareLinkContent>

        <S.SocialMediaContainer>
          <TwitterShareButton
            // disabled={loading}
            onClick={() => console.log('')}
            title="Image of your stats on Kassandra Foundation"
            url={'url'}
          >
            <S.SocialMedia>
              <Image
                src="/assets/socialMediaShare/twitter-share.svg"
                width={40}
                height={40}
              />
            </S.SocialMedia>
          </TwitterShareButton>
          <LinkedinShareButton
            // disabled={loading}
            onClick={() => console.log('')}
            url={'url'}
          >
            <S.SocialMedia>
              <Image
                src="/assets/socialMediaShare/linkedin-share.svg"
                width={40}
                height={40}
              />
            </S.SocialMedia>
          </LinkedinShareButton>
          <RedditShareButton
            // disabled={loading}
            onClick={() => console.log('')}
            url={'url'}
          >
            <S.SocialMedia>
              <Image
                src="/assets/socialMediaShare/reddit-share.svg"
                width={40}
                height={40}
              />
            </S.SocialMedia>
          </RedditShareButton>
          <FacebookShareButton
            // disabled={loading}
            onClick={() => console.log('')}
            url={'url'}
          >
            <S.SocialMedia>
              <Image
                src="/assets/socialMediaShare/facebook-share.svg"
                width={40}
                height={40}
              />
            </S.SocialMedia>
          </FacebookShareButton>
        </S.SocialMediaContainer>
      </S.ShareLinkContainer>
    </S.ShareAndEarnCard>
  )
}

export default ShareAndEarnCard
