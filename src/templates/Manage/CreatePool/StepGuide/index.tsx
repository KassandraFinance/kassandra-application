import Image from 'next/image'

import StepCard from './StepCard'
import ExternalLink from '../../../../components/ExternalLink'
import CreatePoolHeader from '../CreatePoolHeader'

import infoIcon from '../../../../../public/assets/iconGradient/info-solid-gradient.svg'
import assetsIcon from '../../../../../public/assets/iconGradient/assets-distribution.svg'
import adjustIcon from '../../../../../public/assets/iconGradient/adjust.svg'
import feeConfigurationIcon from '../../../../../public/assets/iconGradient/info-solid-gradient.svg'
import reviewIcon from '../../../../../public/assets/iconGradient/review.svg'
import avalancheIcon from '../../../../../public/assets/logos/avalanche.svg'
import polygonIcon from '../../../../../public/assets/logos/polygon.svg'

import * as S from './styles'

const stepGuide = [
  {
    icon: infoIcon,
    title: 'Step 1 - Define details and strategy',
    text: 'Set name, icon, starting price, and strategy'
  },
  {
    icon: assetsIcon,
    title: 'Step 2 - Select assets',
    text: 'Every product must have at least 5% KACY allocation.'
  },
  {
    icon: adjustIcon,
    title: 'Step 3 - Add initial liquidity',
    text: 'Total initial amount must be at least $20.000.'
  },
  {
    icon: feeConfigurationIcon,
    title: 'Step 4 - Fees Configuration',
    text: 'Configure deposit, management and broker fees.'
  },
  {
    icon: reviewIcon,
    title: 'Step 5 - review and create fund',
    text: 'Review and publish it to the network of your choice.'
  }
]

const StepGuide = () => {
  return (
    <S.StepGuide>
      {/* Network icon comes from api */}
      <CreatePoolHeader title="pool creation step guide" />

      <S.StepCardContainer>
        {stepGuide.map(step => (
          <StepCard
            key={step.title}
            icon={step.icon}
            title={step.title}
            text={step.text}
          />
        ))}
      </S.StepCardContainer>

      <S.SelectNetwork>
        <S.TextContainer>
          <S.Title>Network selection</S.Title>

          <S.Text>
            Choose which network you would like to publish your pool:
          </S.Text>
        </S.TextContainer>

        <S.ButtonsContainer>
          <S.ButtonWrapper>
            <S.ButtonNetwork borderColor="avalanche" selected={false} disabled>
              <Image src={avalancheIcon} width={24} height={24} />
              Avalanche
            </S.ButtonNetwork>

            <S.LinkWrapper>
              <ExternalLink text="Coming soon..." />
            </S.LinkWrapper>
          </S.ButtonWrapper>

          <S.ButtonWrapper>
            <S.ButtonNetwork borderColor="polygon" selected={false}>
              <Image src={polygonIcon} width={24} height={24} /> Polygon
            </S.ButtonNetwork>

            <S.LinkWrapper>
              <ExternalLink text="Available assets" />
            </S.LinkWrapper>
          </S.ButtonWrapper>
        </S.ButtonsContainer>
      </S.SelectNetwork>
    </S.StepGuide>
  )
}

export default StepGuide
