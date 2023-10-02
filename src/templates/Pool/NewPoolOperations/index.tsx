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

export type Titles = keyof typeof messages

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

interface INewPoolOperationsProps {
  isOpenPoolOperation: boolean
  setIsOpenPoolOperation: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPoolOperations = ({
  isOpenPoolOperation,
  setIsOpenPoolOperation
}: INewPoolOperationsProps) => {
  const [inputChecked, setInputChecked] = React.useState<Titles>('Invest')
  const [typeWithdrawChecked, setTypeWithdrawChecked] =
    React.useState<string>('Single_asset')
  // const [isOpenPoolOperationMobile, setIsOpenPoolOperationMobile] =
  //   React.useState(false)
  // const [inputCheckedBarMobile, setInputCheckedBarMobile] =
  //   React.useState<TitlesMobile>('Disable')

  const dispatch = useAppDispatch()
  const { tokenSelectionActive } = useAppSelector(state => state)
  const { tokenListSwapProvider } = useAppSelector(state => state)

  React.useEffect(() => {
    if (inputChecked === 'Withdraw') return

    const nativeToken = tokenListSwapProvider.find(
      token => token?.tags && token.tags[0] === 'native'
    )
    dispatch(setTokenSelect(nativeToken ?? tokenListSwapProvider[0]))
  }, [inputChecked])

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
              inputChecked={inputChecked}
              setInputChecked={setInputChecked}
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
