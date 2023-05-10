import React from 'react'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { useAppSelector } from '@/store/hooks'
import substr from '@/utils/substr'
import { GET_BROKERS } from './graphql'

import ImageProfile from '@/components/Governance/ImageProfile'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'
import { ToastInfo } from '@/components/Toastify/toast'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'

import arrowIcon from '@assets/utilities/arrow-left.svg'
import eyeShowIcon from '@assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  THead,
  TR,
  TH,
  ColumnTitle,
  TableViewButtonContainer,
  TableViewButton,
  TD,
  Value,
  ViewButton,
  TRLink,
  TRHead,
  PaginationWrapper,
  LoadingContainer,
  TBodyWithHeight
} from '@/templates/Explore/CommunityPoolsTable/styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value as V
} from '@ui/Modals/ModalViewCoin/styles'

type GetBrokersType = {
  pools: {
    num_brokers: number,

    brokers: {
      wallet: string,
      num_deposits: number,
      unique_investors: number,
      deposits_usd: string,
      fees_usd: string
    }[]
  }[]
}

const BrokersTable = () => {
  const [skip, setSkip] = React.useState(0)
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [brokerData, setBrokerData] = React.useState({
    logo: '',
    name: '',
    address: ''
  })
  const [lineData, setLineData] = React.useState({
    deposits: 0,
    uniqueDeposits: 0,
    amount: '0',
    feeReceived: '0',
    address: ''
  })

  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const take = 4

  const { data } = useSWR<GetBrokersType>(
    userWalletAddress.length > 0 && poolId.length > 0
      ? [GET_BROKERS, userWalletAddress, poolId]
      : null,
    (query, userWalletAddress, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: userWalletAddress,
        poolId: poolId,
        first: take,
        skip
      })
  )

  const brokersList = data?.pools[0]?.brokers

  function handleCurrentInView(n: number, columns: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return columns
      } else if (newPrev > columns) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  function handleView(
    name: string,
    logo: string | null,
    address: string,
    line: {
      deposits: number,
      uniqueDeposits: number,
      amount: string,
      feeReceived: string,
      address: string
    }
  ) {
    setBrokerData({
      logo: logo || '',
      name: name,
      address: address
    })
    setLineData(line)
    setIsOpen(true)
  }

  // eslint-disable-next-line prettier/prettier
  function handleClickCopyToClipboard(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault()
    ToastInfo('Copy address')
  }

  return (
    <S.BrokersTable>
      <THead>
        <TRHead>
          <TH>
            <ColumnTitle>Broker</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 1}>
            <ColumnTitle align="right">Deposits</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 2}>
            <ColumnTitle align="right">Unique Deposits</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 3}>
            <ColumnTitle align="right">Amount</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 4}>
            <ColumnTitle align="right">Fee Received</ColumnTitle>
          </TH>
          <TH isView={inViewCollum === 5}>
            <ColumnTitle align="right">Address</ColumnTitle>
          </TH>
          <TH>
            <TableViewButtonContainer>
              <TableViewButton onClick={() => handleCurrentInView(-1, 5)}>
                <Image src={arrowIcon} width={7} height={12} />
              </TableViewButton>

              <TableViewButton onClick={() => handleCurrentInView(1, 5)}>
                <Image src={arrowIcon} width={7} height={12} />
              </TableViewButton>
            </TableViewButtonContainer>
          </TH>
        </TRHead>
      </THead>

      <TBodyWithHeight
        tableRowsNumber={
          brokersList ? (brokersList.length > 0 ? brokersList.length : 2) : take
        }
        lineHeight={8.6}
      >
        {brokersList ? (
          brokersList.length > 0 ? (
            brokersList.map(broker => {
              return (
                <TR key={broker.wallet}>
                  <Link href={`/profile/${broker.wallet}`} passHref>
                    <TRLink>
                      <TD>
                        <Value>
                          <ImageProfile
                            address={broker.wallet}
                            diameter={24}
                            hasAddress={true}
                            isLink={false}
                            tab="?tab=portfolio"
                          />
                        </Value>
                      </TD>
                      <TD isView={inViewCollum === 1}>
                        <Value>{broker.num_deposits}</Value>
                      </TD>
                      <TD isView={inViewCollum === 2}>
                        <Value>{broker.unique_investors}</Value>
                      </TD>
                      <TD isView={inViewCollum === 3}>
                        <Value>${Number(broker.deposits_usd).toFixed(2)}</Value>
                      </TD>
                      <TD isView={inViewCollum === 4}>
                        <Value>${Number(broker.fees_usd).toFixed(2)}</Value>
                      </TD>
                      <TD
                        isView={inViewCollum === 5}
                        onClick={handleClickCopyToClipboard}
                      >
                        <CopyToClipboard text={broker.wallet}>
                          <S.AddressContainer>
                            <Value>{substr(broker.wallet)}</Value>

                            <svg
                              width="12"
                              height="13"
                              viewBox="0 0 12 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                                fill="#bdbdbd"
                              />
                            </svg>
                          </S.AddressContainer>
                        </CopyToClipboard>
                      </TD>

                      <TD
                        onClick={event => {
                          event.preventDefault()
                          handleView(broker.wallet, '', broker.wallet, {
                            deposits: broker.num_deposits,
                            uniqueDeposits: broker.unique_investors,
                            amount: broker.deposits_usd,
                            feeReceived: broker.fees_usd,
                            address: broker.wallet
                          })
                        }}
                      >
                        <ViewButton type="button">
                          <Image src={eyeShowIcon} />
                        </ViewButton>
                      </TD>
                    </TRLink>
                  </Link>
                </TR>
              )
            })
          ) : (
            <S.NoHaveBrokers>there are no brokers</S.NoHaveBrokers>
          )
        ) : (
          <LoadingContainer>
            <Loading marginTop={0} />
          </LoadingContainer>
        )}
      </TBodyWithHeight>

      <PaginationWrapper>
        <Pagination
          skip={skip}
          take={take}
          totalItems={data?.pools[0]?.num_brokers ?? 0}
          handlePageClick={({ selected }) => {
            setSkip(selected * take)
          }}
        />
      </PaginationWrapper>

      <ModalViewCoin
        isOpen={isOpen}
        title={brokerData}
        isJazzicon
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Deposits</TableLineTitle>

          <ValueContainer>
            <V>{lineData.deposits}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Unique Deposits</TableLineTitle>

          <ValueContainer>
            <V>{lineData.uniqueDeposits}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Amount</TableLineTitle>

          <ValueContainer>
            <V>{lineData.amount}</V>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Fee Received</TableLineTitle>

          <ValueContainer>
            <V>{lineData.feeReceived}</V>
          </ValueContainer>
        </TableLine>

        <TableLine>
          <TableLineTitle>Address</TableLineTitle>

          <ValueContainer>
            <CopyToClipboard text={lineData.address}>
              <S.AddressContainer>
                <V>{lineData.address}</V>

                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00068 12.3334H1.16735C1.01269 12.3387 0.858581 12.3122 0.714603 12.2555C0.570625 12.1988 0.439858 12.113 0.330432 12.0036C0.221007 11.8942 0.135264 11.7634 0.0785358 11.6194C0.0218072 11.4755 -0.00469379 11.3214 0.000680608 11.1667L0.000680608 5.33336C-0.00469379 5.17871 0.0218072 5.0246 0.0785358 4.88062C0.135264 4.73664 0.221007 4.60587 0.330432 4.49645C0.439858 4.38702 0.570625 4.30128 0.714603 4.24455C0.858581 4.18782 1.01269 4.16132 1.16735 4.1667H3.50068V1.83336C3.49531 1.67871 3.52181 1.5246 3.57854 1.38062C3.63526 1.23664 3.72101 1.10587 3.83043 0.996448C3.93986 0.887023 4.07063 0.80128 4.2146 0.744551C4.35858 0.687823 4.51269 0.661322 4.66735 0.666696L10.5007 0.666696C10.6553 0.661322 10.8094 0.687823 10.9534 0.744551C11.0974 0.80128 11.2282 0.887023 11.3376 0.996448C11.447 1.10587 11.5328 1.23664 11.5895 1.38062C11.6462 1.5246 11.6727 1.67871 11.6673 1.83336V7.6667C11.6726 7.82133 11.6461 7.9754 11.5893 8.11934C11.5326 8.26328 11.4468 8.39401 11.3374 8.50342C11.228 8.61283 11.0973 8.69857 10.9533 8.75533C10.8094 8.81209 10.6553 8.83865 10.5007 8.83336H8.16735V11.1667C8.17264 11.3213 8.14608 11.4754 8.08932 11.6193C8.03256 11.7633 7.94681 11.894 7.8374 12.0034C7.728 12.1128 7.59726 12.1986 7.45333 12.2553C7.30939 12.3121 7.15532 12.3387 7.00068 12.3334ZM1.16735 5.33336V11.1667H7.00068V8.83336H4.66735C4.51271 8.83865 4.35864 8.81209 4.2147 8.75533C4.07076 8.69857 3.94003 8.61283 3.83062 8.50342C3.72122 8.39401 3.63547 8.26328 3.57871 8.11934C3.52195 7.9754 3.49539 7.82133 3.50068 7.6667V5.33336H1.16735ZM4.66735 1.83336V7.6667H10.5007V1.83336H4.66735Z"
                    fill="#bdbdbd"
                  />
                </svg>
              </S.AddressContainer>
            </CopyToClipboard>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </S.BrokersTable>
  )
}

export default BrokersTable
