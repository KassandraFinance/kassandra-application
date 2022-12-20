import FeeBreakdown from '../../ConfigureFee/FeeBreakdown'
import * as S from './styles'

const PoolReview = () => {
  return (
    <S.PoolReview>
      <S.PoolReviewContainer>
        <S.PoolReviewHeader>
          <S.PoolNameContainer>
            <img src="" alt="" width={64} height={64} />
            <S.PoolNameContent>
              <p>Fund Name</p>
              <span>
                SYMBOL{' '}
                <img
                  src="/assets/utilities/edit-icon.svg"
                  alt=""
                  width={14}
                  height={14}
                />
              </span>
            </S.PoolNameContent>
          </S.PoolNameContainer>
          <S.PoolValueContent>
            <span>
              $150.00{' '}
              <img
                src="/assets/utilities/edit-icon.svg"
                alt=""
                width={14}
                height={14}
              />
            </span>
            <p>INITIAL PRICE</p>
          </S.PoolValueContent>
        </S.PoolReviewHeader>
        <hr />

        <S.ReviewTable>
          <S.ReviewThead>
            <S.ReviewTh>Assets</S.ReviewTh>
            <S.ReviewTh>Allocation</S.ReviewTh>
            <S.ReviewTh>Amount</S.ReviewTh>
            <S.ReviewTh>Amount (USD)</S.ReviewTh>
          </S.ReviewThead>
          <S.ReviewTbody>
            {ListToken.map((token, index) => {
              return (
                <S.ReviewTr key={token.allocation + index}>
                  <S.ReviewTd id="imgContent">
                    <img src={token.image} alt="" width={18} height={18} />
                    {token.name}
                  </S.ReviewTd>
                  <S.ReviewTd>{token.allocation}</S.ReviewTd>
                  <S.ReviewTd>{token.amount}</S.ReviewTd>
                  <S.ReviewTd>{token.amountUSD}</S.ReviewTd>
                </S.ReviewTr>
              )
            })}
          </S.ReviewTbody>
        </S.ReviewTable>

        <hr />
        <S.TvlContainer>
          <span>
            TVL{' '}
            <img
              src="/assets/utilities/tooltip.svg"
              alt=""
              width={20}
              height={20}
            />
          </span>
          <p>$20,000.000</p>
        </S.TvlContainer>
      </S.PoolReviewContainer>
      <S.PrivacySetting>
        <p>Privacy</p>
        <span>
          Public{' '}
          <img
            src="/assets/utilities/edit-icon.svg"
            alt=""
            width={16}
            height={16}
          />
        </span>
      </S.PrivacySetting>
      <FeeBreakdown
        depositFee={{ address: '', rate: 0 }}
        isActiveToggles={{
          depositFee: true,
          managementFee: true,
          refferalCommission: true
        }}
        managementFee={{ address: '', rate: 0 }}
        refferalCommission={{ broker: 0, share: 1 }}
      />
    </S.PoolReview>
  )
}

export default PoolReview

const ListToken = [
  {
    image:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
    name: 'MATIC',
    allocation: '20.33%',
    amount: '1000',
    amountUSD: '$5000.00'
  },
  {
    image:
      'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    name: 'LINK',
    allocation: '20.33%',
    amount: '1000',
    amountUSD: '$5000.00'
  },
  {
    image:
      'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    name: 'UNI',
    allocation: '20.33%',
    amount: '1000',
    amountUSD: '$5000.00'
  },
  {
    image:
      'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
    name: 'WETH',
    allocation: '20.33%',
    amount: '1000',
    amountUSD: '$5000.00'
  },
  {
    image:
      'https://assets.coingecko.com/coins/images/22918/small/kacy.png?1643459818',
    name: 'KACY',
    allocation: '20.33%',
    amount: '1000',
    amountUSD: '$5000.00'
  }
]
