import Link from 'next/link'
import CopyToClipboard from 'react-copy-to-clipboard'

import substr from '../../../../../utils/substr'

import { ToastInfo } from '../../../../../components/Toastify/toast'
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
      <S.WrapperPoolPrivacy>
        <S.PoolPrivacyLine>
          <p>Privacy</p>
          <span>
            Public || Private{' '}
            <img
              src="/assets/utilities/edit-icon.svg"
              alt=""
              width={16}
              height={16}
            />
          </span>
        </S.PoolPrivacyLine>
        <S.WrapperPoolPrivate>
          <p>addresses that can invest</p>
          <S.PrivateAddressList>
            {privatyAddress.map((wallet, index) => {
              return (
                <S.PrivateAddress
                  key={wallet.address}
                  hasBorder={Number.isInteger(index / 2)}
                >
                  <p>{substr(wallet.address)}</p>
                  <S.WrapperAddressImages>
                    <span onClick={() => ToastInfo('Address copied')}>
                      <CopyToClipboard text={wallet.address}>
                        <svg
                          width="14"
                          height="15"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                            fill="#ffffff"
                          />
                        </svg>
                      </CopyToClipboard>
                    </span>
                    <Link
                      href={`https://snowtrace.io/address/${wallet.address}`}
                      passHref
                    >
                      <a target="_blank">
                        <img
                          src="/assets/utilities/external-link.svg"
                          alt="Follow our Twitter feed"
                          width={18}
                          height={18}
                        />
                      </a>
                    </Link>
                  </S.WrapperAddressImages>
                </S.PrivateAddress>
              )
            })}
          </S.PrivateAddressList>
        </S.WrapperPoolPrivate>
      </S.WrapperPoolPrivacy>
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

const privatyAddress = [
  {
    address: '0x10a07555273E98e42867c6B5d327A6B73740033d'
  },
  {
    address: '0xb343CF4B6EbA89F51BbDbf8ACa97cD2C90aD2E1e'
  },
  {
    address: '0x241cd3d66e932264E3dbe3fB226d5314bb5FB454'
  },
  {
    address: '0x81ADaa2b115c4921f3Cc412A05F9Caa521b4e1AC'
  },
  {
    address: '0x7D53f718C8799110bD8598f9aaD4A1FB109aA0aB'
  }
]
