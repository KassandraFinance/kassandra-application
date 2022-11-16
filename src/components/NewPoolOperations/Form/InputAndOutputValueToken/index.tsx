import React from 'react'

import * as S from './styles'

const InputAndOutputValueToken = () => {
  return (
    <S.InputAndOutputValueToken>
      <S.FlexContainer>
        <S.Top>
          <S.Info>
            <S.Span>Pay with</S.Span>
            {/* {tokensList} */}
            <S.Span spanlight={true}>
              {/* Balance:{' '}
              {swapBalance > new BigNumber(-1)
                ? BNtoDecimal(swapBalance, decimals.toNumber())
                : '...'} */}
              Balance ...
            </S.Span>
          </S.Info>
          <S.Amount>
            <input />
          </S.Amount>
        </S.Top>
      </S.FlexContainer>
    </S.InputAndOutputValueToken>
  )
}

export default InputAndOutputValueToken
