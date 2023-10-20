import React from 'react'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useConnectWallet } from '@web3-onboard/react'

import Button from '@/components/Button'
import { ToastInfo } from '@/components/Toastify/toast'

import { useReferralCommission } from '@/hooks/query/useReferralCommission'

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
  const poolLink = `https://app.kassandra.finance/pool/${poolId}`

  const [referralLink, setReferralLink] = React.useState(poolLink)

  const [{ wallet, connecting }, conect] = useConnectWallet()
  const { data } = useReferralCommission(wallet?.accounts[0].address)

  // const handleDecryptFunction = async (code: string) => {
  //   try {
  //     const tt = encodeURIComponent(code)
  //     const response = await fetch(`/api/referral/decrypt/${tt}`)

  //     const data = await response.json()
  //     console.log('decrypt', data)
  //   } catch (error) {
  //     console.log('erro decrypt', error)
  //   }
  // }

  React.useEffect(() => {
    if (!data) return

    // handleDecryptFunction(data.hash)
    setReferralLink(
      `${poolLink}?tab=overview&referral=${encodeURIComponent(data.hash)}`
    )
  }, [data])

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
            <S.ShareLink
              showCommissionUrl={!!wallet && referralLink.includes('referral=')}
            >
              <span>{referralLink}</span>
              {wallet ? (
                <CopyToClipboard text={referralLink}>
                  <Button
                    className="small-button"
                    size="medium"
                    text="Copy"
                    background="secondary"
                    onClick={() => {
                      ToastInfo('link copied')
                    }}
                  />
                </CopyToClipboard>
              ) : (
                <Button
                  className="small-button"
                  size="medium"
                  disabled={connecting}
                  text="Connect Wallet"
                  background="secondary"
                  onClick={() => conect()}
                />
              )}
            </S.ShareLink>
            <S.ButtonWrapper>
              {wallet ? (
                <CopyToClipboard text={referralLink}>
                  <Button
                    className="medium-button"
                    size="medium"
                    text="Copy"
                    onClick={() => {
                      ToastInfo('link copied')
                    }}
                    background="secondary"
                    fullWidth
                  />
                </CopyToClipboard>
              ) : (
                <Button
                  className="medium-button"
                  size="medium"
                  onClick={() => conect()}
                  text="Connect Wallet"
                  background="secondary"
                  fullWidth
                />
              )}
            </S.ButtonWrapper>
          </S.ShareLinkWrapper>
        </S.ShareLinkContent>

        <S.SocialMediaContainer>
          <TwitterShareButton
            disabled={!wallet && !referralLink.includes('referral=')}
            onClick={() => console.log('')}
            title="Image of your stats on Kassandra Foundation"
            url={referralLink}
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
            disabled={!wallet && !referralLink.includes('referral=')}
            onClick={() => console.log('')}
            url={referralLink}
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
            disabled={!wallet && !referralLink.includes('referral=')}
            onClick={() => console.log('')}
            url={referralLink}
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
            disabled={!wallet && !referralLink.includes('referral=')}
            onClick={() => console.log('')}
            url={referralLink}
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
