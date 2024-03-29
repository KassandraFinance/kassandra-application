import React from 'react'
import { useRouter } from 'next/router'
import { FixedSizeList as List, ListOnScrollProps } from 'react-window'

import { usePoolData } from '@/hooks/query/usePoolData'

import { IUserTokenProps, ITokenListSwapProviderProps } from '../'

import { useAppDispatch } from '@/store/hooks'
import { setTokenSelectionActive } from '@/store/reducers/tokenSelectionActive'
import { TokenSelectProps } from '@/store/reducers/poolCreationSlice'

import * as S from './styles'

interface ITokenListProps {
  filteredToken: IUserTokenProps[]
  tokenPinList: ITokenListSwapProviderProps[]
  setTokenPinList: React.Dispatch<
    React.SetStateAction<ITokenListSwapProviderProps[]>
  >
  setTokenSelected: (token: TokenSelectProps) => void
  pin?: boolean
}

export type ITokenPinprops = {
  [key: string]: boolean
}

interface ICurrencyRowProps {
  index: number
  style: React.CSSProperties
}

const TokensSwapProviderList = ({
  filteredToken,
  tokenPinList,
  setTokenPinList,
  setTokenSelected,
  pin = true
}: ITokenListProps) => {
  const [isShowShadow, setisShowShadow] = React.useState(true)

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const dispatch = useAppDispatch()

  const TokenListContainerRef = React.useRef<HTMLDivElement>(null)

  const tokenListPin: ITokenPinprops = tokenPinList.reduce(
    (addressAccumulator, tokenCurrent) =>
      Object.assign(addressAccumulator, { [tokenCurrent.address]: true }),
    {}
  )

  function handleOnScroll(event: ListOnScrollProps) {
    const scrollValue = event.scrollOffset
    const clientHeight = TokenListContainerRef.current?.clientHeight || 320
    const scrollHeight = filteredToken.length * 58 - clientHeight

    if (scrollValue !== scrollHeight && isShowShadow === false) {
      setisShowShadow(true)
    }
    if (scrollValue === scrollHeight) {
      setisShowShadow(false)
    }
  }

  function handleClickAddPin(token: IUserTokenProps) {
    const hasStorage = localStorage.getItem(`tokenSelection-${pool?.chain_id}`)
    const tokenPinfiltered = hasStorage && JSON.parse(hasStorage)
    const checkTokenPin = tokenPinfiltered?.some(
      (tokenPin: ITokenListSwapProviderProps) =>
        tokenPin.address === token.address
    )

    if (checkTokenPin) {
      const tokenFiltered = tokenPinList.filter(
        tokenPin => tokenPin.address !== token.address
      )
      localStorage.setItem(
        `tokenSelection-${pool?.chain_id}`,
        JSON.stringify(tokenFiltered)
      )
      setTokenPinList(tokenFiltered)
    } else {
      localStorage.setItem(
        `tokenSelection-${pool?.chain_id}`,
        JSON.stringify([...tokenPinfiltered, token])
      )
      setTokenPinList([...tokenPinfiltered, token])
    }
  }

  const CurrencyRow = React.useMemo(() => {
    return React.memo(function CurrencyRow({
      index,
      style
    }: ICurrencyRowProps) {
      const token = filteredToken[index]

      return (
        <S.Token
          key={token?.symbol}
          style={style}
          onClick={() => {
            // dispatch(setTokenSelect(token))
            setTokenSelected(token)
            dispatch(setTokenSelectionActive(false))
          }}
        >
          <S.TokenNameContent>
            <img
              src={token?.logoURI}
              alt=""
              width={24}
              height={24}
              onError={event => {
                const target = event.target as HTMLImageElement
                target.onerror = null
                target.src = `/assets/icons/coming-soon.svg`
              }}
            />
            <S.TokenName>
              <span>{token?.name}</span>
              <p>{token?.symbol}</p>
            </S.TokenName>
          </S.TokenNameContent>
          <S.TokenValueInWalletContainer>
            <S.TokenValueInWallet>
              <span>
                {token?.balanceInDollar.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumSignificantDigits: 3
                }) || 0}
              </span>
              <p>{token?.balance || 0}</p>
            </S.TokenValueInWallet>
            {pin && (
              <S.PinContainer onClick={() => handleClickAddPin(token)}>
                {tokenListPin[token?.address] ? (
                  <svg
                    width="10"
                    height="14"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.66683 4.99992V1.66659H8.3335C8.70016 1.66659 9.00016 1.36659 9.00016 0.999919C9.00016 0.633252 8.70016 0.333252 8.3335 0.333252H1.66683C1.30016 0.333252 1.00016 0.633252 1.00016 0.999919C1.00016 1.36659 1.30016 1.66659 1.66683 1.66659H2.3335V4.99992C2.3335 6.10659 1.44016 6.99992 0.333496 6.99992V8.33325H4.3135V12.9999L4.98016 13.6666L5.64683 12.9999V8.33325H9.66683V6.99992C8.56016 6.99992 7.66683 6.10659 7.66683 4.99992Z"
                      fill="#FCFCFC"
                    />
                  </svg>
                ) : (
                  <svg
                    width="10"
                    height="14"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.3335 1.66659V4.99992C6.3335 5.74659 6.58016 6.43992 7.00016 6.99992H3.00016C3.4335 6.42659 3.66683 5.73325 3.66683 4.99992V1.66659H6.3335ZM8.3335 0.333252H1.66683C1.30016 0.333252 1.00016 0.633252 1.00016 0.999919C1.00016 1.36659 1.30016 1.66659 1.66683 1.66659H2.3335V4.99992C2.3335 6.10659 1.44016 6.99992 0.333496 6.99992V8.33325H4.3135V12.9999L4.98016 13.6666L5.64683 12.9999V8.33325H9.66683V6.99992C8.56016 6.99992 7.66683 6.10659 7.66683 4.99992V1.66659H8.3335C8.70016 1.66659 9.00016 1.36659 9.00016 0.999919C9.00016 0.633252 8.70016 0.333252 8.3335 0.333252Z"
                      fill="#FCFCFC"
                    />
                  </svg>
                )}
              </S.PinContainer>
            )}
          </S.TokenValueInWalletContainer>
        </S.Token>
      )
    })
  }, [tokenPinList, filteredToken])

  return (
    <S.TokenListContainer ref={TokenListContainerRef}>
      {filteredToken.length > 0 ? (
        <>
          <List
            innerElementType="ul"
            itemCount={filteredToken.length}
            itemSize={58}
            height={3000}
            width="100%"
            onScroll={event => handleOnScroll(event)}
          >
            {CurrencyRow}
          </List>
          <S.shadow isShowShadow={isShowShadow && filteredToken.length > 6} />
        </>
      ) : (
        <S.NotFoundTokenContent>
          <img
            src="/assets/images/kacy-error.svg"
            alt=""
            width={60}
            height={54}
          />
          <p>Nothing found</p>
        </S.NotFoundTokenContent>
      )}
    </S.TokenListContainer>
  )
}

export default TokensSwapProviderList
