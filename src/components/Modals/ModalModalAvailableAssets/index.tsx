import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { GET_INFO_TOKENS } from './graphql'
import { KASSANDRA_BECKEND } from '../../../constants/tokenAddresses'

import Overlay from '../../Overlay'
import Modal from '../Modal'

import * as S from './styles'

interface IModalAvailableAssetsProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAvailableAssets = ({ setModalOpen }: IModalAvailableAssetsProps) => {
  const { data } = useSWR([GET_INFO_TOKENS], query =>
    request(KASSANDRA_BECKEND, query)
  )

  return (
    <S.ModalAvailableAssets>
      <Overlay onClick={() => setModalOpen(false)} />

      <Modal title="Avalanche Assets" onCloseModal={() => setModalOpen(false)}>
        <S.ModalAvailableAssetsContent>
          {data.tokens.map((token: any, index: number) => {
            return (
              <Link key={token.name + index} href="#" passHref>
                <S.tokenContent target="_blank">
                  <img src={token.logo} alt="" width={24} height={24} />
                  <p>{token.name}</p>
                </S.tokenContent>
              </Link>
            )
          })}
        </S.ModalAvailableAssetsContent>
      </Modal>
    </S.ModalAvailableAssets>
  )
}

export default ModalAvailableAssets

const tokens = [
  {
    id: '0x22d4002028f537599bE9f666d1c4Fa138522f9c8',
    name: 'Platypus',
    logo: 'https://tokens.1inch.io/0x22d4002028f537599be9f666d1c4fa138522f9c8.png',
    symbol: 'PTP'
  },
  {
    id: '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE',
    name: 'Staked AVAX',
    logo: null,
    symbol: 'sAVAX'
  },
  {
    id: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    name: 'Wrapped Ether',
    logo: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    symbol: 'WETH.e'
  },
  {
    id: '0x50b7545627a5162F82A992c33b87aDc75187B218',
    name: 'Wrapped BTC',
    logo: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    symbol: 'WBTC.e'
  },

  {
    id: '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7',
    name: 'Yak Token',
    logo: 'https://tokens.1inch.io/0x59414b3089ce2af0010e7523dea7e2b35d776ec7.png',
    symbol: 'YAK'
  },

  {
    id: '0x60781C2586D68229fde47564546784ab3fACA982',
    name: 'Pangolin',
    logo: 'https://tokens.1inch.io/0x60781c2586d68229fde47564546784ab3faca982.png',
    symbol: 'PNG'
  },

  {
    id: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    name: 'JoeToken',
    logo: 'https://tokens.1inch.io/0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd.png',
    symbol: 'JOE'
  }

  // {
  //   id: '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5',
  //   name: 'BENQI',
  //   logo: 'https://tokens.1inch.io/0x8729438eb15e2c8b576fcc6aecda6a148776c0f5.png',
  //   symbol: 'QI'
  // },

  // {
  //   id: '0xA32608e873F9DdEF944B24798db69d80Bbb4d1ed',
  //   name: 'CRA',
  //   logo: 'https://tokens.1inch.io/0xa32608e873f9ddef944b24798db69d80bbb4d1ed.png',
  //   symbol: 'CRA'
  // },

  // {
  //   id: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  //   name: 'Wrapped AVAX',
  //   logo: 'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png',
  //   symbol: 'WAVAX'
  // },

  // {
  //   id: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  //   name: 'Tether USD',
  //   logo: 'https://tokens.1inch.io/0xc7198437980c041c805a1edcba50c1ce5db95118.png',
  //   symbol: 'USDT.e'
  // },
  // {
  //   id: '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
  //   name: 'Avalaunch',
  //   logo: 'https://tokens.1inch.io/0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4.png',
  //   symbol: 'XAVA'
  // },
  // {
  //   id: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  //   name: 'Dai Stablecoin',
  //   logo: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png',
  //   symbol: 'DAI.e'
  // },
  // {
  //   id: '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44',
  //   name: 'Kassandra',
  //   logo: null,
  //   symbol: 'KACY'
  // },
  // {
  //   id: '0x1d7C6846F033e593b4f3f21C39573bb1b41D43Cb',
  //   name: 'Kassandra',
  //   logo: null,
  //   symbol: 'KACY'
  // },
  // {
  //   id: '0x83080D4b5fC60e22dFFA8d14AD3BB41Dde48F199',
  //   name: 'Pangolin',
  //   logo: null,
  //   symbol: 'PNG'
  // },
  // {
  //   id: '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF',
  //   name: 'Yak Token Kassandra',
  //   logo: null,
  //   symbol: 'YAK.k'
  // },
  // {
  //   id: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  //   name: 'Wrapped AVAX',
  //   logo: null,
  //   symbol: 'WAVAX'
  // },
  // {
  //   id: '0xe401e9Ce0E354Ad9092a63eE1dFA3168bB83F3DA',
  //   name: 'BENQI',
  //   logo: null,
  //   symbol: 'QI'
  // },
  // {
  //   id: '0xf22f05168508749fa42eDBddE10CB323D87c201d',
  //   name: 'JoeToken Kassandra',
  //   logo: null,
  //   symbol: 'JOE.k'
  // }
]
