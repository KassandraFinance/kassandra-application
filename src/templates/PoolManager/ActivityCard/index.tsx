import Link from 'next/link'

import ItemInformation from './ItemInformation'
import WeightChangeAssetList from './WeightChangeAssetList'

import substr from '@/utils/substr'

import * as S from './styles'

interface IActivityCardProps {
  actionTitle: string;
  // actionLogo: string;
  actionType: actionsType;
  // timestamp: number;
  sharesRedeemed?: number;
}

export enum actionsType {
  DEPOSIT,
  WITHDRAWAL,
  REBALANCE,
  ADDITION,
  REMOVAL
}

const ActivityCard = ({
  actionTitle,
  actionType,
  // timestamp,
  sharesRedeemed
}: IActivityCardProps) => {
  return (
    <S.ActivityCard>
      <S.ActivityActionTitle>
        <S.ActionTitle>
          <img
            src="/assets/icons/rebalance.svg"
            alt=""
            width={26}
            height={26}
          />
          <p>{actionTitle}</p>
        </S.ActionTitle>
        <Link href="#" passHref>
          <S.ActionTimeContent target="_blank">
            <p>17:04</p>
            <span>22/12/2022</span>
            <img
              src="/assets/utilities/external-link.svg"
              alt=""
              width={16}
              height={16}
            />
          </S.ActionTimeContent>
        </Link>
      </S.ActivityActionTitle>

      <S.ActivityBodyContainer>
        <S.PoolAndUserWrapper>
          <ItemInformation
            title="Investor"
            name="The Dude"
            description={substr('0xD581d597dBc574A458d469A62Fb5a07A625Edf73')}
            userWalletAddress="0xD581d597dBc574A458d469A62Fb5a07A625Edf73"
          />

          <ItemInformation
            title="Pool"
            name="Awesome Pool"
            description="$AWES"
          />
        </S.PoolAndUserWrapper>

        <S.TokenWrapper>
          {actionType !== actionsType.REBALANCE ? (
            <>
              <ItemInformation
                title="Amount"
                name="530.125 MATIC"
                description="$424,10"
                ImageUrl="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912"
              />

              {sharesRedeemed && (
                <S.SharesRedeemedContent>
                  <p>Shares Redeemed</p>
                  <span>{sharesRedeemed}</span>
                </S.SharesRedeemedContent>
              )}
            </>
          ) : (
            <WeightChangeAssetList AssetInfoList={MockPoolTokenList} link="#" />
          )}
        </S.TokenWrapper>
      </S.ActivityBodyContainer>
    </S.ActivityCard>
  )
}

export default ActivityCard

const MockPoolTokenList = [
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBCPOA',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  },
  {
    symbol: 'WBTCWTBC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  }
]
