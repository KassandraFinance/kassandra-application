import web3 from '../utils/web3'
import { AbiItem } from "web3-utils"
import HermesProxy from "../constants/abi/HermesProxy.json"
import { Contract } from 'web3-eth-contract';
import BigNumber from 'bn.js'

export default class operationV2 {
  contract: Contract;
  crpPool: string;

  constructor(address: string, crpPool: string) {
    // eslint-disable-next-line prettier/prettier
    this.contract = new web3.eth.Contract((HermesProxy as unknown) as AbiItem, address)
    this.crpPool = crpPool
  }

  async tryExitswapPoolAmountIn(
    tokenOut: string,
    poolAmountIn: BigNumber,
    minAmountOut: BigNumber,
    walletAddress: string
  ) {
    const res = this.contract.methods
      .exitswapPoolAmountIn(this.crpPool, tokenOut, poolAmountIn, minAmountOut)
      .call({ from: walletAddress })

      return res
  }

  increment(number: number) {
    return number + 5
  }

  decrement(number: number) {
    return number - 5
  }
}
