import React from 'react'
import Link from 'next/link'

import { useAppSelector } from '@/store/hooks'

import AllocationGraph, {
  IDataProps
} from '../../../../../components/Manage/AllocationGraph'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import * as S from './styles'

const ReviewTable = () => {
  const [viewColumnInTable, setViewColumnInTable] = React.useState(1)
  const [openAllocationGraph, setOpenAllocationGraph] = React.useState(false)
  const [dataAllocationGraph, setDataAllocationGraph] = React.useState<
    IDataProps[]
  >([])

  const poolTokensList = useAppSelector(
    state => state.rebalanceAssets.poolTokensList
  )
  const newTokensWights = useAppSelector(
    state => state.rebalanceAssets.newTokensWights
  )
  const poolInfo = useAppSelector(state => state.rebalanceAssets.poolInfo)

  function handleCurrentViewTable(method: string, value: number) {
    if (method === 'next') {
      setViewColumnInTable(value === 4 ? 1 : viewColumnInTable + 1)
    } else {
      setViewColumnInTable(value === 1 ? 2 : viewColumnInTable - 1)
    }
  }

  React.useEffect(() => {
    const dataAllocation = poolTokensList.map(item => {
      return {
        imageUrl: item.token.logo,
        name: item.token.name,
        currentAllocation: Number(
          item.currentWeight.mul(100).toFixed(2, 2) ?? 0
        ),
        newAllocation: Number(
          newTokensWights[item.token.address].newWeight
            .mul(100)
            .toFixed(2, 2) ?? 0
        )
      }
    })

    setDataAllocationGraph(dataAllocation)
  }, [])

  return (
    <S.ReviewTable>
      <S.PoolInfoContainer>
        <TokenWithNetworkImage
          tokenImage={{
            url: poolInfo.logo,
            height: 64,
            width: 64,
            withoutBorder: true
          }}
          networkImage={{
            url: poolInfo.chainLogo,
            height: 16,
            width: 16
          }}
          blockies={{
            size: 8,
            scale: 8,
            seedName: poolInfo.name
          }}
        />
        <S.PoolInfo>
          <p>{poolInfo.name}</p>
          <span>{poolInfo.symbol}</span>
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
          {poolTokensList.map(item => {
            return (
              <S.TrBody key={item.token.address}>
                <S.TokenNameContainer>
                  <img src={item.token.logo} alt="" width={24} height={24} />
                  <span>
                    <Link href="#" passHref>
                      <S.TokenName>
                        {item.token.name}
                        <img
                          src="/assets/utilities/external-link.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                      </S.TokenName>
                    </Link>
                    <p>{item.token.symbol}</p>
                  </span>
                </S.TokenNameContainer>
                <S.CurrentWeightContainer isView={viewColumnInTable}>
                  <p>{item.currentWeight.mul(100).toFixed(2, 2)}%</p>
                  <S.CurrentWeight>
                    <p>{item.currentAmount.toFixed(2, 2)}</p>
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
                  <p>
                    {newTokensWights[item.token.address]?.newWeight
                      .mul(100)
                      .toFixed(2, 2)}
                    %
                  </p>
                  <S.NewWeight>
                    <p>
                      {newTokensWights[item.token.address]?.newAmount.toFixed(
                        2,
                        2
                      )}
                    </p>
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
