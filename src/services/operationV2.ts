import Big from 'big.js';
import BigNumber from 'bn.js'
import web3 from '../utils/web3'
import { AbiItem } from "web3-utils"
import { Contract } from 'web3-eth-contract';

import { addressNativeToken1Inch } from '../constants/tokenAddresses';
import HermesProxy from "../constants/abi/HermesProxy.json"

import { ERC20 } from '../hooks/useERC20Contract';
import { corePoolContract } from '../hooks/usePoolContract';
import { YieldYakContract } from '../hooks/useYieldYak';

import { IOperations } from '../templates/Pool/NewPoolOperations/Form/PoolOperationContext';
import { CalcAllOutGivenPoolInParams, CalcAmountOutParams, CalcSingleOutGivenPoolInParams, EstimatedGasParams, ExitSwapPoolAllTokenAmountInParams, ExitSwapPoolAmountInParams, JoinSwapAmountInParams } from './IOperation';

export interface ItokenSelectedProps {
  tokenInAddress: string;
  newAmountTokenIn: string | Big;
  transactionDataTx: string;
  isWrap: number | undefined;
}

export default class operationV2 {
  // contract: Contract;
  // crpPool: string;

  // constructor(address: string, crpPool: string) {
  //   // eslint-disable-next-line prettier/prettier
  //   this.contract = new web3.eth.Contract((HermesProxy as unknown) as AbiItem, address)
  //   this.crpPool = crpPool
  // }

  contract: Contract;
  crpPool: string;
  contractAddress: string;
  referral = "0x0000000000000000000000000000000000000000";
  // corePoolContract: ReturnType<typeof corePoolContract>;
  // ER20Contract: ReturnType<typeof ERC20>
  // yieldYakContract: ReturnType<typeof YieldYakContract>

  constructor(
    proxyAddress: string,
    _crpPool: string,
    // _corePoolContract: ReturnType<typeof corePoolContract>,
    // _ER20Contract: ReturnType<typeof ERC20>,
    // _yieldYakContract: ReturnType<typeof YieldYakContract>
  ) {
    // eslint-disable-next-line prettier/prettier
    this.contract = new web3.eth.Contract((HermesProxy as unknown) as AbiItem, proxyAddress)
    this.crpPool = _crpPool
    this.contractAddress = proxyAddress
    // this.corePoolContract = _corePoolContract
    // this.ER20Contract = _ER20Contract
    // this.yieldYakContract = _yieldYakContract
  }

  async calcInvestAmountOut({
    tokenSelected,
    userWalletAddress,
    minAmountOut,
    selectedTokenInBalance
  }: CalcAmountOutParams) {
    const investAmountOut = new BigNumber('0')
    const transactionError: string | undefined = undefined


    console.log('CAIU AQUIIIIIII')
    return {
      investAmountOut,
      transactionError
    }
  }

  async joinswapExternAmountIn({
    tokenInAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    data,
    poolTokenList,
    transactionCallback
  }: JoinSwapAmountInParams) {
    return
  }

  async estimatedGas({
    userWalletAddress,
    tokenInAddress,
    minPoolAmountOut,
    amountTokenIn,
    data,
    poolTokenList
  }: EstimatedGasParams) {
    const feeNumber = 0
    const feeString = ''

    return {
      feeNumber,
      feeString
    }
  }

  async calcSingleOutGivenPoolIn({
    tokenInAddress,
    tokenSelectAddress,
    poolAmountIn,
    isWrap,
    userWalletAddress,
    selectedTokenInBalance
  }: CalcSingleOutGivenPoolInParams) {
    const withdrawAmoutOut = new BigNumber('0')
    const transactionError: string | undefined = undefined

    return {
      withdrawAmoutOut,
      transactionError
    }
  }

  // calcWithdrawAmountsOut
  async calcAllOutGivenPoolIn({
    poolAmountIn,
    userWalletAddress,
    selectedTokenInBalance,
    poolTokenList
  }: CalcAllOutGivenPoolInParams) {
    const withdrawAllAmoutOut = [new BigNumber('0')]
    const transactionError: string | undefined = undefined

    return {
      withdrawAllAmoutOut,
      transactionError
    }
  }

  async exitswapPoolAmountIn({
    tokenOutAddress,
    tokenAmountIn,
    minPoolAmountOut,
    userWalletAddress,
    transactionCallback
  }: ExitSwapPoolAmountInParams) {
    return
  }

  async exitswapPoolAllTokenAmountIn({
    tokenAmountIn,
    amountAllTokenOut,
    slippageBase,
    slippageExp,
    userWalletAddress,
    poolTokenList,
    transactionCallback
  }: ExitSwapPoolAllTokenAmountInParams) {
    return
  }
}


