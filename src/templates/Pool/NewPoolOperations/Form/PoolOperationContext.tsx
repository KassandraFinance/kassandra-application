import React from 'react'

import { CalcAllOutGivenPoolInParams, CalcAllOutGivenPoolInResult, CalcAmountOutParams, CalcAmountOutParamsResult, CalcSingleOutGivenPoolInParams, CalcSingleOutGivenPoolInResult, EstimatedGasParams, EstimatedGasResult, ExitSwapPoolAllTokenAmountInParams, ExitSwapPoolAmountInParams, JoinSwapAmountInParams } from '../../../../services/IOperation';

export interface IOperations {
  contractAddress: string;
  calcInvestAmountOut: (params: CalcAmountOutParams) => Promise<CalcAmountOutParamsResult>;
  joinswapExternAmountIn: (params: JoinSwapAmountInParams) => Promise<void>;
  estimatedGas: (params: EstimatedGasParams) => Promise<EstimatedGasResult>;
  calcSingleOutGivenPoolIn: (params: CalcSingleOutGivenPoolInParams) => Promise<CalcSingleOutGivenPoolInResult>;
  calcAllOutGivenPoolIn: (params: CalcAllOutGivenPoolInParams) => Promise<CalcAllOutGivenPoolInResult>;
  exitswapPoolAmountIn: (params: ExitSwapPoolAmountInParams) => Promise<any>;
  exitswapPoolAllTokenAmountIn: (params: ExitSwapPoolAllTokenAmountInParams) => Promise<void>
}
interface IOperationModel {
  operation: IOperations;
}

// eslint-disable-next-line prettier/prettier
export const PoolOperationContext = React.createContext({} as IOperationModel)

interface IDepsProviderProvider {
  children: React.ReactNode;
  operation: IOperationModel;
}

export function OperationProvider({
  children,
  ...operationVersion
}: IDepsProviderProvider) {
  return (
    <PoolOperationContext.Provider value={operationVersion.operation}>
      {children}
    </PoolOperationContext.Provider>
  )
}

export default PoolOperationContext
