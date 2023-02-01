import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { AbiItem, toChecksumAddress } from 'web3-utils'
import Web3 from 'web3'

import { GET_INFO_TOKENS } from './graphql'
import { KASSANDRA_BACKEND } from '../../../constants/tokenAddresses'

import Loading from '../../Loading'
import Overlay from '../../Overlay'
import ModalWithMobile from '../ModalWithMobile'

import KassandraWhitelistAbi from "../../../constants/abi/KassandraWhitelist.json";

import * as S from './styles'

// whitelist vai ficar no subgraph
const WHITELIST_ADDRESS = "0xe119DE3b0FDab34e9CE490FDAa562e6457126A57";
const mockTokens: { [key: string]: string }= {
  "0x841a91e3De1202b7b750f464680068aAa0d0EA35": "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", // dai
  "0xDcfcef36F438ec310d8a699e3D3729398547b2BF": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270", // wmatic
  "0xca813266889e0FD141dF48B85294855616015fA4": "0xeeeeeb57642040be42185f49c52f7e9b38f8eeee", // elk
  "0xb22ED6ED220506E4757Bc90cbB05d41b6257b590": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",// tether 
  "0x2f52C8ce1e5A064B4202762aD34E075E8826C252": "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3", // bnb
  "0x874a7CE88d933e6Edc24f4867923F1d09568b08B": "0xb33eaad8d922b1083446dc23f610c2567fb5180f",// uniswap
  "0xB0C30dDFAF159ce47097E4b08A3436fAE8f43a4d": "0xd6df932a45c0f255f85145f286ea0b292b21c90b",// aave
  "0x07Fb45533CC34Cd88D69C57739ceFb77202733E9": "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6"// wbiticoin
}
interface IModalAvailableAssetsProps {
  chainIcon: JSX.Element;
  chainName: string;
  chainId: number;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ITokenProps = {
  name: string,
  symbol: string,
  logo: string
}

const ModalAvailableAssets = ({
  chainIcon,
  chainId,
  chainName,
  setModalOpen
}: IModalAvailableAssetsProps) => {
  const [whitelist, setWhitelist] = React.useState<string[]>();

  React.useEffect(() => {
    const getWhitelist = async () => {
      try {
        const web3 = new Web3("https://rpc.ankr.com/eth_goerli");
        // eslint-disable-next-line prettier/prettier
        const whitelistContract = new web3.eth.Contract((KassandraWhitelistAbi as unknown) as AbiItem, WHITELIST_ADDRESS);
        const whitelist = await whitelistContract.methods.getTokens(0, 50).call();
        
        setWhitelist(whitelist.map((token: string) => toChecksumAddress(mockTokens[token])));
      } catch (error) {
          console.error(Error)
      }
    }
    getWhitelist();
  }, [])

  const { data } = useSWR([GET_INFO_TOKENS, whitelist], (query, whitelist) =>
    request(KASSANDRA_BACKEND, query, {
      whitelist
    })
  )

  return (
    <S.ModalAvailableAssets>
      <Overlay onClick={() => setModalOpen(false)} />

      <ModalWithMobile
        title={`${chainName} Assets`}
        titleIcon={chainIcon}
        onCloseModal={() => setModalOpen(false)}
      >
        <S.ModalAvailableAssetsContent hasToken={data && data.tokensByIds}>
          {data && data.tokensByIds ? (
            data.tokensByIds.map((token: ITokenProps, index: number) => {
              return token && (
                <Link
                  key={token.name + index}
                  href={`https://heimdall-frontend.vercel.app/coins/${token.symbol.toLocaleLowerCase()}`}
                  passHref
                >
                  <S.tokenContent target="_blank">
                    <img src={token.logo} alt="" width={24} height={24} />
                    <p>{token.name}</p>
                  </S.tokenContent>
                </Link>
              )
            })
          ) : (
            <Loading marginTop={0} />
          )}
        </S.ModalAvailableAssetsContent>
      </ModalWithMobile>
    </S.ModalAvailableAssets>
  )
}

export default ModalAvailableAssets
