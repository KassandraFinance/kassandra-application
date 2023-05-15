import React from 'react'
import Link from 'next/link'
import Big from 'big.js'

import { lockToken } from '@/store/reducers/rebalanceAssetsSlice'

import { BNtoDecimal } from '@/utils/numerals'

import InputNumber from '../../../../../../components/Inputs/InputNumber'

import * as S from './styles'
import Image from 'next/image'

export type AssetType = {
  currentWeight: Big
  currentAmount: Big
  token: {
    address: string
    decimals: number
    logo: string | undefined
    name: string
    symbol: string
  }
}

type INewTokensWeights = {
  newWeight: Big
  newAmount: Big
  newAmountUSD: Big
  lockPercentage: lockToken
  alreadyCalculated: boolean
}
interface IPoolTokensProps {
  tokenInfo: AssetType
  newTokensValues: Record<string, INewTokensWeights>
  priceToken: number
  handleLockStatus: (address: string, status: lockToken) => void
  handleCalcNewWeights: (value: number, tokenInfo: AssetType) => void
}

const PoolToken = ({
  tokenInfo,
  newTokensValues,
  handleLockStatus,
  handleCalcNewWeights,
  priceToken
}: IPoolTokensProps) => {
  const [moreInfo, setMoreInfo] = React.useState(false)

  const { currentAmount, currentWeight, token } = tokenInfo
  const {
    alreadyCalculated,
    lockPercentage,
    newAmount,
    newAmountUSD,
    newWeight
  } = newTokensValues[token.address]

  return (
    <>
      <S.TokenInfo>
        <img src={token.logo} alt="" width={24} height={24} />
        <S.TokenNameContainer>
          <Link
            href={`https://heimdall-frontend.vercel.app/pt/coins/${token.symbol}`}
            passHref
          >
            <S.TokenName id="mobile">
              {token.symbol}
              <img
                src="/assets/utilities/external-link.svg"
                alt=""
                width={18}
                height={18}
              />
            </S.TokenName>
          </Link>
          <S.Line />
          <Link
            href={`https://heimdall-frontend.vercel.app/pt/coins/${token.symbol}`}
            passHref
          >
            <S.TokenName id="desktop">
              {token.name}
              <img
                src="/assets/utilities/external-link.svg"
                alt=""
                width={18}
                height={18}
              />
            </S.TokenName>
          </Link>
          <p>{token.symbol}</p>
        </S.TokenNameContainer>
      </S.TokenInfo>
      <S.CurrentAmountContainer isOpen={moreInfo}>
        <S.CurrentAmount>
          <p>Amount</p>
          <span>{BNtoDecimal(currentAmount, token.decimals, 2)}</span>
          <p>~${BNtoDecimal(currentAmount.mul(priceToken), 2)}</p>
        </S.CurrentAmount>
        <S.AmountLine />
      </S.CurrentAmountContainer>
      <S.Allocation>
        <p>{currentWeight.toFixed(1)}%</p>
      </S.Allocation>
      <S.Arrow>
        <Image src="/assets/utilities/arrow-right.svg" alt="" layout="fill" />
      </S.Arrow>
      <S.NewAllocation>
        <InputNumber
          InputNumberValue={Number(newWeight.toFixed())}
          name="tokenValue"
          handleInputNumber={event =>
            handleCalcNewWeights(Number(event.target.value), tokenInfo)
          }
          min={alreadyCalculated ? 1 : 0}
          max={99}
          step={0.01}
        />
        <S.ImageContent>
          <S.LockButton
            type="button"
            active={lockPercentage === lockToken.BLOCKED}
            onClick={() =>
              alreadyCalculated &&
              handleLockStatus(token.address, lockPercentage)
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="lock">
                <path
                  id="Lock Bottom"
                  d="M12.6667 7.33203H3.33333C2.59695 7.33203 2 7.92898 2 8.66536V13.332C2 14.0684 2.59695 14.6654 3.33333 14.6654H12.6667C13.403 14.6654 14 14.0684 14 13.332V8.66536C14 7.92898 13.403 7.33203 12.6667 7.33203Z"
                  stroke="#FCFCFC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="lock-up-closed"
                  d="M4.66666 7.33203V4.66536C4.66666 3.78131 5.01785 2.93346 5.64297 2.30834C6.26809 1.68322 7.11593 1.33203 7.99999 1.33203C8.88404 1.33203 9.73189 1.68322 10.357 2.30834C10.9821 2.93346 11.3333 3.78131 11.3333 4.66536V7.33203"
                  stroke="#FCFCFC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </S.LockButton>
        </S.ImageContent>
      </S.NewAllocation>
      <S.MoreInfoContainer isOpen={moreInfo}>
        <button type="button" onClick={() => setMoreInfo(!moreInfo)}>
          {moreInfo ? 'Less' : 'More'} Info{' '}
          <img src="/assets/utilities/arrow-select-down.svg" alt="" />
        </button>
      </S.MoreInfoContainer>
      <S.NewAmount isOpen={moreInfo}>
        <p>New Amount</p>
        <span>~{BNtoDecimal(newAmount ?? Big(0), token.decimals, 2)}</span>
        <p>
          ~$
          {BNtoDecimal(newAmountUSD ?? Big(0), 2)}
        </p>
      </S.NewAmount>
    </>
  )
}

export default PoolToken
