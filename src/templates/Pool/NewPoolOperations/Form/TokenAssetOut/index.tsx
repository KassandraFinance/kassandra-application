import React from 'react'
// import Image from 'next/image'
// import Tippy from '@tippyjs/react'
import BigNumber from 'bn.js'
import Big from 'big.js'
import useSWR from 'swr'
import { request } from 'graphql-request'

// import web3 from '../../../../../utils/web3'
import { BNtoDecimal } from '../../../../../utils/numerals'

import { useAppSelector } from '../../../../../store/hooks'
import { ERC20 } from '../../../../../hooks/useERC20Contract'

import { GET_INFO_POOL } from '../graphql'

import * as S from './styles'

interface ITokenAssetOutProps {
  typeAction: string;
  amountTokenOut?: Big;
}

const TokenAssetOut = ({ typeAction, amountTokenOut }: ITokenAssetOutProps) => {
  const [outAssetBalance, setOutAssetBalance] = React.useState(new Big(-1))

  const { pool, chainId, userWalletAddress } = useAppSelector(state => state)

  const { data } = useSWR([GET_INFO_POOL], query =>
    request('https://backend.kassandra.finance', query, {
      id: pool.id
    })
  )

  React.useEffect(() => {
    if (
      pool.id.length === 0 ||
      userWalletAddress.length === 0 ||
      pool.chain_id.toString().length === 0
      // chainId !== pool.chainId
    ) {
      return
    }

    const token = ERC20(pool.id)

    token
      .balance(userWalletAddress)
      .then(newBalance => setOutAssetBalance(Big(newBalance.toString())))
  }, [chainId, typeAction, userWalletAddress, pool])

  return (
    <S.TokenAssetOut>
      <S.FlexContainer>
        <S.TokenContainer>
          <S.Title>Swap to</S.Title>
          <S.Token>
            <div className="img">
              <img src={pool.logo} alt="" width={22} height={22} />
            </div>
            <S.Symbol>{pool.symbol}</S.Symbol>
          </S.Token>
          <S.Balance>
            Balance:{' '}
            {outAssetBalance > new Big(-1)
              ? BNtoDecimal(
                  Big(outAssetBalance).div(Big(10).pow(18)),
                  pool.chain.nativeTokenDecimals
                )
              : '...'}
          </S.Balance>
        </S.TokenContainer>
        <S.InputContainer>
          {/* <Tippy content={disabled} disabled={true}> */}
          <S.Input
            readOnly={true}
            type="number"
            placeholder="0"
            value={Number(
              BNtoDecimal(
                amountTokenOut?.div(Big(10).pow(18)) || new BigNumber(0),
                18,
                6
              ).replace(/\s/g, '')
            )}
          />
          {/* </Tippy> */}
          <S.PriceDolar>
            {amountTokenOut &&
              data?.pool &&
              'USD: ' +
                BNtoDecimal(
                  Big(amountTokenOut.toString())
                    .mul(Big(data?.pool?.price_usd || 0))
                    .div(Big(10).pow(data?.pool?.decimals)),
                  18,
                  2,
                  2
                )}
          </S.PriceDolar>
        </S.InputContainer>
      </S.FlexContainer>
    </S.TokenAssetOut>
  )
}

export default TokenAssetOut
