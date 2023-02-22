import React from 'react'
import useSWR from 'swr'
import Web3 from 'web3'
import { AbiItem, toChecksumAddress } from 'web3-utils'
import request from 'graphql-request'
import BigNumber from 'bn.js'

import { ERC20 } from '../../../../hooks/useERC20Contract'
import KassandraWhitelistAbi from "../../../../constants/abi/KassandraWhitelist.json";
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { KASSANDRA_BACKEND } from '../../../../constants/tokenAddresses'
import { GET_INFO_TOKENS } from './graphql'

import AddAssetsTable from './AddAssetsTable'
import CreatePoolHeader from '../../CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'

import * as S from './styles'

const WHITELIST_ADDRESS = '0xe119DE3b0FDab34e9CE490FDAa562e6457126A57'

export const mockTokens: { [key: string]: string } = {
  '0x841a91e3De1202b7b750f464680068aAa0d0EA35':
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', // dai
  '0xDcfcef36F438ec310d8a699e3D3729398547b2BF':
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // wmatic
  '0xca813266889e0FD141dF48B85294855616015fA4':
    '0xeeeeeb57642040be42185f49c52f7e9b38f8eeee', // elk
  '0xf22f05168508749fa42eDBddE10CB323D87c201d':
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // tether
  '0x2f52C8ce1e5A064B4202762aD34E075E8826C252':
    '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3', // bnb
  '0x874a7CE88d933e6Edc24f4867923F1d09568b08B':
    '0xb33eaad8d922b1083446dc23f610c2567fb5180f', // uniswap
  '0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d':
    '0xd6df932a45c0f255f85145f286ea0b292b21c90b', // aave
  '0xBA1C32241Ac77b97C8573c3dbFDe4e1e2A8fc0DF':
    '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' // wbiticoin
}

export type TokensInfoResponseType = {
  id: string,
  logo: string,
  name: string,
  symbol: string,
  decimals: number,
}

export type TokensListType = TokensInfoResponseType & { balance?: BigNumber }

export type CoinGeckoAssetsResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number,
    usd_market_cap: number
  }
}

const SelectAssets = () => {
  const [whitelist, setWhitelist] = React.useState<string[]>();
  const [tokensList, setTokensList] = React.useState<TokensListType[]>([])

  const wallet = useAppSelector(state => state.userWalletAddress)

  const { data } = useSWR<{ tokensByIds: TokensInfoResponseType[] }>([GET_INFO_TOKENS, whitelist?.map((token: string) => toChecksumAddress(mockTokens[token]))], (query, whitelist) =>
    request(KASSANDRA_BACKEND, query, {
      whitelist
    })
  )

  const { data: priceData } = useSWR<CoinGeckoAssetsResponseType>(
    `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${whitelist?.map((token: string) => toChecksumAddress(mockTokens[token])).toString()}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
  )

  React.useEffect(() => {
    if (data) {
      setTokensList(data?.tokensByIds.filter(element => {
          return element !== null
        })
      )
    }
  }, [data])

  React.useEffect(() => {
    const getWhitelist = async () => {
      try {
        const web3 = new Web3("https://rpc.ankr.com/eth_goerli");
        const whitelistContract = new web3.eth.Contract((KassandraWhitelistAbi as unknown) as AbiItem, WHITELIST_ADDRESS);
        const whitelist = await whitelistContract.methods.getTokens(0, 50).call();
        
        // setWhitelist(whitelist.map((token: string) => toChecksumAddress(mockTokens[token])));
        setWhitelist(whitelist);
      } catch (error) {
        console.error('It was not possible to get whitelist')        
      }
    }
    getWhitelist();
  }, [])

  React.useEffect(() => {
  async function getBalances(tokensList: string[]) {
    type BalanceType = Record<string, BigNumber>
    let balanceArr: BalanceType = {}
    for (const token of tokensList) {
      const { balance } = ERC20(token)
      const balanceValue = await balance(wallet)
      balanceArr = {
        ...balanceArr,
        [mockTokens[token]]: balanceValue
      }
    }

    setTokensList(prev => {
        const newArr = prev.map(item => {
          item.balance = balanceArr[item?.id?.toLowerCase()]
          return item
        })
        return newArr
      })
  }
    const arr = whitelist ? whitelist : []
    {
      if (data) {
        getBalances(arr)
      }
    }
  }, [whitelist, wallet, data])

  return (
    <S.SelectAssets>
      <CreatePoolHeader title="Add new assets to the pool" />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to add',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Add liquidity to the pool',
            state: 'NEXT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'review',
            state: 'NEXT'
          },
        ]}
      />

      <S.TextContainer>
        <S.AddAssetsTitle>Token addition</S.AddAssetsTitle>
        <S.AddAssetsText>Select from the list the asset that will be added to the pool</S.AddAssetsText>
      </S.TextContainer>

      <AddAssetsTable tokensData={tokensList} priceList={priceData} />
    </S.SelectAssets>
  )
}

export default SelectAssets
