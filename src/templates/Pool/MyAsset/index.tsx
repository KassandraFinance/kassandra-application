import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Big from 'big.js'
import Blockies from 'react-blockies'
import Tippy from '@tippyjs/react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

import { networks, KacyPoligon } from '../../../constants/tokenAddresses'

import { usePoolData } from '@/hooks/query/usePoolData'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import useERC20 from '../../../hooks/useERC20'
import useStaking from '../../../hooks/useStaking'
import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'

import { BNtoDecimal } from '../../../utils/numerals'
import { registerToken } from '../../../utils/registerToken'

import Button from '../../../components/Button'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

interface IMyAssetProps {
  chain:
    | {
        __typename?: 'Chain' | undefined
        id: string
        logo?: string | null | undefined
        chainName?: string | null | undefined
        nativeTokenName?: string | null | undefined
        nativeTokenSymbol?: string | null | undefined
        nativeTokenDecimals?: number | null | undefined
        rpcUrls?: (string | null)[] | null | undefined
        blockExplorerUrl?: string | null | undefined
        secondsPerBlock?: number | null | undefined
        addressWrapped?: string | null | undefined
      }
    | null
    | undefined
  poolToken: string
  symbol: string
  price: string
  pid?: number
  decimals: number
}

export interface IPriceLPToken {
  kacy: Big
  fund: Big
}

const MyAsset = ({
  chain,
  poolToken,
  symbol,
  price,
  pid,
  decimals
}: IMyAssetProps) => {
  const [stakedToken, setStakedToken] = React.useState<Big>(Big(0))
  const [balance, setBalance] = React.useState<Big>(Big(0))
  const [apr, setApr] = React.useState<Big>(Big(0))

  const chainInfo = networks[Number(chain?.id || 0)]

  const [{ wallet, connecting }, connect] = useConnectWallet()
  const stakingContract = useStaking(
    chainInfo.stakingContract ?? ethers.ZeroAddress,
    chainInfo.chainId
  )
  const ERC20 = useERC20(poolToken, chainInfo.chainId)
  const { trackEventFunction } = useMatomoEcommerce()
  const { data } = useTokensData({
    chainId: networks[137].chainId,
    tokenAddresses: [KacyPoligon]
  })
  const { priceToken } = useGetToken({
    nativeTokenAddress: chainInfo.nativeCurrency.address,
    tokens: data || {}
  })
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

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

  async function getApr() {
    if (!pid) return
    const poolInfoResponse = await stakingContract.poolInfo(pid)
    const kacyRewards = Big(poolInfoResponse.rewardRate).mul(Big(86400))
    const fundPrice = Big(price ?? 0)
    const priceKacy = Big(kacyPrice ?? 0)

    const now = new Date().getTime()
    const periodFinish = new Date(
      Number(poolInfoResponse.periodFinish) * 1000
    ).getTime()

    if (periodFinish > now && fundPrice.gt('0')) {
      const aprResponse =
        poolInfoResponse.depositedAmount.toString() !== '0' &&
        priceKacy.gt('-1') &&
        fundPrice.gt('-1')
          ? Big(
              kacyRewards
                .mul('365')
                .mul('100')
                .mul(priceKacy ?? 0)
                .div(
                  fundPrice.mul(
                    Big(poolInfoResponse.depositedAmount.toString())
                  )
                )
                .toFixed(0)
            )
          : Big(-1)

      setApr(aprResponse)
    } else {
      setApr(Big(0))
    }
  }

  React.useEffect(() => {
    getBalance()
    getStakedToken()
  }, [wallet, pid])

  React.useEffect(() => {
    if (wallet && pid) {
      getApr()
    }
  }, [wallet, pid, kacyPrice])

  return (
    <S.MyAsset>
      <S.TitleWrapper>
        <S.Title>
          <Image src={iconBar} alt="" width={18} height={18} />
          <h2>My asset</h2>
        </S.Title>

        {symbol.length < 11 && (
          <S.AddToken
            type="button"
            onClick={() => {
              registerToken(
                poolToken,
                symbol.toLocaleUpperCase(),
                Number(decimals)
              )
              trackEventFunction(
                'click-add-metamask',
                `add-${symbol}`,
                'my-asset'
              )
            }}
          >
            <Image
              src="/assets/logos/metamask.svg"
              alt="metamask logo"
              width={14}
              height={14}
            />
            <span>Add to Metamask</span>
          </S.AddToken>
        )}
      </S.TitleWrapper>

      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th>Token Name</S.Th>
            <S.Th>Staked</S.Th>
            <S.Th>Balance</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          <S.Tr>
            <S.Td>
              <S.TdWrapper>
                {pool?.logo ? (
                  <img
                    src={pool.logo}
                    width={20}
                    height={20}
                    alt=""
                    className="poolIcon"
                  />
                ) : (
                  <Blockies
                    seed={pool?.name || ''}
                    className="poolIcon"
                    size={7}
                    scale={4}
                  />
                )}
                <span>{symbol}</span>
              </S.TdWrapper>
            </S.Td>
            <S.Td>
              {wallet && pid ? (
                <S.TdWrapper>
                  <span>
                    {BNtoDecimal(stakedToken.div(Big(10).pow(18)), 6)} {symbol}
                  </span>
                  <S.Value>
                    $
                    {BNtoDecimal(
                      Big(stakedToken.toString())
                        .div(Big(10).pow(18))
                        .mul(price),
                      2
                    )}
                  </S.Value>
                </S.TdWrapper>
              ) : pid ? (
                <S.TdWrapper>
                  <span>
                    ...
                    {symbol}
                  </span>
                  <S.Value>$ ...</S.Value>
                </S.TdWrapper>
              ) : (
                <S.TdWrapper>
                  <S.Value>
                    Can&apos;t farm
                    <Tippy content="there is no way to farm this asset at the moment">
                      <img
                        src="/assets/utilities/tooltip.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </Tippy>
                  </S.Value>
                </S.TdWrapper>
              )}
            </S.Td>
            <S.Td>
              <S.TdWrapper>
                <span>
                  {wallet
                    ? BNtoDecimal(balance.div(Big(10).pow(18)), 6)
                    : '...'}{' '}
                  {symbol}
                </span>
                <S.Value>
                  $
                  {wallet
                    ? BNtoDecimal(balance.div(Big(10).pow(18)).mul(price), 2)
                    : '...'}
                </S.Value>
              </S.TdWrapper>
            </S.Td>
          </S.Tr>
        </S.TBody>
      </S.Table>

      {wallet ? (
        pid && (
          <S.ButtonWrapper>
            <Button
              background="secondary"
              text={`Stake ${symbol} to earn ${BNtoDecimal(apr, 0)}% APR`}
              fullWidth
              size="huge"
              onClick={() => {
                trackEventFunction('click-on-button', 'stake', 'my-asset')
                router.push('/farm')
              }}
            />
          </S.ButtonWrapper>
        )
      ) : (
        <S.ButtonWrapper>
          <Button
            background="secondary"
            text="Connect Wallet"
            fullWidth
            size="huge"
            disabled={connecting}
            onClick={() => connect()}
          />
        </S.ButtonWrapper>
      )}
    </S.MyAsset>
  )
}

export default MyAsset
