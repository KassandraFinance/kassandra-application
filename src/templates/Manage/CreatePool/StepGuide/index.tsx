import React from 'react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  setTutorial,
  setIsValid
} from '../../../../store/reducers/poolCreationSlice'

import StepCard from './StepCard'
import ExternalLink from '../../../../components/ExternalLink'
import CreatePoolHeader from '../CreatePoolHeader'
import ModalAvailableAssets from '../../../../components/Modals/ModalAvailableAssets'

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
  const dispatch = useAppDispatch()
  const network = useAppSelector(
    state => state.poolCreation.createPoolData.tutorial.network
  )

  const [isAvailableAssets, setIsAvailableAssets] = React.useState(false)

  function handleSelectNetwork(network: string) {
    dispatch(setTutorial({ network: network }))
    dispatch(setIsValid(true))
  }

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
            <S.ButtonNetwork
              borderColor="polygon"
              selected={network === 'polygon'}
              onClick={() => handleSelectNetwork('polygon')}
            >
              <Image src={polygonIcon} width={24} height={24} /> Polygon
            </S.ButtonNetwork>

            <S.LinkWrapper>
              <ExternalLink
                text="Available assets"
                onClick={() => setIsAvailableAssets(true)}
              />
            </S.LinkWrapper>
          </S.ButtonWrapper>
        </S.ButtonsContainer>
      </S.SelectNetwork>
      {isAvailableAssets && (
        <ModalAvailableAssets
          chainIcon={<Image src={polygonIcon} />}
          chainName={'Polygon'}
          chainId={0}
          setModalOpen={setIsAvailableAssets}
        />
      )}
    </S.StepGuide>
  )
}

export default StepGuide
