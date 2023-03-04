import React from 'react'
import Link from 'next/link'

import { mockCoinsList } from '../..'

import AllocationGraph, {
  IDataProps
} from '../../../../../../components/Manage/AllocationGraph'

import * as S from './styles'

const ReviewTable = () => {
  const [viewColumnInTable, setViewColumnInTable] = React.useState(1)
  const [openAllocationGraph, setOpenAllocationGraph] = React.useState(false)
  const [dataAllocationGraph, setDataAllocationGraph] = React.useState<
    IDataProps[]
  >([])

  function handleCurrentViewTable(method: string, value: number) {
    if (method === 'next') {
      setViewColumnInTable(value === 4 ? 1 : viewColumnInTable + 1)
    } else {
      setViewColumnInTable(value === 1 ? 2 : viewColumnInTable - 1)
    }
  }

  React.useEffect(() => {
    const dataAllocation = mockCoinsList.map(item => {
      return {
        imageUrl: item.imageUrl,
        name: item.name,
        currentAllocation: item.allocation,
        newAllocation: item.allocation + 5
      }
    })

    setDataAllocationGraph(dataAllocation)
  }, [])

  return (
    <S.ReviewTable>
      <S.PoolInfoContainer>
        <img src="/assets/logos/tricrypto.svg" alt="" width={64} height={64} />
        <S.PoolInfo>
          <p>Pool Name</p>
          <span>SYMBOL</span>
        </S.PoolInfo>
      </S.PoolInfoContainer>
      <S.TableContainer>
        <S.Thead>
          <S.TrHead isView={viewColumnInTable}>
            <S.Th>Assets</S.Th>
            <S.Th isView={viewColumnInTable}>
              <p className="currentWeight">Current Weight</p> <strong>&</strong>{' '}
              <p className="assetAmount">Asset Amount</p>
            </S.Th>
            <S.Th isView={viewColumnInTable}>
              <p className="newWeight">New Weight</p> <strong>&</strong>{' '}
              <p className="newAssetAmount">Asset Amount</p>
            </S.Th>
            <S.ReviewThImg>
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
            </S.ReviewThImg>
          </S.TrHead>
        </S.Thead>
        <S.Tbody>
          {mockCoinsList.map((item, index) => {
            return (
              <S.TrBody key={item.name + index}>
                <S.TokenNameContainer>
                  <img src={item.imageUrl} alt="" width={24} height={24} />
                  <span>
                    <Link href="#" passHref>
                      <S.TokenName>
                        {item.name}
                        <img
                          src="/assets/utilities/external-link.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                      </S.TokenName>
                    </Link>
                    <p>{item.symbol}</p>
                  </span>
                </S.TokenNameContainer>
                <S.CurrentWeightContainer isView={viewColumnInTable}>
                  <p>{item.allocation}%</p>
                  <S.CurrentWeight>
                    <p>{item.currentAmount}</p>
                  </S.CurrentWeight>
                </S.CurrentWeightContainer>
                <S.Arrow>
                  <img
                    src="/assets/utilities/arrow-right.svg"
                    alt=""
                    width={50}
                    height={22}
                  />
                </S.Arrow>
                <S.NewWeightContainer isView={viewColumnInTable}>
                  <p>{item.allocation}%</p>
                  <S.NewWeight>
                    <p>{item.newAmount}</p>
                  </S.NewWeight>
                </S.NewWeightContainer>
                <S.MobileEyeContainer
                  id="eyeIcon"
                  // onClick={() => ()}
                >
                  <img
                    src="/assets/utilities/eye-show.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </S.MobileEyeContainer>
              </S.TrBody>
            )
          })}
        </S.Tbody>
      </S.TableContainer>
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
      <AllocationGraph
        isOpen={openAllocationGraph}
        data={dataAllocationGraph}
      />
    </S.ReviewTable>
  )
}

export default ReviewTable
