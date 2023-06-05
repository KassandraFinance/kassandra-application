import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getAddress, isAddress } from 'ethers'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

import substr from '@/utils/substr'
import { networks } from '@/constants/tokenAddresses'

import useManagePool from '@/hooks/useManagePoolEthers'

import usePoolInfo from '@/hooks/usePoolInfo'

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
  const { poolInfo } = usePoolInfo(
    wallet ? getAddress(wallet.accounts[0].address) : '',
    poolId
  )

  const chainId = parseInt(connectedChain?.id ?? '0x89', 16)

  const { addAllowedAddresses } = useManagePool(
    poolInfo?.controller ?? '',
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

          {poolInfo?.chain_id === chainId ? (
            <>
              {!isTransaction ? (
                <Button
                  text="Add Investor"
                  type="button"
                  backgroundSecondary
                  fullWidth
                  disabledNoEvent={investorsList.length < 1}
                  onClick={() => handlePrivateInvestors(investorsList)}
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
                    setChain({ chainId: `0x${poolInfo.chain_id.toString(16)}` })
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
