import Image from 'next/image'
import React from 'react'

import { setTokenSelect } from '../../../../../store/reducers/tokenSelect'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'

import logoNone from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

const TokenSelect = () => {
  const [openOptions, setOpenOptions] = React.useState<boolean>(false)

  const { pool, tokenSelect } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const listTokensWithinPool = [...pool.underlying_assets].sort(
    (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
  )

  React.useEffect(() => {
    const tokenInfo = listTokensWithinPool[0]?.token
    const { symbol, name, logo, decimals, id } = tokenInfo?.wraps
      ? tokenInfo.wraps
      : tokenInfo

    dispatch(
      setTokenSelect({
        address: id,
        decimals,
        logoURI: logo || logoNone.src,
        name,
        symbol
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
              {listTokensWithinPool.map(item => {
                const token = item.token.wraps ? item.token.wraps : item.token

                return (
                  <S.Option
                    key={item.token.id}
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
