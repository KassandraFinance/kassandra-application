import React from 'react'
import { useRouter } from 'next/router'

import { networks } from '@/constants/tokenAddresses'

import { usePoolData } from '@/hooks/query/usePoolData'
import { useAppDispatch } from '../../../../../../store/hooks'
import { setTokenSelect } from '../../../../../../store/reducers/tokenSelect'
import { setTokenSelectionActive } from '../../../../../../store/reducers/tokenSelectionActive'

import { ITokenListSwapProviderProps } from '..'

import * as S from './styles'

interface ITokenPinProps {
  tokenPinList: ITokenListSwapProviderProps[]
  setTokenPinList: React.Dispatch<
    React.SetStateAction<ITokenListSwapProviderProps[]>
  >
  tokenListSwapProvider: ITokenListSwapProviderProps[]
}

const TokenPin = ({
  tokenPinList,
  setTokenPinList,
  tokenListSwapProvider
}: ITokenPinProps) => {
  const [activeDeletePin, setactiveDeletePin] = React.useState<boolean>(false)

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const dispatch = useAppDispatch()

  function handleDeletePinToken(tokenAddress: string) {
    const tokenPinListFiltered = tokenPinList.filter(
      tokenPin => tokenPin.address !== tokenAddress
    )
    localStorage.setItem(
      `tokenSelection-${pool?.chain_id}`,
      JSON.stringify(tokenPinListFiltered)
    )
    setTokenPinList(tokenPinListFiltered)
  }

  React.useEffect(() => {
    if (!process.browser) return

    const hasStorage = localStorage.getItem(`tokenSelection-${pool?.chain_id}`)
    const hasStorages: ITokenListSwapProviderProps[] =
      hasStorage && JSON.parse(hasStorage)

    if (hasStorages?.length >= 0) {
      setTokenPinList(hasStorages)
    } else {
      const chosenTokenList = networks[pool?.chain_id ?? 137].chosenTokenList
      const tokenList = tokenListSwapProvider.filter(token =>
        chosenTokenList.includes(token.address)
      )

      localStorage.setItem(
        `tokenSelection-${pool?.chain_id}`,
        JSON.stringify(tokenList)
      )
      setTokenPinList(tokenList)
    }
  }, [])

  return (
    <S.TokenPinContainer>
      <S.TokenPinMobile onClick={() => setactiveDeletePin(!activeDeletePin)}>
        <img
          src="/assets/utilities/edit-icon.svg"
          alt=""
          width={16}
          height={16}
        />
      </S.TokenPinMobile>
      {tokenPinList.map(token => {
        return (
          <S.TokenPin key={token.symbol} isActive={activeDeletePin}>
            <S.TokenPinNameContent
              onClick={() => {
                dispatch(setTokenSelect(token))
                dispatch(setTokenSelectionActive(false))
              }}
            >
              <img
                src={token.logoURI}
                alt=""
                width={16}
                height={16}
                onError={event => {
                  const target = event.target as HTMLImageElement
                  target.onerror = null
                  target.src = `/assets/icons/coming-soon.svg`
                }}
              />
              <p>{token.symbol}</p>
            </S.TokenPinNameContent>
            <S.DeletePin onClick={() => handleDeletePinToken(token.address)}>
              <img
                src="/assets/utilities/close-icon.svg"
                width={7}
                height={7}
              />
            </S.DeletePin>
          </S.TokenPin>
        )
      })}
    </S.TokenPinContainer>
  )
}

export default TokenPin
