import React from 'react'
import Link from 'next/link'

import InputNumber from '../../../../../../components/Inputs/InputNumber'

import * as S from './styles'

interface IPoolTokensProps {
  name: string;
  symbol: string;
  currentAmount: number;
  currentAmountInDollar: number;
  allocationPorcentage: number;
  newAllocation: number;
  newAmount: number;
  newAmountInDollar: number;
}

const PoolToken = ({
  name,
  symbol,
  currentAmount,
  currentAmountInDollar,
  allocationPorcentage,
  newAllocation,
  newAmount,
  newAmountInDollar
}: IPoolTokensProps) => {
  const [AllocationValue, setAllocationValue] = React.useState(0)
  const [moreInfo, setMoreInfo] = React.useState(false)

  return (
    <>
      <S.TokenInfo onAnimationEnd={e => console.log(e)}>
        <img src="/assets/logos/tricrypto.svg" alt="" width={24} height={24} />
        <S.TokenNameContainer>
          <S.TokenName>
            <Link href="#" passHref>
              <a>
                {name}
                <img
                  src="/assets/utilities/go-to-site.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              </a>
            </Link>
          </S.TokenName>
          <p>{symbol}</p>
        </S.TokenNameContainer>
      </S.TokenInfo>
      <S.CurrentAmount isOpen={moreInfo}>
        <p>Amount</p>
        <span>
          {currentAmount} {symbol}
        </span>
        <p>~${currentAmountInDollar.toFixed(2)}</p>
      </S.CurrentAmount>
      <S.Allocation>{allocationPorcentage}%</S.Allocation>
      <S.Arrow>
        <img src="/assets/utilities/arrow-right.svg" alt="" width={32} />
      </S.Arrow>
      <S.NewAllocation>
        <InputNumber
          InputNumberValue={AllocationValue}
          name="number"
          handleInputNumber={event =>
            setAllocationValue(Number(event.target.value))
          }
          min={0}
          max={100}
          step={1}
        />
        <S.ImageContent>
          <img
            src="/assets/utilities/unlock.svg"
            alt=""
            width={16}
            height={16}
          />
        </S.ImageContent>
      </S.NewAllocation>
      <S.MoreInfoContainer>
        <button onClick={() => setMoreInfo(!moreInfo)}>
          {moreInfo ? 'Less' : 'More'} Info{' '}
          <img src="/assets/utilities/arrow-select-down.svg" alt="" />
        </button>
      </S.MoreInfoContainer>
      {/* <S.InputCheckbox> */}
      {/* <input
        type="checkbox"
        id={name + index}
        name={name + index}
        // onChange={event => handleClickInput(event)}
      />
      <label htmlFor={name + index}>More Info</label> */}
      {/* </S.InputCheckbox> */}
      <S.NewAmount isOpen={moreInfo}>
        <p>New Amount</p>
        <span>
          {newAmount} {symbol}
        </span>
        <p>~${newAmountInDollar.toFixed(2)}</p>
      </S.NewAmount>
    </>
  )
}

export default PoolToken
