import React from 'react'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

import { OperationProvider } from './PoolOperationContext'
import { useAppSelector } from '../../../../store/hooks'

import PrivateInvestors from '@/constants/abi/PrivateInvestors.json'
import {
  BalancerHelpers,
  networks,
  platform,
  ProxyContract,
  ProxyInvestV2
} from '../../../../constants/tokenAddresses'

import operationV1 from '../../../../services/operationV1'
import operationV2 from '../../../../services/operationV2'

import Invest from './Invest'
import Withdraw from './Withdraw'

import { corePoolContract } from '../../../../hooks/usePoolContract'
import { ERC20 } from '../../../../hooks/useERC20Contract'
import { YieldYakContract } from '../../../../hooks/useYieldYak'
import useCoingecko from '../../../../hooks/useCoingecko'

import * as S from './styles'

// eslint-disable-next-line prettier/prettier
export type Titles = keyof typeof messages

const messages = {
  Invest: 'Pay with',
  Withdraw: 'Send'
}

interface IFormProps {
  typeAction: string
  typeWithdraw: string
}

const Form = ({ typeAction, typeWithdraw }: IFormProps) => {
  const [privateInvestors, setPrivateInvestors] = React.useState<string[]>([])

  const { pool, tokenList1Inch, userWalletAddress } = useAppSelector(
    state => state
  )
  const poolId = pool.id.slice(pool.chain_id.toString().length)

  const poolInfo = {
    id: poolId,
    address: pool.address,
    controller: pool.controller,
    vault: pool.vault,
    tokens: pool.underlying_assets,
    tokensAddresses: pool.underlying_assets_addresses
  }

  const tokenAddresses = tokenList1Inch.map(token => token.address)
  const { priceToken } = useCoingecko(
    platform[pool.chain_id],
    pool.chain.addressWrapped?.toLowerCase(),
    tokenAddresses
  )

  const operationVersion =
    pool.pool_version === 1
      ? new operationV1(
          ProxyContract,
          pool.address,
          poolInfo,
          corePoolContract(pool.vault),
          ERC20(pool.address),
          YieldYakContract()
        )
      : new operationV2(ProxyInvestV2, BalancerHelpers, poolInfo)

  const setAddressesOfPrivateInvestors = async () => {
    const network = networks[pool?.chain_id ?? 137]
    const _web3 = new Web3(network.rpc)
    const privateInvestorsContract = new _web3.eth.Contract(
      PrivateInvestors as unknown as AbiItem,
      network.privateInvestor
    )
    const addresses = await privateInvestorsContract.methods
      .getInvestors(pool.address, 0, 100)
      .call()

    setPrivateInvestors(addresses)
  }

  React.useEffect(() => {
    if (!pool.is_private_pool) return
    ;(async () => {
      await setAddressesOfPrivateInvestors()
    })()
  }, [userWalletAddress, pool])

  return (
    <OperationProvider operation={{ operation: operationVersion, priceToken }}>
      <S.Form>
        {typeAction === 'Invest' && (
          <Invest typeAction="Invest" privateInvestors={privateInvestors} />
        )}
        {typeAction === 'Withdraw' && (
          <Withdraw
            typeWithdraw={typeWithdraw}
            typeAction="Withdraw"
            privateInvestors={privateInvestors}
          />
        )}
      </S.Form>
    </OperationProvider>
  )
}

export default Form
