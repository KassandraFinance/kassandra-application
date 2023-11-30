import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import Blockies from 'react-blockies'
import { useConnectWallet } from '@web3-onboard/react'

import { usePoolInfo } from '@/hooks/query/usePoolInfo'
import { usePoolData } from '@/hooks/query/usePoolData'

import { BNtoDecimal } from '../../../../../utils/numerals'
import { getBalanceToken, getPoolPrice } from '../../../../../utils/poolUtils'
import PoolOperationContext from '../PoolOperationContext'

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
  const { priceToken } = React.useContext(PoolOperationContext)

  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const chainId = Number(wallet?.chains[0].id ?? '0x89')

  const { data } = usePoolInfo({
    id: pool?.id || '',
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24)
  })

  const priceUSD = BNtoDecimal(
    Big(amountTokenOut?.toString() ?? '0')
      .mul(
        getPoolPrice({
          assets: pool?.underlying_assets || [],
          priceToken,
          poolSupply: pool?.supply ?? ''
        })
      )
      .div(Big(10).pow(data?.decimals ?? 18)),
    18,
    2,
    2
  )

  const priceUSDPartial = priceUSD?.split('.')
  const priceUSDLength = priceUSDPartial[1]?.length ?? 0

  React.useEffect(() => {
    if (pool?.id?.length === 0 || !wallet || pool?.chain_id !== chainId) {
      return setOutAssetBalance(Big(0))
    }

    ;(async () => {
      const balance = await getBalanceToken(
        pool?.address || '',
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
              {pool?.logo ? (
                <img src={pool.logo} alt="" width={22} height={22} />
              ) : (
                <Blockies
                  className="poolIcon"
                  seed={pool?.name || ''}
                  size={8}
                  scale={3}
                />
              )}
            </div>
            <S.Symbol>{pool?.symbol}</S.Symbol>
          </S.Token>
          <S.Balance>
            Balance:{' '}
            {outAssetBalance.gt(-1)
              ? BNtoDecimal(
                  Big(outAssetBalance).div(Big(10).pow(18)),
                  pool?.chain?.token_decimals || 0
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
              amountTokenOut?.div(Big(10).pow(18)) || Big(0),
              18,
              6
            ).replace(/\s/g, '')}
          />
          {/* </Tippy> */}
          <S.PriceDolar>
            USD: {priceUSDLength > 6 ? '0.00' : priceUSD}
          </S.PriceDolar>
        </S.InputContainer>
      </S.FlexContainer>
    </S.TokenAssetOut>
  )
}

export default TokenAssetOut
