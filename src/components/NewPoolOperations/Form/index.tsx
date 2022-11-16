import React from 'react'

import { ChainDetails } from '../../../utils/changeChain'

import Invest from './Invest';
import Withdraw from './Withdraw';


import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

interface IFormProps {
  typeAction: string;
  // title: Titles;
  typeWithdrawChecked: string;
  poolChain: ChainDetails;
  poolSymbol: string;
  crpPoolAddress: string;
  corePoolAddress: string;
  productCategories: string[];
  setIsModaWallet: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({
  poolChain,
  poolSymbol,
  crpPoolAddress,
  corePoolAddress,
  productCategories,
  typeAction,
  // title,
  typeWithdrawChecked,
  setIsModaWallet
}: IFormProps) => {
  return (
    <S.Form>
      {typeAction === "Invest" && <Invest />}
      {typeAction === "Withdraw" && <Withdraw />}
    </S.Form>
  )
}

export default Form
