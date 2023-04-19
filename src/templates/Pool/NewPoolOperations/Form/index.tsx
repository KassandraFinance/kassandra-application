import React from 'react'

import { OperationProvider } from './PoolOperationContext';
import { useAppSelector } from '../../../../store/hooks';

import { BalancerHelpers, platform, ProxyContract, ProxyInvestV2 } from '../../../../constants/tokenAddresses';

import operationV1 from '../../../../services/operationV1';
import operationV2 from '../../../../services/operationV2';

import Invest from './Invest';
import Withdraw from './Withdraw';

import { corePoolContract } from '../../../../hooks/usePoolContract';
import { ERC20 } from '../../../../hooks/useERC20Contract';
import { YieldYakContract } from '../../../../hooks/useYieldYak';
import useCoingecko from '../../../../hooks/useCoingecko';

import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages;

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

interface IFormProps {
  typeAction: string;
  typeWithdraw: string;
}

const Form = ({
  typeAction,
  typeWithdraw
}: IFormProps) => {
  const { pool, tokenList1Inch } = useAppSelector(state => state)
  const poolId = pool.id.slice(pool.chain_id.toString().length)

  const poolInfo = {
    id: poolId,
    address: pool.address,
    controller: pool.controller,
    vault: pool.vault,
    tokens: pool.underlying_assets,
    tokensAddresses: pool.underlying_assets_addresses,
  }

  const tokenAddresses = tokenList1Inch.map(token => token.address)
  const { priceToken } = useCoingecko(
    platform[pool.chain_id],
    pool.chain.addressWrapped.toLowerCase(),
    tokenAddresses
  )

  const operationVersion = pool.pool_version === 1 ?
    new operationV1(ProxyContract, pool.address, poolInfo, corePoolContract(pool.vault), ERC20(pool.address), YieldYakContract()) :
    new operationV2(ProxyInvestV2, BalancerHelpers, poolInfo)
  //chamar os dados da pool pelo Redux

  return (
    <OperationProvider operation={{operation: operationVersion, priceToken}}>
      <S.Form>
        {typeAction === "Invest" && <Invest typeAction="Invest" />}
        {typeAction === "Withdraw" && <Withdraw typeWithdraw={typeWithdraw} typeAction="Withdraw" />}
      </S.Form>
    </OperationProvider>
  )
}

export default Form
