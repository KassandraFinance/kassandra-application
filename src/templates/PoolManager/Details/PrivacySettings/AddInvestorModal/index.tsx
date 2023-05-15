import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { isAddress, AbiItem } from 'web3-utils'

import web3 from '@/utils/web3'
import substr from '@/utils/substr'
import waitTransaction, { MetamaskError } from '@/utils/txWait'
import changeChain from '@/utils/changeChain'
import { networks } from '@/constants/tokenAddresses'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setModalAlertText } from '@/store/reducers/modalAlertText'
import usePoolInfo from '@/hooks/usePoolInfo'

import KassandraControlerAbi from '@/constants/abi/KassandraController.json'

import Button from '@/components/Button'
import InputText from '@/components/Inputs/InputText'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'
import { ToastSuccess } from '@/components/Toastify/toast'

import closeIcon from '@assets/utilities/close-icon.svg'

import * as S from './styles'

interface IAddInvestorModalProps {
  onClose: () => void
  setAddressesOfPrivateInvestors: () => Promise<void>
}

const AddInvestorModal = ({
  onClose,
  setAddressesOfPrivateInvestors
}: IAddInvestorModalProps) => {
  const [value, setValue] = React.useState('')
  const [investorsList, setInvestorsList] = React.useState<string[]>([])
  const [isTransaction, setIsTransaction] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)
  const chainId = useAppSelector(state => state.chainId)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleInvestorsList() {
    setInvestorsList(prev => [...prev, value])
    setValue('')
  }

  function handleRemoveAddress(address: string) {
    setInvestorsList(prev => prev.filter(item => item !== address))
  }

  async function callBack(error: MetamaskError, txHash: string) {
    if (error) {
      if (error.code === 4001) {
        dispatch(setModalAlertText({ errorText: `Approval cancelled` }))

        setIsTransaction(false)
        return false
      }

      dispatch(
        setModalAlertText({
          errorText: error.message
        })
      )

      setIsTransaction(false)
      return false
    }

    const txReceipt = await waitTransaction(txHash)

    if (txReceipt.status) {
      ToastSuccess('Investors add!')
      setIsTransaction(false)
      setInvestorsList([])

      return true
    } else {
      dispatch(
        setModalAlertText({
          errorText: 'Transaction reverted'
        })
      )

      setIsTransaction(false)

      return false
    }
  }

  async function handlePrivateInvestors(
    poolControler: string,
    investorsList: string[]
  ) {
    setIsTransaction(true)
    const controller = new web3.eth.Contract(
      KassandraControlerAbi as unknown as AbiItem,
      poolControler
    )

    await controller.methods.addAllowedAddresses(investorsList).send(
      {
        from: userWalletAddress,
        maxPriorityFeePerGas: 30e9
      },
      callBack
    )
    await setAddressesOfPrivateInvestors()
  }

  const { poolInfo } = usePoolInfo(userWalletAddress, poolId)

  React.useEffect(() => {
    if (isAddress(value) && buttonRef.current !== null) {
      buttonRef.current.focus()
    }
  }, [value, buttonRef])

  return (
    <S.AddInvestorModal>
      <Overlay onClick={onClose} />

      <Modal title="Add Investor" onCloseModal={onClose}>
        <S.Content>
          <InputText
            name="addInvestor"
            type="text"
            value={value}
            placeholder="Enter address..."
            lable="inform the addresses you want to add as an investor"
            error="Invalid address"
            minLength={!isAddress(value) ? 43 : 42}
            maxLength={42}
            onChange={handleOnChange}
          />
          {isAddress(value) && (
            <S.HasAddress>
              {investorsList?.some(wallet => wallet === value) ? (
                <p>Wallet address already exists.</p>
              ) : (
                <button ref={buttonRef} onClick={handleInvestorsList}>
                  <strong>add:</strong> &quot;{value}&quot;
                </button>
              )}
            </S.HasAddress>
          )}
          <S.Addresses>
            {investorsList.map(investor => (
              <S.AddressContainer key={investor}>
                <S.Address>{substr(investor)}</S.Address>

                <S.RemoveAddresButton
                  onClick={() => handleRemoveAddress(investor)}
                >
                  <Image src={closeIcon} />
                </S.RemoveAddresButton>
              </S.AddressContainer>
            ))}
          </S.Addresses>

          {poolInfo?.chain_id === chainId ? (
            <>
              {!isTransaction ? (
                <Button
                  text="Add Investor"
                  type="button"
                  backgroundSecondary
                  fullWidth
                  disabledNoEvent={investorsList.length < 1}
                  onClick={() =>
                    handlePrivateInvestors(poolInfo.controller, investorsList)
                  }
                />
              ) : (
                <Button
                  text="Waiting transaction"
                  type="button"
                  backgroundPrimary
                  disabled
                  fullWidth
                />
              )}
            </>
          ) : (
            <>
              {poolInfo?.chain_id && (
                <Button
                  text={`Connect to ${networks[poolInfo.chain_id].chainName}`}
                  type="button"
                  backgroundPrimary
                  fullWidth
                  onClick={() =>
                    changeChain({
                      chainId: networks[poolInfo.chain_id].chainId,
                      chainName: networks[poolInfo.chain_id].chainName,
                      rpcUrls: [networks[poolInfo.chain_id].rpc],
                      nativeCurrency: networks[poolInfo.chain_id].nativeCurrency
                    })
                  }
                />
              )}
            </>
          )}
        </S.Content>
      </Modal>
    </S.AddInvestorModal>
  )
}

export default AddInvestorModal
