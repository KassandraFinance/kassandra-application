/* eslint-disable prettier/prettier */
import React from 'react'
import { Titles } from '..';

import useMatomoEcommerce from '../../../../hooks/useMatomoEcommerce';

import * as S from './styles'

export type TitlesMobile = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  // Swap: 'Swap from',
  Disable: ''
}

interface ISelectOperationOnMobileProps {
  setInputChecked: React.Dispatch<React.SetStateAction<Titles>>;
  inputCheckedBarMobile: TitlesMobile;
  setInputCheckedBarMobile: React.Dispatch<React.SetStateAction<TitlesMobile>>;
  setisOpenPoolOperationMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectOperationOnMobile = ({
  setInputChecked,
  inputCheckedBarMobile,
  setInputCheckedBarMobile,
  setisOpenPoolOperationMobile,
}: ISelectOperationOnMobileProps) => {
  const { trackEventFunction } = useMatomoEcommerce()
  // const [inputCheckedBarMobile, setInputCheckedBarMobile] = React.useState<TitlesMobile>('Disable')

  return (
    <>
      <S.PoolOperationsContainerMobile>
        <S.SelectOperationOnMobile>
          <S.InputMobile
            type="radio"
            name="operator"
            id="InvestMobile"
            onChange={() => {
              setInputChecked('Invest')
              setInputCheckedBarMobile('Invest')
              trackEventFunction('click-on-tab', 'invest', 'operations-invest')
            }}
            checked={inputCheckedBarMobile === 'Invest'}
            onClick={() => setisOpenPoolOperationMobile(true)}
          />
          <S.LabelMobile
            selectedMobile={inputCheckedBarMobile === 'Invest'}
            htmlFor="InvestMobile"
          >
            Invest
          </S.LabelMobile>
          <S.InputMobile
            type="radio"
            name="operator"
            id="WithdrawMobile"
            onChange={() => {
              setInputChecked('Withdraw')
              setInputCheckedBarMobile('Withdraw')
              trackEventFunction('click-on-tab', 'withdraw','operations-invest')
            }}
            onClick={() => setisOpenPoolOperationMobile(true)}
            checked={inputCheckedBarMobile === 'Withdraw'}
          />

          <S.LabelMobile
            selectedMobile={inputCheckedBarMobile === 'Withdraw'}
            htmlFor="WithdrawMobile"
            >
            Withdraw
          </S.LabelMobile>
        </S.SelectOperationOnMobile>
      </S.PoolOperationsContainerMobile>
    </>
  )
}

export default SelectOperationOnMobile
