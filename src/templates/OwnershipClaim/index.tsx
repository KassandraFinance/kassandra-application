import React from 'react'
import { ZeroAddress } from 'ethers'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import { URL_DISCORD_DEV_CHAT, networks } from '@/constants/tokenAddresses'

import substr from '@/utils/substr'

import { usePoolData } from '@/hooks/query/usePoolData'
import useTransaction from '@/hooks/useTransaction'
import useManagePoolController, {
  managePoolController
} from '@/hooks/useManagePoolController'

import Button from '../../components/Button'

import * as S from './styles'

const OwnershipClaim = () => {
  const [currentCandidate, setcurrentCandidate] = React.useState(ZeroAddress)

  const router = useRouter()
  const poolId = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id ?? ''

  const [{ wallet }] = useConnectWallet()
  const [{ settingChain }, setChain] = useSetChain()
  const { data } = usePoolData({ id: poolId })

  const poolChainId = data?.chain_id ?? 0
  const userChainId = Number(wallet?.chains[0].id ?? 0)
  const poolControllerAddress = data ? data.controller : ZeroAddress

  const { txNotification, transactionErrors } = useTransaction()
  const { claimOwnership } = useManagePoolController(
    poolControllerAddress,
    networks[poolChainId]?.rpc
  )

  async function handleClaimOwnership() {
    await claimOwnership()
  }

  async function handleGetCandidate() {
    const poolController = await managePoolController(
      poolControllerAddress,
      networks[poolChainId]?.rpc,
      { wallet, txNotification, transactionErrors }
    )

    const candidate = await poolController.getManagerCandidate()

    setcurrentCandidate(candidate)
  }

  React.useEffect(() => {
    if (!data) return

    handleGetCandidate()
  }, [data])

  return (
    <S.OwnershipClaim>
      <S.Card>
        <h1>TRANSFER ONERSHIP</h1>

        <p>
          You&apos;ve been chosen to become the new owner of the{' '}
          <a href={`/pool/${poolId}`} target="_blank" rel="noreferrer">
            {data?.name}
          </a>{' '}
          pool. User{' '}
          <a
            href={`/profile/${data?.manager?.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {data?.manager?.nickname ??
              substr(data?.manager?.id ?? ZeroAddress)}
          </a>{' '}
          has designated you as the new pool owner. If you agree to take on this
          responsibility, simply claim the pool, and within moments, it will
          appear on your management page. If you have any questions, feel free
          to join our{' '}
          <a href={URL_DISCORD_DEV_CHAT} target="_blank" rel="noreferrer">
            Discord
          </a>{' '}
          and chat with us.
        </p>

        <S.ButtonWrapper>
          {userChainId !== poolChainId ? (
            <Button
              background="primary"
              size="huge"
              text={`Connect to ${networks[poolChainId]?.chainName}`}
              fullWidth
              disabledNoEvent={settingChain || !poolChainId}
              onClick={() =>
                setChain({
                  chainId: `0x${poolChainId.toString(16)}`
                })
              }
            />
          ) : (
            <Button
              background="primary"
              size="huge"
              text="Claim"
              fullWidth
              disabledNoEvent={
                poolChainId !== userChainId ||
                currentCandidate.toLowerCase() !==
                  wallet?.accounts[0].address.toLowerCase()
              }
              onClick={() => handleClaimOwnership()}
            />
          )}
        </S.ButtonWrapper>
      </S.Card>
    </S.OwnershipClaim>
  )
}

export default OwnershipClaim
