import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BigNumber from 'bn.js'
import Big from 'big.js'
import Blockies from 'react-blockies'

import { Staking, LPDaiAvax } from '../../../constants/tokenAddresses'
import { LP_KACY_AVAX_PNG } from '../../../constants/pools'

import { useAppDispatch } from '../../../store/hooks'
import { useAppSelector } from '../../../store/hooks'
import { ChainInfo } from '../../../store/reducers/pool'
import { setModalWalletActive } from '../../../store/reducers/modalWalletActive'

import usePriceLP from '../../../hooks/usePriceLP'
import useERC20Contract from '../../../hooks/useERC20Contract'
import useStakingContract from '../../../hooks/useStakingContract'
import useMatomoEcommerce from '../../../hooks/useMatomoEcommerce'

import changeChain from '../../../utils/changeChain'
import { BNtoDecimal } from '../../../utils/numerals'
import { registerToken } from '../../../utils/registerToken'

import Button from '../../../components/Button'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

interface IMyAssetProps {
  chain: ChainInfo;
  poolToken: string;
  symbol: string;
  price: string;
  pid?: number;
  decimals: number;
}

export interface IPriceLPToken {
  kacy: Big;
  fund: Big;
}

const MyAsset = ({
  chain,
  poolToken,
  symbol,
  price,
  pid,
  decimals
}: IMyAssetProps) => {
  const [walletConnect, setWalletConnect] = React.useState<string | null>(null)
  const [stakedToken, setStakedToken] = React.useState<BigNumber>(
    new BigNumber(0)
  )
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0))
  const [priceToken, setPriceToken] = React.useState<IPriceLPToken>({
    kacy: Big(-1),
    fund: Big(-1)
  })
  const [apr, setApr] = React.useState<BigNumber>(new BigNumber(0))

  const stakingContract = useStakingContract(Staking)
  const tokenWallet = useERC20Contract(poolToken)
  const { trackEventFunction } = useMatomoEcommerce()
  const { getPriceKacyAndLP } = usePriceLP()

  const { chainId, userWalletAddress, pool } = useAppSelector(state => state)

  const dispatch = useAppDispatch()
  const router = useRouter()

  async function getStakedToken() {
    if (typeof pid !== 'number') return

    const staked = await stakingContract.userInfo(pid, userWalletAddress)
    setStakedToken(staked.amount)
  }

  async function getBalance() {
    const balanceToken = await tokenWallet.balance(userWalletAddress)

    setBalance(balanceToken)
  }

  async function getLiquidityPoolPriceInDollar() {
    const { kacyPriceInDollar } = await getPriceKacyAndLP(
      LP_KACY_AVAX_PNG,
      LPDaiAvax,
      false
    )

    setPriceToken(prevState => ({
      ...prevState,
      fund: Big(price || -1)
    }))

    setPriceToken(prevState => ({
      ...prevState,
      kacy: kacyPriceInDollar
    }))
  }

  async function getApr() {
    if (typeof pid !== 'number') return

    const poolInfoResponse = await stakingContract.poolInfo(pid)

    if (!poolInfoResponse.withdrawDelay) {
      return
    }

    const kacyRewards = new BigNumber(poolInfoResponse.rewardRate).mul(
      new BigNumber(86400)
    )

    if (priceToken.fund.gt('0')) {
      const aprResponse =
        poolInfoResponse.depositedAmount.toString() !== '0' &&
        priceToken.kacy.gt('-1') &&
        priceToken.fund.gt('-1')
          ? new BigNumber(
              Big(kacyRewards.toString())
                .mul('365')
                .mul('100')
                .mul(priceToken.kacy)
                .div(
                  priceToken.fund.mul(
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
    const handleWallectConnect = () => {
      const connect = localStorage.getItem('walletconnect')

      if (connect) {
        setWalletConnect(connect)
      } else {
        setWalletConnect(null)
      }
    }

    handleWallectConnect()
  }, [])

  React.useEffect(() => {
    if (userWalletAddress !== '') {
      getBalance()

      getStakedToken()
    }
  }, [userWalletAddress, chainId])

  React.useEffect(() => {
    if (userWalletAddress !== '' && typeof pid === 'number') {
      getLiquidityPoolPriceInDollar()
    }
  }, [price, userWalletAddress, chainId])

  React.useEffect(() => {
    if (userWalletAddress !== '') {
      getApr()
    }
  }, [priceToken, userWalletAddress, chainId])

  return !apr.isZero() || pool.poolId ? (
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
                  <img src={pool.logo} width={20} height={20} alt="" />
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
              <S.TdWrapper>
                <span>
                  {userWalletAddress
                    ? BNtoDecimal(stakedToken, decimals, 4)
                    : '...'}{' '}
                  {symbol}
                </span>
                <S.Value>
                  $
                  {userWalletAddress
                    ? BNtoDecimal(
                        Big(stakedToken.toString())
                          .div(Big(10).pow(18))
                          .mul(price),
                        2
                      )
                    : '...'}
                </S.Value>
              </S.TdWrapper>
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
      <S.ButtonWrapper>
        {Number(chain.id) === chainId ? (
          <Button
            backgroundSecondary
            text={
              userWalletAddress
                ? `Stake ${symbol} to earn ${BNtoDecimal(apr, 0)}% APR`
                : 'Connect Wallet'
            }
            fullWidth
            size="huge"
            onClick={
              userWalletAddress
                ? () => {
                    trackEventFunction('click-on-button', 'stake', 'my-asset')
                    router.push('/farm')
                  }
                : () => dispatch(setModalWalletActive(true))
            }
          />
        ) : (
          <Button
            className="btn-submit"
            backgroundSecondary
            size="huge"
            fullWidth
            type="button"
            onClick={() =>
              changeChain({
                chainId: chain.id,
                blockExplorerUrl: chain.blockExplorerUrl,
                chainName: chain.chainName,
                nativeCurrency: {
                  decimals: chain.nativeTokenDecimals,
                  symbol: chain.nativeTokenSymbol,
                  name: chain.chainName
                },
                rpcUrls: chain.rpcUrls,
                wrapped: chain.addressWrapped
              })
            }
            disabled={walletConnect ? true : false}
            text={
              walletConnect
                ? `Change manually to ${chain.chainName}`
                : `Change to ${chain.chainName}`
            }
          />
        )}
      </S.ButtonWrapper>
    </S.MyAsset>
  ) : null
}

export default MyAsset
