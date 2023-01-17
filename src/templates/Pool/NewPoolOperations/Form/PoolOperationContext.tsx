import React from 'react'

interface IOperationModel {
  increment: (number: number) => number;
  decrement: (number: number) => number;
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
