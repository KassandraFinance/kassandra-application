import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppSelector } from '@/store/hooks'
import usePoolInfo from '@/hooks/usePoolInfo'

import { AssetType } from '@/store/reducers/rebalanceAssetsSlice'

import AllocationGraph, {
  IDataProps
} from '../../../../../components/Manage/AllocationGraph'
import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'
import ModalViewCoin from '@/components/Modals/ModalViewCoin'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value
} from '@/components/Modals/ModalViewCoin/styles'

import * as S from './styles'

const ReviewTable = () => {
  const router = useRouter()

  const [viewToken, setViewToken] = React.useState<AssetType>()
  const [isOpenModalMobile, setIsOpenModalMobile] = React.useState(false)
  const [viewColumnInTable, setViewColumnInTable] = React.useState(1)
  const [openAllocationGraph, setOpenAllocationGraph] = React.useState(false)
  const [dataAllocationGraph, setDataAllocationGraph] = React.useState<
    IDataProps[]
  >([])

  const [token, setToken] = React.useState({
    logo: '',
    name: ''
  })

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const poolTokensList = useAppSelector(
    state => state.rebalanceAssets.poolTokensList
  )
  const newTokensWights = useAppSelector(
    state => state.rebalanceAssets.newTokensWights
  )
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  function handleCurrentViewTable(method: string, value: number) {
    if (method === 'next') {
      setViewColumnInTable(value === 4 ? 1 : viewColumnInTable + 1)
    } else {
      setViewColumnInTable(value === 1 ? 2 : viewColumnInTable - 1)
    }
  }

  function handleViewTokenMobile(token: AssetType) {
    setToken({
      logo: token.token.logo ?? '',
      name: token.token.symbol
    })
    setViewToken(token)
    setIsOpenModalMobile(true)
  }

  React.useEffect(() => {
    if (!poolInfo) return

    const dataAllocation = poolTokensList.map(item => {
      return {
        imageUrl: item.token.logo ?? '',
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
            url: poolInfo?.logo ?? '',
            height: 64,
            width: 64,
            withoutBorder: true
          }}
          networkImage={{
            url: poolInfo?.chain.logo,
            height: 16,
            width: 16
          }}
          blockies={{
            size: 8,
            scale: 8,
            seedName: poolInfo?.name ?? ''
          }}
        />
        <S.PoolInfo>
          <p>{poolInfo?.name ?? ''}</p>
          <span>{poolInfo?.symbol ?? ''}</span>
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
                  onClick={() => handleViewTokenMobile(item)}
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

      <ModalViewCoin
        title={token}
        isOpen={isOpenModalMobile}
        onClick={() => setIsOpenModalMobile(false)}
      >
        <TableLine>
          <TableLineTitle>current weight</TableLineTitle>

          <ValueContainer>
            <Value>{viewToken?.currentWeight.mul(100).toFixed(2, 2)}%</Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>new weight</TableLineTitle>
          <ValueContainer>
            <Value>
              {newTokensWights[viewToken?.token.address ?? '']?.newWeight
                .mul(100)
                .toFixed(2, 2)}
              %
            </Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Current amount</TableLineTitle>
          <ValueContainer>
            <Value>{viewToken?.currentAmount.toFixed(2, 2)}</Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>new amount</TableLineTitle>
          <ValueContainer>
            <Value>
              {newTokensWights[
                viewToken?.token.address ?? ''
              ]?.newAmount.toFixed(2, 2)}
            </Value>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </S.ReviewTable>
  )
}

export default ReviewTable
