import Image from 'next/image'
import React from 'react'

import { setTokenSelect } from '../../../../../store/reducers/tokenSelect'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

import logoNone from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

interface ITokenSelectProps {
  tokenList?: {
    id: string
    decimals: number
    logo?: string | null
    name: string
    symbol: string
  }[]
}

const TokenSelect = ({ tokenList }: ITokenSelectProps) => {
  const [openOptions, setOpenOptions] = React.useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { tokenSelect } = useAppSelector(state => state)

  React.useEffect(() => {
    if (!tokenList) return

    const tokenInfo = tokenList[0]

    dispatch(
      setTokenSelect({
        address: tokenInfo?.id ?? '',
        decimals: tokenInfo?.decimals ?? 18,
        logoURI: tokenInfo?.logo || logoNone.src,
        name: tokenInfo?.name ?? '',
        symbol: tokenInfo?.symbol ?? ''
      })
    )
  }, [])

  return (
    <S.TokenSelect>
      <S.SelectToken openOptions={openOptions}>
        <S.Selected
          openOptions={openOptions}
          onClick={() => setOpenOptions(!openOptions)}
        >
          <S.tokenInfo>
            <S.TokenLogo>
              <Image
                src={tokenSelect.logoURI || logoNone.src}
                alt=""
                width={22}
                height={22}
              />
            </S.TokenLogo>
            <p>{tokenSelect.symbol}</p>
          </S.tokenInfo>
          <S.ArrowDown openOptions={openOptions}>
            <Image
              src="/assets/utilities/arrow-down-thin.svg"
              alt=""
              width={14}
              height={14}
            />
          </S.ArrowDown>
        </S.Selected>
        {openOptions && (
          <>
            <S.Backdrop onClick={() => setOpenOptions(false)} />
            <S.OptionsContent>
              {tokenList &&
                tokenList.map(token => {
                  return (
                    <S.Option
                      key={token.id}
                      onClick={() => {
                        setOpenOptions(false)
                        dispatch(
                          setTokenSelect({
                            address: token.id,
                            decimals: token.decimals,
                            logoURI: token.logo || logoNone.src,
                            name: token.name,
                            symbol: token.symbol
                          })
                        )
                      }}
                    >
                      <S.ImageContainer>
                        <Image
                          src={token.logo || logoNone}
                          alt=""
                          width={22}
                          height={22}
                        />
                      </S.ImageContainer>
                      {token.symbol}
                    </S.Option>
                  )
                })}
            </S.OptionsContent>
          </>
        )}
      </S.SelectToken>
    </S.TokenSelect>
  )
}

export default TokenSelect
