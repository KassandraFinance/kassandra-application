import Tippy from '@tippyjs/react'

import * as S from './styles'

interface ITokenInfoProps {
  tokenData?: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
}

const TokenInfo = ({ tokenData }: ITokenInfoProps) => {
  return (
    <S.TokenInfo>
      {tokenData?.logo && (
        <Tippy content={tokenData?.symbol ?? ''}>
          <img
            src={tokenData?.logo}
            alt={`${tokenData?.symbol} token`}
            width={24}
            height={24}
          />
        </Tippy>
      )}

      <S.token>
        {tokenData?.amount && <p>{tokenData?.amount}</p>}
        {tokenData?.value && <p>${tokenData?.value}</p>}
      </S.token>
    </S.TokenInfo>
  )
}

export default TokenInfo
