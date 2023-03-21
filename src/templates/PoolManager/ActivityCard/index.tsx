import ItemInformation from './ItemInformation'
import WeightChangeAssetList from './WeightChangeAssetList'

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
  const assetInfo = {
    symbol: 'WBTC',
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    weight: 5,
    newWeight: 10
  }
  const assetInfoList = new Array<typeof assetInfo>(7).fill(assetInfo)

  return (
    <S.ActivityCard>
      <S.ActivityActionTitle>
        <S.ActionTitle>
          <img
            src="/assets/icons/rebalance.svg"
            alt=""
            width={24}
            height={24}
          />
          <p>{actionTitle}</p>
        </S.ActionTitle>
        <S.ActionTimeContent>
          <p>17:04</p>
          <span>22/12/2022</span>
          <img
            src="/assets/utilities/external-link.svg"
            alt=""
            width={16}
            height={16}
          />
        </S.ActionTimeContent>
      </S.ActivityActionTitle>

      <S.ActivityBodyContainer>
        <S.LeftContainer>
          <ItemInformation
            title="Investor"
            name="The Dude"
            description="0xakivrv0-2-oevapodjvlskll4f8oo"
            userWalletAddress="0xD581d597dBc574A458d469A62Fb5a07A625Edf73"
          />

          <ItemInformation
            title="Pool"
            name="Awesome Pool"
            description="$AWES"
          />
        </S.LeftContainer>

        <S.RightContainer>
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
            <WeightChangeAssetList AssetInfoList={assetInfoList} link="#" />
          )}
        </S.RightContainer>
      </S.ActivityBodyContainer>
    </S.ActivityCard>
  )
}

export default ActivityCard
