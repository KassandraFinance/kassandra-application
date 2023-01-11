import React from 'react'
// import { ChainDetails } from '../../../../utils/changeChain'

// import { useAppDispatch } from '../../../../store/hooks'
// import { setModalWalletActive } from '../../../../store/reducers/modalWalletActive'

import useMatomoEcommerce from '../../../../hooks/useMatomoEcommerce'

// import { Titles } from '..'

import Form from '../Form'

import * as S from './styles'

// export type Titles = keyof typeof messages;

// const messages = {
//   Invest: 'Pay with',
//   Withdraw: 'Send',
//   Swap: 'Swap from'
// }

interface ISelectOperationProps {
  // inputChecked: Titles;
  inputChecked: string;
  setInputChecked: React.Dispatch<React.SetStateAction<"Withdraw" | "Invest" | "Swap">>
  // setInputChecked: React.Dispatch<React.SetStateAction<string>>;
  // handleSetInputChecked: (title: Titles) => void;
  // eslint-disable-next-line prettier/prettier
  typeWithdrawChecked: string;
  setTypeWithdrawChecked: React.Dispatch<React.SetStateAction<string>>;

  // poolChain: ChainDetails;
  // poolSymbol: string;
  // crpPoolAddress: string;
  // corePoolAddress: string;
  // productCategories: string[];
}

const SelectOperation = ({
  inputChecked,
  setInputChecked,
  // handleSetInputChecked,
  typeWithdrawChecked,
  setTypeWithdrawChecked
}: ISelectOperationProps) => {
  // const dispatch = useAppDispatch()

  const { trackEventFunction } = useMatomoEcommerce()
  // dispatch(setModalWalletActive(false))
  return (
    <>
      <S.SelectOperation>
        <S.Input
          type="radio"
          name="operator"
          id="Invest"
          onChange={() => {
            setInputChecked('Invest')
            // handleSetInputChecked('Invest')
            trackEventFunction('click-on-tab', 'invest', 'operations-invest')
          }}
          checked={inputChecked === 'Invest'}
        />
        <S.Label selected={inputChecked === 'Invest'} htmlFor="Invest">
          Invest
        </S.Label>

        <S.Input
          type="radio"
          name="operator"
          id="Withdraw"
          onChange={() => {
            setInputChecked('Withdraw')
            // handleSetInputChecked('Withdraw')
            trackEventFunction('click-on-tab', 'withdraw', 'operations-invest')
          }}
          checked={inputChecked === 'Withdraw'}
        />

        <S.Label selected={inputChecked === 'Withdraw'} htmlFor="Withdraw">
          Withdraw
        </S.Label>
        <S.LineBottom activeLine={inputChecked === 'Withdraw'} />
      </S.SelectOperation>
      {inputChecked === 'Withdraw' && (
        <S.TypeWithdraw>
          <S.TypeRadio>
            <label className="radio" htmlFor="Single_asset">
              <S.InputWithdraw
                type="radio"
                name="typeWithdraw"
                id="Single_asset"
                onChange={() => {
                  setTypeWithdrawChecked('Single_asset')
                  trackEventFunction(
                    'click-on-check',
                    'single-asset',
                    'operations-invest'
                  )
                }}
                checked={typeWithdrawChecked === 'Single_asset'}
              />
              <span>Single asset</span>
            </label>
          </S.TypeRadio>
          <S.TypeRadio>
            <label className="radio" htmlFor={'Best_value'}>
              <S.InputWithdraw
                type="radio"
                name="typeWithdraw"
                id={'Best_value'}
                onChange={() => {
                  setTypeWithdrawChecked('Best_value')
                  trackEventFunction(
                    'click-on-check',
                    'best-value',
                    'operations-invest'
                  )
                }}
                checked={typeWithdrawChecked === 'Best_value'}
              />
              <span>All assets</span>
            </label>
          </S.TypeRadio>
        </S.TypeWithdraw>
      )}
      <Form typeAction={inputChecked} typeWithdraw={typeWithdrawChecked} />
    </>
  )
}

export default SelectOperation
