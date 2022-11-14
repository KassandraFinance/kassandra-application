import Image from 'next/image'

import discordIcon from '../../../../public/assets/socialMidia/discord.svg'
import telegramIcon from '../../../../public/assets/socialMidia/telegram.svg'
import githubIcon from '../../../../public/assets/socialMidia/github.svg'
import mediumIcon from '../../../../public/assets/socialMidia/medium.svg'
import twitterIcon from '../../../../public/assets/socialMidia/twitter.svg'
import discourseIcon from '../../../../public/assets/socialMidia/discourse.svg'

import * as S from './styles'

const links = [
  {
    name: 'discord',
    link: 'https://discord.gg/fAqpbP6tFw',
    alt: 'Join our Discord community',
    icon: discordIcon
  },
  {
    name: 'telegram',
    link: 'https://t.me/KassandraDAO',
    alt: 'Join our Telegram group',
    icon: telegramIcon
  },
  {
    name: 'github',
    link: 'https://github.com/KassandraFinance',
    alt: 'Access our GitHub repository',
    icon: githubIcon
  },
  {
    name: 'medium',
    link: 'https://kassandrafoundation.medium.com/',
    alt: 'Read our Medium blog',
    icon: mediumIcon
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/dao_kassandra',
    alt: 'Follow our Twitter feed',
    icon: twitterIcon
  },
  {
    name: 'discourse',
    link: 'http://gov.kassandra.finance/',
    alt: 'Follow our Discourse',
    icon: discourseIcon
  }
]

const SocialLinks = () => {
  return (
    <S.SocialLinks>
      {links.map(link => (
        <S.LinkWrapper key={link.name}>
          <S.SocialLink
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={link.icon} alt={link.alt} />
          </S.SocialLink>
        </S.LinkWrapper>
      ))}
    </S.SocialLinks>
  )
}

export default SocialLinks
