import React from 'react'
import Big from 'big.js'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import useTransaction from '@/hooks/useTransaction'
import useBridge from '@/hooks/useBridge'
import { ERC20 } from '@/hooks/useERC20'
import { networks } from '@/constants/tokenAddresses'

import Overlay from '@/components/Overlay'
import InputListIcon, { DataListType } from '@/components/Inputs/InputListIcon'
import Modal from '../Modal'
import InputNumberRight from '@/components/Inputs/InputNumberRight'
import Button from '@/components/Button'

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

  const [{ wallet }] = useConnectWallet()
  const [{ settingChain }, setChain] = useSetChain()
  const { txNotification, transactionErrors } = useTransaction()
  const { bridge } = useBridge()

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
    if (wallet?.provider) {
      const chain = networks[Number(id)]
      if (chain.kacyAddress === undefined) {
        return
      }

      const contract = await ERC20(chain.kacyAddress, chain.rpc, {
        wallet: wallet,
        txNotification: txNotification,
        transactionErrors: transactionErrors
      })
      const balance = await contract.balance(wallet.accounts[0].address)

      if (id === '43114') {
        const amount = await contract.allowance(
          chain.kacyOFT,
          wallet.accounts[0].address
        )
        setApprovedAmount(Big(amount).div(Big(10).pow(18)).toString())
      }

      setBalance(Big(balance.toString()).div(Big(10).pow(18)).toString())
    }
  }

  async function handleApproveKacy() {
    if (networks[43114]?.kacyAddress === undefined) {
      return
    }

    if (wallet?.provider) {
      if (Number(wallet.chains[0].id) !== 43114) {
        return
      }

      const { approve, allowance } = await ERC20(
        networks[43114].kacyAddress,
        networks[43114].rpc,
        {
          wallet: wallet,
          txNotification: txNotification,
          transactionErrors: transactionErrors
        }
      )

      await approve(networks[43114].kacyOFT)

      const amount = await allowance(
        networks[43114].kacyOFT,
        wallet.accounts[0].address
      )

      setApprovedAmount(Big(amount).div(Big(10).pow(18)).toString())
    }
  }

  async function handleBridge(id: string) {
    const valueMult = Big(value).mul(Big(10).pow(18)).toFixed(0)

    await bridge(id, valueMult)
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
                max={balance}
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
                  ? Number(approvedAmount).toFixed(6)
                  : 'Does not need approval from Polygon to Avalanche'}
              </S.Text>

              <S.Text>This transaction can take up to 30 minutes</S.Text>
            </S.Info>

            {inputFrom &&
            Number(inputFrom.id) !== Number(wallet?.chains[0].id) ? (
              <Button
                type="button"
                text={`Connect to ${inputFrom?.name}`}
                backgroundPrimary
                disabledNoEvent={settingChain}
                onClick={() =>
                  setChain({
                    chainId: `0x${Number(inputFrom.id).toString(16)}`
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
