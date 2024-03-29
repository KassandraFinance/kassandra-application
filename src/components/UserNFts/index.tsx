import React from 'react'
import Image from 'next/image'

import token96 from '@assets/logos/kacy-96.svg'
import ethLogo from '@assets/logos/eth-logo.svg'
import AVAXLogo from '@assets/logos/avalanche.svg'
import bscLogo from '@assets/logos/bsc.svg'
import cronosLogo from '@assets/logos/cronos.svg'
import fantomLogo from '@assets/logos/fantom.svg'
import maticLogo from '@assets/logos/polygon.svg'

import * as S from './styles'

interface IUserNFTsProps {
  address: string
  setUserImageModal: React.Dispatch<
    React.SetStateAction<{
      image_preview: string
      image_file: Blob | null
      isNFTPreviewModal: boolean
    }>
  >

  isDropdownAddNft: boolean
  setIsDropdownAddNft: React.Dispatch<React.SetStateAction<boolean>>
  inputRefModal: React.RefObject<HTMLInputElement>
  setUserNftDetails: React.Dispatch<
    React.SetStateAction<INftDetailsListProps | undefined>
  >
}

type INftDetailsProps = {
  contract_type: string
  name: string
  symbol: string
  token_address: string
  token_hash: string
  token_id: string
}

interface INftDetailsDataProps extends INftDetailsProps {
  metadata: string
  token_uri: string
}

export interface INftDetailsListProps extends INftDetailsProps {
  chain: string
  metadata: {
    image: string | undefined
    name: string
    description: string
  }
}

const blackList = ['ethercbase', 'ethercb', 'etherbycb']
const chains = ['eth', 'avalanche', 'bsc', 'matic', 'fantom', 'cronos']
const chainsName = ['ETH', 'AVAX', 'BSC', 'MATIC', 'FTM', 'CRO']
const ChainLogo: {
  [key: string]: { src: string; height: number; width: string }
} = {
  ETH: ethLogo,
  AVAX: AVAXLogo,
  BSC: bscLogo,
  MATIC: maticLogo,
  FTM: fantomLogo,
  CRO: cronosLogo
}

const UserNFTs = ({
  address,
  setUserImageModal,
  isDropdownAddNft,
  setIsDropdownAddNft,
  inputRefModal,
  setUserNftDetails
}: IUserNFTsProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [nfts, setNfts] = React.useState<INftDetailsListProps[]>([])

  async function getUsersNFTs() {
    setIsLoading(true)
    const arr = []

    for (let i = 0; i < chains.length; i++) {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chains[i]}&format=decimal`,
        {
          headers: {
            'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_KEY ?? ''
          }
        }
      )

      const data = await response.json()
      if (data) {
        arr.push([...data.result])
      }
    }

    const nftDetailsList: INftDetailsListProps[] = []
    if (arr.length > 0) {
      arr?.forEach((chainNfts: INftDetailsDataProps[], index: number) => {
        chainNfts.forEach((nftObjet: INftDetailsDataProps) => {
          const parsedMetadata = JSON.parse(nftObjet.metadata)

          const isBlackList = nftObjet?.token_uri?.match(
            blackList.toString().replaceAll(',', '|')
          )
          if (
            !parsedMetadata ||
            !parsedMetadata.name ||
            parsedMetadata.name.length == 0 ||
            isBlackList
          ) {
            return
          }

          const nftObj = {
            contract_type: nftObjet.contract_type,
            name: nftObjet.name,
            symbol: nftObjet.symbol,
            token_address: nftObjet.token_address,
            token_hash: nftObjet.token_hash,
            token_id: nftObjet.token_id,
            chain: chainsName[index],
            metadata: {
              image: handleCheckUrl(parsedMetadata?.image || null),
              name: parsedMetadata?.name || '',
              description: parsedMetadata?.description || ''
            }
          }
          nftDetailsList.push(nftObj)
        })
      })
    }
    setNfts(nftDetailsList)
    setIsLoading(false)
  }

  const handleCheckUrl = (image: string) => {
    if (image) {
      const hashNft = image.match(/(^ipfs:\/\/.*)([a-zA-Z0-9]{46}.*)/)

      return hashNft ? `https://infura-ipfs.io/ipfs/${hashNft[2]}` : image
    }
  }

  function handleClickNft(nft: INftDetailsListProps) {
    inputRefModal.current && (inputRefModal.current.value = '')

    setUserImageModal({
      image_preview: nft.metadata.image ?? '',
      image_file: null,
      isNFTPreviewModal: true
    })

    setUserNftDetails(nft)

    setIsDropdownAddNft(false)
  }

  React.useEffect(() => {
    getUsersNFTs()
  }, [address])

  return (
    <>
      <S.Backdrop
        style={{ display: isDropdownAddNft ? 'block' : 'none' }}
        onClick={() => setIsDropdownAddNft(false)}
      />
      <S.Container>
        {isLoading ? (
          <>
            <S.LoadingContainer>
              <h2>fetching data...</h2>
              <S.ImageLoadingPulse>
                <Image src={token96} alt="Loading" width={60} height={60} />
              </S.ImageLoadingPulse>
            </S.LoadingContainer>
          </>
        ) : (
          <>
            {nfts.length > 0 ? (
              <>
                {nfts.map(
                  (nft: INftDetailsListProps) =>
                    nft?.metadata?.image && (
                      <S.NftContent
                        key={nft.token_address + nft.token_id + nft.token_hash}
                        onClick={() => handleClickNft(nft)}
                      >
                        <S.ImageContent>
                          <img
                            src={nft?.metadata?.image}
                            alt="NFT images"
                            loading="lazy"
                          />
                        </S.ImageContent>
                        <S.NftDetails>
                          <p>{nft?.metadata?.name}</p>
                          <span>
                            <Image
                              src={ChainLogo[nft.chain].src}
                              alt=""
                              width={14}
                              height={14}
                            />
                            <strong>{nft.chain}</strong>
                          </span>
                        </S.NftDetails>
                      </S.NftContent>
                    )
                )}
              </>
            ) : (
              <S.NoHaveNFT>You don&apos;t have NFT</S.NoHaveNFT>
            )}
          </>
        )}
      </S.Container>
    </>
  )
}

export default UserNFTs
