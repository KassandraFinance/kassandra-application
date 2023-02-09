import React from 'react'

import { setTokenSelect } from '../../../store/reducers/tokenSelect'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setTokenSelectionActive } from '../../../store/reducers/tokenSelectionActive'

import Overlay from '../../../components/Overlay'
import SelectOperation from './SelectOperation'
import TokenSelection from './Form/TokenSelection'
import SelectOperationOnMobile, { TitlesMobile } from './SelectOperationOnMobile'

import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

const NewPoolOperations = () => {
  const [inputChecked, setInputChecked] = React.useState<Titles>('Invest')
  const [typeWithdrawChecked, setTypeWithdrawChecked] = React.useState<string>('Single_asset')
  const [isOpenPoolOperationMobile, setisOpenPoolOperationMobile] = React.useState(false)
  const [inputCheckedBarMobile, setInputCheckedBarMobile] = React.useState<TitlesMobile>('Disable')

  const { tokenSelectionActive } = useAppSelector(state => state)

  const dispatch = useAppDispatch()
  const { modalWalletActive } = useAppSelector(state => state)
  const { tokenList1Inch } = useAppSelector(state => state)

  React.useEffect(() => {
    if (inputChecked === 'Withdraw') return

    dispatch(setTokenSelect(tokenList1Inch[0]))
  }, [inputChecked])

  React.useEffect(() => {
    if (!modalWalletActive) return

    dispatch(setTokenSelectionActive(false))
    setisOpenPoolOperationMobile(false)
    setInputCheckedBarMobile('Disable')
  }, [modalWalletActive])

  return (
    <S.NewPoolOperations>
      {isOpenPoolOperationMobile && (
        <Overlay
          onClick={() => {
            dispatch(setTokenSelectionActive(false))
            setisOpenPoolOperationMobile(false)
            setInputCheckedBarMobile('Disable')
          }}
          isOpen={isOpenPoolOperationMobile}
        />
      )}

      <S.PoolOperationsContainer>
        {tokenSelectionActive ?
          <S.TokenSelectionContainer isOpen={isOpenPoolOperationMobile}>
            <TokenSelection />
          </S.TokenSelectionContainer>
          :
          <S.SelectOperationContianer isOpen={isOpenPoolOperationMobile}>
            <SelectOperation
              inputChecked={inputChecked}
              setInputChecked={setInputChecked}
              typeWithdrawChecked={typeWithdrawChecked}
              setTypeWithdrawChecked={setTypeWithdrawChecked}
            />
          </S.SelectOperationContianer>
        }
      </S.PoolOperationsContainer>

      <SelectOperationOnMobile
        setInputChecked={setInputChecked}
        inputCheckedBarMobile={inputCheckedBarMobile}
        setInputCheckedBarMobile={setInputCheckedBarMobile}
        setisOpenPoolOperationMobile={setisOpenPoolOperationMobile}
      />
    </S.NewPoolOperations>
  )
}

export default NewPoolOperations
