import React from 'react'
import { ZeroAddress, ethers } from 'ethers'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import { networks } from '@/constants/tokenAddresses'

import { ERC20 } from '@/hooks/useERC20'
import useStaking from '@/hooks/useStaking'
import { useConnectWallet } from '@web3-onboard/react'

import Tippy from '@tippyjs/react'
import Image from 'next/image'
import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

type MyAssetProps = {
  chainId: number
  price: string
  poolAddress: string
  decimals: number
  pid: number | undefined
}

const MyAsset = ({
  chainId,
  poolAddress,
  price,
  pid,
  decimals
}: MyAssetProps) => {
  const [stakedToken, setStakedToken] = React.useState<Big>(Big(0))
  const [amountInUsd, setAmountInUsd] = React.useState<Big>(Big(0))

  const chainInfo = networks[chainId]

  const [{ wallet }] = useConnectWallet()

  const stakingContract = useStaking(
    chainInfo.stakingContract ?? ethers.ZeroAddress,
    chainInfo.chainId
  )

  async function getStakedToken() {
    if (!pid || !wallet) return

    const staked = await stakingContract.userInfo(
      pid,
      wallet.accounts[0].address
    )

    setStakedToken(Big(staked.amount))
  }

  async function getBalance(decimals: number): Promise<void> {
    if (!wallet) return

    const { balance } = await ERC20(
      poolAddress,
      networks[chainInfo.chainId].rpc
    )

    const balanceToken = Big(await balance(wallet.accounts[0].address))

    if (balanceToken.gt(0)) {
      const amountInUsd = balanceToken.div(Big(10).pow(decimals)).mul(price)

      setAmountInUsd(amountInUsd)
    }
  }

  React.useEffect(() => {
    if (poolAddress === ZeroAddress) return

    getBalance(decimals)
    getStakedToken()
  }, [wallet, pid])

  return (
    <S.MyAsset>
      <S.CardInfo>
        <S.Text>MY BALANCE</S.Text>
        <S.ValueInfo>
          <S.Value>$ {BNtoDecimal(amountInUsd, 2, undefined, 2)}</S.Value>
          <Tippy content={'The current value of pool in your account.'}>
            <S.Tooltip>
              <Image src={tooltip} alt="Explanation" layout="responsive" />
            </S.Tooltip>
          </Tippy>
        </S.ValueInfo>
      </S.CardInfo>

      <S.CardInfo>
        <S.Text>STAKED</S.Text>
        <S.ValueInfo>
          <S.Value>
            ${' '}
            {BNtoDecimal(
              stakedToken.div(Big(10).pow(decimals)).mul(price),
              2,
              undefined,
              2
            )}
          </S.Value>
          <Tippy
            content={'Pooling of locked cryptocurrencies to maximize rewards.'}
          >
            <S.Tooltip>
              <Image src={tooltip} alt="Explanation" layout="responsive" />
            </S.Tooltip>
          </Tippy>
        </S.ValueInfo>
      </S.CardInfo>
    </S.MyAsset>
  )
}

export default MyAsset
