import React from 'react'

import { useAppDispatch } from '../../../../store/hooks'
import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import * as S from './styles'

const URL_1INCH = 'https://api.1inch.io/v5.0/'

const TokenSelection = () => {
  const [tokenList1Inch, setTokenList1Inch] = React.useState([])

  const dispatch = useAppDispatch()

  async function getTokenList1Inch() {
    const res = await fetch(`${URL_1INCH}1/tokens`)
    const json = await res.json()

    setTokenList1Inch(Object.values(json.tokens))
  }

  React.useEffect(() => {
    getTokenList1Inch()
  }, [])

  return (
    <S.TokenSelection>
      <span onClick={() => dispatch(setTokenSelected(false))}>
        Back to Invest
      </span>
      {tokenList1Inch.map((token: any) => (
        <p key={token.address}>{token.symbol}</p>
      ))}
    </S.TokenSelection>
  )
}

export default TokenSelection
