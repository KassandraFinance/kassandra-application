import Image from 'next/image'
import Link from 'next/link'

import link from '../../../../../../public/assets/utilities/external-link.svg'

import * as S from './styles'

interface ICoinSummaryProps {
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  price: number | null;
  url?: string | null;
}

const CoinSummary = ({
  coinImage,
  coinName,
  coinSymbol,
  price,
  url = null
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
              <a>
                <Image src={link} />
              </a>
            </Link>
          )}
        </S.Name>

        <S.Symbol>
          {coinSymbol} <span>| ${price}</span>
        </S.Symbol>
      </S.TextWrapper>
    </S.CoinSummary>
  )
}

export default CoinSummary
