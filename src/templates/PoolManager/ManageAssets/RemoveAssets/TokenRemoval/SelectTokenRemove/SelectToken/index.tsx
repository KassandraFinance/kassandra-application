import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokenSelection } from '@/store/reducers/removeAssetSlice'
import React from 'react'

import * as S from './styles'

const SelectToken = () => {
  const [IsOpenTokenList, setIsOpenTokenList] = React.useState(false)

  const dispatch = useAppDispatch()

  const { poolTokensList, tokenSelection } = useAppSelector(
    state => state.removeAsset
  )

  return (
    <S.SelectToken>
      <S.SelectedTokenContent
        onClick={() => setIsOpenTokenList(!IsOpenTokenList)}
      >
        <S.TokenInfoContent>
          {tokenSelection.address !== '' ? (
            <>
              <img src={tokenSelection.logo} alt="" width={20} height={20} />
              <p>{tokenSelection.symbol}</p>
            </>
          ) : (
            <>
              <p>Choose asset</p>
              <input
                form="manageAssetsForm"
                id="inputSelectToken"
                name="inputSelectToken"
                type="radio"
                value={tokenSelection.address}
                required
              />
            </>
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
          return (
            <S.SelectTokenContent
              key={token.symbol + index}
              onClick={() => {
                dispatch(setTokenSelection(token))
                setIsOpenTokenList(!IsOpenTokenList)
              }}
            >
              <S.TokenInfoContent>
                <img src={token.logo} alt="" width={20} height={20} />
                <p>{token.symbol}</p>
              </S.TokenInfoContent>
              <S.BalanaceInfoContent>
                <p>${token.balanceUSD && token.balanceUSD.toFixed(2)}</p>
                <span>{Number(token.balance).toFixed(2)}</span>
              </S.BalanaceInfoContent>
            </S.SelectTokenContent>
          )
        })}
      </S.SelectTokenContainer>
    </S.SelectToken>
  )
}

export default SelectToken
