import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import request from 'graphql-request'

import { AbiItem, toChecksumAddress } from 'web3-utils'
import Web3 from 'web3'

import { GET_INFO_TOKENS } from './graphql'
import { BACKEND_KASSANDRA } from '../../../constants/tokenAddresses'

import Loading from '../../Loading'
import Overlay from '../../Overlay'
import ModalWithMobile from '../ModalWithMobile'
import SelectTabs from '@/components/SelectTabs'

import KassandraWhitelistAbi from '../../../constants/abi/KassandraWhitelist.json'

import polygonIcon from '@assets/logos/matic.svg'
import ethIcon from '@assets/logos/eth-logo.svg'

import * as S from './styles'

import { mockTokens, networks } from '../../../constants/tokenAddresses'

const tabs = [
  {
    asPathText: '5',
    text: 'Goerly',
    icon: ethIcon
  },
  {
    asPathText: '137',
    text: 'Polygon',
    icon: polygonIcon
  }
]

interface IModalAvailableAssetsProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type ITokenProps = {
  name: string
  symbol: string
  logo: string
}

const ModalAvailableAssets = ({ setModalOpen }: IModalAvailableAssetsProps) => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('5')

  React.useEffect(() => {
    if (!isSelectTab) {
      return
    }

    if (Array.isArray(isSelectTab)) {
      return
    }

    const chainId = Number(isSelectTab)

    const getWhitelist = async () => {
      try {
        const web3 = new Web3(networks[chainId].rpc)
        // eslint-disable-next-line prettier/prettier
        const whitelistContract = new web3.eth.Contract(
          KassandraWhitelistAbi as unknown as AbiItem,
          networks[chainId].whiteList
        )
        const whitelist = await whitelistContract.methods
          .getTokens(0, 100)
          .call()

        if (chainId === 5) {
          setWhitelist(
            whitelist.map((token: string) =>
              toChecksumAddress(mockTokens[token])
            )
          )
        } else {
          setWhitelist(whitelist)
        }
      } catch (error) {
        console.error(Error)
      }
    }
    getWhitelist()
  }, [isSelectTab])

  const { data } = useSWR([GET_INFO_TOKENS, whitelist], (query, whitelist) =>
    request(BACKEND_KASSANDRA, query, {
      whitelist
    })
  )

  return (
    <S.ModalAvailableAssets>
      <Overlay onClick={() => setModalOpen(false)} />

      <ModalWithMobile
        title={`Available Assets`}
        onCloseModal={() => setModalOpen(false)}
      >
        <>
          <SelectTabs
            tabs={tabs}
            isSelect={isSelectTab}
            setIsSelect={setIsSelectTab}
          />

          <S.ModalAvailableAssetsContent hasToken={data && data.tokensByIds}>
            {data && data.tokensByIds ? (
              data.tokensByIds.map((token: ITokenProps, index: number) => {
                return (
                  token && (
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
                )
              })
            ) : (
              <Loading marginTop={0} />
            )}
          </S.ModalAvailableAssetsContent>
        </>
      </ModalWithMobile>
    </S.ModalAvailableAssets>
  )
}

export default ModalAvailableAssets
