import React from 'react'
import Link from 'next/link'

import AllocationGraph from '../AllocationGraph'

import * as S from './styles'

export type IAllocationListProps = {
  name: string,
  symbol: string,
  logo: string,
  link: string,
  currentWeight: number,
  NewWeight: number
}

type IDataAllocationGraphProps = {
  imageUrl: string,
  name: string,
  currentAllocation: number,
  newAllocation: number
}

interface INewAllocationsTableProps {
  AllocationList: IAllocationListProps[];
}

const NewAllocationsTable = ({ AllocationList }: INewAllocationsTableProps) => {
  const [openAllocationGraph, setOpenAllocationGraph] = React.useState(false)

  const dataAllocationGraph = AllocationList?.map(item => {
    return {
      imageUrl: item.logo,
      name: item.name,
      currentAllocation: item.currentWeight === 0 ? 0.0001 : item.currentWeight,
      newAllocation: item.NewWeight === 0 ? 0.0001 : item.NewWeight
    }
  })

  return (
    <S.NewAllocationsTable>
      <h3>New allocations</h3>
      <S.AllocationTable>
        <S.TableHead>
          <S.TrHead>
            <S.ThHead>Assets</S.ThHead>
            {/* <S.ThHead>Current Weight</S.ThHead> */}
            <S.ThHead>Allocation</S.ThHead>
            <S.ThHead id="arrow" />
            <S.ThHead>
              <p>New Allocation</p>
            </S.ThHead>
            {/* <S.ThHead>New Weight</S.ThHead> */}
          </S.TrHead>
        </S.TableHead>
        <S.AllocationTBody>
          {AllocationList?.map(token => {
            return (
              <S.TrBody key={token.name}>
                <S.AssetsInfoContent>
                  <img src={token.logo} alt="" width={24} height={24} />
                  <S.AssetsInfo id="desktop">
                    <Link href={token.link} passHref>
                      <a>
                        {token.name}{' '}
                        <img
                          src="/assets/utilities/external-link.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                      </a>
                    </Link>
                    <span>{token.symbol}</span>
                  </S.AssetsInfo>
                  <S.AssetsInfo id="mobile">
                    <Link href={token.link} passHref>
                      <a>
                        {token.symbol}
                        <img
                          src="/assets/utilities/external-link.svg"
                          alt=""
                          width={14}
                          height={14}
                        />
                      </a>
                    </Link>
                  </S.AssetsInfo>
                </S.AssetsInfoContent>
                <S.CurrentWeight>
                  <p>{token.currentWeight}</p>%
                </S.CurrentWeight>
                <S.ArrowImage>
                  <img
                    src="/assets/utilities/arrow-right.svg"
                    alt=""
                    width={28}
                  />
                </S.ArrowImage>
                <S.NewWeight>
                  <p>{token.NewWeight}</p>%
                </S.NewWeight>
              </S.TrBody>
            )
          })}
        </S.AllocationTBody>
      </S.AllocationTable>
      <S.VisualInformation
        type="button"
        isOpenGraph={openAllocationGraph}
        onClick={() => {
          setOpenAllocationGraph(!openAllocationGraph)
        }}
      >
        Visual information{' '}
        <img
          src="/assets/utilities/arrow-select-down.svg"
          alt=""
          width={14}
          height={14}
        />
      </S.VisualInformation>
      {dataAllocationGraph && (
        <AllocationGraph
          isOpen={openAllocationGraph}
          data={dataAllocationGraph}
        />
      )}
    </S.NewAllocationsTable>
  )
}

export default NewAllocationsTable
