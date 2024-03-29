import React from 'react'

import Modal from '../Modal'
import Overlay from '../../Overlay'
import TokenWeightInfo from './TokenWeightInfo'

import * as S from './styles'

export type ITokenProps = {
  address: string
  logo: string
  name: string
  symbol: string
  decimals: number
}

export type IRebalanceWeightsProps = {
  poolName: string
  poolPrice: string
  listTokenWeights: {
    token: {
      address: string
      logo: string
      name: string | null | undefined
      symbol: string | null | undefined
    }
    previous: string
    current: string
    final: string
  }[]
} | null

export type IRebancingProgressProps = {
  started: string
  remaning: string
  progress: number
}
interface IWeightRebalanceProgressModalProps {
  handleCloseModal: () => void
  rebalanceWeights: IRebalanceWeightsProps
  RebalancingProgress: IRebancingProgressProps | null
}

const WeightRebalanceProgressModal = ({
  handleCloseModal,
  rebalanceWeights,
  RebalancingProgress
}: IWeightRebalanceProgressModalProps) => {
  return (
    <S.WeightRebalanceProgressModal>
      <Overlay onClick={handleCloseModal} />

      <Modal
        title="Token Weight Rebalance Progress"
        onCloseModal={handleCloseModal}
      >
        <S.WeightRebalanceProgressBody>
          <S.IntroInfoPoolContainer>
            <S.PoolInfoContent>
              <p>{rebalanceWeights?.poolName}</p>
              <span>${rebalanceWeights?.poolPrice}</span>
            </S.PoolInfoContent>
            <S.TimeProgressContainer>
              <S.TimeContent>
                <p>Time for complete rebalance</p>
                <p>{RebalancingProgress?.remaning}</p>
              </S.TimeContent>
              <S.ProgressContent>
                <S.PogressBar
                  value={RebalancingProgress?.progress ?? 0}
                  max={100}
                />
              </S.ProgressContent>
              <S.TimeToFinalize>
                {RebalancingProgress?.started}
              </S.TimeToFinalize>
            </S.TimeProgressContainer>
          </S.IntroInfoPoolContainer>

          <S.TableRebalanceWeightsContainer>
            <S.Tablehead>
              <p>Asset</p>
              <p>Previous Weight</p>
              <p>Current Weight</p>
              <p>Final Weight</p>
            </S.Tablehead>
            <S.TableBody>
              {rebalanceWeights
                ? rebalanceWeights.listTokenWeights.map(item => {
                    return (
                      <TokenWeightInfo key={item.token.address} token={item} />
                    )
                  })
                : null}
            </S.TableBody>
          </S.TableRebalanceWeightsContainer>
        </S.WeightRebalanceProgressBody>
      </Modal>
    </S.WeightRebalanceProgressModal>
  )
}

export default WeightRebalanceProgressModal
