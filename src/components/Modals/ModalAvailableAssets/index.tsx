import React from 'react'
import Link from 'next/link'
import { AbiItem, toChecksumAddress } from 'web3-utils'
import Web3 from 'web3'

import { networks, mockTokens } from '@/constants/tokenAddresses'
import useCoingecko from '@/hooks/useCoingecko'

import Loading from '../../Loading'
import Overlay from '../../Overlay'
import ModalWithMobile from '../ModalWithMobile'
import SelectTabs from '@/components/SelectTabs'

import KassandraWhitelistAbi from '../../../constants/abi/KassandraWhitelist.json'

import polygonIcon from '@assets/logos/polygon.svg'
// import ethIcon from '@assets/logos/eth-logo.svg'

import * as S from './styles'

const tabs = [
  // {
  //   asPathText: '5',
  //   text: 'Goerly',
  //   icon: ethIcon
  // },
  {
    asPathText: '137',
    text: 'Polygon',
    icon: polygonIcon
  }
]

interface IModalAvailableAssetsProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAvailableAssets = ({ setModalOpen }: IModalAvailableAssetsProps) => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [isSelectTab, setIsSelectTab] = React.useState<
    string | string[] | undefined
  >('137')

  const { data: coingecko } = useCoingecko(
    networks[Number(isSelectTab)].coingecko,
    networks[Number(isSelectTab)].nativeCurrency.address,
    whitelist || []
  )

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

          <S.ModalAvailableAssetsContent
            hasToken={Object.keys(coingecko || {}).length > 0}
          >
            {coingecko ? (
              Object.values(coingecko).map(token => {
                return (
                  token && (
                    <Link
                      key={token.id}
                      href={`https://www.coingecko.com/coins/${token.id}`}
                      passHref
                    >
                      <S.tokenContent target="_blank">
                        <img src={token.image} alt="" width={24} height={24} />
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
