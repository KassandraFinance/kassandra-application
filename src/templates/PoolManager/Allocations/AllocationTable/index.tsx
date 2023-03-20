import React from 'react'
import Big from 'big.js'
import Link from 'next/link'
import Tippy from '@tippyjs/react'

import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value,
  SecondaryValue
} from '../../../../components/Modals/ModalViewCoin/styles'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'

import * as S from './styles'

type IAllocationDataProps = {
  token: {
    address: string,
    logo: string,
    symbol: string
  },
  allocation: number,
  holding: {
    value: Big,
    valueUSD: Big
  },
  price: {
    value: number,
    changeValue: number
  },
  yields: {
    apy: string,
    url: string
  }
}

interface IAllocationTableProps {
  allocationData: IAllocationDataProps[];
}

const AllocationTable = ({ allocationData }: IAllocationTableProps) => {
  const [viewToken, setViewToken] = React.useState<IAllocationDataProps>()
  const [viewColumnInTable, setViewColumnInTable] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(false)
  const [token, setToken] = React.useState({
    logo: '',
    name: ''
  })

  function handleViewTokenMobile(token: IAllocationDataProps) {
    setToken({
      logo: token.token.logo,
      name: token.token.symbol
    })
    setViewToken(token)
    setIsOpen(true)
  }

  function handleCurrentViewTable(method: string, value: number) {
    if (method === 'next') {
      setViewColumnInTable(value === 4 ? 1 : viewColumnInTable + 1)
    } else {
      setViewColumnInTable(value === 1 ? 4 : viewColumnInTable - 1)
    }
  }

  return (
    <>
      <S.AllocationTable isView={viewColumnInTable}>
        <S.TheadWrapper>
          <S.TrHead>
            <S.ThHead>Asset</S.ThHead>
            <S.ThHead className="weight">Weight</S.ThHead>
            <S.ThHead className="holding">Holding</S.ThHead>
            <S.ThHead className="price">Price 24h</S.ThHead>
            <S.ThHead className="yield">Yield 24h</S.ThHead>
            <S.ArrowsWrapper>
              <span
                onClick={() =>
                  handleCurrentViewTable('back', viewColumnInTable)
                }
              >
                <img
                  src="/assets/utilities/arrow-left.svg"
                  alt=""
                  width={7}
                  height={12}
                />
              </span>
              <span
                onClick={() =>
                  handleCurrentViewTable('next', viewColumnInTable)
                }
              >
                <img
                  src="/assets/utilities/arrow-left.svg"
                  alt=""
                  width={7}
                  height={12}
                  id="arrow-right"
                />
              </span>
            </S.ArrowsWrapper>
          </S.TrHead>
        </S.TheadWrapper>
        <S.TbodyWrapper>
          {allocationData.map(item => {
            return (
              <S.TrWrapper key={item.token.address}>
                <S.TokenInfo>
                  <img src={item.token.logo} alt="" width={24} height={24} />
                  <p>{item.token.symbol}</p>
                </S.TokenInfo>
                <S.Allocation className="weight">
                  {item.allocation && (
                    <Tippy content="REBALANCING">
                      <img
                        src="/assets/icons/rebalance.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </Tippy>
                  )}
                  <p>{item.allocation * 100}%</p>
                </S.Allocation>
                <S.Holding className="holding">
                  <p>$ {item.holding.valueUSD.toFixed(2, 2)}</p>
                  <span>
                    {item.holding.value.toFixed(2, 2)} {item.token.symbol}
                  </span>
                </S.Holding>
                <S.PriceContent className="price">
                  <p>$ {item.price.value}</p>
                  <S.PriceChange changePrice={item.price.changeValue}>
                    {item.price.changeValue}%
                  </S.PriceChange>
                </S.PriceContent>
                <S.YieldContent className="yield">
                  {Number(item.yields.apy) === 0 ? (
                    <strong>No Yield</strong>
                  ) : (
                    <>
                      <p>{item.yields.apy}% APY</p>
                      <Link href="#" passHref>
                        <S.YieldLink>
                          Yield Yak
                          <img
                            src="/assets/utilities/external-link.svg"
                            alt=""
                            width={14}
                            height={14}
                          />
                        </S.YieldLink>
                      </Link>
                    </>
                  )}
                </S.YieldContent>
                <S.MobileEyeContainer
                  onClick={() => handleViewTokenMobile(item)}
                >
                  <img
                    src="/assets/utilities/eye-show.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </S.MobileEyeContainer>
              </S.TrWrapper>
            )
          })}
        </S.TbodyWrapper>
      </S.AllocationTable>
      <ModalViewCoin
        title={token}
        isOpen={isOpen}
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Allocation</TableLineTitle>

          <ValueContainer>
            <Value>{viewToken && viewToken?.allocation * 100}%</Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>holding</TableLineTitle>
          <ValueContainer>
            <Value>$ {viewToken?.holding.valueUSD.toFixed(2, 2)}</Value>
            <SecondaryValue>
              {viewToken?.holding.value.toFixed(2, 2)} {viewToken?.token.symbol}
            </SecondaryValue>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Price 24H</TableLineTitle>
          <ValueContainer>
            <Value>$ {viewToken?.price.value.toFixed(2)}</Value>
            <SecondaryValue>
              <S.PriceChange changePrice={viewToken?.price.changeValue ?? 0}>
                {viewToken?.price.changeValue}%
              </S.PriceChange>
            </SecondaryValue>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Yield 24H</TableLineTitle>
          <ValueContainer>
            {viewToken && Number(viewToken.yields.apy) === 0 ? (
              <SecondaryValue>no yield</SecondaryValue>
            ) : (
              <>
                <Value>{viewToken?.yields.apy}% APY</Value>
                <SecondaryValue>
                  <Link href="#" passHref>
                    <S.YieldLink>
                      Yield Yak
                      <img
                        src="/assets/utilities/external-link.svg"
                        alt=""
                        width={14}
                        height={14}
                      />
                    </S.YieldLink>
                  </Link>
                </SecondaryValue>
              </>
            )}
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </>
  )
}

export default AllocationTable
