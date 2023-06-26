import React from 'react'

import { useAppSelector } from '@/store/hooks'

import { networks } from '@/constants/tokenAddresses'

import { ChainDetails } from '@/utils/changeChain'

import ModalPoolOperations from '../Modals/ModalPoolOperations'
import SelectOperatorCart from './SelectOperatorCart'
import SelectOperatorMobile, { TitlesMobile } from './SelectOperatorMobile'

import * as S from './styles'

interface IOperationsProps {
  poolChain: ChainDetails
  poolSymbol: string
  crpPoolAddress: string
  corePoolAddress: string
  productCategories: string[]
}

export type Titles = keyof typeof messages

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

const PoolOperations = ({
  poolChain,
  poolSymbol,
  crpPoolAddress,
  corePoolAddress,
  productCategories
}: IOperationsProps) => {
  const [inputChecked, setInputChecked] = React.useState<Titles>('Invest')
  const [inputCheckedBarMobile, setInputCheckedBarMobile] =
    React.useState<TitlesMobile>('Disable')
  const [typeWithdrawChecked, setTypeWithdrawChecked] =
    React.useState<string>('Best_value')

  const [isModalPoolOperations, setIsModalPoolOperations] =
    React.useState<boolean>(false)
  const [, setIsModaWallet] = React.useState<boolean>(false)

  const { chainId } = useAppSelector(state => state)

  function handleSetInputChecked(title: Titles) {
    if (networks[43114].chainId === chainId) setInputChecked(title)
  }

  return (
    <div>
      {isModalPoolOperations ? (
        <ModalPoolOperations
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
      ) : (
        <>
          <S.PoolOperationsContainer>
            <SelectOperatorCart
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
          </S.PoolOperationsContainer>
        </>
      )}

      <SelectOperatorMobile
        inputCheckedBarMobile={inputCheckedBarMobile}
        setInputCheckedBarMobile={setInputCheckedBarMobile}
        setModalOpen={setIsModalPoolOperations}
      />
    </div>
  )
}

export default PoolOperations
