import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '../../../../utils/numerals'
import { networks } from '../../../../constants/tokenAddresses'

import Overlay from '../../../Overlay'
import Modal from '../../Modal'
import Button from '../../../Button'

import kacyIcon from '../../../../../public/assets/logos/kacy-token.svg'
import avalancheIcon from '../../../../../public/assets/logos/avalanche.svg'
import polygonIcon from '../../../../../public/assets/logos/polygon.svg'
import arbitrumIcon from '../../../../../public/assets/logos/arbitrum.svg'

import * as S from './styles'

interface IKacyProps {
  price: number
  supply: number
  kacyStaked: Big
  kacyUnclaimed: Record<number, Big>
  kacyWallet: Record<number, Big>
  kacyTotal: Big
  totalKacyOnChain: Record<number, Big>
  setIsModalKacy: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsModalBridge: React.Dispatch<React.SetStateAction<boolean>>
}

const Kacy = ({
  price,
  supply,
  kacyStaked,
  kacyUnclaimed,
  kacyWallet,
  kacyTotal,
  totalKacyOnChain,
  setIsModalKacy,
  setIsOpenModal,
  setIsModalBridge
}: IKacyProps) => {
  const [showMoreKacyDetails, setShowMoreKacyDetails] = React.useState('')

  const [{ wallet, connecting }, connect] = useConnectWallet()

  const avalancheNetwork = networks[43114]
  const polygonNetwork = networks[137]
  const arbitrumNetwork = networks[42161]

  const totalSupply = 10000000

  function handleCloseModal() {
    setIsModalKacy(false)
  }

  function handleShowMore(chain: string) {
    const chainShowMore = chain === showMoreKacyDetails ? '' : chain
    setShowMoreKacyDetails(chainShowMore)
  }

  return (
    <S.Kacy>
      <Overlay onClick={handleCloseModal} />

      <Modal title="Your KACY Stats" onCloseModal={handleCloseModal}>
        <S.ModalContent>
          {wallet?.provider ? (
            <>
              <S.KacyTotalContainer>
                <S.ImgContainer>
                  <S.ImgWrapper>
                    <Image src={kacyIcon} width={40} height={40} />
                  </S.ImgWrapper>
                </S.ImgContainer>

                <S.TotalWrapper>
                  <S.BodyTitle>TOTAL</S.BodyTitle>
                  <S.KacyTotal>
                    {BNtoDecimal(kacyTotal.div(Big(10).pow(18)), 18, 2)}
                  </S.KacyTotal>
                  <S.KacyUSDTotal>
                    ~
                    {BNtoDecimal(
                      Big(kacyTotal?.toString() ?? 0)
                        .mul(price)
                        .div(Big(10).pow(18)),
                      6,
                      2,
                      2
                    )}{' '}
                    USD
                  </S.KacyUSDTotal>
                </S.TotalWrapper>
              </S.KacyTotalContainer>
              <S.Line />

              <S.ChainContainer
                isShowMore={showMoreKacyDetails === 'avalanche'}
              >
                <S.ChainWrapper>
                  <S.Chain>
                    <img
                      src={avalancheIcon.src}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>Avalanche</p>
                  </S.Chain>
                  <S.ChainTotalWrapper>
                    <S.ChainKacyTotal>
                      {BNtoDecimal(
                        totalKacyOnChain[avalancheNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                    </S.ChainKacyTotal>
                    <S.ChainKacyUSDTotal>
                      ~
                      {BNtoDecimal(
                        Big(
                          totalKacyOnChain[
                            avalancheNetwork.chainId
                          ]?.toString() ?? 0
                        )
                          .mul(price)
                          .div(Big(10).pow(18)),
                        6,
                        2,
                        2
                      )}{' '}
                      USD
                    </S.ChainKacyUSDTotal>
                  </S.ChainTotalWrapper>
                </S.ChainWrapper>
                <S.Ul>
                  <S.Li>
                    KACY Staked
                    <S.Value>
                      {BNtoDecimal(kacyStaked.div(Big(10).pow(18)), 18, 2)}
                      <span>
                        ~
                        {BNtoDecimal(
                          Big(kacyStaked.toString())
                            .mul(price)
                            .div(Big(10).pow(18)),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                  <S.Li>
                    Unclaimed
                    <S.Value>
                      {BNtoDecimal(
                        kacyUnclaimed[avalancheNetwork.chainId].div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          kacyUnclaimed[avalancheNetwork.chainId]
                            .mul(price)
                            .div(Big(10).pow(18)),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                  <S.Li>
                    Wallet
                    <S.Value>
                      {BNtoDecimal(
                        kacyWallet[avalancheNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ) ?? Big(0),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          kacyWallet[avalancheNetwork.chainId]
                            ?.mul(price)
                            .div(Big(10).pow(18)) ?? Big(0),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                </S.Ul>
              </S.ChainContainer>
              <S.WrapperToggle>
                <S.ToggleList
                  onClick={() => handleShowMore('avalanche')}
                  isShowMore={showMoreKacyDetails === 'avalanche'}
                >
                  {showMoreKacyDetails !== 'avalanche'
                    ? 'Show More'
                    : 'Show Less'}
                  <img src="/assets/utilities/arrow-select-down.svg" alt="" />
                </S.ToggleList>
              </S.WrapperToggle>
              <S.Line />

              <S.ChainContainer isShowMore={showMoreKacyDetails === 'polygon'}>
                <S.ChainWrapper>
                  <S.Chain>
                    <img src={polygonIcon.src} alt="" width={20} height={20} />
                    <p>Polygon</p>
                  </S.Chain>
                  <S.ChainTotalWrapper>
                    <S.ChainKacyTotal>
                      {BNtoDecimal(
                        totalKacyOnChain[polygonNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                    </S.ChainKacyTotal>
                    <S.ChainKacyUSDTotal>
                      ~
                      {BNtoDecimal(
                        Big(
                          totalKacyOnChain[
                            polygonNetwork.chainId
                          ]?.toString() ?? 0
                        )
                          .mul(price)
                          .div(Big(10).pow(18)),
                        6,
                        2,
                        2
                      )}{' '}
                      USD
                    </S.ChainKacyUSDTotal>
                  </S.ChainTotalWrapper>
                </S.ChainWrapper>
                <S.Ul>
                  <S.Li>
                    Unclaimed
                    <S.Value>
                      {BNtoDecimal(
                        kacyUnclaimed[polygonNetwork.chainId].div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          Big(kacyUnclaimed[polygonNetwork.chainId].toString())
                            .mul(price)
                            .div(Big(10).pow(18)),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                  <S.Li>
                    Wallet
                    <S.Value>
                      {BNtoDecimal(
                        kacyWallet[polygonNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ) ?? Big(0),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          kacyWallet[polygonNetwork.chainId]
                            ?.mul(price)
                            .div(Big(10).pow(18)) ?? Big(0),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                </S.Ul>
              </S.ChainContainer>
              <S.WrapperToggle>
                <S.ToggleList
                  onClick={() => handleShowMore('polygon')}
                  isShowMore={showMoreKacyDetails === 'polygon'}
                >
                  {showMoreKacyDetails !== 'polygon'
                    ? 'Show More'
                    : 'Show Less'}
                  <img src="/assets/utilities/arrow-select-down.svg" alt="" />
                </S.ToggleList>
              </S.WrapperToggle>
              <S.Line />

              <S.ChainContainer isShowMore={showMoreKacyDetails === 'arbitrum'}>
                <S.ChainWrapper>
                  <S.Chain>
                    <img src={arbitrumIcon.src} alt="" width={20} height={20} />
                    <p>Arbitrum</p>
                  </S.Chain>
                  <S.ChainTotalWrapper>
                    <S.ChainKacyTotal>
                      {BNtoDecimal(
                        totalKacyOnChain[arbitrumNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                    </S.ChainKacyTotal>
                    <S.ChainKacyUSDTotal>
                      ~
                      {BNtoDecimal(
                        Big(
                          totalKacyOnChain[
                            arbitrumNetwork.chainId
                          ]?.toString() ?? 0
                        )
                          .mul(price)
                          .div(Big(10).pow(18)),
                        6,
                        2,
                        2
                      )}{' '}
                      USD
                    </S.ChainKacyUSDTotal>
                  </S.ChainTotalWrapper>
                </S.ChainWrapper>
                <S.Ul>
                  <S.Li>
                    Unclaimed
                    <S.Value>
                      {BNtoDecimal(
                        kacyUnclaimed[arbitrumNetwork.chainId].div(
                          Big(10).pow(18)
                        ),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          Big(kacyUnclaimed[arbitrumNetwork.chainId].toString())
                            .mul(price)
                            .div(Big(10).pow(18)),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                  <S.Li>
                    Wallet
                    <S.Value>
                      {BNtoDecimal(
                        kacyWallet[arbitrumNetwork.chainId]?.div(
                          Big(10).pow(18)
                        ) ?? Big(0),
                        18,
                        2
                      )}
                      <span>
                        ~
                        {BNtoDecimal(
                          kacyWallet[arbitrumNetwork.chainId]
                            ?.mul(price)
                            .div(Big(10).pow(18)) ?? Big(0),
                          6,
                          2,
                          2
                        )}{' '}
                        USD
                      </span>
                    </S.Value>
                  </S.Li>
                </S.Ul>
              </S.ChainContainer>
              <S.WrapperToggle>
                <S.ToggleList
                  onClick={() => handleShowMore('arbitrum')}
                  isShowMore={showMoreKacyDetails === 'arbitrum'}
                >
                  {showMoreKacyDetails !== 'arbitrum'
                    ? 'Show More'
                    : 'Show Less'}
                  <img src="/assets/utilities/arrow-select-down.svg" alt="" />
                </S.ToggleList>
              </S.WrapperToggle>
              <S.Line />
            </>
          ) : null}

          <S.Ul isKacyStatsModal={kacyTotal.eq(Big(0))}>
            <S.Li>
              Price
              <S.Value>
                {price?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 3
                })}
              </S.Value>
            </S.Li>
            <S.Li>
              Circulant Supply
              <S.Value>{supply?.toLocaleString('en-US')}</S.Value>
            </S.Li>
            <S.Li>
              Total Supply
              <S.Value>{totalSupply.toLocaleString('en-US')}</S.Value>
            </S.Li>
          </S.Ul>

          {wallet?.provider ? (
            <S.ButtonContainer>
              <Button
                text="Buy KACY"
                background="primary"
                fullWidth
                onClick={() => {
                  setIsOpenModal(true)
                  setIsModalKacy(false)
                }}
              />
              <Button
                text="Bridge KACY"
                background="secondary"
                fullWidth
                onClick={() => {
                  setIsModalBridge(true)
                  setIsModalKacy(false)
                }}
              />
            </S.ButtonContainer>
          ) : (
            <Button
              text="Connect Wallet"
              background="primary"
              fullWidth
              disabledNoEvent={connecting}
              onClick={() => {
                connect()
              }}
            />
          )}
        </S.ModalContent>
      </Modal>
    </S.Kacy>
  )
}

export default Kacy
