import React from 'react'
import Link from 'next/link'

import * as S from './styles'

import { ITokenProps } from '..'

interface ITokenWeightInfoProps {
  token: {
    token: Omit<ITokenProps, 'decimals'>,
    previous: string,
    current: string,
    final: string
  };
}

const TokenWeightInfo = ({ token }: ITokenWeightInfoProps) => {
  // eslint-disable-next-line prettier/prettier
  const [isOpenTokenInfoMobile, setIsOpenTokenInfoMobile] = React.useState(false)

  return (
    <S.TokenWeightInfo
      isOpenTokenInfo={isOpenTokenInfoMobile}
      onClick={() => setIsOpenTokenInfoMobile(!isOpenTokenInfoMobile)}
    >
      <S.TokenInfoContainer>
        <img src={token.token.logo} alt="" width={24} height={24} />
        <S.TokenInfoContent>
          <Link href="#" passHref>
            <S.TokenNameContent target="_blank">
              <p>{token.token.name}</p>
              <img
                src="/assets/utilities/external-link.svg"
                alt=""
                width={14}
                height={14}
              />
            </S.TokenNameContent>
          </Link>
          <p>{token.token.symbol}</p>
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
        <p>{token.previous}%</p>
      </S.WeightContent>
      <S.WeightContent>
        <span>current weight</span>
        <p>{token.current}%</p>
      </S.WeightContent>
      <S.WeightContent>
        <span>final weight</span>
        <p>{token.final}%</p>
      </S.WeightContent>
    </S.TokenWeightInfo>
  )
}

export default TokenWeightInfo
