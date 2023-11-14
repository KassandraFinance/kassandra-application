import React from 'react'

import { setTokenSelect } from '../../../store/reducers/tokenSelect'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setTokenSelectionActive } from '../../../store/reducers/tokenSelectionActive'

import Overlay from '../../../components/Overlay'
import SelectOperation from './SelectOperation'
import TokenSelection from './Form/TokenSelection'
// import SelectOperationOnMobile, {
//   TitlesMobile
// } from './SelectOperationOnMobile'

import * as S from './styles'
import { NATIVE_ADDRESS } from '@/constants/tokenAddresses'

export type Titles = keyof typeof messages

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

interface INewPoolOperationsProps {
  isOpenPoolOperation: boolean
  setIsOpenPoolOperation: React.Dispatch<React.SetStateAction<boolean>>
  operation: Titles
  setOperation: React.Dispatch<React.SetStateAction<Titles>>
}

const NewPoolOperations = ({
  isOpenPoolOperation,
  setIsOpenPoolOperation,
  operation,
  setOperation
}: INewPoolOperationsProps) => {
  const [typeWithdrawChecked, setTypeWithdrawChecked] =
    React.useState<string>('Single_asset')

  const dispatch = useAppDispatch()
  const { tokenSelectionActive } = useAppSelector(state => state)
  const { tokenListSwapProvider } = useAppSelector(state => state)

  React.useEffect(() => {
    const nativeToken = tokenListSwapProvider.find(
      token => token.address === NATIVE_ADDRESS
    )
    dispatch(setTokenSelect(nativeToken ?? tokenListSwapProvider[0]))
  }, [operation])

  React.useEffect(() => {
    if (!tokenSelectionActive) return

    dispatch(setTokenSelectionActive(false))
  }, [])

  return (
    <S.NewPoolOperations>
      {isOpenPoolOperation && (
        <Overlay
          onClick={() => {
            dispatch(setTokenSelectionActive(false))
            setIsOpenPoolOperation(false)
            // setInputCheckedBarMobile('Disable')
          }}
          isOpen={isOpenPoolOperation}
        />
      )}

      <S.PoolOperationsContainer>
        {tokenSelectionActive ? (
          <S.TokenSelectionContainer isOpen={isOpenPoolOperation}>
            <TokenSelection />
          </S.TokenSelectionContainer>
        ) : (
          <S.SelectOperationContianer isOpen={isOpenPoolOperation}>
            <SelectOperation
              inputChecked={operation}
              setInputChecked={setOperation}
              typeWithdrawChecked={typeWithdrawChecked}
              setTypeWithdrawChecked={setTypeWithdrawChecked}
            />
          </S.SelectOperationContianer>
        )}
      </S.PoolOperationsContainer>

      {/* <SelectOperationOnMobile
        setInputChecked={setInputChecked}
        inputCheckedBarMobile={inputCheckedBarMobile}
        setInputCheckedBarMobile={setInputCheckedBarMobile}
        setisOpenPoolOperationMobile={setisOpenPoolOperationMobile}
      /> */}
    </S.NewPoolOperations>
  )
}

export default NewPoolOperations
