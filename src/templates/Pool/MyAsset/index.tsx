import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BigNumber from 'bn.js'
import Big from 'big.js'
import Blockies from 'react-blockies'
import Tippy from '@tippyjs/react'
import Web3 from 'web3'

import { networks, KacyPoligon } from '../../../constants/tokenAddresses'

import { useAppDispatch } from '../../../store/hooks'
import { useAppSelector } from '../../../store/hooks'
import { ChainInfo } from '../../../store/reducers/pool'
import { setModalWalletActive } from '../../../store/reducers/modalWalletActive'
import useCoingecko from '@/hooks/useCoingecko'

import useERC20Contract from '../../../hooks/useERC20Contract'
import useStakingContract from '../../../hooks/useStakingContract'
import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'

import { BNtoDecimal } from '../../../utils/numerals'
import { registerToken } from '../../../utils/registerToken'

import Button from '../../../components/Button'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

interface IMyAssetProps {
  chain: ChainInfo
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
  const [stakedToken, setStakedToken] = React.useState<BigNumber>(
    new BigNumber(0)
  )
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0))
  const [apr, setApr] = React.useState<BigNumber>(new BigNumber(0))

  const chainInfo = networks[chain.id]

  const stakingContract = useStakingContract(
    chainInfo.stakingContract ?? '',
    chainInfo.chainId
  )
  const ERC20 = useERC20Contract(
    poolToken,
    new Web3(networks[chainInfo.chainId].rpc)
  )
  const { trackEventFunction } = useMatomoEcommerce()
  const { priceToken } = useCoingecko(
    chainInfo.chainId,
    chainInfo.nativeCurrency.address,
    [KacyPoligon]
  )
  const { userWalletAddress, pool } = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const kacyPrice = priceToken(KacyPoligon.toLowerCase())

  async function getStakedToken() {
    if (!pid) return

    const staked = await stakingContract.userInfo(pid, userWalletAddress)

    setStakedToken(staked.amount)
  }

  async function getBalance() {
    const balanceToken = await ERC20.balance(userWalletAddress)

    setBalance(balanceToken)
  }

  async function getApr() {
    if (!pid) return
    const poolInfoResponse = await stakingContract.poolInfo(pid)

    if (!poolInfoResponse.withdrawDelay) return

    const kacyRewards = new BigNumber(poolInfoResponse.rewardRate).mul(
      new BigNumber(86400)
    )

    const fundPrice = Big(price ?? 0)
    const priceKacy = Big(kacyPrice ?? 0)

    if (fundPrice.gt('0')) {
      const aprResponse =
        poolInfoResponse.depositedAmount.toString() !== '0' &&
        priceKacy.gt('-1') &&
        fundPrice.gt('-1')
          ? new BigNumber(
              Big(kacyRewards.toString())
                .mul('365')
                .mul('100')
                .mul(Big(priceKacy ?? 0))
                .div(
                  Big(price).mul(
                    Big(poolInfoResponse.depositedAmount.toString())
                  )
                )
                .toFixed(0)
            )
          : new BigNumber(-1)

      setApr(aprResponse)
    }
  }

  React.useEffect(() => {
    if (userWalletAddress !== '') {
      getBalance()

      getStakedToken()
    }
  }, [userWalletAddress, pid])

  React.useEffect(() => {
    if (userWalletAddress !== '' && pid) {
      getApr()
    }
  }, [userWalletAddress, pid, kacyPrice])

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
                {pool.logo ? (
                  <img
                    src={pool.logo}
                    width={20}
                    height={20}
                    alt=""
                    className="poolIcon"
                  />
                ) : (
                  <Blockies
                    seed={pool.name}
                    className="poolIcon"
                    size={7}
                    scale={4}
                  />
                )}
                <span>{symbol}</span>
              </S.TdWrapper>
            </S.Td>
            <S.Td>
              {userWalletAddress && pid ? (
                <S.TdWrapper>
                  <span>
                    {BNtoDecimal(stakedToken, decimals, 4)} {symbol}
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
                  {userWalletAddress ? BNtoDecimal(balance, 18, 4) : '...'}{' '}
                  {symbol}
                </span>
                <S.Value>
                  $
                  {userWalletAddress
                    ? BNtoDecimal(
                        Big(balance.toString()).div(Big(10).pow(18)).mul(price),
                        2
                      )
                    : '...'}
                </S.Value>
              </S.TdWrapper>
            </S.Td>
          </S.Tr>
        </S.TBody>
      </S.Table>

      {userWalletAddress !== '' ? (
        pid && (
          <S.ButtonWrapper>
            <Button
              backgroundSecondary
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
            backgroundSecondary
            text="Connect Wallet"
            fullWidth
            size="huge"
            onClick={() => dispatch(setModalWalletActive(true))}
          />
        </S.ButtonWrapper>
      )}
    </S.MyAsset>
  )
}

export default MyAsset
