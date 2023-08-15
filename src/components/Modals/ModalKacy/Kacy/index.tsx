import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '../../../../utils/numerals'
import { networks } from '../../../../constants/tokenAddresses'

import Overlay from '../../../Overlay'
import Modal from '../../Modal'
import Button from '../../../Button'

import kacyIcon from '../../../../../public/assets/logos/kacy-96.svg'
import avalancheIcon from '../../../../../public/assets/logos/avalanche.svg'
import polygonIcon from '../../../../../public/assets/logos/polygon.svg'

import * as S from './styles'

interface IKacyProps {
  price: number
  supply: number
  kacyStaked: Big
  kacyUnclaimed: Record<number, Big>
  kacyWallet: Record<number, Big>
  kacyTotal: Big
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
  setIsModalKacy,
  setIsOpenModal,
  setIsModalBridge
}: IKacyProps) => {
  const [{ wallet, connecting }, connect] = useConnectWallet()

  const avalancheNetwork = networks[43114]
  const polygonNetwork = networks[137]

  const totalSupply = 10000000

  function handleCloseModal() {
    setIsModalKacy(false)
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

              <S.ChainContainer>
                <img src={avalancheIcon.src} alt="" width={20} height={20} />
                <p>Avalanche</p>
                <S.Line />
              </S.ChainContainer>

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

              <S.ChainContainer>
                <img src={polygonIcon.src} alt="" width={20} height={20} />
                <p>Polygon</p>
                <S.Line />
              </S.ChainContainer>
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
