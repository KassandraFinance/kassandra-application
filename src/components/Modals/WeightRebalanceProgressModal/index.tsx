import React from 'react'

import Modal from '../Modal'
import Overlay from '../../Overlay'
import TokenWeightInfo from './TokenWeightInfo'
import ExternalLink from '@/components/ExternalLink'

import * as S from './styles'

interface IWeightRebalanceProgressModalProps {
  handleCloseModal: () => void;
}

const WeightRebalanceProgressModal = ({
  handleCloseModal
}: IWeightRebalanceProgressModalProps) => {
  return (
    <S.WeightRebalanceProgressModal>
      <Overlay onClick={handleCloseModal} />

      <Modal
        title="Token Weight Rebalance Progress"
        onCloseModal={() => handleCloseModal}
      >
        <S.WeightRebalanceProgressBody>
          <S.IntroInfoPoolContainer>
            <S.PoolInfoContent>
              <p>Awesome Pool</p>
              <span>$price</span>
            </S.PoolInfoContent>
            <S.TimeProgressContainer>
              <S.TimeContent>
                <p>Time for complete rebalance</p>
                <p>03:00:00</p>
              </S.TimeContent>
              <S.ProgressContent>
                <S.PogressBar value={30} max={100} />
              </S.ProgressContent>
              <S.TimeToFinalize>300</S.TimeToFinalize>
            </S.TimeProgressContainer>
          </S.IntroInfoPoolContainer>

          <S.TableRebalanceWeightsContainer>
            <S.Tablehead>
              <p>Asset</p>
              <p>Previous Weight</p>
              <p>Current Weight</p>
              <p>Final Weight</p>
            </S.Tablehead>
            <S.TableBody>
              {rebalanceTokensMock.slice(0, 3).map((token, index) => {
                return <TokenWeightInfo key={token.token.symbol + index} />
              })}
            </S.TableBody>
          </S.TableRebalanceWeightsContainer>

          <S.ShowAssetsContainer>
            <ExternalLink text="Show assets that are not rebalancing" />
          </S.ShowAssetsContainer>
        </S.WeightRebalanceProgressBody>
      </Modal>
    </S.WeightRebalanceProgressModal>
  )
}

const rebalanceTokensMock = [
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  },
  {
    token: {
      name: 'bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    PreviusWeight: 10,
    CurrentWeight: 20,
    FInalWeight: 30
  }
]

export default WeightRebalanceProgressModal
