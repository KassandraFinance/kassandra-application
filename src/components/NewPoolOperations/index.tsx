// https://api.1inch.io/v4.0/43114/swap?fromTokenAddress=0x8729438eb15e2c8b576fcc6aecda6a148776c0f5&toTokenAddress=0xc7198437980c041c805a1edcba50c1ce5db95118&amount=10000000000000000&fromAddress=0x38918142779e2CD1189cBd9e932723C968363D1E&slippage=1&disableEstimate=true
import React from 'react'

import { useAppSelector } from '../../store/hooks'

import { chains } from '../../constants/tokenAddresses'

import { ChainDetails } from '../../utils/changeChain'

import ModalWalletConnect from '../Modals/ModalWalletConnect'

import SelectOperation from './SelectOperation'
import ModalCardOperations from './ModalPoolOperations'
import SelectOperationOnMobile, { TitlesMobile } from './SelectOperationOnMobile'

import * as S from './styles'

interface IOperationsProps {
  poolChain: ChainDetails;
  poolSymbol: string;
  crpPoolAddress: string;
  corePoolAddress: string;
  productCategories: string[];
}

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

const NewPoolOperations = ({
  poolChain,
  poolSymbol,
  crpPoolAddress,
  corePoolAddress,
  productCategories
}: IOperationsProps) => {
  const [isModalWallet, setIsModaWallet] = React.useState<boolean>(false)
  const [isModalPoolOperations, setIsModalPoolOperations] = React.useState<boolean>(false)
  
  const [inputChecked, setInputChecked] = React.useState<Titles>('Invest')
  const [typeWithdrawChecked, setTypeWithdrawChecked] = React.useState<string>('Best_value')
  const [inputCheckedBarMobile, setInputCheckedBarMobile] = React.useState<TitlesMobile>('Disable')

  const { chainId } = useAppSelector(state => state)

  const chain =
    process.env.NEXT_PUBLIC_MASTER === '1' ? chains.avalanche : chains.fuji

  function handleSetInputChecked(title: Titles) {
    if (chain.chainId === chainId) setInputChecked(title)
  }

  return (
    <S.NewPoolOperations>
      {isModalPoolOperations ?
        <ModalCardOperations
          setInputChecked={setInputChecked}
          inputCheckedBarMobile={inputCheckedBarMobile}
          setInputCheckedBarMobile={setInputCheckedBarMobile}
          modalOpen={isModalPoolOperations}
          setModalOpen={setIsModalPoolOperations}
          setIsModaWallet={setIsModaWallet}

          poolChain={poolChain}
          poolSymbol={poolSymbol}
          crpPoolAddress={crpPoolAddress}
          corePoolAddress={corePoolAddress}
          productCategories={productCategories}
        />
        :
        <SelectOperation
          inputChecked={inputChecked}
          handleSetInputChecked={handleSetInputChecked}
          typeWithdrawChecked={typeWithdrawChecked}
          setTypeWithdrawChecked={setTypeWithdrawChecked}
          setIsModaWallet={setIsModaWallet}
          poolChain={poolChain}
          poolSymbol={poolSymbol}
          crpPoolAddress={crpPoolAddress}
          corePoolAddress={corePoolAddress}
          productCategories={productCategories}
        />
      }

      <SelectOperationOnMobile
        inputCheckedBarMobile={inputCheckedBarMobile}
        setInputCheckedBarMobile={setInputCheckedBarMobile}
        setModalOpen={setIsModalPoolOperations}
      />

      {isModalWallet &&
        (<ModalWalletConnect
          setModalOpen={setIsModaWallet}
      />)}

    </S.NewPoolOperations>
  )
}

export default NewPoolOperations
