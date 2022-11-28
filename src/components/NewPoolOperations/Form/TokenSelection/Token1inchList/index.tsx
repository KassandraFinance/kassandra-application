import React from 'react'
import { FixedSizeList as List } from 'react-window'

import { IListbalanceTokenprops, IListTokenPricesprops, IUserTokenProps } from '..'

import { useAppDispatch } from '../../../../../store/hooks'
import { setTokenSelected } from '../../../../../store/reducers/tokenSelected'
import { setTokenSelect } from '../../../../../store/reducers/tokenSelect'

import * as S from './styles'

interface IToken1inchListProps {
  filteredToken: IUserTokenProps[];
  searchToken: string;
  listBalanceToken: IListbalanceTokenprops;
  listTokenPrices: IListTokenPricesprops;
}

interface ICurrencyRowProps {
  index: number;
  style: React.CSSProperties;
}

const Token1inchList = ({ filteredToken, searchToken, listBalanceToken, listTokenPrices}: IToken1inchListProps) => {
  const dispatch = useAppDispatch()

  const CurrencyRow = React.useMemo(() => {
    return React.memo(function CurrencyRow({
      index,
      style
    }: ICurrencyRowProps) {
      return (
        <S.Token key={filteredToken[index]?.address} style={style} onClick={() => {
          dispatch(setTokenSelect(filteredToken[index]))
          dispatch(setTokenSelected(false))
        }}>
          <S.TokenNameContent>
            <img
              src={filteredToken[index]?.logoURI}
              alt=""
              width={24}
              height={24}
              onError={(event) => {
                // eslint-disable-next-line prettier/prettier
                const target = event.target as HTMLImageElement
                target.onerror = null
                target.src = `/assets/icons/coming-soon.svg`
              }}
            />
            <S.TokenName>
              <span>{filteredToken[index]?.name}</span>
              <p>{filteredToken[index]?.symbol}</p>
            </S.TokenName>
          </S.TokenNameContent>
          <S.TokenValueInWalletContainer>
            <S.TokenValueInWallet>
              <span>${filteredToken[index]?.balanceInDollar || 0}</span>
              <p>{filteredToken[index]?.balance || 0}</p>
            </S.TokenValueInWallet>
            <img
              src="/assets/utilities/pin.svg"
              alt=""
              width={10}
              height={14}
            />
          </S.TokenValueInWalletContainer>
        </S.Token>
      )
    })
  }, [searchToken, listBalanceToken, listTokenPrices])

  return (
    <S.TokenListContainer>
      {filteredToken.length > 0 ? (
        <>
          <List
            innerElementType="ul"
            itemCount={filteredToken.length}
            itemSize={58}
            height={3000}
            width={385}
          >
            {CurrencyRow}
          </List>
          <S.shadow />
        </>
      ) : (
        <S.NotFoundTokenContent>
          <img
            src="/assets/images/kacy-error.svg"
            alt=""
            width={58}
            height={52}
          />
          <p>Nothing found</p>
        </S.NotFoundTokenContent>
      )}
    </S.TokenListContainer>
  )
}

export default Token1inchList
