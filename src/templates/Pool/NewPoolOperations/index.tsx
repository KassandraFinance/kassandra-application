import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setTokenSelect } from '../../../store/reducers/tokenSelect'

// import { chains } from '../../../constants/tokenAddresses'

// import { ChainDetails } from '../../../utils/changeChain'

import SelectOperation from './SelectOperation'
// import ModalCardOperations from './ModalPoolOperations'
import SelectOperationOnMobile, { TitlesMobile } from './SelectOperationOnMobile'
import TokenSelection from './Form/TokenSelection'

import * as S from './styles'

// interface IOperationsProps {
//   poolChain: ChainDetails;
//   poolSymbol: string;
//   crpPoolAddress: string;
//   corePoolAddress: string;
//   productCategories: string[];
// }

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

const NewPoolOperations = () => {
  const [isModalPoolOperations, setIsModalPoolOperations] = React.useState<boolean>(false)
  
  const [inputChecked, setInputChecked] = React.useState<Titles>('Invest')
  const [typeWithdrawChecked, setTypeWithdrawChecked] = React.useState<string>('Best_value')
  const [inputCheckedBarMobile, setInputCheckedBarMobile] = React.useState<TitlesMobile>('Disable')

  const { tokenSelectionActive } = useAppSelector(state => state)

  // function handleSetInputChecked(title: Titles) {
  //   if (chain.id === chainId) setInputChecked(title)
  // }


  const dispatch = useAppDispatch()
  const { tokenList1Inch } = useAppSelector(state => state)

  React.useEffect(() => {
    dispatch(setTokenSelect(tokenList1Inch[0]))
  }, [])



  return (
    <S.NewPoolOperations>
      {isModalPoolOperations ?
        // <ModalCardOperations
        //   setInputChecked={setInputChecked}
        //   inputCheckedBarMobile={inputCheckedBarMobile}
        //   setInputCheckedBarMobile={setInputCheckedBarMobile}
        //   modalOpen={isModalPoolOperations}
        //   setModalOpen={setIsModalPoolOperations}
        //   setIsModaWallet={setIsModaWallet}

        //   poolChain={poolChain}
        //   poolSymbol={poolSymbol}
        //   crpPoolAddress={crpPoolAddress}
        //   corePoolAddress={corePoolAddress}
        //   productCategories={productCategories}
        <p>modal card operation</p>
        // />
        :
        tokenSelectionActive ?
          <TokenSelection />
        :
        <SelectOperation
          inputChecked={inputChecked}
          setInputChecked={setInputChecked}
          // handleSetInputChecked={handleSetInputChecked}
          typeWithdrawChecked={typeWithdrawChecked}
          setTypeWithdrawChecked={setTypeWithdrawChecked}
        />
      }

      <SelectOperationOnMobile
        inputCheckedBarMobile={inputCheckedBarMobile}
        setInputCheckedBarMobile={setInputCheckedBarMobile}
        setModalOpen={setIsModalPoolOperations}
      />
    </S.NewPoolOperations>
  )
}

export default NewPoolOperations
