import React from 'react'
import Big from 'big.js'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokenSelection } from '@/store/reducers/removeAssetSlice'
import { mockTokens } from '@/constants/tokenAddresses'

import * as S from './styles'

interface ISelectTokenProps {
  priceToken: (address: string) => string
  chainId: number
}

const SelectToken = ({ priceToken, chainId }: ISelectTokenProps) => {
  const [IsOpenTokenList, setIsOpenTokenList] = React.useState(false)

  const dispatch = useAppDispatch()
  const { poolTokensList, tokenSelection } = useAppSelector(
    state => state.removeAsset
  )

  return (
    <S.SelectToken>
      <S.Backdrop
        onClick={() => setIsOpenTokenList(!IsOpenTokenList)}
        style={{ display: IsOpenTokenList ? 'block' : 'none' }}
      />
      <S.SelectedTokenContent
        onClick={() => setIsOpenTokenList(!IsOpenTokenList)}
      >
        <S.TokenInfoContent>
          <input
            form="manageAssetsForm"
            id="inputSelectToken"
            name="inputSelectToken"
            type="radio"
            value={tokenSelection.address}
            required
            checked={tokenSelection.address !== ''}
            onChange={() => {
              return
            }}
          />
          {tokenSelection.address !== '' ? (
            <>
              <img src={tokenSelection.logo} alt="" width={20} height={20} />
              <p>{tokenSelection.symbol}</p>
            </>
          ) : (
            <p>Choose asset</p>
          )}
        </S.TokenInfoContent>
        <S.ArrowContent isOpen={IsOpenTokenList}>
          <img
            src="/assets/utilities/arrow-select-down.svg"
            alt=""
            width={14}
            height={14}
          />
        </S.ArrowContent>
      </S.SelectedTokenContent>
      <S.SelectTokenContainer
        isOpen={IsOpenTokenList}
        itemHeight={poolTokensList.length * 63.3}
      >
        {poolTokensList.map((token, index) => {
          const balanceInUSD = Big(token.balance)
            .mul(
              priceToken(
                chainId === 5
                  ? mockTokens[token.address]
                  : token.address.toLowerCase()
              ) ?? 0
            )
            .toFixed(2)

          return (
            <S.SelectTokenContent
              key={token.symbol + index}
              onClick={() => {
                dispatch(setTokenSelection({ ...token, balanceInUSD }))
                setIsOpenTokenList(!IsOpenTokenList)
              }}
            >
              <S.TokenInfoContent>
                <img src={token.logo} alt="" width={20} height={20} />
                <p>{token.symbol}</p>
              </S.TokenInfoContent>
              <S.BalanaceInfoContent>
                <p>{Number(token.balance).toFixed(2)}</p>
                <span>${balanceInUSD}</span>
              </S.BalanaceInfoContent>
            </S.SelectTokenContent>
          )
        })}
      </S.SelectTokenContainer>
    </S.SelectToken>
  )
}

export default SelectToken
