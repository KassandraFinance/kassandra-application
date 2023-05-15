import Image from 'next/image'
import Link from 'next/link'

import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import link from '../../../../../../public/assets/utilities/external-link.svg'
import walletIcon from '../../../../../../public/assets/utilities/wallet.svg'

import * as S from './styles'

interface ICoinSummaryProps {
  coinName: string
  coinSymbol: string
  coinImage: string
  chainImage?: string
  price: number | null
  url?: string | null
  balance?: number | null
  table?: boolean
}

const CoinSummary = ({
  coinImage,
  coinName,
  coinSymbol,
  price,
  chainImage,
  url = null,
  balance = null,
  table = false
}: ICoinSummaryProps) => {
  return (
    <S.CoinSummary>
      <S.ImageWrapper>
        {coinImage ? (
          <Image src={coinImage} layout="fill" />
        ) : (
          <TokenWithNetworkImage
            tokenImage={{
              url: coinImage,
              height: 24,
              width: 24,
              withoutBorder: true
            }}
            networkImage={{
              url: chainImage,
              height: 12,
              width: 12
            }}
            blockies={{
              size: 5,
              scale: 6,
              seedName: coinName
            }}
          />
        )}
      </S.ImageWrapper>

      <S.TextWrapper>
        <S.Name>
          <div>{coinName}</div>
          {/* {url && (
            <Link href={url} passHref>
              <S.ALink>
                <Image src={link} width={14} height={14} />
              </S.ALink>
            </Link>
          )} */}
        </S.Name>

        <S.Symbol table={table}>
          {coinSymbol} <span>| ${price}</span>
        </S.Symbol>

        {balance !== null && (
          <S.BalanceWrapper>
            <Image src={walletIcon} /> {balance} {coinSymbol}
          </S.BalanceWrapper>
        )}
      </S.TextWrapper>
    </S.CoinSummary>
  )
}

export default CoinSummary
