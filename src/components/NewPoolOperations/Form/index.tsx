import React from 'react'

import { ChainDetails } from '../../../utils/changeChain'

import * as S from './styles'

export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

interface IFormProps {
  typeAction: string;
  title: Titles;
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
  title,
  typeWithdrawChecked,
  setIsModaWallet
}: IFormProps) => {
  return (
    <S.Form>
      <span>form</span>
    </S.Form>
  )
}

export default Form
