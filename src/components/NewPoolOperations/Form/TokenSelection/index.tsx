import React from 'react'
import { FixedSizeList as List } from 'react-window'

import { ITokenList1InchProps } from '../..'

import { useAppDispatch } from '../../../../store/hooks'
import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import * as S from './styles'

interface ITokenSelectionProps {
  tokenList1Inch: ITokenList1InchProps[];
}

interface ICurrencyRowProps {
  index: number;
  style: React.CSSProperties;
}

const TokenSelection = ({ tokenList1Inch }: ITokenSelectionProps) => {
  const [searchToken, setSearchToken] = React.useState('')

  const dispatch = useAppDispatch()

  function handleSearchToken(text: string) {
    setSearchToken(text.toLocaleLowerCase())
  }

  const CurrencyRow = React.useMemo(() => {
    return React.memo(function CurrencyRow({
      index,
      style
    }: ICurrencyRowProps) {
      return (
        <S.Token key={tokenList1Inch[index].address} style={style}>
          <S.TokenNameContent>
            <img
              src={tokenList1Inch[index].logoURI}
              alt=""
              width={24}
              height={24}
            />
            <S.TokenName>
              <span>{tokenList1Inch[index].name}</span>
              <p>{tokenList1Inch[index].symbol}</p>
            </S.TokenName>
          </S.TokenNameContent>
          <S.TokenValueInWalletContainer>
            <S.TokenValueInWallet>
              <span>$5.600.49</span>
              <p>4</p>
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
  }, [searchToken])

  return (
    <S.TokenSelection>
      <S.TokenSelectionHeader>
        <span onClick={() => dispatch(setTokenSelected(false))}>
          <img
            src="/assets/utilities/arrow-left-bold.svg"
            alt=""
            width={10}
            height={18}
          />
        </span>
        <p>Select Token</p>
        <span />
      </S.TokenSelectionHeader>
      <S.BodyToken>
        <S.InputContent>
          <img src="/assets/utilities/search.svg" alt="" />
          <S.SearchListInput
            placeholder="Search by name or paste address"
            value={searchToken}
            onChange={event => handleSearchToken(event.target.value)}
          />
        </S.InputContent>
        <S.tokenPinContainer>
          <S.tokenPin>
            <img
              src="/assets/utilities/edit-icon.svg"
              alt=""
              width={16}
              height={16}
            />
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>AVAX</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
        </S.tokenPinContainer>
        <S.TokenListContainer>
          {tokenList1Inch.length > 0 ? (
            <List
              innerElementType="ul"
              itemCount={tokenList1Inch.length}
              itemSize={58}
              height={3000}
              width={380}
            >
              {CurrencyRow}
            </List>
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
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
