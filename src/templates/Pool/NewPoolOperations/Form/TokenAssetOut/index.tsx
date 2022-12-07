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

import * as S from './styles'

interface ITokenAssetOutProps {
  amountTokenIn?: Big;
  setAmountTokenIn?: React.Dispatch<React.SetStateAction<Big>>;
  amountTokenOut?: Big;
  setAmountTokenOut?: React.Dispatch<React.SetStateAction<Big>>;
}

const TokenAssetOut = ({
  amountTokenIn,
  setAmountTokenIn,
  amountTokenOut,
  setAmountTokenOut
}: ITokenAssetOutProps) => {
  const [outAssetBalance, setOutAssetBalance] = React.useState(new Big(-1))

  const { pool, chainId, userWalletAddress } = useAppSelector(state => state)

  React.useEffect(() => {
    if (
      pool.id.length === 0 ||
      userWalletAddress.length === 0 ||
      pool.chainId.toString().length === 0
      // chainId !== pool.chainId
    ) {
      return
    }

    const token = ERC20(pool.id)

    token
      .balance(userWalletAddress)
      .then(newBalance => setOutAssetBalance(Big(newBalance.toString())))
  }, [
    chainId,
    // newTitle,
    pool.id,
    userWalletAddress,
    pool.underlying_assets_addresses
    // swapOutAddress
  ])

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
              ? BNtoDecimal(outAssetBalance, pool.chain.nativeTokenDecimals)
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
            // value={
            //   pool.chain.nativeTokenDecimals > 0
            //     ? Number(
            //         BNtoDecimal(
            //           swapAmount || new BigNumber(0),
            //           pool.chain.nativeTokenDecimals
            //         ).replace(/\s/g, '')
            //       )
            //     : '0'
            // }
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   let { value } = e.target

            //   if (value.length === 0) {
            //     // eslint-disable-next-line prettier/prettier
            //     value = e.target.dataset.lastvalue as string
            //   }
            //   else if (value[0] === '0') {
            //     e.target.value = value.replace(/^0+/, '')
            //   }

            //   if (e.target.value[0] === '.') {
            //     e.target.value = `0${e.target.value}`
            //   }
            //   const decimalsNum = decimals.toNumber()
            //   const values = e.target.value.split('.')
            //   const paddedRight = `${values[0]}${`${values[1] || 0
            //     }${'0'.repeat(decimalsNum)}`.slice(0, decimalsNum)}`
            //   setSwapOutAmount && setSwapOutAmount([new BigNumber(paddedRight)])
            //   if (calculateAmountIn) {
            //     calculateAmountIn(new BigNumber(paddedRight))
            //   }
            //   setMaxActive && setMaxActive(false)
            // }}
          />
          {/* </Tippy> */}
          <S.PriceDolar>
            {/* {poolTokensArray &&
          'USD: ' +
          BNtoDecimal(
            Big(swapAmount.toString())
              .mul(Big(priceDollar(swapOutAddress, poolTokensArray)))
              .div(Big(10).pow(Number(decimals))),
            18,
            2,
            2
          )} */}
            USD: 0.00
          </S.PriceDolar>
        </S.InputContainer>
      </S.FlexContainer>
    </S.TokenAssetOut>
  )
}

export default TokenAssetOut
