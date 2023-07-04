import React from 'react'
import Tippy from '@tippyjs/react'
import Image from 'next/image'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

type SelectMethodToAddLiquidityProps = {
  setMethod: (param: 'any-asset' | 'pool-assets') => void
  method: string
}

const SelectMethodToAddLiquidity = ({
  setMethod,
  method
}: SelectMethodToAddLiquidityProps) => {
  return (
    <S.SelectMethodToAddLiquidity>
      <S.Title>
        <S.H2>Select how would you like to add liquidity</S.H2>
        <Tippy content="Select the way you would like to add liquidity to the pool you are creating">
          <span>
            <Image src={tooltip} alt="Explanation" width={14} height={14} />
          </span>
        </Tippy>
      </S.Title>
      <S.RadiosContainer>
        <S.Label checked={method === 'any-asset'}>
          <S.Input
            type="radio"
            id="any-asset"
            checked={method === 'any-asset'}
            onChange={() => setMethod('any-asset')}
            defaultChecked
          />
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Solid Icons">
              <path
                id="Union"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1661 9.99987C21.1661 12.6258 16.9746 13.9997 12.8331 13.9997C8.69153 13.9997 4.5 12.6258 4.5 9.99987C4.5 7.37396 8.69153 6 12.8331 6C16.9746 6 21.1661 7.37396 21.1661 9.99987ZM12.8331 17.9988C8.69153 17.9988 4.5 16.6249 4.5 13.999V11.999C4.5 14.6249 8.69153 15.9989 12.8331 15.9989C16.9746 15.9989 21.1661 14.6249 21.1661 11.999V13.999C21.1661 16.6249 16.9746 17.9988 12.8331 17.9988Z"
                fill="#BDBDBD"
              />
            </g>
          </svg>
          Any Asset
        </S.Label>
        <S.Label checked={method === 'pool-assets'}>
          <S.Input
            type="radio"
            id="pool-assets"
            checked={method === 'pool-assets'}
            onChange={() => setMethod('pool-assets')}
          />
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Solid Icons">
              <path
                id="Union"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.83388 5.99987C3.83388 8.62578 8.02541 9.99974 12.1669 9.99974C16.3085 9.99974 20.5 8.62578 20.5 5.99987C20.5 3.37396 16.3085 2 12.1669 2C8.02541 2 3.83388 3.37396 3.83388 5.99987ZM12.1669 13.9988C16.3085 13.9988 20.5 12.6249 20.5 9.99896V7.99902C20.5 10.6249 16.3085 11.9989 12.1669 11.9989C8.02541 11.9989 3.83388 10.6249 3.83388 7.99902V9.99896C3.83388 12.6249 8.02541 13.9988 12.1669 13.9988ZM20.5 13.9999C20.5 16.6258 16.3085 17.9998 12.1669 17.9998C8.02541 17.9998 3.83388 16.6258 3.83388 13.9999V12C3.83388 14.6259 8.02541 15.9999 12.1669 15.9999C16.3085 15.9999 20.5 14.6259 20.5 12V13.9999ZM12.1669 21.9998C16.3085 21.9998 20.5 20.6258 20.5 17.9999V16C20.5 18.6259 16.3085 19.9999 12.1669 19.9999C8.02541 19.9999 3.83388 18.6259 3.83388 16V17.9999C3.83388 20.6258 8.02541 21.9998 12.1669 21.9998Z"
                fill="#BDBDBD"
              />
            </g>
          </svg>
          Pool Assets
        </S.Label>
      </S.RadiosContainer>
    </S.SelectMethodToAddLiquidity>
  )
}

export default SelectMethodToAddLiquidity
