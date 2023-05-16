import React from 'react'
import Image from 'next/image'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setPoolData } from '../../../../store/reducers/poolCreationSlice'

import StepCard from './StepCard'
import ExternalLink from '../../../../components/ExternalLink'
import CreatePoolHeader from '../CreatePoolHeader'
import ModalAvailableAssets from '../../../../components/Modals/ModalAvailableAssets'
import InputRadio from '@/components/Inputs/InputRadio'

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
    text: 'Choose the assets you want your managed pool to have from our whitelist.'
  },
  {
    icon: adjustIcon,
    title: 'Step 3 - Add initial liquidity',
    text: 'Provide the initial liquidity for your managed pool to work with.'
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
  const [chainInfo, setChainInfo] = React.useState({
    chainName: '',
    chainId: 0
  })
  const dispatch = useAppDispatch()
  const network = useAppSelector(
    state => state.poolCreation.createPoolData.network
  )

  const [isAvailableAssets, setIsAvailableAssets] = React.useState(false)

  function handleSelectNetwork(network: string, networkId: number) {
    dispatch(setPoolData({ network: network, networkId: networkId }))
  }

  function handleAvailableAssets(chainName: string, chainId: number) {
    setIsAvailableAssets(true)
    setChainInfo({ chainName: chainName, chainId: chainId })
  }

  return (
    <S.StepGuide>
      {/* Network icon comes from api */}
      <CreatePoolHeader title="pool creation step guide" />

      <S.ContainerCardAndNetwork>
        <S.SelectNetwork>
          <S.TextContainer>
            <S.Title>Network selection</S.Title>

            <S.Text>
              Choose which network you would like to publish your pool:
            </S.Text>
          </S.TextContainer>

          <S.ButtonsContainer>
            <S.ButtonWrapper>
              <S.ButtonNetwork
                type="button"
                borderColor="avalanche"
                selected={false}
                onClick={() => handleSelectNetwork('avalanche', 43114)}
                disabled
              >
                <Image src={avalancheIcon} width={24} height={24} />
                Avalanche
              </S.ButtonNetwork>

              <S.LinkWrapper>
                <ExternalLink text="Coming soon..." />
              </S.LinkWrapper>
              {/*
              <InputRadio
                form="poolCreationForm"
                inputId="avalanche"
                name="network"
                value="avalanche"
                text=""
                inputChecked={network === 'avalanche'}
                handleClickInput={() => {
                  return
                }}
                required
              />
              */}
            </S.ButtonWrapper>

            <S.ButtonWrapper>
              <S.ButtonNetwork
                type="button"
                borderColor="polygon"
                selected={network === 'polygon'}
                onClick={() => handleSelectNetwork('polygon', 137)}
              >
                <Image src={polygonIcon} width={24} height={24} /> Polygon
              </S.ButtonNetwork>

              <InputRadio
                form="poolCreationForm"
                inputId="polygon"
                name="network"
                value="polygon"
                text=""
                inputChecked={network === 'polygon'}
                handleClickInput={() => {
                  return
                }}
                required
              />
            </S.ButtonWrapper>
            {/* <S.ButtonWrapper>
              <S.ButtonNetwork
                type="button"
                borderColor="goerli"
                selected={network === 'goerli'}
                onClick={() => handleSelectNetwork('goerli', 5)}
              >
                <Image
                  src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                  width={24}
                  height={24}
                />{' '}
                Goerli
              </S.ButtonNetwork>

              <InputRadio
                form="poolCreationForm"
                inputId="goerli"
                name="network"
                value="goerli"
                text=""
                inputChecked={network === 'goerli'}
                handleClickInput={() => {
                  return
                }}
                required
              />
            </S.ButtonWrapper> */}
            <S.LinkWrapper>
              <ExternalLink
                text="Available assets"
                onClick={() => handleAvailableAssets('Goerli Testnet', 5)}
              />
            </S.LinkWrapper>
          </S.ButtonsContainer>
        </S.SelectNetwork>

        <S.StepCardContainer>
          <S.Title>Next Steps preview</S.Title>
          {stepGuide.map(step => (
            <StepCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              text={step.text}
            />
          ))}
        </S.StepCardContainer>
      </S.ContainerCardAndNetwork>

      {isAvailableAssets && (
        <ModalAvailableAssets setModalOpen={setIsAvailableAssets} />
      )}
    </S.StepGuide>
  )
}

export default StepGuide
