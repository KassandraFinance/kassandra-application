import React from 'react'
// import Image from 'next/image'
// import Tippy from '@tippyjs/react'
import BigNumber from 'bn.js'
import Big from 'big.js'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Blockies from 'react-blockies'
import { useConnectWallet } from '@web3-onboard/react'

import { BACKEND_KASSANDRA } from '../../../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../../../utils/numerals'
import { getBalanceToken, getPoolPrice } from '../../../../../utils/poolUtils'
import PoolOperationContext from '../PoolOperationContext'

import { useAppSelector } from '../../../../../store/hooks'

import { GET_INFO_POOL } from '../graphql'

import * as S from './styles'

interface ITokenAssetOutProps {
  typeAction: string
  amountTokenOut?: Big
  outAssetBalance: Big
  setOutAssetBalance: React.Dispatch<React.SetStateAction<Big>>
}

const TokenAssetOut = ({
  typeAction,
  amountTokenOut,
  outAssetBalance,
  setOutAssetBalance
}: ITokenAssetOutProps) => {
  const [{ wallet }] = useConnectWallet()
  const { pool } = useAppSelector(state => state)
  const { priceToken } = React.useContext(PoolOperationContext)

  const chainId = Number(wallet?.chains[0].id ?? '0x89')

  const { data } = useSWR([GET_INFO_POOL], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id
    })
  )

  React.useEffect(() => {
    if (pool.id.length === 0 || !wallet || pool.chain_id !== chainId) {
      return setOutAssetBalance(Big(0))
    }
    // eslint-disable-next-line prettier/prettier
    ;(async () => {
      const balance = await getBalanceToken(
        pool.address,
        wallet.accounts[0].address,
        chainId
      )
      setOutAssetBalance(balance)
    })()
  }, [chainId, typeAction, wallet, pool])

  return (
    <S.TokenAssetOut>
      <S.FlexContainer>
        <S.TokenContainer>
          <S.Title>Swap to</S.Title>
          <S.Token>
            <div className="img">
              {pool.logo ? (
                <img src={pool.logo} alt="" width={22} height={22} />
              ) : (
                <Blockies
                  className="poolIcon"
                  seed={pool.name}
                  size={8}
                  scale={3}
                />
              )}
            </div>
            <S.Symbol>{pool.symbol}</S.Symbol>
          </S.Token>
          <S.Balance>
            Balance:{' '}
            {outAssetBalance.gt(-1)
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
            value={BNtoDecimal(
              amountTokenOut?.div(Big(10).pow(18)) || new BigNumber(0),
              18,
              6
            ).replace(/\s/g, '')}
          />
          {/* </Tippy> */}
          <S.PriceDolar>
            {amountTokenOut &&
              data?.pool &&
              'USD: ' +
                BNtoDecimal(
                  Big(amountTokenOut.toString())
                    .mul(
                      getPoolPrice({
                        assets: pool.underlying_assets,
                        priceToken,
                        poolSupply: pool.supply
                      })
                    )
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
