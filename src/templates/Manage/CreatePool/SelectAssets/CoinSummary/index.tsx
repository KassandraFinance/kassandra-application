import Image from 'next/image'
import Link from 'next/link'

import link from '../../../../../../public/assets/utilities/external-link.svg'
import walletIcon from '../../../../../../public/assets/utilities/wallet.svg'

import * as S from './styles'

interface ICoinSummaryProps {
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  price: number | null;
  url?: string | null;
  balance?: number | null;
  table?: boolean;
}

const CoinSummary = ({
  coinImage,
  coinName,
  coinSymbol,
  price,
  url = null,
  balance = null,
  table = false
}: ICoinSummaryProps) => {
  return (
    <S.CoinSummary>
      <S.ImageWrapper>
        <Image src={coinImage} width={24} height={24} />
      </S.ImageWrapper>

      <S.TextWrapper>
        <S.Name>
          {coinName}
          {url && (
            <Link href={url} passHref>
              <S.ALink>
                <Image src={link} width={14} height={14} />
              </S.ALink>
            </Link>
          )}
        </S.Name>

        <S.Symbol table={table}>
          {coinSymbol} <span>| ${price}</span>
        </S.Symbol>

        {balance && (
          <S.BalanceWrapper>
            <Image src={walletIcon} /> {balance} {coinSymbol}
          </S.BalanceWrapper>
        )}
      </S.TextWrapper>
    </S.CoinSummary>
  )
}

export default CoinSummary
