import React from "react"

import KassandraController from '@/constants/abi/KassandraController.json'

import web3 from "@/utils/web3"
import { AbiItem } from "web3-utils"

const useManagePool = (controllerAddress: string) => {
    const [controller, setController] = React.useState(
        new web3.eth.Contract((KassandraController as unknown) as AbiItem, controllerAddress)
    )

    React.useEffect(() => {
        setController(new web3.eth.Contract((KassandraController as unknown) as AbiItem, controllerAddress))
    }, [controllerAddress])

    return React.useMemo(() => {
      const getAumFeesToManagerAndKassandra = async (userWalletAddress: string): Promise<{ feesToManager: string, feesToKassandra: string }> => {
        return controller.methods.withdrawCollectedManagementFees().call({ from: userWalletAddress })
      }

      const withdrawAumFees = async (userWalletAddress: string): Promise<void> => {
        return controller.methods.withdrawCollectedManagementFees().send({ from: userWalletAddress })
      }

      return {
        getAumFeesToManagerAndKassandra,
        withdrawAumFees
      }
    }, [controller])
}

export default useManagePool
