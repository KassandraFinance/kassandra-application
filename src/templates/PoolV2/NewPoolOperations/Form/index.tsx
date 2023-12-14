import React from 'react'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'
import { BrowserProvider, ethers, JsonRpcSigner } from 'ethers'

import { OperationProvider } from './PoolOperationContext'
import { useAppSelector } from '@/store/hooks'
import usePrivateInvestors from '@/hooks/usePrivateInvestors'
import { usePoolData } from '@/hooks/query/usePoolData'
import useGetToken from '@/hooks/useGetToken'

import { networks, PROXY_CONTRACT_V1 } from '@/constants/tokenAddresses'

import operationV1 from '@/services/operationV1'
import operationV2 from '@/services/operationV2'
import { ParaSwap } from '@/services/ParaSwap'

import Invest from './Invest'
import Withdraw from './Withdraw'

import { corePoolContract } from '../../../../hooks/usePoolContract'
import { YieldYakContract } from '../../../../hooks/useYieldYakEthers'
import useERC20 from '@/hooks/useERC20'
import { useTokensData } from '@/hooks/query/useTokensData'

import * as S from './styles'

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
  const [signerProvider, setsignerProvider] = React.useState<JsonRpcSigner>()

  const [{ wallet }] = useConnectWallet()
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const network = networks[pool?.chain_id || 137]

  const { tokenListSwapProvider } = useAppSelector(state => state)
  const ERC20 = useERC20(pool?.address || ethers.ZeroAddress, network.rpc)
  const { privateAddresses } = usePrivateInvestors(
    network.privateInvestor,
    pool?.chain_id
  )

  const tokenAddresses = tokenListSwapProvider.map(token => token.address)
  const { data } = useTokensData({
    chainId: pool?.chain_id || 0,
    tokenAddresses
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: pool?.chain?.address_wrapped?.toLowerCase() || '',
    tokens: data || {}
  })

  const poolId = pool?.id?.slice(pool?.chain_id?.toString().length)
  const poolInfo = {
    id: poolId,
    address: pool?.address || '',
    controller: pool?.controller || '',
    vault: pool?.vault || '',
    tokens: pool?.underlying_assets || [],
    tokensAddresses: pool?.underlying_assets_addresses || [],
    chainId: pool?.chain_id?.toString() || ''
  }

  async function handleGetSigner() {
    if (!wallet) return

    const provider = new BrowserProvider(wallet?.provider)
    const signer = await provider.getSigner()

    setsignerProvider(signer)
  }

  const setAddressesOfPrivateInvestors = async () => {
    const addresses = await privateAddresses(pool?.address || '')
    setPrivateInvestors(addresses)
  }

  React.useEffect(() => {
    if (!pool?.is_private_pool) return
    setAddressesOfPrivateInvestors()
  }, [wallet, pool, privateAddresses])

  React.useEffect(() => {
    handleGetSigner()
  }, [wallet])

  if (!pool) return <></>

  const operationVersion =
    pool?.pool_version === 1
      ? new operationV1(
          PROXY_CONTRACT_V1,
          pool?.address || '',
          poolInfo,
          corePoolContract(pool?.vault || ''),
          ERC20,
          YieldYakContract(43114),
          new ParaSwap(),
          signerProvider
        )
      : new operationV2(
          network.proxyInvest,
          network.balancerHelper,
          poolInfo,
          new ParaSwap(),
          signerProvider
        )

  return (
    <OperationProvider operation={{ operation: operationVersion, priceToken }}>
      <S.Form>
        {typeAction === 'Invest' && (
          <Invest typeAction="Invest" privateInvestors={privateInvestors} />
        )}
        {typeAction === 'Withdraw' && (
          <Withdraw typeWithdraw={typeWithdraw} typeAction="Withdraw" />
        )}
      </S.Form>
    </OperationProvider>
  )
}

export default Form
