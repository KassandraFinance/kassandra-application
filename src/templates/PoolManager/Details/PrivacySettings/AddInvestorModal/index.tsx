import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { isAddress } from 'ethers'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import substr from '@/utils/substr'
import { networks } from '@/constants/tokenAddresses'

import useManagePoolController from '@/hooks/useManagePoolController'

import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'

import Button from '@/components/Button'
import InputText from '@/components/Inputs/InputText'
import Modal from '@/components/Modals/Modal'
import Overlay from '@/components/Overlay'

import closeIcon from '@assets/utilities/close-icon.svg'

import * as S from './styles'

interface IAddInvestorModalProps {
  onClose: () => void
  setAddressesOfPrivateInvestors: () => Promise<void>
  privateInvestorsAlreadyAdded: string[]
}

const AddInvestorModal = ({
  onClose,
  setAddressesOfPrivateInvestors,
  privateInvestorsAlreadyAdded
}: IAddInvestorModalProps) => {
  const [value, setValue] = React.useState('')
  const [investorsList, setInvestorsList] = React.useState<string[]>([])
  const [isTransaction, setIsTransaction] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }, setChain] = useSetChain()
  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { addAllowedAddresses } = useManagePoolController(
    (poolInfo && poolInfo[0]?.controller) ?? '',
    networks[chainId].rpc
  )

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

  async function handlePrivateInvestors(investorsList: string[]) {
    setIsTransaction(true)

    async function handleSuccess() {
      setInvestorsList([])
      setIsTransaction(false)
      onClose()
      await setAddressesOfPrivateInvestors()
    }

    function handleFail() {
      setIsTransaction(false)
    }

    await addAllowedAddresses(investorsList, handleSuccess, handleFail, {
      sucess: 'Investors add!'
    })
  }

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
              {investorsList?.some(wallet => wallet === value) ||
              privateInvestorsAlreadyAdded.some(wallet => wallet === value) ? (
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

          {poolInfo && poolInfo[0]?.chain_id === chainId ? (
            <>
              {!isTransaction ? (
                <Button
                  text="Add Investor"
                  type="button"
                  background="secondary"
                  fullWidth
                  disabledNoEvent={investorsList.length < 1}
                  onClick={() => handlePrivateInvestors(investorsList)}
                />
              ) : (
                <Button
                  text="Waiting transaction"
                  type="button"
                  background="primary"
                  disabled
                  fullWidth
                />
              )}
            </>
          ) : (
            <>
              {poolInfo && poolInfo[0]?.chain_id && (
                <Button
                  text={`Connect to ${
                    networks[poolInfo[0].chain_id].chainName
                  }`}
                  type="button"
                  background="primary"
                  fullWidth
                  onClick={() =>
                    setChain({
                      chainId: `0x${poolInfo[0].chain_id.toString(16)}`
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
