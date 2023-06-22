import React from 'react'
import Link from 'next/link'
import useWhiteList from '@/hooks/useWhiteList'

import { networks, mockTokens } from '@/constants/tokenAddresses'
import useCoingecko from '@/hooks/useCoingecko'

import Loading from '../../Loading'
import Overlay from '../../Overlay'
import ModalWithMobile from '../ModalWithMobile'
import SelectTabs from '@/components/SelectTabs'

import polygonIcon from '@assets/logos/polygon.svg'
// import ethIcon from '@assets/logos/eth-logo.svg'

import * as S from './styles'
import { getAddress } from 'ethers'

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

  const { tokensWhitelist } = useWhiteList(
    networks[Number(isSelectTab)].chainId
  )
  const { data: coingecko } = useCoingecko(
    Number(isSelectTab),
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
        const whitelist = await tokensWhitelist()

        if (chainId === 5) {
          setWhitelist(
            whitelist.map((token: string) => getAddress(mockTokens[token]))
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
                      key={token.heimdallId}
                      href={`https://www.coingecko.com/coins/${token.heimdallId}`}
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
