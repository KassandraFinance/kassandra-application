import React from 'react'

import { useAppDispatch } from '../../../../../store/hooks'
import { setTokenSelect } from '../../../../../store/reducers/tokenSelect'
import { setTokenSelected } from '../../../../../store/reducers/tokenSelected'

import { ITokenList1InchProps } from '../../..'

import * as S from './styles'

interface ITokenPinProps {
  tokenPinList: ITokenList1InchProps[];
  setTokenPinList: React.Dispatch<React.SetStateAction<ITokenList1InchProps[]>>;
  tokenList1Inch: ITokenList1InchProps[];
}

// eslint-disable-next-line prettier/prettier
const TokenPin = ({ tokenPinList, setTokenPinList, tokenList1Inch }: ITokenPinProps) => {
  const [activeDeletePin, setactiveDeletePin] = React.useState<boolean>(false)

  const dispatch = useAppDispatch()

  function handleDeletePinToken(tokenAddress: string) {
    const tokenPinListFiltered = tokenPinList.filter(
      tokenPin => tokenPin.address !== tokenAddress
    )
    localStorage.setItem('TokenSelection', JSON.stringify(tokenPinListFiltered))
    setTokenPinList(tokenPinListFiltered)
  }

  React.useEffect(() => {
    if (!process.browser) return

    const hasStorage = localStorage.getItem(`TokenSelection`)
    const hasStorages: ITokenList1InchProps[] =
      hasStorage && JSON.parse(hasStorage)

    if (hasStorages?.length >= 0) {
      setTokenPinList(hasStorages)
    } else {
      const tokenSearch = tokenList1Inch.slice(0, 6)
      localStorage.setItem('TokenSelection', JSON.stringify(tokenSearch))
      setTokenPinList(tokenSearch)
    }
  }, [])

  return (
    <S.tokenPinContainer>
      <S.tokenPinMobile onClick={() => setactiveDeletePin(!activeDeletePin)}>
        <img
          src="/assets/utilities/edit-icon.svg"
          alt=""
          width={16}
          height={16}
        />
      </S.tokenPinMobile>
      {tokenPinList.map(token => {
        return (
          <S.tokenPin key={token.address} isActive={activeDeletePin}>
            <div
              onClick={() => {
                dispatch(setTokenSelect(token))
                dispatch(setTokenSelected(false))
              }}
            >
              <img src={token.logoURI} alt="" width={16} height={16} />
              <p>{token.symbol}</p>
            </div>
            <S.DeletePin onClick={() => handleDeletePinToken(token.address)}>
              <img
                src="/assets/utilities/close-icon.svg"
                width={7}
                height={7}
              />
            </S.DeletePin>
          </S.tokenPin>
        )
      })}
    </S.tokenPinContainer>
  )
}

export default TokenPin
