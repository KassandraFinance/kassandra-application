import React from 'react'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import { ERC20 } from '@/hooks/useERC20Contract'
import { networks } from '@/constants/tokenAddresses'
import changeChain from '@/utils/changeChain'
import waitTransaction, {
  MetamaskError,
  TransactionCallback
} from '@/utils/txWait'
import web3 from '@/utils/web3'

import OFT from '@/constants/abi/OFT.json'

import Overlay from '@/components/Overlay'
import InputListIcon, { DataListType } from '@/components/Inputs/InputListIcon'
import Modal from '../Modal'
import InputNumberRight from '@/components/Inputs/InputNumberRight'
import Button from '@/components/Button'
import { ToastSuccess, ToastWarning } from '@/components/Toastify/toast'

import { avalancheIcon, polygonIcon } from './icons'

import * as S from './styles'

const networkList: DataListType[] = [
  {
    name: 'Avalanche',
    icon: avalancheIcon,
    id: '43114'
  },
  { name: 'Polygon', icon: polygonIcon, id: '137' }
]

interface IModalBridgeProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

Big.RM = 0
const ModalBridge = ({ setIsModalOpen }: IModalBridgeProps) => {
  const [inputFrom, setInputFrom] = React.useState<DataListType>()
  const [inputTo, setInputTo] = React.useState<DataListType | undefined>()

  const [value, setValue] = React.useState('0')
  const [balance, setBalance] = React.useState('0')
  const [approvedAmount, setApprovedAmount] = React.useState('0')

  const dispatch = useAppDispatch()
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  function handleSetFrom(data: DataListType) {
    setInputFrom(data)
    getBalance(data.id)

    if (data.id === inputTo?.id) {
      setInputTo(undefined)
    }
  }

  function handleSetTo(data: DataListType) {
    setInputTo(data)
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setValue(value.replace(/^0+/, '') || '0')
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function getBalance(id: string) {
    const chain = networks[Number(id)]
    if (chain.kacyAddress === undefined) {
      return
    }

    const contract = ERC20(chain.kacyAddress, new Web3(chain.rpc))
    const balance = await contract.balance(userWalletAddress)

    if (id === '43114') {
      const amount = await contract.allowance(chain.kacyOFT, userWalletAddress)
      setApprovedAmount(Big(amount).div(Big(10).pow(18)).toFixed(6))
    }

    setBalance(Big(balance.toString()).div(Big(10).pow(18)).toString())
  }

  const approvalCallback = React.useCallback((): TransactionCallback => {
    return async (error: MetamaskError, txHash: string) => {
      if (error) {
        if (error.code === 4001) {
          dispatch(
            setModalAlertText({ errorText: `Approval of Kacy cancelled` })
          )
          return
        }

        dispatch(
          setModalAlertText({
            errorText: `Failed to approve Kacy. Please try again later.`
          })
        )
        return
      }

      ToastWarning(`Waiting approval of Kacy...`)
      const txReceipt = await waitTransaction(txHash)

      if (txReceipt.status) {
        ToastSuccess(`Approval of Kacy confirmed`)
        return
      }
    }
  }, [])

  async function handleApproveKacy() {
    if (chainId !== 43114) {
      return
    }

    if (networks[43114]?.kacyAddress === undefined) {
      return
    }

    const token = ERC20(networks[43114].kacyAddress)

    await token.approve(
      networks[43114].kacyOFT,
      userWalletAddress,
      approvalCallback
    )

    const amount = await token.allowance(
      networks[43114].kacyOFT,
      userWalletAddress
    )

    setApprovedAmount(Big(amount).div(Big(10).pow(18)).toFixed(6))
  }

  async function handleBridge(id: string) {
    try {
      const lzChainIds: Record<number, number> = {
        137: 109,
        43114: 106
      }

      const valueMult = Big(value).mul(Big(10).pow(18)).toFixed(0)

      // eslint-disable-next-line prettier/prettier
      const kacyOFT = new web3.eth.Contract(
        OFT as unknown as AbiItem,
        networks[chainId].kacyOFT
      )

      const fees = await kacyOFT.methods
        .estimateSendFee(
          lzChainIds[Number(id)],
          userWalletAddress,
          valueMult,
          false,
          []
        )
        .call({
          from: userWalletAddress
        })

      await kacyOFT.methods
        .sendFrom(
          userWalletAddress,
          lzChainIds[Number(id)],
          userWalletAddress,
          valueMult,
          userWalletAddress,
          '0x0000000000000000000000000000000000000000',
          []
        )
        .send({
          from: userWalletAddress,
          value: fees.nativeFee
        })
    } catch (error) {
      console.log(error)
    }
  }

  function handleMaxClick() {
    setValue(balance)
  }

  return (
    <>
      <Overlay onClick={handleCloseModal} />

      <S.ModalBridge>
        <Modal title="Bridge Kacy" onCloseModal={handleCloseModal}>
          <S.Content>
            <S.Wrapper>
              <S.ListContainer>
                <InputListIcon
                  dataList={networkList}
                  selected={inputFrom}
                  title="From"
                  onClick={handleSetFrom}
                />

                <InputListIcon
                  dataList={networkList}
                  selected={inputTo}
                  title="To"
                  onClick={handleSetTo}
                  ignoreItem={inputFrom?.id || ''}
                />
              </S.ListContainer>
            </S.Wrapper>

            <S.InputContainer>
              <S.Text>Balance: {parseFloat(balance).toFixed(6)} Kacy</S.Text>

              <InputNumberRight
                name="inputAmount"
                type="number"
                value={value}
                min={(1 / 10 ** 18).toString()}
                max="9600000"
                onChange={handleOnChange}
                lable=""
                placeholder="Add token amount"
                button
                buttonText="Max"
                onClick={handleMaxClick}
              />
            </S.InputContainer>

            <S.Info>
              <S.Text>You will receive: {value}</S.Text>

              <S.Text>
                Approved amount:{' '}
                {inputFrom?.id === '43114'
                  ? approvedAmount
                  : 'Does not need approval from Polygon to Avalanche'}
              </S.Text>

              <S.Text>This transaction can take up to 30 minutes</S.Text>
            </S.Info>

            {inputFrom && Number(inputFrom.id) !== chainId ? (
              <Button
                type="button"
                text={`Connect to ${inputFrom?.name}`}
                backgroundPrimary
                onClick={() =>
                  changeChain({
                    ...networks[Number(inputFrom.id)],
                    rpcUrls: [networks[Number(inputFrom.id)].rpc]
                  })
                }
              />
            ) : (
              <>
                {inputFrom &&
                inputFrom.id === '43114' &&
                Big(value).gt(approvedAmount) ? (
                  <Button
                    type="button"
                    text="Approve Kacy"
                    backgroundPrimary
                    onClick={handleApproveKacy}
                  />
                ) : (
                  <Button
                    type="button"
                    text="Bridge"
                    backgroundPrimary
                    onClick={() => inputTo && handleBridge(inputTo.id)}
                    disabledNoEvent={!inputFrom || !inputTo}
                  />
                )}
              </>
            )}
          </S.Content>
        </Modal>
      </S.ModalBridge>
    </>
  )
}

export default ModalBridge
