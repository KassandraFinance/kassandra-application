/* eslint-disable prettier/prettier */
import React from 'react'

import { chains } from '../../../../constants/tokenAddresses';

import { useAppSelector } from '../../../../store/hooks';

import SelectOperation from '../SelectOperation';
import { TitlesMobile } from '../../../../components/PoolOperations/SelectOperatorMobile';

import { ChainDetails } from '../../../../utils/changeChain'

import { Backdrop, CardOperationsContainerModal } from './styles'

export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

interface IOperationsProps {
  setInputChecked: React.Dispatch<React.SetStateAction<Titles>>
  inputCheckedBarMobile: TitlesMobile;
  setInputCheckedBarMobile: React.Dispatch<React.SetStateAction<TitlesMobile>>

  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModaWallet: React.Dispatch<React.SetStateAction<boolean>>;
}


const ModalCardOperations = ({
  setInputChecked,
  inputCheckedBarMobile,
  setInputCheckedBarMobile,

  setIsModaWallet,
  modalOpen,
  setModalOpen
}: IOperationsProps) => {
  const [inputCheckedMobile, setInputCheckedMobile] = React.useState<Titles>('Invest')
  const [typeWithdrawCheckedMobile, setTypeWithdrawCheckedMobile] = React.useState<string>('Best_value')

  // const { chainId } = useAppSelector(state => state)

  // const chain =
  //   process.env.NEXT_PUBLIC_MASTER === '1' ? chains.avalanche : chains.fuji

  // function handleSetInputChecked(title: Titles) {
  //   if (chain.id === chainId) setInputCheckedMobile(title)
  // }

  const handleCloseModalPoolOperations = () => {
    setInputChecked('Invest')
    setInputCheckedMobile('Invest')
    setInputCheckedBarMobile('Disable')
    setModalOpen(false)
  }

  React.useEffect(() => {
    switch (inputCheckedBarMobile) {
      case 'Invest':
        return setInputCheckedMobile('Invest')
      case 'Withdraw':
        return setInputCheckedMobile('Withdraw')
      case 'Swap':
        return setInputCheckedMobile('Swap')
      default:
        return;
    }
  }, [inputCheckedBarMobile])

  React.useEffect(() => {
    switch (inputCheckedMobile) {
      case 'Invest':
        return setInputCheckedBarMobile('Invest')
      case 'Withdraw':
        return setInputCheckedBarMobile('Withdraw')
      case 'Swap':
        return setInputCheckedBarMobile('Swap')
      default:
        return;
    }
  }, [inputCheckedMobile])

  return (
    <>
      <Backdrop
        style={{ display: modalOpen ? 'block' : 'none' }}
        onClick={() => handleCloseModalPoolOperations()}
      />

      <CardOperationsContainerModal
        modalOpen={modalOpen}
      >
        <SelectOperation
          inputChecked={inputCheckedMobile}
          setInputChecked={setInputCheckedMobile}
          // handleSetInputChecked={handleSetInputChecked}
          typeWithdrawChecked={typeWithdrawCheckedMobile}
          setTypeWithdrawChecked={setTypeWithdrawCheckedMobile}
        />
      </CardOperationsContainerModal>
    </>
  )
}

export default ModalCardOperations