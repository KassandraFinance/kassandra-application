import React from 'react'
import { getAddress } from 'ethers'
import { useConnectWallet } from '@web3-onboard/react'

import { useMyPools } from '@/hooks/query/useMyPools'

import AssetsTable from '@/templates/Profile/Portfolio/AssetsTable'
import AnyCard from '@/components/AnyCard'

import * as S from './styles'

interface IMyPoolsTableprops {
  selectedChains: string[]
}

export function MyPoolsTable({ selectedChains }: IMyPoolsTableprops) {
  const [{ wallet }, conect] = useConnectWallet()

  const params = {
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    chainIn: selectedChains,
    userWallet: wallet ? getAddress(wallet.accounts[0].address) : undefined
  }

  const { data } = useMyPools(params)

  return (
    <S.MyPoolTable>
      {wallet?.provider ? (
        <AssetsTable pools={data ?? new Array(6).fill({})} />
      ) : (
        <AnyCard
          text="Please connect your wallet to view the pools you have invested in."
          button2
          buttonText="Connect Wallet"
          onClick={() => conect()}
        />
      )}
    </S.MyPoolTable>
  )
}
