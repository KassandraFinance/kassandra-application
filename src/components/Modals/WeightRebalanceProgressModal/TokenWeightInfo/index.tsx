import React from 'react'
import Link from 'next/link'

import * as S from './styles'

// interface ITokenWeightInfoProps {
// }

const TokenWeightInfo = () => {
  // eslint-disable-next-line prettier/prettier
  const [isOpenTokenInfoMobile, setIsOpenTokenInfoMobile] = React.useState(false)

  return (
    <S.TokenWeightInfo
      isOpenTokenInfo={isOpenTokenInfoMobile}
      onClick={() => setIsOpenTokenInfoMobile(!isOpenTokenInfoMobile)}
    >
      <S.TokenInfoContainer>
        <img
          src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png"
          alt=""
          width={24}
          height={24}
        />
        <S.TokenInfoContent>
          <Link href="#" passHref>
            <S.TokenNameContent target="_blank">
              <p>MATIC</p>
              <img
                src="/assets/utilities/external-link.svg"
                alt=""
                width={14}
                height={14}
              />
            </S.TokenNameContent>
          </Link>
          <p>MATIC</p>
        </S.TokenInfoContent>

        <S.ArrowDownContainer isOpenTokenInfo={isOpenTokenInfoMobile}>
          <img
            id="arrowDown"
            src="/assets/utilities/arrow-select-down.svg"
            alt=""
            width={14}
            height={14}
          />
        </S.ArrowDownContainer>
      </S.TokenInfoContainer>

      <S.WeightContent>
        <span>previous weight</span>
        <p>20%</p>
      </S.WeightContent>
      <S.WeightContent>
        <span>current weight</span>
        <p>30%</p>
      </S.WeightContent>
      <S.WeightContent>
        <span>final weight</span>
        <p>50%</p>
      </S.WeightContent>
    </S.TokenWeightInfo>
  )
}

export default TokenWeightInfo
