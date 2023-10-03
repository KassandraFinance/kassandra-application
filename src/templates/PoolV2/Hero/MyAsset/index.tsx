import React from 'react'
import { ethers } from 'ethers'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import { networks } from '@/constants/tokenAddresses'

import useERC20 from '@/hooks/useERC20'
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
  const [balance, setBalance] = React.useState<Big>(Big(10e18))

  const chainInfo = networks[chainId]

  const [{ wallet }] = useConnectWallet()

  const stakingContract = useStaking(
    chainInfo.stakingContract ?? ethers.ZeroAddress,
    chainInfo.chainId
  )

  const ERC20 = useERC20(poolAddress, networks[chainInfo.chainId].rpc)

  async function getStakedToken() {
    if (!pid || !wallet) return

    const staked = await stakingContract.userInfo(
      pid,
      wallet.accounts[0].address
    )

    setStakedToken(Big(staked.amount))
  }

  async function getBalance() {
    if (!wallet) return

    const balanceToken = await ERC20.balance(wallet.accounts[0].address)

    setBalance(Big(balanceToken))
  }

  React.useEffect(() => {
    getBalance()
    getStakedToken()
  }, [wallet, pid])

  return (
    <S.MyAsset>
      <S.CardInfo>
        <S.Text>MY BALANCE</S.Text>
        <S.ValueInfo>
          <S.Value>
            ${' '}
            {BNtoDecimal(
              balance.div(Big(balance).pow(decimals)).mul(price),
              2,
              undefined,
              2
            )}
          </S.Value>
          <Tippy content={'test e'}>
            <S.Tooltip>
              <Image src={tooltip} alt="Explanation" layout="responsive" />
            </S.Tooltip>
          </Tippy>
        </S.ValueInfo>
      </S.CardInfo>

      <S.CardInfo>
        <S.Text>STACKED</S.Text>
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
          <Tippy content={'test e'}>
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
