import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import Big from 'big.js'
import Tippy from '@tippyjs/react'
import { useConnectWallet } from '@web3-onboard/react'

import AnyCard from '@/components/AnyCard'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import { BNtoDecimal } from '@/utils/numerals'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'

export interface IKacyLpPool {
  pid: number
  symbol: string
  poolName: string
  properties?: {
    logo: {
      src: string
      style: {
        width: string
      }
    }
    title?: string
    link?: string
  }
  amount: BigNumber
  chainLogo: string
}

export interface IPriceToken {
  [key: string]: Big
}

export interface IAssetsValueWalletProps {
  [key: number]: BigNumber
}

interface IStakingTableProps {
  profileAddress: string
  cardstakesPoolNew: IKacyLpPool[]
  priceToken: IPriceToken
}

const namePools: { [key: string]: string } = {
  KACY: 'by Kassandra',
  'LP-JOE': 'by Kassandra & Trader Joe',
  'LP-PNG': 'by Kassandra & pangolin',
  'KACY-WETH': 'by Kassandra & Balancer'
}

const AssetsCard = ({
  profileAddress,
  priceToken,
  cardstakesPoolNew
}: IStakingTableProps) => {
  const [{ wallet }] = useConnectWallet()

  return (
    <>
      {cardstakesPoolNew.length > 0 ? (
        <S.AssetsContainer isThreeCards={cardstakesPoolNew.length > 2}>
          {cardstakesPoolNew.map(stake => {
            const searchString =
              stake.properties?.logo.style.width.search('rem')
            const widthString = stake.properties?.logo.style.width.substring(
              0,
              searchString
            )
            const NumberWidth = Number(widthString) * 10

            return (
              <S.AssetsHeaderContent key={stake.pid + 1 + stake.poolName}>
                <span>
                  <TokenWithNetworkImage
                    tokenImage={{
                      url: stake.properties ? stake.properties.logo.src : '',
                      width: NumberWidth,
                      withoutBorder: true
                    }}
                    networkImage={{
                      url: stake.chainLogo,
                      height: 16,
                      width: 16
                    }}
                  />
                </span>
                <S.AssetsBodyContent>
                  <S.Balance>
                    BALANCE
                    <Tippy content="This address total KACY balance, accounting wallet holdings, and stake.">
                      <S.Tooltip tabIndex={0}>
                        <Image
                          src={tooltip}
                          alt="Explanation"
                          layout="responsive"
                        />
                      </S.Tooltip>
                    </Tippy>
                  </S.Balance>
                  <S.AssetsValue>
                    {BNtoDecimal(stake.amount, 18, 2)}
                    <strong>{stake.symbol === 'KACY' ? 'KACY' : 'LP'}</strong>
                  </S.AssetsValue>
                  <S.AssetsValueDollar>
                    $
                    {priceToken[stake.symbol]
                      ? BNtoDecimal(
                          Big(stake.amount.toString())
                            .mul(priceToken[stake.symbol])
                            .div(Big(10).pow(18)),
                          6,
                          2,
                          2
                        )
                      : 0}
                  </S.AssetsValueDollar>
                  <S.LineSeperator />
                  <S.AssetsName>{stake.poolName}</S.AssetsName>
                  <S.AssetsSob>{namePools[stake.symbol]}</S.AssetsSob>
                </S.AssetsBodyContent>
              </S.AssetsHeaderContent>
            )
          })}
        </S.AssetsContainer>
      ) : profileAddress.toLowerCase() === wallet?.accounts[0].address ? (
        <AnyCard
          text="It seems you have not staked any KACY"
          button={true}
          link="/farm"
          buttonText="I Want To Stake Some Tokens"
        />
      ) : (
        <AnyCard text="This address has nothing staked" />
      )}
    </>
  )
}

export default AssetsCard
