import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import Big from 'big.js'

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setModalWalletActive } from '../../../../store/reducers/modalWalletActive'

import { BNtoDecimal } from '../../../../utils/numerals'
import changeChain from '../../../../utils/changeChain'
import { networks } from '../../../../constants/tokenAddresses'

import Overlay from '../../../Overlay'
import Modal from '../../Modal'
import Button from '../../../Button'

import kacyIcon from '../../../../../public/assets/logos/kacy-96.svg'
import avalancheIcon from '../../../../../public/assets/logos/avalanche.svg'

import * as S from './styles'

interface IKacyProps {
  price: number;
  supply: number;
  kacyStaked: BigNumber;
  kacyUnclaimed: BigNumber;
  kacyWallet: BigNumber;
  kacyTotal: BigNumber;
  setIsModalKacy: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Kacy = ({
  price,
  supply,
  kacyStaked,
  kacyUnclaimed,
  kacyWallet,
  kacyTotal,
  setIsModalKacy,
  setIsOpenModal
}: IKacyProps) => {
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const connect = process.browser && localStorage.getItem('walletconnect')
  const dispatch = useAppDispatch()

  const avalancheNetwork = networks[43114]

  const totalSupply = 10000000

  function handleCloseModal() {
    setIsModalKacy(false)
  }
  return (
    <S.Kacy>
      <Overlay onClick={handleCloseModal} />

      <Modal title="Your KACY Stats" onCloseModal={handleCloseModal}>
        <S.ModalContent>
          {userWalletAddress && chainId === avalancheNetwork.chainId && (
            <>
              <S.KacyTotalContainer>
                <S.ImgContainer>
                  <S.ImgWrapper>
                    <Image src={kacyIcon} width={40} height={40} />
                  </S.ImgWrapper>

                  <S.ChainIcon>
                    <Image src={avalancheIcon} width={20} height={20} />
                  </S.ChainIcon>
                </S.ImgContainer>

                <S.TotalWrapper>
                  <S.BodyTitle>TOTAL</S.BodyTitle>
                  <S.KacyTotal>{BNtoDecimal(kacyTotal, 18, 2)}</S.KacyTotal>
                  <S.KacyUSDTotal>
                    ~
                    {BNtoDecimal(
                      Big(kacyTotal.toString()).mul(price).div(Big(10).pow(18)),
                      6,
                      2,
                      2
                    )}{' '}
                    USD
                  </S.KacyUSDTotal>
                </S.TotalWrapper>
              </S.KacyTotalContainer>

              <S.Line />

              <S.Ul>
                <S.Li>
                  KACY Staked
                  <S.Value>
                    {BNtoDecimal(kacyStaked, 18, 2)}
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
                    {BNtoDecimal(kacyUnclaimed, 18, 2)}
                    <span>
                      ~
                      {BNtoDecimal(
                        Big(kacyUnclaimed.toString())
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
                    {BNtoDecimal(kacyWallet, 18, 2)}
                    <span>
                      ~
                      {BNtoDecimal(
                        Big(kacyWallet.toString())
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
              </S.Ul>

              <S.Line />
            </>
          )}

          <S.Ul isKacyStatsModal={kacyTotal.isZero()}>
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

          {chainId === avalancheNetwork.chainId && userWalletAddress ? (
            connect ? (
              <Button
                text="Buy KACY"
                backgroundPrimary
                fullWidth
                as="a"
                href="https://app.pangolin.exchange/#/swap?outputCurrency=0xf32398dae246C5f672B52A54e9B413dFFcAe1A44"
                target="_blank"
              />
            ) : (
              <Button
                text="Buy KACY"
                backgroundPrimary
                fullWidth
                onClick={() => {
                  setIsOpenModal(true)
                  setIsModalKacy(false)
                }}
              />
            )
          ) : chainId !== avalancheNetwork.chainId ? (
            <Button
              text={`Change to ${avalancheNetwork.chainName}`}
              backgroundPrimary
              fullWidth
              onClick={() => {
                changeChain({
                  chainId: avalancheNetwork.chainId,
                  chainName: avalancheNetwork.chainName,
                  rpcUrls: [avalancheNetwork.rpc]
                })
                setIsModalKacy(false)
              }}
            />
          ) : (
            <Button
              text="Connect Wallet"
              backgroundPrimary
              fullWidth
              onClick={() => {
                dispatch(setModalWalletActive(true))
                setIsModalKacy(false)
              }}
            />
          )}
        </S.ModalContent>
      </Modal>
    </S.Kacy>
  )
}

export default Kacy
