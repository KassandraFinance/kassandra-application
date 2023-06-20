import React from 'react'

import useMatomoEcommerce from '../../../../hooks/useMatomoEcommerce'
import { useAppDispatch } from '@/store/hooks'
import { setTokenSelect } from '@/store/reducers/tokenSelect'

import Form from '../Form'

import * as S from './styles'

interface ISelectOperationProps {
  inputChecked: string
  setInputChecked: React.Dispatch<React.SetStateAction<'Withdraw' | 'Invest'>>
  typeWithdrawChecked: string
  setTypeWithdrawChecked: React.Dispatch<React.SetStateAction<string>>
}

const SelectOperation = ({
  inputChecked,
  setInputChecked,
  typeWithdrawChecked,
  setTypeWithdrawChecked
}: ISelectOperationProps) => {
  const { trackEventFunction } = useMatomoEcommerce()
  const dispatch = useAppDispatch()

  return (
    <>
      <S.SelectOperation>
        <S.Input
          type="radio"
          name="operator"
          id="Invest"
          onChange={() => {
            setInputChecked('Invest')
            trackEventFunction('click-on-tab', 'invest', 'operations-invest')
            dispatch(
              setTokenSelect({
                address: '',
                decimals: 18,
                logoURI: '',
                name: '',
                symbol: ''
              })
            )
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
            trackEventFunction('click-on-tab', 'withdraw', 'operations-invest')
            dispatch(
              setTokenSelect({
                address: '',
                decimals: 18,
                logoURI: '',
                name: '',
                symbol: ''
              })
            )
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
