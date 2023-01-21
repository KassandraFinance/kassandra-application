import React from 'react'

// import { ChainDetails } from '../../../utils/changeChain'
import { OperationProvider } from './PoolOperationContext';
import { useAppSelector } from '../../../../store/hooks';

import { ProxyContract } from '../../../../constants/tokenAddresses';

import operationV1 from '../../../../services/operationV1';
import operationV2 from '../../../../services/operationV2';

import Invest from './Invest';
import Withdraw from './Withdraw';

import { corePoolContract } from '../../../../hooks/usePoolContract';
import { ERC20 } from '../../../../hooks/useERC20Contract';
import { YieldYakContract } from '../../../../hooks/useYieldYak';

import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send',
  Swap: 'Swap from'
}

// interface IFormProps {
//   typeAction: string;
//   title: Titles;
//   typeWithdrawChecked: string;
//   poolChain: ChainDetails;
//   poolSymbol: string;
//   crpPoolAddress: string;
//   corePoolAddress: string;
//   productCategories: string[];
//   setIsModaWallet: React.Dispatch<React.SetStateAction<boolean>>
// }

interface IFormProps {
  typeAction: string;
  typeWithdraw: string;
}

const Form = ({
  typeAction,
  typeWithdraw
}: IFormProps) => {
  const pool = useAppSelector(state => state.pool)

  // const operationVersion = pool.pool_version === 1 ?
  //   new operationV1(ProxyContract, pool.id) :
  //   new operationV2(ProxyContract, pool.id)
  //chamar os dados da pool pelo Redux

  return (
    <OperationProvider operation={{operation: new operationV1(ProxyContract, pool.id, corePoolContract(pool.vault), ERC20(pool.address), YieldYakContract())}}>
      <S.Form>
        {typeAction === "Invest" && <Invest typeAction="Invest" />}
        {typeAction === "Withdraw" && <Withdraw typeWithdraw={typeWithdraw} typeAction="Withdraw" />}
      </S.Form>
    </OperationProvider>
  )
}

export default Form
